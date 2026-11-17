---
title: "你好，世界：这是博客的第一篇文章"
date: "2026-11-17"
description: "博客上线！这篇示例文章用来验证图片、代码块、表格等渲染管线。"
tags: ["随笔", "公告"]
draft: false
---

欢迎来到我的博客。这里会记录我的学习笔记、思考和一些日常。

这篇文章是示例文章，用来验证站点的各种渲染能力——图片、代码块、表格、引用。你可以随意修改或删掉它（整个目录删除后推送即可）。

## 图片

下面是一张同目录的示例配图，Astro 会在构建期自动优化它：

![示例配图](./cover.svg)

## 代码块

代码块使用 Shiki 双主题高亮，明暗模式各自适配：

```js
// 一段 JavaScript 示例
function greet(name) {
  return `你好，${name}！`;
}

console.log(greet('博客'));
```

```python
# 一段 Python 示例
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print([fib(i) for i in range(10)])
```

## 表格

| 功能 | 状态 |
|------|------|
| 文章渲染 | ✅ |
| 标签页 | ✅ |
| RSS 订阅 | ✅ |
| 暗色模式 | ✅ |

## 引用

> 写作是最便宜的思考方式。——把想法写下来，才知道自己到底想没想清楚。

## 写作怎么操作

```bash
# 新建一篇文章（默认草稿，不会发布）
npm run new -- "我的第一篇笔记"

# 编辑 src/content/posts/<slug>/index.md，配图拖进同目录
# 写完把 frontmatter 里的 draft 改成 false，然后：
git add . && git commit -m "post: 我的第一篇笔记" && git push
```

推送后 GitHub Actions 会自动构建并发布，一两分钟后线上即可见。
