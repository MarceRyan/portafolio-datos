# Tokens

Paleta "azul noche, cian y ámbar". Definidos en `src/styles/global.css` como variables CSS (`:root`) y expuestos a Tailwind con `@theme inline`. El tema se fija con `data-theme` en `<html>` antes del primer pintado.

| Variable    | Utilidad Tailwind          | Claro     | Oscuro    | Uso                                                 |
| ----------- | -------------------------- | --------- | --------- | --------------------------------------------------- |
| `--bg`      | `bg-bg`                    | `#F3F6FB` | `#0A1222` | Fondo de página                                     |
| `--surface` | `bg-surface`               | `#FFFFFF` | `#111C33` | Superficies elevadas                                |
| `--ink`     | `text-ink`, `bg-ink`       | `#0B1B3A` | `#E8F0FF` | Títulos, texto principal, botón primario            |
| `--text`    | `text-body`                | `#1B2A48` | `#CFDAF0` | Párrafos                                            |
| `--soft`    | `text-soft`, `border-soft` | `#4F607F` | `#8FA2C4` | Texto secundario, bordes de botón secundario        |
| `--line`    | `border-line`              | `#D6DEEC` | `#22324F` | Divisores decorativos                               |
| `--clean`   | `text-clean`, `bg-clean`   | `#0B7A75` | `#2DD4BF` | Estado "dato limpio" (cian)                         |
| `--decide`  | `text-decide`, `bg-decide` | `#B45309` | `#FFB224` | Estado "decisión" (ámbar), foco, marcas             |
| `--raw1`    | `bg-raw-1`                 | `#9AA9C4` | `#4D5D80` | Estado "dato crudo" (gris azulado)                  |
| `--raw2`    | `bg-raw-2`                 | `#6D7E9F` | `#7587AA` | Estado "dato crudo"                                 |
| `--raw`     | `bg-raw`                   | `#9AA9C4` | `#7587AA` | Tono representativo del crudo (leyenda, marcadores) |
| `--raw3`    | `bg-raw-3`                 | `#CCD6E8` | `#2A3957` | Estado "dato crudo", selección de texto             |

Otros: `--header-h: 4rem`, `--radius: 0.625rem` (`rounded-ui`), clase `wrap` (contenedor de 75 rem con márgenes seguros).

## Contrastes medidos (WCAG)

| Par                       | Claro | Oscuro |
| ------------------------- | ----- | ------ |
| `text` sobre `bg`         | 13.18 | 13.31  |
| `ink` sobre `bg`          | 15.73 | 16.34  |
| `soft` sobre `bg`         | 5.85  | 7.25   |
| `soft` sobre `surface`    | 6.34  | 6.57   |
| `bg` sobre `ink` (botón)  | 15.73 | 16.34  |
| `bg` sobre `soft` (hover) | 5.85  | 7.25   |
| `clean` sobre `bg`        | 4.78  | 10.05  |
| `decide` sobre `bg`       | 4.64  | 10.37  |
| `decide` sobre `surface`  | 5.02  | 9.41   |
| `raw2` sobre `bg`         | 3.78  | 5.17   |
| `raw1` sobre `bg`         | 2.19  | 2.84   |

## Reglas de uso

- `clean` y `decide` pasan 4.5:1 en ambos temas: valen para texto pequeño.
- `raw1` y `raw3` son solo para partículas, fondos y gráficos, nunca para texto. `raw2` solo para texto grande o gráficos.
- `line` es decorativo: no sirve como único borde de un control interactivo (usa `soft`).
- El color nunca es el único portador de significado: etiqueta siempre los estados crudo, limpio y decisión.

## Codificación de estados (validada con dataviz)

- Leyenda y marcadores usan `--raw` (claro: raw1, oscuro: raw2), `--clean` y `--decide`. Con ellos la distinción en visión normal es ΔE 22.3 (claro) y 21.2 (oscuro), y con daltonismo ΔE 12.3 o más.
- El validador marca croma bajo en el crudo (gris azulado por diseño) y contraste 2.31:1 de `raw1` en claro: se compensa con etiquetas visibles, nunca solo color.

## Textura de fondo

- `--grid-dot`: cuadrícula de puntos de 24 px en `body` (papel de datos). Las franjas `bg-surface` la tapan, así alternan textura y superficie lisa.
- `--grid-line`: cuadrícula de 48 px del inicio (`.hero-backdrop`), desvanecida con máscara radial y con un brillo cian suave detrás de la foto.
- Ambas son muy tenues (6 a 13 %): no compiten con el texto ni cambian el contraste.

## Logos de herramientas

Las herramientas usan su color oficial. Preferir `logos:*` o `devicon:*` (ya vienen a color). Si solo existe en `simple-icons` (monocromo), agregar `color` con el tono de marca en `tool-refs.ts`, `tools.ts` o `certifications.ts`; `ToolIcon` lo aplica. Verificar que se lea en ambos temas.
