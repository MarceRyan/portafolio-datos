/**
 * Motor de decisiones: partículas de datos que viajan de izquierda a derecha.
 * - Antes de la Transformación son dato crudo: colores crudos y trayectoria dispersa.
 * - En la Transformación se ordenan en carriles y pasan a dato limpio.
 * - Tras el Modelado convergen en el nodo de Decisión, que late como máximo cada 700 ms.
 * Cada partícula avanza por un recorrido normalizado `u` (0 a 1), así el dibujo estático
 * y el animado comparten la misma geometría. Siempre se anima; con movimiento reducido va calmado.
 */
type RGB = readonly [number, number, number];

interface Palette {
  raw: readonly RGB[];
  clean: RGB;
  decide: RGB;
  line: RGB;
}

interface Particle {
  u: number;
  speed: number;
  seedY: number;
  amp: number;
  phase: number;
  freq: number;
  lane: number;
  rawIndex: number;
  radius: number;
}

const STAGES = 5;
const LANES = 5;
const TRAVEL_SECONDS = 11;
// Con movimiento reducido el flujo sigue, pero 2,5 veces más lento y sin el latido del nodo.
const CALM_FACTOR = 2.5;
const PULSE_MIN_GAP_MS = 700;
const PULSE_DURATION_MS = 600;
const GRID_STEP = 24;
const TAU = Math.PI * 2;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));
const mix = (a: number, b: number, t: number): number => a + (b - a) * t;
const smooth = (edge0: number, edge1: number, value: number): number => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

function parseColor(value: string): RGB {
  const hex = value.trim().replace('#', '');
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex;
  const n = Number.parseInt(full, 16);
  if (full.length !== 6 || Number.isNaN(n)) return [128, 128, 128];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string): RGB => parseColor(styles.getPropertyValue(name));
  return {
    raw: [read('--raw1'), read('--raw2'), read('--raw3')],
    clean: read('--clean'),
    decide: read('--decide'),
    line: read('--line'),
  };
}

const rgba = (c: RGB, alpha: number): string => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
const mixColor = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(mix(a[0], b[0], t)),
  Math.round(mix(a[1], b[1], t)),
  Math.round(mix(a[2], b[2], t)),
];

function createParticle(u: number): Particle {
  return {
    u,
    speed: 0.8 + Math.random() * 0.4,
    seedY: 0.1 + Math.random() * 0.8,
    amp: 0.06 + Math.random() * 0.12,
    phase: Math.random() * TAU,
    freq: 1.5 + Math.random() * 2.5,
    lane: Math.floor(Math.random() * LANES),
    // raw1 y raw2 pesan más: raw3 es muy tenue sobre la superficie.
    rawIndex: [0, 0, 1, 1, 2][Math.floor(Math.random() * 5)] ?? 0,
    radius: 1.6 + Math.random() * 1.4,
  };
}

