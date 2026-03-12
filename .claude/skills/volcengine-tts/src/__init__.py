# -*- coding: utf-8 -*-
"""火山引擎 TTS 模块"""
from .config import Config
from .volcengine_tts import VolcengineTTS, TTSError

__all__ = ["Config", "VolcengineTTS", "TTSError"]
__version__ = "1.0.0"