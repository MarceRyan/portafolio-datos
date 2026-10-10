---
name: actualizar-experiencia
description: Actualiza la experiencia laboral, la formación, las certificaciones o el voluntariado del portafolio de Marcelo. Úsala cuando cambie su cargo o entre un curso o certificado nuevo.
---

# Actualizar experiencia

Los datos viven en `src/data/` y alimentan la portada. No toques los componentes para cambiar contenido.

| Qué cambia                         | Archivo                                      |
| ---------------------------------- | -------------------------------------------- |
| Cargos, periodos, métricas, logros | `src/data/experience.ts`                     |
| Certificaciones y formación        | `src/data/certifications.ts`                 |
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

`npm run check && npm run lint && npm run build`, y revisa la sección "Sobre mí" de la portada. Si cambió el cargo actual, revisa también la presentación en `src/components/home/About.astro` y el hero.
