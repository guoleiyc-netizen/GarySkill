#!/usr/bin/env python3
"""
解析各种格式的聊天记录
支持：微信、WhatsApp、iMessage、纯文本对话等
"""

import re
import json
from pathlib import Path
from datetime import datetime


def parse_wechat(text):
    """解析微信聊天记录导出"""
    # 微信格式: [日期 时间] 用户名: 消息内容
    pattern = r'\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] ([^\n:]+?): (.+)'

    messages = []
    for match in re.finditer(pattern, text):
        timestamp, username, content = match.groups()
        messages.append({
            'timestamp': timestamp,
            'username': username.strip(),
            'content': content.strip()
        })

    return messages


def parse_whatsapp(text):
    """解析 WhatsApp 导出格式"""
    # WhatsApp 格式: [日期, 时间] 用户名: 消息
    pattern = r'\[(\d{1,2}/\d{1,2}/\d{2,4}, \d{1,2}:\d{2}:\d{2}\s*[AP]M)\] ([^\n:]+?): (.+)'

    messages = []
    for match in re.finditer(pattern, text):
        timestamp, username, content = match.groups()
        messages.append({
            'timestamp': timestamp,
            'username': username.strip(),
            'content': content.strip()
        })

    return messages


def parse_simple_dialogue(text, speaker_a='A', speaker_b='B'):
    """解析简单对话格式（A: xxx B: xxx）"""
    messages = []
    lines = text.strip().split('\n')

    current_speaker = None
    buffer = []

    for line in lines:
        line = line.strip()
        if not line:
            if buffer and current_speaker:
                messages.append({
                    'content': ' '.join(buffer),
                    'speaker': current_speaker
                })
                buffer = []
                current_speaker = None
            continue

        # 检测说话人标记
        if line.startswith(f'{speaker_a}:') or line.startswith(f'{speaker_a}：'):
            if buffer and current_speaker:
                messages.append({
                    'content': ' '.join(buffer),
                    'speaker': current_speaker
                })
            current_speaker = speaker_a
            buffer = [line.split(':', 1)[1].split('：', 1)[1].strip()]
        elif line.startswith(f'{speaker_b}:') or line.startswith(f'{speaker_b}：'):
            if buffer and current_speaker:
                messages.append({
                    'content': ' '.join(buffer),
                    'speaker': current_speaker
                })
            current_speaker = speaker_b
            buffer = [line.split(':', 1)[1].split('：', 1)[1].strip()]
        elif current_speaker:
            buffer.append(line)

    # 保存最后一条
    if buffer and current_speaker:
        messages.append({
            'content': ' '.join(buffer),
            'speaker': current_speaker
        })

    return messages


def parse_transcript(text):
    """解析录音转写文本（可能是单人大段文本）"""
    # 按段落分割
    paragraphs = re.split(r'\n{2,}', text.strip())

    return {
        'paragraphs': [p.strip() for p in paragraphs if p.strip()],
        'total_length': sum(len(p) for p in paragraphs),
        'paragraph_count': len(paragraphs)
    }


def extract_speaker_messages(messages, target_speaker):
    """从对话中提取特定说话人的所有发言"""
    return [m['content'] for m in messages if m.get('speaker') == target_speaker or m.get('username') == target_speaker]


def merge_dialogues(dialogue_list):
    """合并多段对话文本"""
    return '\n\n'.join(dialogue_list)


def main():
    """命令行入口"""
    import argparse

    parser = argparse.ArgumentParser(description='解析聊天记录')
    parser.add_argument('input_file', help='输入文件路径')
    parser.add_argument('--format', choices=['wechat', 'whatsapp', 'simple', 'transcript'],
                       default='transcript', help='聊天记录格式')
    parser.add_argument('--speaker', help='提取特定说话人的发言（仅用于对话格式）')
    parser.add_argument('-o', '--output', help='输出JSON文件路径')

    args = parser.parse_args()

    with open(args.input_file, 'r', encoding='utf-8') as f:
        text = f.read()

    # 根据格式解析
    if args.format == 'wechat':
        result = parse_wechat(text)
    elif args.format == 'whatsapp':
        result = parse_whatsapp(text)
    elif args.format == 'simple':
        result = parse_simple_dialogue(text)
    else:  # transcript
        result = parse_transcript(text)

    # 如果指定说话人，提取其发言
    if args.speaker and args.format != 'transcript':
        messages = extract_speaker_messages(result, args.speaker)
        output = {
            'format': args.format,
            'speaker': args.speaker,
            'message_count': len(messages),
            'messages': messages,
            'merged_text': merge_dialogues(messages)
        }
    else:
        output = {
            'format': args.format,
            'data': result
        }

    # 输出
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
        print(f"✅ 解析完成: {args.output}")
    else:
        print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
