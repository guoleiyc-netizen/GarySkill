# GarySkill - Claude Skills Collection

这是一个为 [Claude Code](https://claude.ai/code) 配置的技能集集合，包含多个专业领域的AI辅助工具和技能。

## 技能列表

### 📄 文档处理类

#### [docx](.claude/skills/docx/SKILL.md)
**Word文档综合工具** - 专业文档创建、编辑和分析

- **核心功能**：创建新文档、修改现有文档、追踪修订、添加注释、文本提取
- **适用场景**：
  - 创建新的Word文档
  - 编辑或修改文档内容
  - 处理追踪修订和评论
  - 提取文档文本和元数据
- **技术特性**：支持docx-js创建、Document库编辑、Redlining工作流
- **许可证**：专有

#### [pptx](.claude/skills/pptx/SKILL.md)
**PowerPoint演示文稿工具** - 幻灯片创建、编辑、布局设计

- **核心功能**：创建/编辑幻灯片、布局设计、演讲者备注、注释、主题定制
- **适用场景**：
  - 从零创建演示文稿（html2pptx工作流）
  - 使用模板创建演示文稿
  - 编辑现有PPTX文件
  - 生成缩略图和视觉分析
- **设计特性**：18种配色方案、多种视觉细节选项、布局优化
- **许可证**：专有

#### [pdf](.claude/skills/pdf/SKILL.md)
**PDF处理工具包** - 文本提取、表格分析、表单填写

- **核心功能**：提取文本和表格、创建PDF、合并/拆分文档、表单处理
- **适用场景**：
  - 提取PDF文本内容
  - 提取表格数据到Excel
  - 合并或拆分PDF文件
  - 填写PDF表单
  - OCR处理扫描文档
- **技术栈**：pypdf、pdfplumber、reportlab、pdftotext、qpdf
- **许可证**：专有

#### [xlsx](.claude/skills/xlsx/SKILL.md)
**Excel电子表格工具** - 表格创建、编辑、数据分析、可视化

- **核心功能**：创建新表格、读取分析数据、修改现有表格、公式计算、数据可视化
- **适用场景**：
  - 创建带公式和格式的新表格
  - 读取和分析数据
  - 修改现有表格并保留公式
  - 数据分析和可视化
  - 公式重新计算
- **财务模型标准**：行业标准的颜色编码、数字格式规范、公式验证
- **许可证**：专有

#### [markitdown](.claude/skills/markitdown/SKILL.md)
**Markdown转换工具** - 多格式文件转Markdown

- **支持格式**：PDF、DOCX、PPTX、XLSX、图片（OCR）、音频（转录）、HTML、CSV、JSON、XML、ZIP、YouTube、EPUB等15+格式
- **核心功能**：
  - 文件转换为Markdown
  - AI增强的图片描述（通过OpenRouter）
  - Azure Document Intelligence集成
  - 批量转换处理
- **开源项目**：[Microsoft MarkItDown](https://github.com/microsoft/markitdown)
- **许可证**：MIT

---

### ✍️ 内容创作类

#### [super-writer](.claude/skills/super-writer/SKILL.md)
**专业内容创作系统** - 三大核心能力：素材收集 + 风格分析 + 内容创作

- **核心能力**：
  1. **素材收集** - 智能网络搜索和用户素材组织
  2. **风格分析** - 7种分析方法解构参考内容
  3. **内容创作** - 6种经过验证的创作方法论
- **写作方法论**：W.R.I.T.E法、内容写作流程、高价值内容策略、AIDA模型、故事框架等
- **触发场景**：文章、营销文案、故事、报告、社交媒体、邮件、博客等内容创作任务
- **特色**：Sequential Thinking三重集成（素材规划、风格分析、方法论选择）

#### [dongcha](.claude/skills/dongcha/skill.md)
**公众号深度洞察长文生成助手** - 从对话到洞察的思考伙伴

- **核心定位**：跨领域深度思考者，提炼前瞻性观点
- **核心能力**：
  - 智能分析输入内容（咨询对话、培训问答等）
  - 洞察提炼（六维度评分：前瞻性、犀利性、争议性、实用性、原文支撑、开放性）
  - 文章结构选择（第一人称故事化等）
  - 公众号发布准备包生成
  - 隐私保护与脱敏处理
- **适用场景**：OD、HRD、企业教练、管理顾问需要输出深度内容
- **版本**：v3.3
- **特色功能**：
  - 第一人称叙事、口语化表达
  - 开放性思维（启发>指导）
  - 双版本管理（原版+脱敏版）
  - 洞察筛选与文章分拆决策

#### [laoguo-shuo](.claude/skills/laoguo-shuo/SKILL.md)
**"老郭说"风格文章创作** - 历史+管理的深度文章创作

- **核心风格**：
  - 从历史/故事切入（三国为主）
  - 连接现代管理/职场现实
  - 提炼人性和管理的深度洞察
  - 幽默风趣 + 专业严谨
- **文章结构**：
  - 开头：字数+阅读时间+问候语
  - 编号章节（### 01、### 02...）
  - 每章故事+分析+金句
  - 标准结尾模板
- **内置知识库**：三国经典场景映射现代管理议题
- **适用场景**：公众号文章、博客文章、管理类深度内容

---

### 🔍 研究与搜索类

#### [research](.claude/skills/research/SKILL.md)
**AI研究工具** - 综合研究、自动引用、结构化输出

- **核心功能**：
  - AI合成的研究报告（自动来源收集、分析、响应生成）
  - 多种引用格式（numbered、MLA、APA、Chicago）
  - 结构化JSON输出支持
- **模型选择**：
  - `mini`：单一主题、针对性研究（~30秒）
  - `pro`：综合多角度分析（~60-120秒）
  - `auto`：API根据复杂度自动选择
- **适用场景**：市场研究、技术对比、快速概述等
- **依赖**：Tavily API

#### [search](.claude/skills/search/SKILL.md)
**网络搜索工具** - LLM优化的搜索API

- **核心功能**：返回相关结果、内容片段、评分、元数据
- **搜索深度**：
  - `ultra-fast`：最低延迟，较低相关性
  - `fast`：低延迟，良好相关性
  - `basic`：中等延迟，高相关性
  - `advanced`：最高相关性（推荐默认）
- **主题类型**：general、news、finance
- **时间范围**：day、week、month、year
- **高级功能**：域名过滤、包含原始内容、AI生成答案
- **依赖**：Tavily API

#### [tavily-best-practices](.claude/skills/tavily-best-practices/SKILL.md)
**Tavily集成最佳实践** - 生产就绪的Tavily集成指南

- **核心方法**：
  - `search()` - 网络搜索
  - `extract()` - URL内容提取
  - `crawl()` - 全站提取
  - `map()` - URL发现
  - `research()` - AI驱动的研究
- **适用场景**：编码助手实现网络搜索、内容提取、爬虫、研究等
- **参考资料**：
  - SDK参考（Python & JavaScript）
  - 搜索优化指南
  - 提取高级模式
  - 爬虫vs地图对比
  - 框架集成（LangChain、LlamaIndex等）

---

### 🛠️ 工具与框架类

#### [planning-with-files](.claude/skills/planning-with-files/SKILL.md)
**基于文件的规划系统** - Manus风格的持久化规划

- **核心理念**：文件系统 = 持久化的"工作记忆磁盘"
- **三个核心文件**：
  - `task_plan.md` - 阶段、进度、决策
  - `findings.md` - 研究、发现
  - `progress.md` - 会话日志、测试结果
- **关键规则**：
  - 先创建plan再开始任务
  - 每2次查看操作立即保存关键发现
  - 重大决策前重读plan
  - 记录所有错误
- **适用场景**：多步骤任务、研究项目、需要>5次工具调用的复杂任务
- **版本**：v2.0.1

#### [skill-creator](.claude/skills/skill-creator/SKILL.md)
**技能创建指南** - 创建有效的Claude技能

- **核心原则**：
  - 简洁是关键（上下文窗口是公共资源）
  - 设置适当的自由度（高/中/低）
  - 渐进式披露设计（三级加载系统）
- **技能结构**：
  - `SKILL.md`（必需）- YAML前置元数据 + Markdown指令
  - `scripts/` - 可执行代码
  - `references/` - 参考文档
  - `assets/` - 输出资源文件
- **创建流程**：理解技能 → 规划内容 → 初始化 → 编辑 → 打包 → 安装 → 迭代
- **设计模式**：高级指南+参考、领域特定组织、条件细节

---

## 使用说明

### 安装技能

1. 将技能文件放入 `.claude/skills/` 目录
2. 重新启动 Claude Code
3. 技能将自动加载并可用

### 触发技能

技能通过 `description` 字段中的关键词自动触发。当你的请求与技能描述匹配时，Claude Code 会自动加载并使用该技能。

### 技能开发

使用 `skill-creator` 技能创建新技能：
1. 运行初始化脚本创建技能模板
2. 编辑 SKILL.md 添加功能和说明
3. 添加必要的脚本、参考文档和资源文件
4. 打包成 .skill 文件
5. 安装并测试

---

## 项目结构

```
GarySkill/
├── .claude/
│   └── skills/
│       ├── docx/                # Word文档工具
│       ├── dongcha/             # 公众号洞察助手
│       ├── laoguo-shuo/         # 老郭说文章创作
│       ├── markitdown/          # Markdown转换
│       ├── pdf/                 # PDF处理工具
│       ├── planning-with-files/ # 文件规划系统
│       ├── pptx/                # PowerPoint工具
│       ├── research/            # AI研究工具
│       ├── search/              # 网络搜索
│       ├── skill-creator/       # 技能创建指南
│       ├── super-writer/        # 专业内容创作
│       ├── tavily-best-practices/ # Tavily最佳实践
│       └── xlsx/                # Excel工具
└── README.md                    # 本文件
```

---

## 许可证

不同技能拥有不同的许可证：
- **专有许可证**：docx、pptx、pdf、xlsx
- **MIT许可证**：markitdown
- 其他技能请参考各自的 SKILL.md 文件

---

## 贡献

欢迎提交新的技能或改进现有技能。使用 `skill-creator` 作为创建新技能的指南。

---

## 相关资源

- [Claude Code 文档](https://claude.ai/code)
- [技能开发指南](.claude/skills/skill-creator/SKILL.md)
- [MarkItDown GitHub](https://github.com/microsoft/markitdown)
- [Tavily API](https://tavily.com)

---

**最后更新**：2026年2月8日
