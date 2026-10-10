// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio público: SITE_URL (definido por ti) o el dominio de producción que Vercel inyecta.
  // TODO(marcelo): definir SITE_URL en Vercel si usas un dominio propio. Lo usan sitemap, canonical y Open Graph.
  site:
    process.env.SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:4321'),
  output: 'static',
  // /cv lleva al PDF del CV (public/cv/CV_Marcelo_Morales_Rimac_Documentado.pdf).
  redirects: { '/cv': '/cv/CV_Marcelo_Morales_Rimac_Documentado.pdf' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon({ iconDir: 'src/assets/icons' }),
    mdx(),
    sitemap({ filter: (page) => !page.includes('/laboratorio') }),
  ],
});
