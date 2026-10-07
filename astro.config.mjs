// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // TODO(marcelo): definir `site` con el dominio final de Vercel (Fase 6).
  // Lo necesitan el sitemap y las URL canónicas (Fase 5).
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon({ iconDir: 'src/assets/icons' })],
});
