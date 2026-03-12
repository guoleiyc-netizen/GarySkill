# Essay Video 脚本数据格式

## 顶层结构

```json
{
  "id": "anthropic-index",
  "title": "视频主标题",
  "subtitle": "视频副标题",
  "slides": [ ...EssaySlide[] ]
}
```

## EssaySlide 字段

```typescript
interface EssaySlide {
  id: string;              // 唯一 ID，用于音频文件命名
  type: 'intro' | 'section-header' | 'content' | 'quote' | 'summary' | 'outro';
  sectionIndex?: number;   // 章节序号（0-based）
  sectionTitle?: string;   // 章节标题（显示为蓝色标签）
  title?: string;          // 主标题（白色大字）
  subtitle?: string;       // 副标题（intro 类型）
  body?: string;           // 说明文字（金色）
  quote?: string;          // 金句（quote 类型，居中大字）
  points?: string[];       // 要点列表（summary 类型）
  speakText: string;       // TTS 朗读文本（必填）
}
```

## 各类型完整示例

### intro（必须含 title + subtitle）
```json
{
  "id": "intro",
  "type": "intro",
  "title": "Anthropic Economic Index 深度解读",
  "subtitle": "AI 到底在替代人，还是辅助人？",
  "speakText": "Anthropic Economic Index 深度解读。AI 到底在替代人，还是辅助人？"
}
```

### section-header
```json
{
  "id": "section-01",
  "type": "section-header",
  "sectionIndex": 0,
  "sectionTitle": "这份研究到底是什么",
  "speakText": "第一部分：这份研究到底是什么。"
}
```

### content（三层布局：章节标签 → 主标题 → 说明文字）
```json
{
  "id": "content-01a",
  "type": "content",
  "sectionIndex": 0,
  "sectionTitle": "这份研究到底是什么",
  "title": "Anthropic Economic Index",
  "body": "不是问卷猜测，也不是纯理论推演",
  "speakText": "Anthropic 的这套研究叫 Economic Index。它不是用问卷去猜，也不是纯理论推演。"
}
```

### quote（金句居中，直接写文字，无需括弧）
```json
{
  "id": "quote-01",
  "type": "quote",
  "quote": "不是问你觉得 AI 能替代什么，而是看人们实际上已经拿 Claude 在做什么",
  "speakText": "换句话说，不是问你觉得 AI 能替代什么，而是看人们实际上已经拿 Claude 在做什么。"
}
```

### summary（5条要点逐条弹入，间隔与 TTS 时长同步）
```json
{
  "id": "summary-01",
  "type": "summary",
  "points": [
    "AI 现在更多是在重写任务，不是直接抹掉职业",
    "增强仍多于替代，但自动化比例在上升",
    "被 AI 覆盖的，不只是低技能任务，也包括大量中高认知任务",
    "最大风险不只是失业，而是岗位被去技能化",
    "未来真正值钱的是能重构人机协同的人"
  ],
  "speakText": "第一句，AI 现在更多是在重写任务..."
}
```

### outro
```json
{
  "id": "outro",
  "type": "outro",
  "speakText": "感谢收看。"
}
```

## 推荐 Slide 数量

| 类型 | 数量建议 |
|------|---------|
| intro | 1 |
| section-header | 等于章节数（通常 4–8）|
| content | 每章 1–3 个 |
| quote | 全文 3–6 个关键金句 |
| summary | 1 |
| outro | 1 |
| **合计** | **25–35 个 slides，约 8–12 分钟** |

## speakText 写作规范

- 口语化，不是原文照搬
- 每段 40–120 字为宜（太短停顿感奇怪，太长超过单屏展示时间）
- section-header 的 speakText 简短即可（"第X部分：XXX。"）
- quote 的 speakText 可加上下文过渡句
