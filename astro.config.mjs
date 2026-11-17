import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 根站点部署：https://dongrunxi.github.io/
// 没有 base path，所有内部链接以 / 开头即可，无需 withBase()
export default defineConfig({
  site: 'https://dongrunxi.github.io',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
