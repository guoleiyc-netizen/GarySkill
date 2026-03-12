---
name: volcengine-tts
description: Convert text to speech using Volcengine TTS API. Use when the user asks to convert text to audio, generate voice files, or text-to-speech.
argument-hint: [text]
---

# Volcengine TTS Skill

Convert text to speech using Volcengine TTS V3 API.

## Usage

When the user wants to convert text to speech:

1. Use the `VolcengineTTS` class from `src/volcengine_tts.py`
2. Create a client instance
3. Call `text_to_speech()` method with the text and output path

## Example

```python
from src.volcengine_tts import VolcengineTTS

# Create client
tts = VolcengineTTS()

# Convert text to speech
tts.text_to_speech("你好，这是一个测试", "output.mp3")
```

## Command Line

You can also use the command line tool:

```bash
cd .claude/skills/volcengine-tts/src && python tts.py "你好，这是一个测试" -o output.mp3
```

## Parameters

- `text`: Text to convert (required)
- `output_path`: Output file path (default: output.mp3)
- `speaker`: Speaker type (default: zh_female_vv_uranus_bigtts)
- `format`: Audio format (default: mp3)
- `sample_rate`: Sample rate (default: 24000)
- `speech_rate`: Speech rate -50~100 (default: 0)
- `loudness_rate`: Volume -50~100 (default: 0)
- `voice_instruction`: Voice instruction to control emotion, tone, dialect, speed, etc.

## Voice Instruction (语音指令)

Use natural language to control speech synthesis with `voice_instruction` parameter.
The `[# ...]` wrapper will be auto-added if not provided.

**Supported Keywords:**

| Category | Keywords |
|----------|----------|
| Emotion/Style | 悲伤, 愤怒, 撒娇, 暧昧, 吵架, 叙事, 对话, 新闻, 故事 |
| Dialect | 四川话, 北京话 |
| Tone | 低沉沙哑, 颤抖沙哑, 试探性犹豫 |
| Speed | 语速快一点, 语速慢一点 |
| Pitch | 音调高, 音调低 |
| Pause | 在这里停顿 Xms/Xs (e.g., 在这里停顿 800ms) |

**Note:** Voice instruction only works with TTS 2.0 voices (seed-tts-2.0).

### Examples

```python
# Storytelling style
tts.text_to_speech("今天天气很好", "output.mp3", voice_instruction="用故事讲述的语气")

# Sad emotion with slower speed
tts.text_to_speech("我很伤心", "output.mp3", voice_instruction="悲伤, 语速慢一点")

# Sichuan dialect
tts.text_to_speech("你好", "output.mp3", voice_instruction="用四川话")

# Low husky voice with pause
tts.text_to_speech("我逆转时空九十九次救你", "output.mp3",
                   voice_instruction="用低沉沙哑的语气, 语速慢一点, 在这里停顿 800ms")
```

### Command Line

```bash
# With voice instruction (auto-wrapped with [# ...])
python tts.py "今天天气很好" --voice-instruction "用故事讲述的语气"

# Short form
python tts.py "我很伤心" -vi "悲伤, 语速慢一点"
```

## Configuration

Requires environment variables in `.env`:
- `VOLCENGINE_APP_ID`
- `VOLCENGINE_ACCESS_KEY`
- `VOLCENGINE_RESOURCE_ID`

## Common Speakers

- `zh_female_vv_uranus_bigtts`: Chinese Female (TTS 2.0)
- `zh_male_M392_conversation_wvae_bigtts`: Chinese Male
- `zh_female_shuangkuaisisi_moon_bigtts`: Chinese Female

Full speaker list: https://www.volcengine.com/docs/6561/1257544

## Error Codes

- `20000000`: Success
- `40402003`: Text length exceeded
- `45000000`: Speaker authentication failed
- `45000030`: Resource not authorized
- `55000000`: Server error