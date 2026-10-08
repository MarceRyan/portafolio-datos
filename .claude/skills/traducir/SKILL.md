---
name: traducir
description: Traduce el portafolio de Marcelo al inglés (interfaz, datos y casos) sobre la estructura i18n existente. Úsala cuando Marcelo pida la versión en inglés o actualizar una traducción.
---

# Traducir al inglés

Estructura actual: `astro.config.mjs` ya declara `locales: ['es', 'en']` con `prefixDefaultLocale: false`, así que el español vive en `/` y el inglés iría en `/en/`. Hoy solo hay español.

## Qué hay que traducir

1. **Interfaz**: `src/i18n/ui.ts` (diccionario). Agrega `en` con las mismas claves; `useTranslations` recurre al español si falta una.
2. **Datos**: `src/data/*.ts` tienen textos en español (experiencia, ahora mismo, comunidad, herramientas). Conviértelos a un objeto por idioma de forma consistente; no mezcles enfoques.
3. **Casos**: crea `src/content/casos/en/<slug>.mdx` con el mismo `slug`. El esquema debe seguir pasando.
4. **Páginas**: copia las rutas bajo `src/pages/en/` reutilizando los componentes y pasando `lang`. Añade un selector de idioma en el `Header` y `hreflang` en `BaseLayout`.

## Reglas

- Traduce el sentido, no palabra por palabra. Mantén la voz en primera persona y los verbos concretos.
- **No añadas ni quites hechos.** Cifras, fechas y nombres propios (MINEDU, DSRP) quedan iguales; explica la sigla solo si ayuda.
- Sin rayas largas ni frases genéricas en inglés ("passionate", "leverage", "insights-driven").
- `lang="en"` en `<html>`, y `title` y `description` traducidos por página.
- Verifica con `npm run check && npm run build` y revisa el ancho de botones y navegación.

Pendiente de Marcelo: confirmar qué nivel de inglés quiere reflejar antes de publicar.
