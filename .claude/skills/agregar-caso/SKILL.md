---
name: agregar-caso
description: Agrega un caso de estudio nuevo al portafolio de Marcelo (archivo MDX validado por el esquema, portada, herramientas y orden). Úsala cuando Marcelo quiera sumar un proyecto a /proyectos.
---

# Agregar un caso

Un caso es un archivo en `src/content/casos/<slug>.mdx`. El esquema (`src/content.config.ts`) valida el frontmatter y el build falla si algo no cuadra.

## Pasos

1. **Pide los datos** que falten. Nunca inventes métricas, fechas, organización ni resultados. Mínimo: título, pregunta de negocio, resumen, categoría, herramientas y si es confidencial.
2. Copia `plantilla-caso.mdx` (en esta carpeta) a `src/content/casos/<slug>.mdx`. El `slug` va en minúsculas con guiones y coincide con el nombre del archivo.
3. Completa el frontmatter:
   - `category`: `ingenieria`, `analisis`, `bi` o `automatizacion`.
   - `stack`: cada nombre debe existir en `src/data/tool-refs.ts`; si no, agrégalo ahí (y su icono en `src/data/tools.ts` o `src/assets/icons/`).
   - `organization`, `role`, `period`, `impact`, `links`: opcionales. Omite lo que no tengas.
   - `confidential: true` si usa datos institucionales (se muestra el aviso de anonimización).
   - `order`: respeta la numeración de los casos existentes; el primero del listado es el caso principal y se muestra más grande.
   - `featured: true` solo si debe salir en "Decisiones que ayudé a tomar" de la portada (máximo 3).
4. Redacta el cuerpo con la skill `redactar-caso`. Las secciones sin datos reales se **eliminan**, no se rellenan.
5. El diagrama usa `<Flow rows={...} />` con estados `raw` (crudo), `clean` (limpio) y `decide` (decisión). El `tool` de cada nodo debe ser un nombre de `tool-refs.ts`.
6. Portada: pide a Marcelo la captura y guárdala en `src/assets/images/casos/<slug>.png` (o `.jpg`, `.webp`, `.avif`). Si no existe, se ve un recuadro neutro "Captura del tablero" y se anota `TODO(marcelo)`.
7. Verifica: `npm run check && npm run lint && npm run build`. Abre `/proyectos` y `/proyectos/<slug>` en 390 px y en escritorio.

## Prohibido

Métricas inventadas, rayas largas, la palabra TODO visible en pantalla, emojis como viñetas, secciones de relleno.
