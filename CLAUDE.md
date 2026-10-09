# Portafolio de Marcelo Morales Rimac

Portafolio personal de un Analista de Datos (MINEDU, Perú). Reemplaza dos sitios antiguos de GitHub Pages. Objetivo: que un reclutador entienda en menos de 30 segundos que construyo el camino completo entre los datos crudos y la decisión de una gerencia, con resultados reales en el sector público.

Concepto visual: **"De los datos a la decisión"**. Paleta azul noche, cian y ámbar. Tres estados con color propio: crudo (gris azulado), limpio (cian), decisión (ámbar).

## Stack

Astro 7 (salida 100% estática), TypeScript estricto, Tailwind CSS v4 (plugin de Vite), MDX + Content Collections con zod, astro-icon (Iconify), Formspree para el formulario, Vercel Analytics y Speed Insights. Calidad: Prettier, ESLint, `astro check`, GitHub Actions.

## Comandos

| Comando                | Qué hace                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo (`astro dev --background` para segundo plano; `astro dev stop` lo detiene) |
| `npm run build`        | Compila a `dist/`                                                                                 |
| `npm run preview`      | Sirve el build                                                                                    |
| `npm run check`        | `astro check` (tipos y plantillas)                                                                |
| `npm run lint`         | ESLint                                                                                            |
| `npm run format`       | Prettier (escribe)                                                                                |
| `npm run format:check` | Prettier (solo verifica)                                                                          |

## Estructura

- `src/pages/` rutas. `src/layouts/` BaseLayout y CasoLayout. `src/components/{layout,home,casos,ui}/`.
- `src/data/` contenido estructurado (site, socials, nav, tools, tool-refs, experience, certifications, now, casos-preview temporal).
- `src/content/casos/*.mdx` casos de estudio, validados por `src/content.config.ts`. Las capturas van en `src/assets/images/casos/<slug>.png` (o `cover` en el frontmatter). El diagrama de arquitectura se escribe con `<Flow rows={...} />` (`src/components/casos/Flow.astro`).
- Transiciones de vista (`ClientRouter`): los scripts del navegador usan delegación de eventos y `astro:page-load`; la portada de cada caso comparte `transition:name="cover-<slug>"` entre la tarjeta y la página.
- `src/i18n/` diccionario y utilidades. Solo español por ahora; la estructura admite inglés.
- `src/scripts/` TypeScript del navegador (theme, decision-engine, count-up).
- `src/styles/global.css` tokens, fuentes y capa base.
- `.claude/skills/` skills del proyecto.

## Reglas de diseño

- Los colores salen de los tokens (`bg-bg`, `bg-surface`, `text-ink`, `text-body`, `text-soft`, `border-line`, `clean`, `decide`, `raw-1..3`). Nunca hex sueltos en componentes. Detalle en `.claude/skills/sistema-de-diseno/`.
- Un solo radio (`rounded-ui`, 10 px). Tipografías: Schibsted Grotesk (títulos), Instrument Sans (texto), Caveat solo como firma provisional. Números con `tabular-nums`.
- `clean` y `decide` pasan 4.5:1 en ambos temas; `raw1` y `raw3` no sirven para texto. Detalle en `tokens.md`.
- Todo movimiento respeta `prefers-reduced-motion` (estado final estático).
- **Reglas anti-IA, obligatorias:** nada de degradados morados decorativos, efecto vidrio en tarjetas, emojis como viñetas, etiquetas en MAYÚSCULAS sobre cada título, flechas "→" en botones, tarjetas idénticas en cuadrícula, barras de porcentaje de habilidades ni animaciones de aparición en cada sección. Nada de frases genéricas ("apasionado por la tecnología", "transformo datos en insights"). Excepción decidida por Marcelo: las tarjetas de casos usan cuadros del mismo tamaño (portadas 16:9 de 1600×900) para no recortar ni deformar las capturas.
- Sin rayas largas (em dash) en textos visibles; usa coma, punto o guion corto.

## Reglas de contenido

- **No inventar métricas, fechas, logros ni experiencias.** Si falta un dato, anotar `TODO(marcelo): ...` en el código (comentario o atributo `todo` de `Placeholder`) y en la lista de pendientes de la fase. En pantalla va un texto neutro ("Foto profesional", "Captura del tablero"), nunca la palabra TODO.
- Las secciones de un caso sin datos reales se omiten; no se rellenan con texto genérico.
- Casos con `confidential: true` muestran el aviso de anonimización y no exponen datos reales.
- Los textos oficiales (hero, etapas, casos, experiencia) están en el prompt original del proyecto; no parafrasear.

## Flujo de ramas

Una rama por fase: `feature/fase-N-nombre`. Commits pequeños en español. **Nunca hacer push a `main` sin aprobación de Marcelo.** Cada fase termina con resumen, skills usadas, comandos de prueba y lista de TODO(marcelo), y espera su "OK".

## Skills de diseño instaladas: cuál usar

| Tarea                                                 | Skill                                        |
| ----------------------------------------------------- | -------------------------------------------- |
| Dirección visual, tokens, layout de páginas           | `design-taste-frontend`                      |
| Componentes de UI, microinteracciones, animación      | `emil-design-eng`                            |
| Cualquier dato: color de estados, diagramas, métricas | `dataviz`                                    |
| Crítica al cerrar cada fase; auditoría final          | `impeccable`                                 |
| Rediseño posterior al lanzamiento                     | `redesign-existing-projects` (no usar antes) |

Prioridad ante conflicto: 1) el prompt del proyecto (concepto, paleta, tipografías, contenido, reglas anti-IA, no inventar métricas); 2) las skills mandan en la ejecución; 3) si una skill propone cambiar la identidad, se propone a Marcelo y se espera su decisión.

## Skills del proyecto

`sistema-de-diseno` (UI, tokens, componentes), `agregar-caso` (con `plantilla-caso.mdx`), `redactar-caso`, `actualizar-experiencia`, `traducir` y `revisar-y-publicar` (solo se ejecuta si Marcelo la invoca; incluye `checklist.md`).

SEO: `BaseLayout` emite canonical, Open Graph, Twitter y (en la portada, prop `person`) JSON-LD de Persona. `robots.txt` y sitemap se generan en el build desde `site` (`SITE_URL` o el dominio de Vercel). La imagen social se regenera con `node scripts/generate-og.mjs`. El formulario envía por fetch a Formspree (`src/scripts/contact-form.ts`).

CI: `.github/workflows/ci.yml` corre check, lint, format:check y build en cada PR. La plantilla de PR está en `.github/pull_request_template.md`.
