---
name: zaobao-daily
description: 科技AI早报视频生成工作流。当用户说"生成早报"、"制作今天早报"、"zaobao"、"跑早报流程"时使用。负责从RSS抓取新闻、GLM-5提炼内容、火山引擎TTS配音、Remotion渲染视频的完整流程，项目路径 D:\zaobao。
---

# 早报视频生成工作流

## 三步流程

```bash
# 全自动（推荐）
npm run zaobao:all

# 分步执行
npx tsx scripts/scrape-news.ts           # 1. 抓取+AI提炼
npx tsx scripts/generate-zaobao-tts.ts  # 2. TTS配音
npx tsx scripts/render-zaobao.ts        # 3. 渲染视频
```

支持 `--date 2026-03-11` 指定日期，`--dry-run` 跳过AI提炼。

## 输出位置

- 新闻数据：`src/data/zaobao-[date].json`
- 音频文件：`public/audio/zaobao/[date]/`
- 最终视频：`output/zaobao-[date].mp4`

## 关键配置（.env）

| 变量 | 用途 |
|------|------|
| `VOLCENGINE_APP_ID` / `VOLCENGINE_ACCESS_KEY` | 火山引擎TTS |
| `VOLCENGINE_SPEAKER` | 音色（当前：zh_female_mizai_saturn_bigtts）|
| `VOLCENGINE_VOICE_INSTRUCTION` | 语气（当前：新闻播报）|
| `ZHIPU_API_KEY` / `ZHIPU_MODEL` | 智谱GLM（当前：glm-5）|

## 常见操作

**换音色**：修改 `.env` 中 `VOLCENGINE_SPEAKER`，重新运行步骤2+3

**重新渲染（不重新抓取）**：
```bash
npx tsx scripts/generate-zaobao-tts.ts --date 2026-03-11
npx tsx scripts/render-zaobao.ts --date 2026-03-11
```

**预览效果**：`npm run remotion` → 浏览器打开 http://localhost:3005

**双击一键运行**：`zaobao.bat`（自动完成三步并打开输出目录）

## 故障排查

| 现象 | 原因 | 解决 |
|------|------|------|
| 新闻抓取0条 | RSS源不可达 | 检查网络，或加 `--dry-run` 先验证 |
| TTS失败 | access_key过期 | 更新 `.env` 中 `VOLCENGINE_ACCESS_KEY` |
| GLM返回0条 | token不足 | 已设8192，检查API余额 |
| 渲染报错props | 临时文件冲突 | 删除 `temp/` 目录重试 |

## Windows 任务计划程序（每日自动化）

已生成配置文件 `zaobao-scheduler.xml`，导入方式：
```
taskschd.msc → 操作 → 导入任务 → 选择 zaobao-scheduler.xml
```
