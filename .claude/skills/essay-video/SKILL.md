---
name: essay-video
description: 知识讲解视频生成工作流。当用户说"生成essay视频"、"制作知识讲解视频"、"essay视频"、"把文章做成视频"、"essay:tts"、"essay:render"时使用。负责将 markdown 文稿提炼为 JSON 脚本数据、火山引擎TTS配音、Remotion渲染知识讲解风格视频（深色背景+金色大字），项目路径 D:\zaobao，输出 output/essay-[name].mp4。
---

# Essay 知识讲解视频生成工作流

## 两步流程

```bash
# 1. 生成 TTS（需先准备 JSON 脚本数据）
npm run essay:tts

# 2. 渲染视频
npm run essay:render

# 或一键完成
npm run essay:all
```

## 新文章制作流程

1. 将 markdown 文稿放入 `文稿素材/`
2. 提炼 JSON 脚本数据，存为 `src/data/essay-[name].json`
   - 结构参考 `src/data/essay-anthropic-index.json`（现有完整案例）
   - 数据格式详见 [references/data-schema.md](references/data-schema.md)
   - 每章 1–3 个 content slide，提炼核心观点句，不要全文搬运
3. 运行 `npm run essay:tts` 生成音频
4. 运行 `npm run essay:render` 渲染视频

## Slide 类型速查

| 类型 | 用途 | 必填字段 |
|------|------|---------|
| `intro` | 开场标题卡 | `title`, `subtitle` |
| `section-header` | 章节分隔 | `sectionIndex`(0-based), `sectionTitle` |
| `content` | 内容讲解（三层：标签→标题→正文）| `sectionTitle`, `title`, `body` |
| `quote` | 金句大字居中全屏 | `quote` |
| `summary` | 要点总结，逐条弹入 | `points[]` |
| `outro` | 片尾感谢 | —（无需额外字段）|

**每个 slide 必须有 `speakText`**（TTS 朗读文本）。

## 关键配置（.env）

| 变量 | 用途 |
|------|------|
| `VOLCENGINE_APP_ID` / `VOLCENGINE_ACCESS_KEY` | 火山引擎 TTS |
| `VOLCENGINE_SPEAKER` | 音色（当前：`zh_female_mizai_saturn_bigtts`）|
| `VOLCENGINE_VOICE_INSTRUCTION` | 语气（知识讲解视频用 `知识讲解`，区别于早报的 `新闻播报`）|

## 视觉风格

- 背景：深蓝渐变 `#0a0e1a → #111827`
- 强调色：金色 `#fbbf24`（标题/金句/序号）
- 正文：白色 `#f9fafb`
- 布局：左对齐，1920×1080，30fps
- 动画：spring 弹入，三层错落（章节标签 → 主标题 → 说明文字）

## 输出位置

```
src/data/essay-[name].json              ← 脚本数据
public/audio/essay/[name]/manifest.json ← 音频时序清单
public/audio/essay/[name]/*.mp3         ← 各 slide 音频
output/essay-[name].mp4                 ← 最终视频
```

## 预览

```bash
npm run remotion
# 浏览器 http://localhost:3005 → 选择 EssayVideo
```

## 故障排查

| 现象 | 原因 | 解决 |
|------|------|------|
| 开场黑屏/无文字 | intro slide 缺 `title`/`subtitle` 字段 | 在 JSON 数据中补充这两个字段 |
| TTS 失败 | access_key 过期 | 更新 `.env` 中 `VOLCENGINE_ACCESS_KEY` |
| 渲染 props 报错 | 临时文件冲突 | 删除 `temp/` 目录重试 |
| Summary 要点瞬间全出 | manifest 未生成 | 先运行 `essay:tts` 再渲染 |
