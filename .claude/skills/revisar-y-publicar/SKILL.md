---
name: revisar-y-publicar
description: Revisión previa a publicar el portafolio de Marcelo y publicación en Vercel. Solo se ejecuta cuando Marcelo la invoca explícitamente (/revisar-y-publicar).
disable-model-invocation: true
---

# Revisar y publicar

Solo se ejecuta cuando Marcelo lo pide de forma explícita. **Nunca hagas push a `main` ni despliegues sin su aprobación.**

## Pasos

1. Confirma la rama y que el árbol está limpio (`git status`).
2. Corre los comandos de la sección Código de `checklist.md` y muestra el resultado real, incluidos los fallos.
3. Revisa los apartados de contenido, diseño y SEO del checklist. Para lo que no puedas verificar sin navegador (visual, Lighthouse), dilo y pídele a Marcelo que lo haga: `npm run build && npm run preview`, y Lighthouse en Chrome en modo móvil.
4. Lista los `TODO(marcelo)` que quedan (`grep -rn "TODO(marcelo)" src`) y pregunta cuáles bloquean la publicación.
5. Resume qué pasó, qué falló y qué falta. Pide el "OK" explícito.
6. Con el OK: abre el Pull Request con la plantilla de `.github/pull_request_template.md`. Marcelo hace el merge a `main`; Vercel despliega desde `main`.

## Reporte

Si algo falla o se omitió, dilo con la salida. Si todo pasó, dilo sin rodeos.
