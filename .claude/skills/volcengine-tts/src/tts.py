#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""火山引擎 TTS 命令行工具"""
import argparse
import sys

from volcengine_tts import VolcengineTTS, TTSError
from utils import format_file_size
from config import Config


def format_voice_instruction(instruction: str) -> str:
    """
    格式化语音指令，自动添加 [# ...] 包裹

    Args:
        instruction: 原始指令文本

    Returns:
        格式化后的指令，如 [#用故事讲述的语气]
    """
    if not instruction:
        return instruction

    instruction = instruction.strip()

    # 如果已经是 [# ...] 格式，直接返回
    if instruction.startswith("[#") and instruction.endswith("]"):
        return instruction

    # 否则自动添加 [# ...] 包裹
    return f"[#{instruction}]"


def main():
    parser = argparse.ArgumentParser(
        description="火山引擎 TTS 文本转语音工具",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python tts.py "你好，这是一个测试"
  python tts.py "你好" -o hello.mp3
  python tts.py "你好" -s zh_male_M392_conversation_wvae_bigtts
  python tts.py "今天天气很好" --voice-instruction "用故事讲述的语气"
  python tts.py "我很伤心" -vi "悲伤, 语速慢一点"

语音指令 (voice_instruction) 支持的关键词:
  - 情感/风格: 悲伤, 愤怒, 撒娇, 暧昧, 吵架, 叙事, 对话, 新闻, 故事
  - 方言: 四川话, 北京话
  - 语气: 低沉沙哑, 颤抖沙哑, 试探性犹豫
  - 语速: 语速快一点, 语速慢一点
  - 音调: 音调高, 音调低
  - 停顿: 在这里停顿 Xms/Xs

注意: 语音指令功能仅支持 TTS 2.0 音色 (seed-tts-2.0)
        """
    )

    parser.add_argument("text", help="要转换的文本")
    parser.add_argument("-o", "--output", default="output.mp3", help="输出文件路径 (默认: output.mp3)")
    parser.add_argument("-s", "--speaker", default=None, help="音色类型")
    parser.add_argument("-f", "--format", default="mp3", help="音频格式 (默认: mp3)")
    parser.add_argument("--sample-rate", type=int, default=24000, help="采样率 (默认: 24000)")
    parser.add_argument("--speech-rate", type=int, default=0, help="语速 -50~100 (默认: 0)")
    parser.add_argument("--loudness-rate", type=int, default=0, help="音量 -50~100 (默认: 0)")
    parser.add_argument("--emotion", help="情感")
    parser.add_argument("-vi", "--voice-instruction", dest="voice_instruction",
                        help="语音指令，用自然语言控制情感、语气、方言、语速等，例如: 用故事讲述的语气")

    args = parser.parse_args()

    # 使用配置文件中的默认音色
    speaker = args.speaker or Config.DEFAULT_SPEAKER

    try:
        print(f"正在合成: {args.text}")
        print(f"音色: {speaker}")
        print(f"格式: {args.format}")
        if args.voice_instruction:
            formatted_instruction = format_voice_instruction(args.voice_instruction)
            print(f"语音指令: {formatted_instruction}")

        # 创建 TTS 客户端
        tts = VolcengineTTS()

        # 构建额外参数
        kwargs = {}
        if args.speech_rate != 0:
            kwargs["speech_rate"] = args.speech_rate
        if args.loudness_rate != 0:
            kwargs["loudness_rate"] = args.loudness_rate
        if args.emotion:
            kwargs["emotion"] = args.emotion
        if args.voice_instruction:
            kwargs["voice_instruction"] = format_voice_instruction(args.voice_instruction)

        # 合成音频
        audio_data = tts.synthesize(
            text=args.text,
            speaker=speaker,
            format=args.format,
            sample_rate=args.sample_rate,
            **kwargs
        )

        # 保存文件
        output_path = tts.save_audio(audio_data, args.output)

        print(f"\n✓ 合成成功!")
        print(f"  文件: {output_path}")
        print(f"  大小: {format_file_size(len(audio_data))}")

    except TTSError as e:
        print(f"\n✗ TTS 错误: {e}", file=sys.stderr)
        sys.exit(1)
    except ValueError as e:
        print(f"\n✗ 配置错误: {e}", file=sys.stderr)
        print("  请检查环境变量是否正确配置", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"\n✗ 未知错误: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()