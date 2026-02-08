const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat, PageBreak } = require('docx');

const doc = new Document({
  styles: {
    default: { document: { run: { font: '微软雅黑', size: 24 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, color: '1F4D78', font: '微软雅黑' },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, color: '2E5090', font: '微软雅黑' },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: 'Quote', name: 'Quote', basedOn: 'Normal',
        run: { size: 22, italics: true, color: '595959', font: '微软雅黑' },
        paragraph: { spacing: { before: 200, after: 200 }, indent: { left: 1440, right: 1440 } } }
    ]
  },
  numbering: {
    config: [{
      reference: 'bullet-list',
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
    }]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ spacing: { before: 2880, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '纵横私董会', bold: true, size: 40, color: '1F4D78' })] }),
      new Paragraph({ spacing: { before: 120, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '会议纪要', bold: true, size: 36, color: '2E5090' })] }),
      new Paragraph({ spacing: { before: 480, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '「', bold: true, size: 32, color: '2E5090' })] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '设计专业主义者的商业困境与价值突围', bold: true, size: 32, color: '1F4D78' })] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '」', bold: true, size: 32, color: '2E5090' })] }),
      new Paragraph({ spacing: { before: 720, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '案主：江南', size: 28, color: '595959' })] }),
      new Paragraph({ spacing: { before: 60, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '第143期（返场）', size: 26, color: '7F7F7F' })] }),
      new Paragraph({ spacing: { before: 600, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '2026年02月08日', size: 24, color: '7F7F7F' })] }),
      new Paragraph({ spacing: { before: 60, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '上海', size: 24, color: '7F7F7F' })] }),
      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('一、会议基本信息')] }),
      new Paragraph({ spacing: { before: 200, after: 80 },
        children: [new TextRun({ text: '日期：', bold: true }), new TextRun('2026年02月08日'), new TextRun({ text: '    时间：', bold: true }), new TextRun('14:55开始，时长约3小时20分钟')] }),
      new Paragraph({ spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: '地点：', bold: true }), new TextRun('上海'), new TextRun({ text: '    期数：', bold: true }), new TextRun('143期（返场案主）')] }),
      new Paragraph({ spacing: { before: 0, after: 120 },
        children: [new TextRun({ text: '核心关键词：', bold: true }), new TextRun('设计专业主义、商业困境、价值突围、团队管理、情绪管理')] }),

      new Paragraph({ spacing: { before: 120, after: 80 }, children: [new TextRun({ text: '与会人员', bold: true, size: 26, color: '1F4D78' })] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '私董官：', bold: true }), new TextRun('郭志梁')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '运营：', bold: true }), new TextRun('朱一溟')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '案主：', bold: true }), new TextRun('江南（设计师，40岁）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '幕僚：', bold: true }), new TextRun('龚姗姗、刘丽芬、老唐、侯保国、Ann、大楠、蒋幼隆、徐贵生、Amber、Echo')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('二、会议开场与规则说明')] }),
      new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: '私董官郭志梁：', bold: true, size: 24 })] }),
      new Paragraph({ style: 'Quote', children: [new TextRun('私董会的核心宗旨：以案主的问题为中心，通过多元视角和共创共建，共同探求真理，帮助案主找到收获和启发。')] }),

      new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text: '核心规则', bold: true, size: 26, color: '1F4D78' })] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '专注：', bold: true }), new TextRun('全程投入，关掉手机，聚焦案主问题')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '平等：', bold: true }), new TextRun('所有人平等发言，没有职位高低')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '高效：', bold: true }), new TextRun('言简意赅，直击要点，珍惜时间')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '负责：', bold: true }), new TextRun('对自己的反馈负责，提供建设性意见')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '保密：', bold: true }), new TextRun('所有分享内容严格保密，不外传')] }),

      new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text: '三大原则', bold: true, size: 26, color: '1F4D78' })] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '关怀：', bold: true }), new TextRun('真诚关心案主，以善意为基础')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '挑战：', bold: true }), new TextRun('直面真问题，不回避尖锐议题')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '目标：', bold: true }), new TextRun('聚焦解决方案，推动行动改变')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('三、成员自我介绍与破冰分享')] }),
      new Paragraph({ spacing: { before: 200, after: 160 }, children: [new TextRun({ text: '破冰主题：', bold: true, size: 26, color: '1F4D78' }), new TextRun('跨界与转型经历分享')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Echo（留学顾问）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('从一线销售转型管理，现担任总经理')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('入职时差点被淘汰，通过背诵沟通框架、连续三天开单实现转正')] }),
      new Paragraph({ spacing: { before: 160, after: 80 }, children: [new TextRun({ text: '困境：', bold: true }), new TextRun('角色需要与自我需要的挣扎')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('龚姗姗（保险经纪人）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('保险行业13年，从TO B转TO C')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('核心能力是分析市场上所有保险组合')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('大楠（连续创业者）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('经历多个行业：二手车B2B、婚礼公司、大健康领域')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('核心理念：跨界成功的本质是躬身入局')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('刘丽芬（Amber，国企银行）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('从专业人士转型为团队长')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('蒋幼隆（张老师，设计师）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('设计师，40岁，与案主同龄同行')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('徐贵生（阿贵，设计师）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('得到15级，设计师十年')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('江南（案主，设计师）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('山东人，做设计十年，2006年到上海')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('四、案主阐述案题')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('背景信息')] }),
      new Paragraph({ spacing: { before: 200, after: 160 }, children: [new TextRun({ text: '当前业务/现状：', bold: true }), new TextRun('40岁设计师，团队解散后独自工作，效率提升。2025年下半年个人项目销售额约40-50万，利润控制在50%左右。')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('我的困扰是')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '市场变化下的生存困境：', bold: true }), new TextRun('单纯依靠专业设计能力难以生存')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '目标感缺失：', bold: true }), new TextRun('40岁面临目标感缺失，疫情打乱原有事业规划')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '角色与自我的挣扎：', bold: true }), new TextRun('在角色需要与自我本真间存在挣扎')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '情绪管理问题：', bold: true }), new TextRun('个人情绪管理（语言暴力）导致团队流失')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('已做努力')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('加入猫头鹰学院学习，接触跨行业朋友')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('通过跑步（完成三次半马）等方式挑战自我')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('整理过去10万张设计图片，总结设计符号')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('学习财务知识，控制成本')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('开始尝试走出舒适圈，公开演讲分享设计理念')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('希望获得的帮助')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('如何在保持设计专业性的同时实现商业突围')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('如何平衡个人与商业角色')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('如何与合伙人（太太魏楠）建立更好的合作模式')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('如何提升商业对接和市场开拓能力')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('五、第一轮提问（信息收集）')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('六、第二轮提问（深入探讨）')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('七、补充提问环节')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('八、隔墙有耳（幕僚内部讨论）')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('九、幕僚反馈环节')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('十、案主总结')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('十一、送你一朵小红花')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('十二、合影与结束')] }),

      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ spacing: { before: 1440, after: 240 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '会议信息', bold: true, size: 28, color: '1F4D78' })] }),
      new Paragraph({ spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '会议时间：2026年2月8日 14:55-18:15', size: 22, color: '595959' })] }),
      new Paragraph({ spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '整理时间：2026年2月8日', size: 22, color: '595959' })] }),
      new Paragraph({ spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '记录来源：纵横私董会第143期', size: 22, color: '595959' })] }),
      new Paragraph({ spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '案主：江南（返场）', size: 22, color: '595959' })] }),
      new Paragraph({ spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '私董官：郭志梁', size: 22, color: '595959' })] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '运营：朱一溟', size: 22, color: '595959' })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('E:/workday/纵横私董会会议纪要/整理完成/江南_优化版.docx', buffer);
  console.log('优化版文档已生成：江南_优化版.docx');
});
