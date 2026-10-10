# Portafolio de Marcelo Morales Rimac

Sitio estático con Astro 7, TypeScript estricto y Tailwind CSS v4. Reglas, estructura y flujo de trabajo en [CLAUDE.md](CLAUDE.md).

## Empezar

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # compila a dist/
npm run check    # astro check
npm run lint     # ESLint
npm run format   # Prettier
```

Requiere Node 22.12 o superior.

## Publicar en Vercel

El sitio se publica como un proyecto nuevo. Los portafolios antiguos de GitHub Pages se mantienen como están.

### 1. Subir el código a GitHub

1. En GitHub, crea un repositorio nuevo **vacío** (sin README ni .gitignore).
2. Desde la carpeta del proyecto:

   ```sh
   git remote add origin https://github.com/MarceRyan/<nombre-del-repositorio>.git
   git push -u origin main
   ```

### 2. Crear el proyecto en Vercel

1. Entra a [vercel.com](https://vercel.com) con tu cuenta de GitHub.
2. **Add New → Project** y elige el repositorio.
3. Vercel detecta Astro solo. Deja los valores por defecto:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Antes de **Deploy**, abre **Environment Variables** y agrega las que correspondan (ver abajo).
5. Pulsa **Deploy**. En uno o dos minutos tendrás un enlace como `https://<proyecto>.vercel.app`.

Desde ahí, cada `git push` a `main` publica una versión nueva. Cada Pull Request genera una vista previa con su propio enlace.

### 3. Variables de entorno

| Variable                    | Para qué                                                                                                        | Obligatoria |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| `PUBLIC_FORMSPREE_ENDPOINT` | Activa el formulario de contacto. Crea un formulario en [formspree.io](https://formspree.io) y copia su enlace. | No          |
| `SITE_URL`                  | Solo si usas un dominio propio (por ejemplo `https://marcelomorales.dev`).                                      | No          |

Sin `SITE_URL`, el sitio usa el dominio que asigna Vercel para el sitemap, la URL canónica y la imagen al compartir.
Después de agregar o cambiar una variable, vuelve a publicar desde **Deployments → Redeploy**.

### 4. Analítica

En el proyecto de Vercel, activa **Analytics** y **Speed Insights**. El código ya está integrado; solo hay que encenderlos.

### 5. Dominio propio (opcional)

En **Settings → Domains** agrega tu dominio y sigue las instrucciones de DNS. Luego define `SITE_URL` con ese dominio y vuelve a publicar.

### Antes de cada publicación

- `npm run check && npm run lint && npm run format:check && npm run build` sin errores (lo mismo corre en GitHub Actions en cada Pull Request).
- El PDF de `public/cv/` no debe incluir documentos personales (DNI, direcciones).
- Lista de comprobación completa: `.claude/skills/revisar-y-publicar/checklist.md`.

## Pendientes

Los datos que faltan están marcados en el código como `TODO(marcelo): ...`. Para listarlos:

```sh
grep -rn "TODO(marcelo)" src public astro.config.mjs
```
