import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 为什么 date 不能用 z.coerce.date()：
 * YAML 会把未加引号的 2026-13-45 之类解析成 Date 并静默溢出（如 2026-13-45 → 2027-02-14），
 * coerce 和 refine 都拦不住。所以这里用严格字符串 + 正则 + 日历回验，再 transform 到东八区零点。
 *
 * 写作规则：frontmatter 里日期必须写成 date: "2026-11-17"（带引号）。
 */
const strictDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'date 必须是带引号的 YYYY-MM-DD 格式，例如 date: "2026-11-17"')
  .refine((s) => {
    const [y, m, d] = s.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    return (
      dt.getUTCFullYear() === y &&
      dt.getUTCMonth() === m - 1 &&
      dt.getUTCDate() === d
    );
  }, 'date 不是真实存在的日历日期，请检查（如 2026-02-30）')
  .transform((s) => new Date(`${s}T00:00:00+08:00`));

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    // 一篇文章 = 一个目录 + 一个 index.md，配图放同目录
    pattern: '**/index.md',
    generateId: ({ entry }) => entry.replace(/\/?index\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: strictDate,
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({
    base: './src/content/pages',
    pattern: '*.md',
  }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { posts, pages };
