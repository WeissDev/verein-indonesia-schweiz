import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://vereinindonesiaschweiz.ch',
  // German at /, Indonesian at /id/ (routes in src/pages/id/); sitemap gets hreflang pairs
  integrations: [sitemap({ i18n: { defaultLocale: 'de', locales: { de: 'de-CH', id: 'id-ID' } } })],

  vite: {
    plugins: [tailwindcss()],
  },
});
