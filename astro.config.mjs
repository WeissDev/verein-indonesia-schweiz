import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://vereinindonesiaschweiz.ch',
  // German at /, Indonesian at /id/ (routes in src/pages/id/); sitemap gets hreflang pairs
  integrations: [sitemap({ i18n: { defaultLocale: 'de', locales: { de: 'de-CH', id: 'id-ID' } } })],

  // Instagram images (Behold feed) are downloaded and optimized at build time, then served from our domain
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.behold.pictures' },
      { protocol: 'https', hostname: 'behold.pictures' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
