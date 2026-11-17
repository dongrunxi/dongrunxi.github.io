#!/usr/bin/env node
/**
 * 新建文章：npm run new -- "文章标题" [--tags 标签1,标签2] [--publish]
 * 生成 src/content/posts/<slug>/index.md，默认 draft: true（不发布）。
 * 加 --publish 则直接 draft: false。
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const publish = args.includes('--publish');
const tagsIdx = args.indexOf('--tags');
let tags = [];
if (tagsIdx !== -1 && args[tagsIdx + 1]) {
  tags = args[tagsIdx + 1].split(',').map((t) => t.trim()).filter(Boolean);
}
const titleArg = args.find((a, i) => !a.startsWith('--') && (i === 0 || (tagsIdx !== -1 && i === tagsIdx + 1)));
const title = titleArg;

if (!title) {
  console.error('用法：npm run new -- "文章标题" [--tags 标签1,标签2] [--publish]');
  process.exit(1);
}

// slug：中文保留，空格与非法字符转短横线，转小写
const slug = title
  .toLowerCase()
  .replace(/[\\/:*?"<>|#%&{}$!'@+`=\s]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60) || 'untitled';

const dir = join(process.cwd(), 'src', 'content', 'posts', slug);
if (existsSync(dir)) {
  console.error(`已存在同名文章目录：${slug}`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });

// 日期统一东八区
const now = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(new Date());

const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${now}"
description: ""
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
draft: ${publish ? 'false' : 'true'}
---

在这里开始写正文。

配图：把图片文件拖进本目录，然后用 Markdown 图片语法引用（行内代码示意：! [说明] (./ 图片名.png)，使用时去掉空格）。
`;

writeFileSync(join(dir, 'index.md'), frontmatter, 'utf8');
console.log(`✅ 已创建：src/content/posts/${slug}/index.md`);
console.log(`   draft: ${publish ? 'false（发布）' : 'true（草稿，写完后改为 false）'}`);