function init(canvas: HTMLCanvasElement): (() => void) | null {
  const ctx = canvas.getContext('2d');
  const host = canvas.parentElement;
  if (!ctx || !host) return null;

  const desktop = matchMedia('(min-width: 768px)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  let palette = readPalette();
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  let visible = false;
  let frame = 0;
  let last = 0;
  let lastPulse = Number.NEGATIVE_INFINITY;

  // Las líneas de etapa quedan en el borde izquierdo de cada columna, junto a su título.
  const gate = (i: number): number => (i / STAGES) * width;
  // El nodo de Decisión se centra en la última columna.
  const nodeX = (): number => ((STAGES - 0.5) / STAGES) * width;

  function resize(): void {
    const rect = host!.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = clamp(Math.round(width / 11), 40, 110);
    particles = Array.from({ length: count }, (_, i) => createParticle(i / count));
    draw(performance.now());
  }

  function drawGrid(): void {
    ctx!.fillStyle = rgba(palette.line, 0.7);
    for (let x = GRID_STEP / 2; x < width; x += GRID_STEP) {
      for (let y = GRID_STEP / 2; y < height; y += GRID_STEP) {
        ctx!.fillRect(x, y, 1, 1);
      }
    }
  }

  function drawGates(): void {
    for (let i = 1; i < STAGES; i += 1) {
      const x = Math.round(gate(i)) + 0.5;
      const isTransform = i === 2;
      ctx!.strokeStyle = isTransform ? rgba(palette.clean, 0.55) : rgba(palette.line, 0.9);
      ctx!.lineWidth = isTransform ? 1.5 : 1;
      ctx!.beginPath();
      ctx!.moveTo(x, 0);
      ctx!.lineTo(x, height);
      ctx!.stroke();
    }
  }

  function drawParticle(p: Particle): void {
    const xn = nodeX();
    const uT = gate(2) / xn;
    const uM = gate(3) / xn;
    const x = p.u * xn;

    const scatter = (p.seedY + p.amp * Math.sin(p.phase + p.u * p.freq * TAU)) * height;
    const lane = height * (0.15 + ((p.lane + 0.5) / LANES) * 0.7);
    const ordered = smooth(uT - 0.06, uT + 0.06, p.u);
    const converge = smooth(uM, 1, p.u);
    const y = mix(mix(scatter, lane, ordered), height / 2, converge);

    const raw = palette.raw[p.rawIndex] ?? palette.raw[0]!;
    const cleaned = mixColor(raw, palette.clean, ordered);
    const color = mixColor(cleaned, palette.decide, smooth(0.86, 1, p.u));
    const fadeIn = smooth(0, 0.05, p.u);

    ctx!.fillStyle = rgba(color, 0.95 * fadeIn);
    ctx!.beginPath();
    ctx!.arc(x, y, p.radius, 0, TAU);
    ctx!.fill();
  }

  function drawNode(now: number, animated: boolean): void {
    const r = clamp(width / 70, 8, 12);
    const x = nodeX();
    const y = height / 2;

    ctx!.strokeStyle = rgba(palette.decide, 0.3);
    ctx!.lineWidth = 1;
    ctx!.beginPath();
    ctx!.arc(x, y, r + 7, 0, TAU);
    ctx!.stroke();

    if (animated) {
      const p = (now - lastPulse) / PULSE_DURATION_MS;
      if (p >= 0 && p < 1) {
        const eased = 1 - (1 - p) ** 3;
        ctx!.strokeStyle = rgba(palette.decide, 0.6 * (1 - p));
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.arc(x, y, r + 7 + 16 * eased, 0, TAU);
        ctx!.stroke();
      }
    }

    ctx!.fillStyle = rgba(palette.decide, 1);
    ctx!.beginPath();
    ctx!.arc(x, y, r, 0, TAU);
    ctx!.fill();
  }

  function draw(now: number): void {
    if (width === 0) return;
    ctx!.clearRect(0, 0, width, height);
    drawGrid();
    drawGates();
    particles.forEach(drawParticle);
    drawNode(now, !reduceMotion.matches);
  }

  function step(now: number): void {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    for (const p of particles) {
      p.u += (dt / (TRAVEL_SECONDS * (reduceMotion.matches ? CALM_FACTOR : 1))) * p.speed;
      if (p.u >= 1) {
        Object.assign(p, createParticle(0));
        // El nodo late como máximo una vez cada 700 ms, sin importar cuántas lleguen.
        if (now - lastPulse >= PULSE_MIN_GAP_MS) lastPulse = now;
      }
    }
    draw(now);
    frame = requestAnimationFrame(step);
  }

  function shouldRun(): boolean {
    return visible && desktop.matches && !document.hidden;
  }

  function sync(): void {
    cancelAnimationFrame(frame);
    if (shouldRun()) {
      last = performance.now();
      frame = requestAnimationFrame(step);
    } else {
      draw(performance.now());
    }
  }

  const resizeObserver = new ResizeObserver(() => {
    resize();
    sync();
  });
  resizeObserver.observe(host);

  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    sync();
  });
  intersectionObserver.observe(host);

  // El tema cambia `data-theme`: se vuelven a leer los colores de los tokens.
  const themeObserver = new MutationObserver(() => {
    palette = readPalette();
    if (!shouldRun()) draw(performance.now());
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  desktop.addEventListener('change', sync);
  reduceMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);

  // Al salir de la página se libera todo, para no acumular observadores entre navegaciones.
  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    themeObserver.disconnect();
    desktop.removeEventListener('change', sync);
    reduceMotion.removeEventListener('change', sync);
    document.removeEventListener('visibilitychange', sync);
  };
}

let dispose: (() => void) | null = null;

function teardown(): void {
  dispose?.();
  dispose = null;
}

const start = (): void => {
  teardown();
  const canvas = document.querySelector<HTMLCanvasElement>('[data-engine-canvas]');
  if (canvas) dispose = init(canvas);
};
document.addEventListener('astro:page-load', start);
// Si el script llega después del aviso de carga (pasa en desarrollo), arranca igual.
if (document.readyState !== 'loading') start();
document.addEventListener('astro:before-swap', teardown);

export {};
