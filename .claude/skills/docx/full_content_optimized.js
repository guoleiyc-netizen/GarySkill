const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat } = require('docx');

// 读取原始markdown文件
const mdContent = fs.readFileSync("E:/workday/纵横私董会会议纪要/整理完成/江南.md", 'utf-8');

const lines = mdContent.split('\n');
const paragraphs = [];

// 标题颜色
const H1_COLOR = "1F4D78";
const H2_COLOR = "2E5090";
const H3_COLOR = "2E5090";

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;

  // 一级标题（#）
  if (line.startsWith('# ') && !line.startsWith('## ')) {
    const text = line.substring(2).trim();
    paragraphs.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun(text)]
    }));
  }
  // 二级标题（##）
  else if (line.startsWith('## ') && !line.startsWith('### ')) {
    const text = line.substring(3).trim();
    paragraphs.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun(text)]
    }));
  }
  // 三级标题（###）
  else if (line.startsWith('### ') && !line.startsWith('#### ')) {
    const text = line.substring(4).trim();
    paragraphs.push(new Paragraph({
      heading: HeadingLevel.HEADING_3,
      children: [new TextRun(text)]
    }));
  }
  // 四级标题（####）
  else if (line.startsWith('#### ')) {
    const text = line.substring(5).trim();
    paragraphs.push(new Paragraph({
      spacing: { before: 160, after: 80 },
      children: [new TextRun({ text, bold: true, size: 24 })]
    }));
  }
  // 项目符号
  else if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
    const text = line.trim().substring(2);
    const children = parseFormatting(text);
    paragraphs.push(new Paragraph({
      numbering: { reference: "bullet-list", level: 0 },
      children
    }));
  }
  // 水平线
  else if (line.trim().startsWith('---')) {
    paragraphs.push(new Paragraph({
      spacing: { before: 200, after: 200 },
      children: [new TextRun({ text: "────────────────────────────────────", size: 20, color: "CCCCCC" })]
    }));
  }
  // 普通段落
  else {
    const children = parseFormatting(line);
    paragraphs.push(new Paragraph({
      spacing: { before: 100, after: 100 },
      children
    }));
  }
}

// 解析行内格式（粗体、斜体等）
function parseFormatting(text) {
  if (!text) return [new TextRun("")];

  const result = [];
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith('**') && part.endsWith('**')) {
      result.push(new TextRun({
        text: part.slice(2, -2),
        bold: true
      }));
    } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      result.push(new TextRun({
        text: part.slice(1, -1),
        italics: true
      }));
    } else {
      result.push(new TextRun(part));
    }
  }

  return result.length > 0 ? result : [new TextRun(text)];
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "微软雅黑", size: 24 } // 12pt
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, color: H1_COLOR, font: "微软雅黑" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, color: H2_COLOR, font: "微软雅黑" },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, color: H3_COLOR, font: "微软雅黑" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: paragraphs
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("E:/workday/纵横私董会会议纪要/整理完成/江南.docx", buffer);
  console.log("完整内容优化版已生成：江南.docx");
});
