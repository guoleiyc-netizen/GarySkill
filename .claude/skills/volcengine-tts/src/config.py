# -*- coding: utf-8 -*-
"""配置管理模块"""
import os
from pathlib import Path
from dotenv import load_dotenv

# 尝试从多个位置加载 .env 文件
# 1. 当前工作目录
# 2. 项目根目录 (向上五级)
# 3. skill 目录
env_locations = [
    Path.cwd() / ".env",  # 当前工作目录
    Path(__file__).parent.parent.parent.parent.parent / ".env",  # 项目根目录
    Path(__file__).parent.parent / ".env",  # skill 目录
]

for env_path in env_locations:
    if env_path.exists():
        load_dotenv(env_path)
        break


class Config:
    """火山引擎 TTS 配置"""

    # API 配置
    APP_ID: str = os.getenv("VOLCENGINE_APP_ID", "")
    ACCESS_KEY: str = os.getenv("VOLCENGINE_ACCESS_KEY", "")
    RESOURCE_ID: str = os.getenv("VOLCENGINE_RESOURCE_ID", "seed-tts-2.0")

    # API 地址
    API_URL: str = "https://openspeech.bytedance.com/api/v3/tts/unidirectional"

    # 默认音频参数
    DEFAULT_SPEAKER: str = "zh_female_vv_uranus_bigtts"
    DEFAULT_FORMAT: str = "mp3"
    DEFAULT_SAMPLE_RATE: int = 24000

    @classmethod
    def validate(cls) -> bool:
        """验证配置是否完整"""
        if not cls.APP_ID:
            raise ValueError("VOLCENGINE_APP_ID 未配置")
        if not cls.ACCESS_KEY:
            raise ValueError("VOLCENGINE_ACCESS_KEY 未配置")
        if not cls.RESOURCE_ID:
            raise ValueError("VOLCENGINE_RESOURCE_ID 未配置")
        return True