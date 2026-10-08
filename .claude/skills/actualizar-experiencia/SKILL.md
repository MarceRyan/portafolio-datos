---
name: actualizar-experiencia
description: Actualiza la experiencia laboral, la formación, las certificaciones, el voluntariado o la sección "Ahora mismo" del portafolio de Marcelo. Úsala cuando cambie su cargo, entre un curso nuevo o haya que refrescar lo que hace hoy.
---

# Actualizar experiencia

Los datos viven en `src/data/` y alimentan la portada y `/sobre-mi`. No toques los componentes para cambiar contenido.

| Qué cambia                         | Archivo                                      |
| ---------------------------------- | -------------------------------------------- |
| Cargos, periodos, métricas, logros | `src/data/experience.ts`                     |
| Certificaciones y formación        | `src/data/certifications.ts`                 |
| "Ahora mismo" y su fecha           | `src/data/now.ts` (actualiza `nowUpdated`)   |
| Voluntariado y talleres            | `src/data/community.ts`                      |
| Herramientas e iconos              | `src/data/tool-refs.ts`, `src/data/tools.ts` |

## Reglas

1. **No inventes** fechas, cargos, métricas ni logros. Si falta algo, pregunta o deja `TODO(marcelo): ...` en un comentario.
2. Periodos en formato `AAAA-MM`; `end: null` si sigue vigente. Un cargo con varios tramos usa varios periodos.
3. Cada cargo tiene `era` (`raw`, `clean` o `decide`) que colorea su hito en la línea de tiempo.
4. Los logros se agrupan en `groups`; `metrics` lleva solo cifras reales.
5. Herramientas por nombre de `tool-refs.ts`; si es nueva, agrégala ahí primero.
6. Sin rayas largas ni frases genéricas.

## Verificación

`npm run check && npm run lint && npm run build`, y revisa la portada (Trayectoria) y `/sobre-mi`. Si cambió el cargo actual, revisa también el texto de presentación de `src/pages/sobre-mi.astro` y el hero.
