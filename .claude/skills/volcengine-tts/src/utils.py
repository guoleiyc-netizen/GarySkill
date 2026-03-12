# -*- coding: utf-8 -*-
"""工具函数模块"""
import os


def get_audio_format(file_path: str) -> str:
    """
    根据文件扩展名获取音频格式

    Args:
        file_path: 文件路径

    Returns:
        音频格式 (mp3/wav/pcm/ogg_opus)
    """
    ext = os.path.splitext(file_path)[1].lower().replace(".", "")

    # 格式映射
    format_map = {
        "mp3": "mp3",
        "wav": "wav",
        "pcm": "pcm",
        "ogg": "ogg_opus",
        "opus": "ogg_opus"
    }

    return format_map.get(ext, "mp3")


def format_file_size(size_bytes: int) -> str:
    """
    格式化文件大小

    Args:
        size_bytes: 字节数

    Returns:
        格式化后的文件大小字符串
    """
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.2f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.2f} MB"