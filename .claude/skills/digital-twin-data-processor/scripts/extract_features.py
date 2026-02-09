#!/usr/bin/env python3
"""
从对话文本中提取语言特征
用于生成数字孪生角色所需的特征数据
"""

import re
import json
from collections import Counter
from pathlib import Path


def extract_catchphrases(text, min_freq=3, min_length=2, max_length=20):
    """提取口头禅和高频表达"""
    # 分句
    sentences = re.split(r'[。！？!?…\n]', text)

    # 提取短语（2-20字）
    phrases = []
    for sent in sentences:
        sent = sent.strip()
        if len(sent) < min_length or len(sent) > max_length:
            continue
        if sent:
            phrases.append(sent)

    # 统计频率
    phrase_freq = Counter(phrases)

    # 过滤低频短语
    result = {p: c for p, c in phrase_freq.items() if c >= min_freq}
    return dict(sorted(result.items(), key=lambda x: x[1], reverse=True))


def extract_punctuation_habits(text):
    """分析标点符号使用习惯"""
    # 统计各种标点
    patterns = {
        '连续感叹号': len(re.findall(r'!{2,}', text)),
        '连续问号': len(re.findall(r'\?{2,}', text)),
        '波浪号': text.count('~'),
        '省略号': text.count('...') + text.count('。。。'),
        '句号使用率': text.count('。') / max(len(text), 1) * 1000,
    }
    return patterns


def extract_fillers(text):
    """提取语气词和填充词"""
    common_fillers = [
        '呃', '额', '嗯', '啊', '吧', '呢', '哦', '呀',
        '就是说', '那个', '然后', '就是', '其实',
        '对吧', '你知道', '就是那个'
    ]

    filler_counts = {}
    for filler in common_fillers:
        count = text.count(filler)
        if count > 0:
            filler_counts[filler] = count

    return filler_counts


def extract_sentence_patterns(text):
    """分析句式特征"""
    sentences = re.split(r'[。！？!?]', text)
    sentences = [s.strip() for s in sentences if s.strip()]

    if not sentences:
        return {}

    lengths = [len(s) for s in sentences]

    return {
        '平均句长': sum(lengths) / len(lengths),
        '最短句长': min(lengths),
        '最长句长': max(lengths),
        '短句比例(<=10字)': sum(1 for l in lengths if l <= 10) / len(lengths),
        '长句比例(>=50字)': sum(1 for l in lengths if l >= 50) / len(lengths),
    }


def extract_emotion_patterns(text):
    """分析情绪表达模式"""
    # 情绪词库
    emotion_words = {
        '积极': ['开心', '高兴', '喜欢', '爱', '棒', '赞', '厉害', '不错', '好的', '哈哈'],
        '消极': ['烦', '讨厌', '烦人', '难受', '糟糕', '完了', '崩溃', '郁闷'],
        '惊讶': ['哇', '天哪', '不会吧', '真的吗', '竟然'],
        '思考': ['可能', '也许', '应该', '好像', '感觉', '觉得'],
    }

    patterns = {}
    for emotion, words in emotion_words.items():
        count = sum(text.count(w) for w in words)
        if count > 0:
            patterns[emotion] = count

    return patterns


def extract_topics(text, top_n=20):
    """提取高频话题词"""
    # 简单分词（基于常见词边界）
    words = re.findall(r'[\u4e00-\u9fa5]{2,4}', text)

    # 过滤常见停用词
    stopwords = {'这个', '那个', '什么', '怎么', '没有', '可以', '就是',
                 '因为', '所以', '但是', '然后', '或者', '如果', '虽然'}

    words = [w for w in words if w not in stopwords]

    # 统计频率
    word_freq = Counter(words)

    return dict(word_freq.most_common(top_n))


def analyze_text_file(file_path):
    """分析单个文本文件，提取所有特征"""
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    if len(text) < 100:
        return None

    return {
        'file_name': Path(file_path).name,
        'text_length': len(text),
        'catchphrases': extract_catchphrases(text)[:20],  # 前20个
        'punctuation_habits': extract_punctuation_habits(text),
        'fillers': extract_fillers(text),
        'sentence_patterns': extract_sentence_patterns(text),
        'emotion_patterns': extract_emotion_patterns(text),
        'top_topics': extract_topics(text),
    }


def main():
    """命令行入口"""
    import argparse

    parser = argparse.ArgumentParser(description='提取对话文本的语言特征')
    parser.add_argument('input_file', help='输入文本文件路径')
    parser.add_argument('-o', '--output', default='features.json', help='输出JSON文件路径')
    parser.add_argument('--pretty', action='store_true', help='格式化JSON输出')

    args = parser.parse_args()

    features = analyze_text_file(args.input_file)

    if features:
        with open(args.output, 'w', encoding='utf-8') as f:
            if args.pretty:
                json.dump(features, f, ensure_ascii=False, indent=2)
            else:
                json.dump(features, f, ensure_ascii=False)
        print(f"✅ 特征提取完成: {args.output}")
        print(f"   文本长度: {features['text_length']} 字")
        print(f"   口头禅数量: {len(features['catchphrases'])}")
    else:
        print("❌ 文件太短或读取失败")


if __name__ == '__main__':
    main()
