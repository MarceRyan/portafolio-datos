// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // TODO(marcelo): definir `site` con el dominio final de Vercel (Fase 6).
  // Lo necesitan el sitemap y las URL canónicas (Fase 5).
  output: 'static',
  // /cv lleva al PDF del CV (public/cv/Marcelo-Morales-CV.pdf).
  redirects: { '/cv': '/cv/Marcelo-Morales-CV.pdf' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon({ iconDir: 'src/assets/icons' }), mdx()],
});
