// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nsctechhub.com',
  integrations: [sitemap({
    filter: (page) => !page.includes('/test/'),
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});
