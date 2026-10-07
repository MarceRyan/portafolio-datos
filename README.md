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

## Pendientes

Los datos que faltan están marcados en el código como `TODO(marcelo): ...`. Para listarlos:

```sh
grep -rn "TODO(marcelo)" src public astro.config.mjs
```
