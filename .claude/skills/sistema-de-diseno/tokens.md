# Tokens

Definidos en `src/styles/global.css` como variables CSS (`:root`) y expuestos a Tailwind con `@theme inline`. El tema se fija con `data-theme` en `<html>` antes del primer pintado.

| Variable    | Utilidad Tailwind          | Claro     | Oscuro    | Uso                                          |
| ----------- | -------------------------- | --------- | --------- | -------------------------------------------- |
| `--bg`      | `bg-bg`                    | `#F7F2F5` | `#1F1024` | Fondo de página                              |
| `--surface` | `bg-surface`               | `#FFFFFF` | `#2A1731` | Superficies elevadas                         |
| `--ink`     | `text-ink`, `bg-ink`       | `#3A1D42` | `#F4E9F5` | Títulos, texto principal, botón primario     |
| `--text`    | `text-body`                | `#3D2A41` | `#E4D5E6` | Párrafos                                     |
| `--soft`    | `text-soft`, `border-soft` | `#75627A` | `#B49DB8` | Texto secundario, bordes de botón secundario |
| `--line`    | `border-line`              | `#E6DAE3` | `#3D2645` | Divisores decorativos                        |
| `--clean`   | `text-clean`, `bg-clean`   | `#1F8A63` | `#8FE0BC` | Estado "dato limpio"                         |
| `--decide`  | `text-decide`, `bg-decide` | `#C65A12` | `#FFB27A` | Estado "decisión", foco, marcas de recorte   |
| `--raw1`    | `bg-raw-1`                 | `#B79BC0` | `#6E5576` | Estado "dato crudo"                          |
| `--raw2`    | `bg-raw-2`                 | `#8E7A93` | `#9C83A3` | Estado "dato crudo"                          |
| `--raw3`    | `bg-raw-3`                 | `#D8C3DD` | `#4E3656` | Estado "dato crudo", selección de texto      |

Otros: `--header-h: 4rem`, `--radius: 0.625rem` (`rounded-ui`), clase `wrap` (contenedor de 75 rem con márgenes seguros).

## Contrastes medidos (WCAG)

| Par                       | Claro | Oscuro |
| ------------------------- | ----- | ------ |
| `text` sobre `bg`         | 11.82 | 12.92  |
| `ink` sobre `bg`          | 13.23 | 15.39  |
| `soft` sobre `bg`         | 5.01  | 7.30   |
| `soft` sobre `surface`    | 5.55  | 6.68   |
| `bg` sobre `ink` (botón)  | 13.23 | 15.39  |
| `bg` sobre `soft` (hover) | 5.01  | 7.30   |
| `clean` sobre `bg`        | 3.89  | 11.71  |
| `decide` sobre `bg`       | 3.89  | 10.28  |
| `decide` sobre `surface`  | 4.31  | 9.41   |
| `raw2` sobre `bg`         | 3.54  | 5.35   |
| `line` sobre `bg`         | 1.22  | 1.35   |

## Reglas de uso

- `clean` y `decide` en modo claro no llegan a 4.5:1. Solo para gráficos, foco, marcas y texto grande (24 px, o 18.66 px en negrita). Para texto pequeño usa `ink` o `body`.
- `line` es decorativo: no sirve como único borde de un control interactivo (usa `soft`).
- El color nunca es el único portador de significado: etiqueta siempre los estados crudo, limpio y decisión.
