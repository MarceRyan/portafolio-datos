---
name: sistema-de-diseno
description: Sistema de diseño del portafolio de Marcelo Morales (tokens, tipografía, componentes base y prohibiciones). Úsala siempre que vayas a crear o modificar UI, estilos, colores, tipografía o animaciones de este proyecto.
---

# Sistema de diseño

Concepto: "De los datos a la decisión". Crudo (ciruela apagado) → limpio (verde) → decisión (naranja).

## Qué skill instalada usar

- Crear o modificar UI, layout o dirección visual: `design-taste-frontend`.
- Componentes, microinteracciones y animación: `emil-design-eng`.
- Cualquier cosa que represente datos (colores de estado, diagramas, métricas): `dataviz`.
- Revisar el resultado: `impeccable`.
- `redesign-existing-projects` queda reservada para después del lanzamiento.

Si una skill contradice la identidad de este proyecto (paleta, fuentes, concepto, textos), no lo apliques: propónselo a Marcelo con tu justificación.

## Pasos

1. Lee `tokens.md` (valores, contrastes y reglas de uso) antes de tocar estilos.
2. Usa solo los tokens de `src/styles/global.css` mediante utilidades (`bg-bg`, `text-ink`, `border-line`, etc.). No escribas hex en componentes.
3. Reutiliza los componentes base: `Button` (`primary`, `secondary`; `md`, `sm`), `ThemeToggle`, `Header`, `Footer`.
4. Aplica un solo radio: `rounded-ui`. Interactivos: mínimo 40 px de alto (44 px en iconos), `active:translate-y-px`, transición solo de color y transform en 150 ms.
5. Agrega movimiento únicamente si comunica algo (jerarquía, historia, retroalimentación, cambio de estado) y respeta `prefers-reduced-motion`.
6. Prueba en claro y oscuro, desde 360 px, con teclado (foco visible).
7. Al terminar, pasa `impeccable` y corrige lo importante.

## Prohibiciones (reglas anti-IA)

- Degradados morados decorativos, efecto vidrio en tarjetas, emojis como viñetas.
- Etiquetas en MAYÚSCULAS sobre cada título, numeración de secciones, puntos de estado decorativos.
- Flechas "→" en botones.
- Tarjetas idénticas en cuadrícula; el caso principal siempre es más grande.
- Barras de porcentaje de habilidades.
- Animaciones de aparición en cada sección.
- Frases genéricas ("apasionado por la tecnología", "transformo datos en insights").
- Rayas largas (em dash) en textos visibles.
- Inventar métricas: usa `TODO(marcelo): ...`.

## Tipografía

- Títulos: Schibsted Grotesk (500, 700, 800, 900), clase `font-display`.
- Texto: Instrument Sans (400, 500, 600), por defecto en `body`.
- Firma: Caveat (`font-script`), solo hasta tener la firma en SVG.
- Números: `tabular-nums`.
