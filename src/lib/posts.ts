import { getCollection } from 'astro:content';

/**
 * 全站唯一样文章入口：过滤草稿 + 按日期倒序。
 * 首页、标签、归档、RSS、sitemap 只许用它，
 * 任何页面不得直接调 getCollection('posts')，防止草稿泄漏。
 */
export async function getPublishedPosts() {
  const all = await getCollection('posts');
  return all
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 格式化日期为中文展示 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
