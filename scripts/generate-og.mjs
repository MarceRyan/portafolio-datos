// Genera public/og/default.png (1200x630). Uso: node scripts/generate-og.mjs
// Se vuelve a correr solo si cambian el nombre, el rol o la paleta.
import { Buffer } from 'node:buffer';
import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0A1222"/>
  <g font-family="Segoe UI, Helvetica, Arial, sans-serif">
    <text x="80" y="300" font-size="92" font-weight="800" fill="#E8F0FF">Marcelo Morales</text>
    <text x="80" y="372" font-size="44" font-weight="500" fill="#CFDAF0">Analista de Datos</text>
    <text x="80" y="440" font-size="30" fill="#8FA2C4">De los datos a la decisión</text>
  </g>
  <circle cx="860" cy="470" r="22" fill="#7587AA"/>
  <circle cx="960" cy="470" r="30" fill="#2DD4BF"/>
  <circle cx="1080" cy="470" r="42" fill="#FFB224"/>
  <path d="M884 470 H928 M994 470 H1034" stroke="#22324F" stroke-width="4"/>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og/default.png');
console.log('public/og/default.png listo');
