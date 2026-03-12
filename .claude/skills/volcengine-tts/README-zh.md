# 火山引擎 TTS Skill

基于火山引擎 V3 HTTP API 的文本转语音工具。

## 安装

```bash
pip install -r requirements.txt
```

## 配置

在项目根目录创建 `.env` 文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的凭证：

```bash
VOLCENGINE_APP_ID=your_app_id
VOLCENGINE_ACCESS_KEY=your_access_key
VOLCENGINE_RESOURCE_ID=seed-tts-2.0
```

### 获取凭证

1. 登录 [火山引擎控制台](https://console.volcengine.com/speech/app)
2. 创建应用或使用已有应用
3. 获取 App ID 和 Access Token
4. 参考 [控制台使用 FAQ](https://www.volcengine.com/docs/6561/196768)

## 使用方法

### 命令行

```bash
cd src

# 基本使用
python tts.py "你好，这是一个测试"

# 指定输出文件
python tts.py "你好" -o hello.mp3

# 指定音色
python tts.py "你好" -s zh_male_M392_conversation_wvae_bigtts

# 指定语速
python tts.py "你好" --speech-rate 50

# 使用语音指令控制情感/风格
python tts.py "今天天气很好" --voice-instruction "[#用故事讲述的语气]"

# 语音指令简写
python tts.py "我很伤心" -vi "[#悲伤, 语速慢一点]"
```

### Python API

```python
from volcengine_tts import VolcengineTTS

# 创建客户端
tts = VolcengineTTS()

# 方式1: 分步操作
audio_data = tts.synthesize("你好，这是一个测试")
tts.save_audio(audio_data, "output.mp3")

# 方式2: 一步完成
tts.text_to_speech("你好，这是一个测试", "output.mp3")

# 使用语音指令
tts.text_to_speech("今天天气很好", "output.mp3",
                   voice_instruction="[#用故事讲述的语气]")
```

## 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| text | 要转换的文本 | 必填 |
| speaker | 音色类型 | zh_female_vv_uranus_bigtts |
| format | 音频格式 | mp3 |
| sample_rate | 采样率 | 24000 |
| speech_rate | 语速 (-50 ~ 100) | 0 |
| loudness_rate | 音量 (-50 ~ 100) | 0 |
| emotion | 情感 | - |
| voice_instruction | 语音指令，用自然语言控制情感、语气、方言、语速等 | - |

## 语音指令 (Voice Instruction)

使用自然语言控制语音合成，`[# ...]` 格式会自动补全。

### 支持的关键词

| 类别 | 关键词 |
|------|--------|
| 情感/风格 | 悲伤, 愤怒, 撒娇, 暧昧, 吵架, 叙事, 对话, 新闻, 故事 |
| 方言 | 四川话, 北京话 |
| 语气 | 低沉沙哑, 颤抖沙哑, 试探性犹豫 |
| 语速 | 语速快一点, 语速慢一点 |
| 音调 | 音调高, 音调低 |
| 停顿 | 在这里停顿 Xms/Xs (如: 在这里停顿 800ms) |

**注意：** 语音指令功能仅支持 TTS 2.0 音色 (seed-tts-2.0)。

### 使用示例

```python
# 故事讲述风格
tts.text_to_speech("今天天气很好", "output.mp3",
                   voice_instruction="用故事讲述的语气")

# 悲伤情感 + 慢语速
tts.text_to_speech("我很伤心", "output.mp3",
                   voice_instruction="悲伤, 语速慢一点")

# 四川话
tts.text_to_speech("你好", "output.mp3",
                   voice_instruction="用四川话")

# 低沉沙哑 + 慢语速 + 停顿
tts.text_to_speech("我逆转时空九十九次救你", "output.mp3",
                   voice_instruction="用低沉沙哑的语气, 语速慢一点, 在这里停顿 800ms")
```

## 常用音色

| 音色 ID | 说明 |
|---------|------|
| zh_female_vv_uranus_bigtts | 中文女声 (TTS 2.0) |
| zh_male_M392_conversation_wvae_bigtts | 中文男声 |
| zh_female_shuangkuaisisi_moon_bigtts | 中文女声 |

完整音色列表：https://www.volcengine.com/docs/6561/1257544

## 错误码

| Code | 说明 |
|------|------|
| 20000000 | 合成成功结束 |
| 40402003 | 文本长度超限 |
| 45000000 | 音色鉴权失败 |
| 45000030 | 资源未授权 |
| 55000000 | 服务端错误 |

## 项目结构

```
volcengine-tts-skill/
├── .claude/
│   └── skills/
│       └── volcengine-tts/
│           ├── src/
│           │   ├── __init__.py
│           │   ├── config.py           # 配置管理
│           │   ├── volcengine_tts.py   # 核心模块
│           │   ├── tts.py              # 命令行入口
│           │   └── utils.py            # 工具函数
│           ├── SKILL.md                # Skill 定义文件
│           ├── README.md
│           ├── README-zh.md
│           ├── requirements.txt
│           └── .env.example
└── .env                                # 环境变量配置 (项目根目录)
```

## 相关文档

- [V3 HTTP 单向流式文档](https://www.volcengine.com/docs/6561/1598757)
- [语音指令文档](https://www.volcengine.com/docs/6561/1871062)
- [音色列表](https://www.volcengine.com/docs/6561/1257544)
- [控制台使用 FAQ](https://www.volcengine.com/docs/6561/196768)

## 许可证

MIT