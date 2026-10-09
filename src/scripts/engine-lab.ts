/**
 * Laboratorio temporal: tres alternativas al motor de decisiones para comparar.
 * Comparten geometría con el motor actual (5 etapas, nodo de Decisión en la última).
 * TODO(marcelo): elegir una variante; después se integra y se borra este archivo.
 */
type RGB = readonly [number, number, number];
type Draw = (t: number, dt: number) => void;

interface Scene {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  raw: readonly RGB[];
  clean: RGB;
  decide: RGB;
  line: RGB;
}

const STAGES = 5;
const TAU = Math.PI * 2;

const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
const mix = (a: number, b: number, t: number): number => a + (b - a) * t;
const smooth = (e0: number, e1: number, v: number): number => {
  const t = clamp((v - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
const rgba = (c: RGB, a: number): string => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
const mixColor = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(mix(a[0], b[0], t)),
  Math.round(mix(a[1], b[1], t)),
  Math.round(mix(a[2], b[2], t)),
];

function parseColor(value: string): RGB {
  const n = Number.parseInt(value.trim().replace('#', ''), 16);
  return Number.isNaN(n) ? [128, 128, 128] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function readColors(): Pick<Scene, 'raw' | 'clean' | 'decide' | 'line'> {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string): RGB => parseColor(styles.getPropertyValue(name));
  return {
    raw: [read('--raw1'), read('--raw2'), read('--raw3')],
    clean: read('--clean'),
    decide: read('--decide'),
    line: read('--line'),
  };
}

const gate = (s: Scene, i: number): number => (i / STAGES) * s.w;
const nodeX = (s: Scene): number => ((STAGES - 0.5) / STAGES) * s.w;

/** Color según la posición horizontal: crudo, limpio tras Transformación, decisión al final. */
function stateColor(s: Scene, x: number, rawIndex = 1): RGB {
  const raw = s.raw[rawIndex] ?? s.raw[1]!;
  const cleaned = mixColor(raw, s.clean, smooth(gate(s, 2) - 20, gate(s, 2) + 20, x));
  return mixColor(cleaned, s.decide, smooth(gate(s, 4), nodeX(s), x));
}

function drawFrame(s: Scene): void {
  s.ctx.clearRect(0, 0, s.w, s.h);
  for (let i = 1; i < STAGES; i += 1) {
    const x = Math.round(gate(s, i)) + 0.5;
    s.ctx.strokeStyle = i === 2 ? rgba(s.clean, 0.55) : rgba(s.line, 0.9);
    s.ctx.lineWidth = i === 2 ? 1.5 : 1;
    s.ctx.beginPath();
    s.ctx.moveTo(x, 0);
    s.ctx.lineTo(x, s.h);
    s.ctx.stroke();
  }
}

function drawNode(s: Scene, pulse: number): void {
  const r = clamp(s.w / 70, 8, 12);
  const x = nodeX(s);
  const y = s.h / 2;
  if (pulse > 0 && pulse < 1) {
    s.ctx.strokeStyle = rgba(s.decide, 0.6 * (1 - pulse));
    s.ctx.lineWidth = 2;
    s.ctx.beginPath();
    s.ctx.arc(x, y, r + 7 + 16 * (1 - (1 - pulse) ** 3), 0, TAU);
    s.ctx.stroke();
  }
  s.ctx.strokeStyle = rgba(s.decide, 0.3);
  s.ctx.lineWidth = 1;
  s.ctx.beginPath();
  s.ctx.arc(x, y, r + 7, 0, TAU);
  s.ctx.stroke();
  s.ctx.fillStyle = rgba(s.decide, 1);
  s.ctx.beginPath();
  s.ctx.arc(x, y, r, 0, TAU);
  s.ctx.fill();
}

/** A. Corrientes: hilos dispersos que se ordenan en carriles y se unen; por cada hilo viaja un destello. */
function streams(s: Scene): Draw {
  const LANES = 5;
  const paths = Array.from({ length: 16 }, (_, i) => ({
    seed: 0.08 + Math.random() * 0.84,
    amp: 0.05 + Math.random() * 0.1,
    phase: Math.random() * TAU,
    freq: 1 + Math.random() * 2,
    lane: i % LANES,
    rawIndex: i % 3,
    u: Math.random(),
    speed: 0.07 + Math.random() * 0.05,
  }));
  let pulseAt = -10;

  const yAt = (p: (typeof paths)[number], x: number, t: number): number => {
    const xn = nodeX(s);
    const scatter = (p.seed + p.amp * Math.sin(p.phase + (x / s.w) * p.freq * TAU + t * 0.6)) * s.h;
    const lane = s.h * (0.15 + ((p.lane + 0.5) / LANES) * 0.7);
    const ordered = smooth(gate(s, 2) - 30, gate(s, 2) + 30, x);
    return mix(mix(scatter, lane, ordered), s.h / 2, smooth(gate(s, 3), xn, x));
  };

  return (t, dt) => {
    drawFrame(s);
    const xn = nodeX(s);
    const STEP = 8;
    for (const p of paths) {
      // El hilo completo, tenue.
      for (let x = 0; x < xn; x += STEP) {
        s.ctx.strokeStyle = rgba(stateColor(s, x, p.rawIndex), 0.28);
        s.ctx.lineWidth = 1.2;
        s.ctx.beginPath();
        s.ctx.moveTo(x, yAt(p, x, t));
        s.ctx.lineTo(Math.min(x + STEP, xn), yAt(p, Math.min(x + STEP, xn), t));
        s.ctx.stroke();
      }
      // El destello: un tramo corto y brillante que recorre el hilo.
      p.u += dt * p.speed;
      if (p.u >= 1) {
        p.u = 0;
        if (t - pulseAt > 0.7) pulseAt = t;
      }
      const head = p.u * xn;
      const tail = Math.max(0, head - s.w * 0.05);
      for (let x = tail; x < head; x += 4) {
        const k = (x - tail) / Math.max(head - tail, 1);
        s.ctx.strokeStyle = rgba(stateColor(s, x, p.rawIndex), 0.2 + 0.8 * k);
        s.ctx.lineWidth = 2.4;
        s.ctx.beginPath();
        s.ctx.moveTo(x, yAt(p, x, t));
        s.ctx.lineTo(Math.min(x + 4, head), yAt(p, Math.min(x + 4, head), t));
        s.ctx.stroke();
      }
    }
    drawNode(s, (t - pulseAt) / 0.6);
  };
}

/** B. Bloques: registros sueltos que giran, se alinean en filas de tabla y terminan apilados en un gráfico de barras. */
function blocks(s: Scene): Draw {
  const ROWS = 7;
  const BARS = 5;
  const MAX_STACK = 9;
  const SIZE = 6;
  const items = Array.from({ length: 64 }, (_, i) => ({
    u: i / 64,
    speed: 0.075 + Math.random() * 0.03,
    seed: 0.08 + Math.random() * 0.84,
    spin: Math.random() * TAU,
    spinSpeed: (Math.random() - 0.5) * 3,
    row: i % ROWS,
    bar: i % BARS,
    rawIndex: i % 3,
  }));
  const stacks = new Array<number>(BARS).fill(0);
  let fade = 0;

  return (t, dt) => {
    drawFrame(s);
    const { ctx } = s;
    const g4 = gate(s, 4);
    const base = s.h * 0.86;
    const barW = (s.w - g4) / (BARS * 1.9);
    const barX = (i: number): number => g4 + (s.w - g4) * ((i + 0.75) / (BARS + 0.5));
    const cell = (s.h * 0.62) / MAX_STACK;

    // Barras ya apiladas. Al llenarse, se desvanecen y el gráfico vuelve a empezar.
    if (fade > 0) {
      fade -= dt;
      if (fade <= 0) stacks.fill(0);
    }
    const alpha = fade > 0 ? clamp(fade / 0.8, 0, 1) : 1;
    ctx.fillStyle = rgba(s.decide, 0.9 * alpha);
    stacks.forEach((count, i) => {
      if (count > 0) ctx.fillRect(barX(i) - barW / 2, base - count * cell, barW, count * cell);
    });
    ctx.strokeStyle = rgba(s.line, 1);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(g4 + 12, base + 0.5);
    ctx.lineTo(s.w - 8, base + 0.5);
    ctx.stroke();

    for (const item of items) {
      item.u += dt * item.speed;
      if (item.u >= 1) {
        item.u = 0;
        if (fade <= 0) {
          stacks[item.bar] = (stacks[item.bar] ?? 0) + 1;
          if ((stacks[item.bar] ?? 0) >= MAX_STACK) fade = 0.8;
        }
      }
      const travelX = item.u * 1.25 * g4;
      const ordered = smooth(gate(s, 2) - 24, gate(s, 2) + 24, travelX);
      const grouped = smooth(gate(s, 3) - 20, gate(s, 3) + 40, travelX);
      const landing = smooth(g4, g4 * 1.25, travelX);

      const scatterY = (item.seed + 0.05 * Math.sin(item.spin + t * 1.5)) * s.h;
      const rowY = s.h * (0.14 + (item.row / (ROWS - 1)) * 0.72);
      const groupY = s.h * (0.3 + (item.row % 3) * 0.2);
      // En Transformación avanzan a saltos de celda, como filas de una tabla.
      const snappedX = Math.round(travelX / 14) * 14;
      const flowX = mix(travelX, snappedX, ordered * (1 - landing));
      const flowY = mix(mix(scatterY, rowY, ordered), groupY, grouped);

      const top = base - ((stacks[item.bar] ?? 0) + 0.5) * cell;
      const x = mix(Math.min(flowX, g4), barX(item.bar), landing);
      const y = mix(flowY, top, landing);
      const size = mix(SIZE, Math.min(barW * 0.7, SIZE * 1.6), landing);
      const angle = (item.spin + t * item.spinSpeed) * (1 - ordered);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = rgba(stateColor(s, mix(travelX, nodeX(s), landing), item.rawIndex), 0.95);
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    }
  };
}

/** C. Señal: una línea ruidosa que se limpia hasta volverse una onda clara y llega como una sola lectura. */
function signal(s: Scene): Draw {
  const ghosts = [0.9, 2.3, 4.1];
  let pulseAt = -10;
  let lastCrest = 0;

  const noise = (x: number, t: number, k: number): number =>
    Math.sin(x * 0.11 * k + t * 5.1) * 0.5 +
    Math.sin(x * 0.047 * k - t * 3.3 + k) * 0.3 +
    Math.sin(x * 0.23 + t * 8.7 * k) * 0.2;

  return (t) => {
    drawFrame(s);
    const xn = nodeX(s);
    const mid = s.h / 2;
    const cleanAt = (x: number): number => smooth(gate(s, 1), gate(s, 3), x);
    const flatAt = (x: number): number => smooth(gate(s, 3), xn, x);
    const wave = (x: number): number => Math.sin(x * 0.035 - t * 2.4);
    const yAt = (x: number, k: number): number => {
      const c = cleanAt(x);
      const amp = s.h * mix(0.36, 0.2, c) * (1 - flatAt(x));
      return mid + amp * mix(noise(x, t, k), wave(x), c);
    };

    // Lecturas crudas superpuestas: solo existen antes de la limpieza.
    for (const k of ghosts) {
      s.ctx.strokeStyle = rgba(s.raw[2]!, 0.6);
      s.ctx.lineWidth = 1;
      s.ctx.beginPath();
      for (let x = 0; x <= gate(s, 3); x += 3) {
        const fadeOut = 1 - cleanAt(x);
        const y = mid + s.h * 0.4 * noise(x, t * 0.8, k + 1.7) * fadeOut;
        if (x === 0) s.ctx.moveTo(x, y);
        else s.ctx.lineTo(x, y);
      }
      s.ctx.stroke();
    }

    const STEP = 3;
    for (let x = 0; x < xn; x += STEP) {
      s.ctx.strokeStyle = rgba(stateColor(s, x), 0.95);
      s.ctx.lineWidth = mix(1.3, 2.4, cleanAt(x));
      s.ctx.beginPath();
      s.ctx.moveTo(x, yAt(x, 1));
      s.ctx.lineTo(Math.min(x + STEP, xn), yAt(Math.min(x + STEP, xn), 1));
      s.ctx.stroke();
    }

    // El nodo late cuando llega cada cresta de la onda limpia.
    const crest = Math.floor((t * 2.4) / TAU);
    if (crest !== lastCrest) {
      lastCrest = crest;
      pulseAt = t;
    }
    drawNode(s, (t - pulseAt) / 0.6);
  };
}

const variants: Record<string, (s: Scene) => Draw> = { streams, blocks, signal };

function mount(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  const host = canvas.parentElement;
  const build = variants[canvas.dataset.labVariant ?? ''];
  if (!ctx || !host || !build) return () => {};

  const calm = matchMedia('(prefers-reduced-motion: reduce)');
  const scene: Scene = { ctx, w: 0, h: 0, ...readColors() };
  let draw: Draw | null = null;
  let frame = 0;
  let last = 0;
  let time = 0;
  let visible = false;

  const step = (now: number): void => {
    const dt = Math.min((now - last) / 1000, 0.05) * (calm.matches ? 0.4 : 1);
    last = now;
    time += dt;
    draw?.(time, dt);
    frame = requestAnimationFrame(step);
  };

  const sync = (): void => {
    cancelAnimationFrame(frame);
    if (visible && !document.hidden && draw) {
      last = performance.now();
      frame = requestAnimationFrame(step);
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    const rect = host.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    scene.w = rect.width;
    scene.h = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw = build(scene);
    draw(time, 0);
    sync();
  });
  resizeObserver.observe(host);

  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    sync();
  });
  intersectionObserver.observe(host);

  const themeObserver = new MutationObserver(() => Object.assign(scene, readColors()));
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  document.addEventListener('visibilitychange', sync);

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    themeObserver.disconnect();
    document.removeEventListener('visibilitychange', sync);
  };
}

let disposers: Array<() => void> = [];
const teardown = (): void => {
  disposers.forEach((dispose) => dispose());
  disposers = [];
};

document.addEventListener('astro:page-load', () => {
  teardown();
  disposers = [...document.querySelectorAll<HTMLCanvasElement>('[data-lab-variant]')].map(mount);
});
document.addEventListener('astro:before-swap', teardown);

export {};
