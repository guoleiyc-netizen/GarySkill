# -*- coding: utf-8 -*-
"""火山引擎 TTS 核心模块"""
import json
import base64
import uuid
import os
from typing import Optional, Dict, Any
import requests

from config import Config


class VolcengineTTS:
    """火山引擎 TTS 客户端"""

    def __init__(
        self,
        app_id: Optional[str] = None,
        access_key: Optional[str] = None,
        resource_id: Optional[str] = None
    ):
        """
        初始化 TTS 客户端

        Args:
            app_id: 应用 ID (可选，默认从环境变量读取)
            access_key: 访问密钥 (可选，默认从环境变量读取)
            resource_id: 资源 ID (可选，默认从环境变量读取)
        """
        self.app_id = app_id or Config.APP_ID
        self.access_key = access_key or Config.ACCESS_KEY
        self.resource_id = resource_id or Config.RESOURCE_ID
        self.api_url = Config.API_URL

        # 验证配置
        if not self.app_id:
            raise ValueError("app_id 未配置，请设置 VOLCENGINE_APP_ID 环境变量")
        if not self.access_key:
            raise ValueError("access_key 未配置，请设置 VOLCENGINE_ACCESS_KEY 环境变量")
        if not self.resource_id:
            raise ValueError("resource_id 未配置，请设置 VOLCENGINE_RESOURCE_ID 环境变量")

    def _build_headers(self) -> Dict[str, str]:
        """构建请求头"""
        return {
            "X-Api-App-Id": self.app_id,
            "X-Api-Access-Key": self.access_key,
            "X-Api-Resource-Id": self.resource_id,
            "Content-Type": "application/json",
            "Connection": "keep-alive"
        }

    def _build_payload(
        self,
        text: str,
        speaker: str,
        format: str,
        sample_rate: int,
        **kwargs
    ) -> Dict[str, Any]:
        """
        构建请求体

        Args:
            text: 要合成的文本
            speaker: 发音人
            format: 音频格式
            sample_rate: 采样率
            **kwargs: 其他参数
                - speech_rate: 语速 (-50 ~ 100)
                - loudness_rate: 音量 (-50 ~ 100)
                - emotion: 情感
                - enable_timestamp: 是否启用时间戳
                - voice_instruction: 语音指令，用自然语言控制情感、语气、方言、语速等
                    注意：此功能仅支持 TTS 2.0 音色，需要使用 seed-tts-2.0 资源ID
        """
        payload = {
            "user": {
                "uid": str(uuid.uuid4())
            },
            "req_params": {
                "text": text,
                "speaker": speaker,
                "audio_params": {
                    "format": format,
                    "sample_rate": sample_rate
                }
            }
        }

        # 添加可选参数
        audio_params = payload["req_params"]["audio_params"]

        if "speech_rate" in kwargs:
            audio_params["speech_rate"] = kwargs["speech_rate"]
        if "loudness_rate" in kwargs:
            audio_params["loudness_rate"] = kwargs["loudness_rate"]
        if "emotion" in kwargs:
            audio_params["emotion"] = kwargs["emotion"]
        if kwargs.get("enable_timestamp"):
            audio_params["enable_timestamp"] = True

        # 添加 additions 参数
        additions = {}
        if kwargs.get("disable_markdown_filter"):
            additions["disable_markdown_filter"] = True
        if kwargs.get("explicit_language"):
            additions["explicit_language"] = kwargs["explicit_language"]

        # 添加语音指令参数 (仅 TTS 2.0 支持)
        # 通过 context_texts 传递语音指令
        if kwargs.get("voice_instruction"):
            additions["context_texts"] = [kwargs["voice_instruction"]]

        if additions:
            payload["req_params"]["additions"] = json.dumps(additions, ensure_ascii=False)

        return payload

    def synthesize(
        self,
        text: str,
        speaker: Optional[str] = None,
        format: Optional[str] = None,
        sample_rate: Optional[int] = None,
        **kwargs
    ) -> bytes:
        """
        文本转语音 (流式)

        Args:
            text: 要合成的文本
            speaker: 发音人 (可选，默认 zh_female_vv_uranus_bigtts)
            format: 音频格式 (可选，默认 mp3)
            sample_rate: 采样率 (可选，默认 24000)
            **kwargs: 其他参数
                - speech_rate: 语速 (-50 ~ 100)
                - loudness_rate: 音量 (-50 ~ 100)
                - emotion: 情感
                - enable_timestamp: 是否启用时间戳
                - voice_instruction: 语音指令，用自然语言控制情感、语气、方言、语速等
                    注意：此功能仅支持 TTS 2.0 音色，需要使用 seed-tts-2.0 资源ID
                    指令用 [# ...] 包裹，例如: [#用低沉沙哑的语气, 语速慢一点]
                    支持的关键词:
                    - 情感/风格: 悲伤, 愤怒, 撒娇, 暧昧, 吵架, 叙事, 对话, 新闻, 故事
                    - 方言: 四川话, 北京话
                    - 语气: 低沉沙哑, 颤抖沙哑, 试探性犹豫
                    - 语速: 语速快一点, 语速慢一点
                    - 音调: 音调高, 音调低
                    - 停顿: 在这里停顿 Xms/Xs

        Returns:
            音频二进制数据

        Raises:
            TTSError: TTS 合成失败
        """
        # 使用默认值
        speaker = speaker or Config.DEFAULT_SPEAKER
        format = format or Config.DEFAULT_FORMAT
        sample_rate = sample_rate or Config.DEFAULT_SAMPLE_RATE

        # 构建请求
        headers = self._build_headers()
        payload = self._build_payload(text, speaker, format, sample_rate, **kwargs)

        # 发送请求
        session = requests.Session()
        try:
            response = session.post(
                self.api_url,
                headers=headers,
                json=payload,
                stream=True,
                timeout=60
            )

            # 检查 HTTP 状态码
            if response.status_code != 200:
                error_msg = f"HTTP 错误: {response.status_code}"
                try:
                    error_data = response.json()
                    if "message" in error_data:
                        error_msg = error_data["message"]
                except:
                    pass
                raise TTSError(error_msg, code=response.status_code)

            # 流式读取响应
            audio_data = bytearray()

            for chunk in response.iter_lines(decode_unicode=True):
                if not chunk:
                    continue

                try:
                    data = json.loads(chunk)
                except json.JSONDecodeError:
                    continue

                code = data.get("code", 0)

                # 正常音频数据
                if code == 0 and data.get("data"):
                    chunk_audio = base64.b64decode(data["data"])
                    audio_data.extend(chunk_audio)

                # 合成结束
                elif code == 20000000:
                    break

                # 错误
                elif code > 0 and code != 0:
                    message = data.get("message", "未知错误")
                    raise TTSError(message, code=code)

            return bytes(audio_data)

        finally:
            response.close()
            session.close()

    def save_audio(
        self,
        audio_data: bytes,
        output_path: str
    ) -> str:
        """
        保存音频文件

        Args:
            audio_data: 音频二进制数据
            output_path: 输出文件路径

        Returns:
            保存的文件路径
        """
        # 确保目录存在
        output_dir = os.path.dirname(output_path)
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # 保存文件
        with open(output_path, "wb") as f:
            f.write(audio_data)

        # 设置文件权限
        os.chmod(output_path, 0o644)

        return output_path

    def text_to_speech(
        self,
        text: str,
        output_path: str,
        speaker: Optional[str] = None,
        format: Optional[str] = None,
        sample_rate: Optional[int] = None,
        **kwargs
    ) -> str:
        """
        文本转语音并保存文件 (便捷方法)

        Args:
            text: 要合成的文本
            output_path: 输出文件路径
            speaker: 发音人 (可选)
            format: 音频格式 (可选)
            sample_rate: 采样率 (可选)
            **kwargs: 其他参数
                - voice_instruction: 语音指令，用自然语言控制情感、语气、方言、语速等

        Returns:
            保存的文件路径
        """
        audio_data = self.synthesize(text, speaker, format, sample_rate, **kwargs)
        return self.save_audio(audio_data, output_path)


class TTSError(Exception):
    """TTS 错误"""

    def __init__(self, message: str, code: int = None):
        self.message = message
        self.code = code
        super().__init__(self.message)

    def __str__(self):
        if self.code:
            return f"[{self.code}] {self.message}"
        return self.message