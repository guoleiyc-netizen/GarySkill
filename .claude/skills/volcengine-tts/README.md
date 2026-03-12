# Volcengine TTS Skill

A text-to-speech tool based on Volcengine V3 HTTP API.

## Installation

```bash
pip install -r requirements.txt
```

## Configuration

Create a `.env` file in the project root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```bash
VOLCENGINE_APP_ID=your_app_id
VOLCENGINE_ACCESS_KEY=your_access_key
VOLCENGINE_RESOURCE_ID=seed-tts-2.0
```

### Getting Credentials

1. Login to [Volcengine Console](https://console.volcengine.com/speech/app)
2. Create an application or use an existing one
3. Get App ID and Access Token
4. Refer to [Console Usage FAQ](https://www.volcengine.com/docs/6561/196768)

## Usage

### Command Line

```bash
cd src

# Basic usage
python tts.py "Hello, this is a test"

# Specify output file
python tts.py "Hello" -o hello.mp3

# Specify speaker
python tts.py "Hello" -s zh_male_M392_conversation_wvae_bigtts

# Specify speech rate
python tts.py "Hello" --speech-rate 50

# Use voice instruction for emotion/style control
python tts.py "今天天气很好" --voice-instruction "[#用故事讲述的语气]"

# Short form for voice instruction
python tts.py "我很伤心" -vi "[#悲伤, 语速慢一点]"
```

### Python API

```python
from volcengine_tts import VolcengineTTS

# Create client
tts = VolcengineTTS()

# Method 1: Step by step
audio_data = tts.synthesize("Hello, this is a test")
tts.save_audio(audio_data, "output.mp3")

# Method 2: One step
tts.text_to_speech("Hello, this is a test", "output.mp3")

# With voice instruction
tts.text_to_speech("今天天气很好", "output.mp3",
                   voice_instruction="[#用故事讲述的语气]")
```

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| text | Text to convert | Required |
| speaker | Speaker type | zh_female_vv_uranus_bigtts |
| format | Audio format | mp3 |
| sample_rate | Sample rate | 24000 |
| speech_rate | Speech rate (-50 ~ 100) | 0 |
| loudness_rate | Volume (-50 ~ 100) | 0 |
| emotion | Emotion | - |
| voice_instruction | Natural language instruction for emotion, tone, dialect, speed, etc. | - |

## Voice Instruction (语音指令)

Use natural language to control speech synthesis. The `[# ...]` wrapper will be auto-added if not provided.

### Supported Keywords

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
tts.text_to_speech("今天天气很好", "output.mp3",
                   voice_instruction="用故事讲述的语气")

# Sad emotion with slower speed
tts.text_to_speech("我很伤心", "output.mp3",
                   voice_instruction="悲伤, 语速慢一点")

# Sichuan dialect
tts.text_to_speech("你好", "output.mp3",
                   voice_instruction="用四川话")

# Low husky voice with pause
tts.text_to_speech("我逆转时空九十九次救你", "output.mp3",
                   voice_instruction="用低沉沙哑的语气, 语速慢一点, 在这里停顿 800ms")
```

## Common Speakers

| Speaker ID | Description |
|------------|-------------|
| zh_female_vv_uranus_bigtts | Chinese Female (TTS 2.0) |
| zh_male_M392_conversation_wvae_bigtts | Chinese Male |
| zh_female_shuangkuaisisi_moon_bigtts | Chinese Female |

Full speaker list: https://www.volcengine.com/docs/6561/1257544

## Error Codes

| Code | Description |
|------|-------------|
| 20000000 | Synthesis completed successfully |
| 40402003 | Text length exceeded |
| 45000000 | Speaker authentication failed |
| 45000030 | Resource not authorized |
| 55000000 | Server error |

## Project Structure

```
volcengine-tts-skill/
├── .claude/
│   └── skills/
│       └── volcengine-tts/
│           ├── src/
│           │   ├── __init__.py
│           │   ├── config.py           # Configuration management
│           │   ├── volcengine_tts.py   # Core module
│           │   ├── tts.py              # CLI entry point
│           │   └── utils.py            # Utility functions
│           ├── SKILL.md                # Skill definition
│           ├── README.md
│           ├── README-zh.md
│           ├── requirements.txt
│           └── .env.example
└── .env                                # Environment variables (project root)
```

## Documentation

- [V3 HTTP Unidirectional Streaming](https://www.volcengine.com/docs/6561/1598757)
- [Voice Instruction](https://www.volcengine.com/docs/6561/1871062)
- [Speaker List](https://www.volcengine.com/docs/6561/1257544)
- [Console Usage FAQ](https://www.volcengine.com/docs/6561/196768)

## License

MIT