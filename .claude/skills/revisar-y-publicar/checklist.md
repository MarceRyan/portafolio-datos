# Checklist antes de publicar

## Código

- [ ] `npm run check` sin errores ni avisos
- [ ] `npm run lint` limpio
- [ ] `npm run format:check` limpio
- [ ] `npm run build` termina bien

## Contenido

- [ ] Ninguna métrica, fecha o logro inventado; todo lo dado por Marcelo
- [ ] `grep -rn "TODO(marcelo)" src` revisado: los pendientes son conocidos y ninguno se ve en pantalla
- [ ] La palabra "TODO" no aparece en `dist/` (`grep -rl "TODO" dist`)
- [ ] Sin rayas largas en `src` (em dash)
- [ ] Casos confidenciales con `confidential: true` y sin datos reales
- [ ] CV en `public/cv/CV_Marcelo_Morales_Rimac.pdf`, foto en `src/assets/photo/`, capturas en `src/assets/images/casos/`
- [ ] Enlaces a repositorios y demos funcionan

## Diseño y accesibilidad

- [ ] Colores solo desde tokens; textos con contraste 4.5:1 en ambos temas
- [ ] Reglas anti-IA: sin degradados morados, vidrio, emojis como viñetas, mayúsculas sobre títulos, flechas "→" en botones, tarjetas idénticas, barras de porcentaje, animaciones de aparición en cada sección
- [ ] Se ve bien a 360 px y en escritorio, en tema claro y oscuro
- [ ] Todo se opera con teclado; foco visible; el enlace de salto funciona
- [ ] `prefers-reduced-motion` deja el estado final estático
- [ ] Imágenes con `<Image>` y `alt` útil

## SEO y rendimiento

- [ ] `title` y `description` únicos por página; `site` definido en `astro.config.mjs`
- [ ] Open Graph, sitemap y robots generados
- [ ] Lighthouse ≥ 95 en rendimiento, accesibilidad, buenas prácticas y SEO (móvil)
- [ ] Formulario: `PUBLIC_FORMSPREE_ENDPOINT` configurado en Vercel
