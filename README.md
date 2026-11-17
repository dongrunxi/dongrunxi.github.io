# dongrunxi 的博客

Astro 静态博客，部署在 https://dongrunxi.github.io/ ，GitHub Actions 自动发布。

## 写作三件事

```bash
# 1. 新建文章（默认草稿，不会发布）
npm run new -- "文章标题" --tags 标签1,标签2

# 2. 写正文：编辑 src/content/posts/<slug>/index.md
#    配图直接拖进同目录，正文里用 ![说明](./图片名.png) 引用

# 3. 发布：把 frontmatter 里的 draft 改成 false，然后
git add . && git commit -m "post: 文章标题" && git push
```

推送后 1~2 分钟自动上线。

## 三条规则

1. **草稿不会被发布**：`draft: true` 的文章在首页、标签、归档、RSS、sitemap 里都不出现。
2. **图片必须同目录**：每篇文章一个目录 + 一个 index.md，配图放自己目录里。
3. **文章地址不可改**：目录名就是 URL（`/posts/<目录名>/`），建好后别改，否则外链全断。

## frontmatter 格式

```yaml
---
title: "文章标题"
date: "2026-11-17"    # 必须带引号的 YYYY-MM-DD，写错会构建失败并指出文件
description: "摘要，可选"
tags: ["随笔"]
draft: false
---
```

## 本地命令

| 命令 | 作用 |
|------|------|
| `npm run dev` | 本地预览 http://localhost:4321/ |
| `npm run build` | 构建到 dist/ |
| `npm run new -- "标题"` | 新建文章 |

## 部署

推送到 main 即触发 `.github/workflows/deploy.yml`：构建 → 发布到 GitHub Pages。
发布失败时线上保持旧版，去仓库的 Actions 页看日志定位是哪个文件的问题。
