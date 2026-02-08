const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat } = require('docx');

// Read the markdown file
const markdownContent = fs.readFileSync("E:/workday/纵横私董会会议纪要/整理完成/江南.md", 'utf-8');

// Helper function to parse markdown and convert to Word paragraphs
function parseMarkdownToParagraphs(content) {
  const lines = content.split('\n');
  const paragraphs = [];
  let inList = false;
  let listLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      inList = false;
      continue;
    }

    // Parse headers
    if (line.startsWith('# ')) {
      inList = false;
      const text = line.substring(2).trim();
      paragraphs.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 240 },
        children: [new TextRun({ text, bold: true, size: 36, color: "2E5090" })]
      }));
    } else if (line.startsWith('## ')) {
      inList = false;
      const text = line.substring(3).trim();
      paragraphs.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun(text)]
      }));
    } else if (line.startsWith('### ')) {
      inList = false;
      const text = line.substring(4).trim();
      paragraphs.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun(text)]
      }));
    } else if (line.startsWith('#### ')) {
      inList = false;
      const text = line.substring(5).trim();
      paragraphs.push(new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun(text)]
      }));
    }
    // Parse bullet points
    else if (line.startsWith('* ') || line.startsWith('- ')) {
      const text = line.substring(2).trim();
      paragraphs.push(new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [parseInlineFormatting(text)]
      }));
    }
    // Parse numbered list items
    else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, '').trim();
      paragraphs.push(new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun(text)]
      }));
    }
    // Parse horizontal rules
    else if (line.startsWith('---')) {
      inList = false;
      paragraphs.push(new Paragraph({
        spacing: { before: 120, after: 120 },
        children: [new TextRun({ text: "─", size: 20, color: "CCCCCC" })]
      }));
    }
    // Regular text
    else {
      paragraphs.push(new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [parseInlineFormatting(line)]
      }));
    }
  }

  return paragraphs;
}

// Helper function to parse inline formatting (bold, italic, etc.)
function parseInlineFormatting(text) {
  const children = [];

  // Simple regex-based parsing for **bold** and *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith('**') && part.endsWith('**')) {
      children.push(new TextRun({
        text: part.slice(2, -2),
        bold: true
      }));
    } else if (part.startsWith('*') && part.endsWith('*')) {
      children.push(new TextRun({
        text: part.slice(1, -1),
        italics: true
      }));
    } else {
      children.push(new TextRun(part));
    }
  }

  return children.length > 0 ? children : [new TextRun(text)];
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 } // 12pt default
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, color: "2E5090", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, color: "2E5090", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, color: "2E5090", font: "Arial" },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 }
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
    children: parseMarkdownToParagraphs(markdownContent)
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("E:/workday/纵横私董会会议纪要/整理完成/江南.docx", buffer);
  console.log("Document created successfully at: E:/workday/纵横私董会会议纪要/整理完成/江南.docx");
});
