/**
 * Motor de decisiones: registros que recorren las cinco etapas de izquierda a derecha.
 * - Encontrar y Recolectar: registros sueltos que giran; algunos vienen "sucios" (huecos).
 * - Limpiar: los sucios se descartan y el resto se alinea en filas de tabla.
 * - Ordenar: pasan por dos tablas de dimensiones y se unen en la tabla de hechos.
 * - Decidir: saltan a un gráfico de barras; al completarse se traza la tendencia.
 * Siempre se anima; con movimiento reducido va más lento y sin el latido final.
 */
type RGB = readonly [number, number, number];

interface Palette {
  raw: readonly RGB[];
  clean: RGB;
  decide: RGB;
  line: RGB;
  ink: RGB;
}

interface Item {
  u: number;
  speed: number;
  seed: number;
  phase: number;
  spin: number;
  spinSpeed: number;
  size: number;
  rawIndex: number;
  row: number;
  group: number;
  dirty: boolean;
  /** -2 sin asignar, -1 sin lugar en el gráfico, 0..4 barra de destino. */
  bar: number;
  slot: number;
}

const STAGES = 5;
const ROWS = 6;
const TRAVEL_SECONDS = 12;
// Con movimiento reducido el flujo sigue, pero 2,5 veces más lento y sin el latido del final.
const CALM_FACTOR = 2.5;
/** Fracción del recorrido en la que el registro llega a la puerta de Decisión. */
const FLOW_END = 0.8;
/** Celdas de cada barra: alturas distintas para que se lea como un gráfico real. */
const BAR_CELLS: readonly number[] = [3, 5, 4, 7, 6];
const BAR_TOTAL = BAR_CELLS.reduce((sum, cells) => sum + cells, 0);
const MAX_CELLS = Math.max(...BAR_CELLS);
const PEAK = BAR_CELLS.indexOf(MAX_CELLS);
const LINE_SECONDS = 0.9;
const HOLD_SECONDS = 3;
const FADE_SECONDS = 0.7;
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
    ink: read('--ink'),
  };
}

const rgba = (c: RGB, alpha: number): string => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
const mixColor = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(mix(a[0], b[0], t)),
  Math.round(mix(a[1], b[1], t)),
  Math.round(mix(a[2], b[2], t)),
];

function createItem(u: number): Item {
  return {
    u,
    speed: 0.85 + Math.random() * 0.3,
    seed: 0.1 + Math.random() * 0.8,
    phase: Math.random() * TAU,
    spin: Math.random() * TAU,
    spinSpeed: (Math.random() - 0.5) * 3.2,
    size: 4.5 + Math.random() * 3,
    // raw1 y raw2 pesan más: raw3 es muy tenue sobre la superficie.
    rawIndex: [0, 0, 1, 1, 2][Math.floor(Math.random() * 5)] ?? 0,
    row: Math.floor(Math.random() * ROWS),
    group: Math.floor(Math.random() * 3),
    dirty: Math.random() < 0.16,
    bar: -2,
    slot: 0,
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
  let items: Item[] = [];
  let visible = false;
  let frame = 0;
  let last = 0;
  let time = 0;

  // Estado del gráfico: celdas ya apiladas, celdas reservadas por registros en vuelo
  // y el tiempo desde que se completó (para trazar la tendencia, sostener y desvanecer).
  const stacks = BAR_CELLS.map(() => 0);
  const reserved = BAR_CELLS.map(() => 0);
  let doneFor = -1;

  const col = (): number => width / STAGES;
  const gate = (i: number): number => i * col();
  const base = (): number => height * 0.88;
  const cell = (): number => (height * 0.7) / MAX_CELLS;
  const chartLeft = (): number => gate(4) + col() * 0.2;
  const chartStep = (): number => (col() * 0.74) / BAR_CELLS.length;
  const barWidth = (): number => chartStep() * 0.64;
  const barX = (i: number): number => chartLeft() + chartStep() * (i + 0.5);
  const dimX = (): number => gate(3) + col() * 0.3;
  const factX = (): number => gate(3) + col() * 0.72;
  const groupY = (group: number): number => height * ([0.24, 0.76, 0.5][group] ?? 0.5);

  function resize(): void {
    const rect = host!.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = clamp(Math.round(width / 15), 36, 84);
    items = Array.from({ length: count }, (_, i) => createItem(i / count));
    draw();
  }

  function roundedRect(x: number, y: number, w: number, h: number, r: number): void {
    ctx!.beginPath();
    if (typeof ctx!.roundRect === 'function') ctx!.roundRect(x, y, w, h, r);
    else ctx!.rect(x, y, w, h);
  }

  function drawBackdrop(): void {
    ctx!.fillStyle = rgba(palette.line, 0.7);
    for (let x = GRID_STEP / 2; x < width; x += GRID_STEP) {
      for (let y = GRID_STEP / 2; y < height; y += GRID_STEP) ctx!.fillRect(x, y, 1, 1);
    }
    for (let i = 1; i < STAGES; i += 1) {
      const x = Math.round(gate(i)) + 0.5;
      ctx!.strokeStyle = i === 2 ? rgba(palette.clean, 0.55) : rgba(palette.line, 0.9);
      ctx!.lineWidth = i === 2 ? 1.5 : 1;
      ctx!.beginPath();
      ctx!.moveTo(x, 0);
      ctx!.lineTo(x, height);
      ctx!.stroke();
    }
  }

  /** Transformación: las filas de la tabla en la que se alinean los registros. */
  function drawTableRows(): void {
    const x0 = gate(2) + 14;
    const x1 = gate(3) - 10;
    ctx!.strokeStyle = rgba(palette.clean, 0.16);
    ctx!.lineWidth = 1;
    for (let row = 0; row < ROWS; row += 1) {
      const y = Math.round(height * (0.16 + (row / (ROWS - 1)) * 0.68)) + 0.5;
      ctx!.beginPath();
      ctx!.moveTo(x0, y);
      ctx!.lineTo(x1, y);
      ctx!.stroke();
    }
  }

  /** Modelado: dos tablas de dimensiones enlazadas a una tabla de hechos. */
  function drawModel(): void {
    const w = col() * 0.24;
    const dimH = height * 0.3;
    const factH = height * 0.46;
    const fx = factX();
    const dx = dimX();
    const mid = height / 2;
    const bend = mix(dx + w / 2, fx - w / 2, 0.5);

    ctx!.strokeStyle = rgba(palette.clean, 0.4);
    ctx!.lineWidth = 1;
    for (const group of [0, 1]) {
      const y = groupY(group);
      ctx!.beginPath();
      ctx!.moveTo(dx + w / 2, y);
      ctx!.bezierCurveTo(bend, y, bend, mid, fx - w / 2, mid);
      ctx!.stroke();
    }

    const table = (cx: number, cy: number, h: number): void => {
      roundedRect(cx - w / 2, cy - h / 2, w, h, 4);
      ctx!.fillStyle = rgba(palette.clean, 0.07);
      ctx!.fill();
      ctx!.strokeStyle = rgba(palette.clean, 0.6);
      ctx!.lineWidth = 1.2;
      ctx!.stroke();
      ctx!.fillStyle = rgba(palette.clean, 0.45);
      roundedRect(cx - w / 2, cy - h / 2, w, 6, 3);
      ctx!.fill();
    };
    table(dx, groupY(0), dimH);
    table(dx, groupY(1), dimH);
    table(fx, mid, factH);
  }

  function chartAlpha(): number {
    if (doneFor < HOLD_SECONDS) return 1;
    return clamp(1 - (doneFor - HOLD_SECONDS) / FADE_SECONDS, 0, 1);
  }

  /** Decisión: las celdas apiladas, el eje y, al completarse, la línea de tendencia. */
  function drawChart(animated: boolean): void {
    const alpha = chartAlpha();
    const b = base();
    const c = cell();
    const w = barWidth();

    ctx!.strokeStyle = rgba(palette.line, 1);
    ctx!.lineWidth = 1;
    ctx!.beginPath();
    ctx!.moveTo(chartLeft() - 6, Math.round(b) + 0.5);
    ctx!.lineTo(chartLeft() + chartStep() * BAR_CELLS.length + 6, Math.round(b) + 0.5);
    ctx!.stroke();

    stacks.forEach((count, i) => {
      for (let s = 0; s < count; s += 1) {
        ctx!.fillStyle = rgba(palette.decide, (i === PEAK && doneFor >= 0 ? 1 : 0.86) * alpha);
        roundedRect(barX(i) - w / 2, b - (s + 1) * c + 1, w, c - 2, 2);
        ctx!.fill();
      }
    });

    if (doneFor < 0) return;
    const progress = clamp(doneFor / LINE_SECONDS, 0, 1);
    const reach = (1 - (1 - progress) ** 3) * (BAR_CELLS.length - 1);
    const pointX = (i: number): number => barX(i);
    const pointY = (i: number): number => b - (BAR_CELLS[i] ?? 0) * c - 9;

    ctx!.strokeStyle = rgba(palette.ink, 0.9 * alpha);
    ctx!.lineWidth = 2;
    ctx!.lineJoin = 'round';
    ctx!.beginPath();
    let headX = pointX(0);
    let headY = pointY(0);
    ctx!.moveTo(headX, headY);
    for (let i = 1; i < BAR_CELLS.length; i += 1) {
      const k = clamp(reach - (i - 1), 0, 1);
      if (k <= 0) break;
      headX = mix(pointX(i - 1), pointX(i), k);
      headY = mix(pointY(i - 1), pointY(i), k);
      ctx!.lineTo(headX, headY);
    }
    ctx!.stroke();
    ctx!.fillStyle = rgba(palette.ink, alpha);
    ctx!.beginPath();
    ctx!.arc(headX, headY, 3.2, 0, TAU);
    ctx!.fill();

    // El punto más alto late una vez cuando la tendencia lo alcanza.
    if (reach < PEAK) return;
    ctx!.fillStyle = rgba(palette.decide, alpha);
    ctx!.beginPath();
    ctx!.arc(pointX(PEAK), pointY(PEAK), 4.5, 0, TAU);
    ctx!.fill();
    const pulse = (doneFor - LINE_SECONDS * 0.7) / 0.8;
    if (animated && pulse > 0 && pulse < 1) {
      ctx!.strokeStyle = rgba(palette.decide, 0.7 * (1 - pulse));
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.arc(pointX(PEAK), pointY(PEAK), 5 + 16 * (1 - (1 - pulse) ** 3), 0, TAU);
      ctx!.stroke();
    }
  }

  function drawItem(item: Item): void {
    const g2 = gate(2);
    const g3 = gate(3);
    const g4 = gate(4);
    const xf = (Math.min(item.u, FLOW_END) / FLOW_END) * g4;
    const raw = palette.raw[item.rawIndex] ?? palette.raw[0]!;
    const fadeIn = smooth(0, 0.03, item.u);
    const scatterY = (item.seed + 0.06 * Math.sin(item.phase + time * 1.3 + item.u * 9)) * height;

    // Registro sucio: se queda en la puerta de Transformación, cae y desaparece.
    if (item.dirty) {
      const k = clamp((xf - (g2 - 16)) / (col() * 0.45), 0, 1);
      if (k >= 1) return;
      ctx!.save();
      ctx!.translate(Math.min(xf, g2 - 16) + k * 10, scatterY + k * k * height * 0.7);
      ctx!.rotate(item.spin + time * item.spinSpeed + k * 3);
      ctx!.strokeStyle = rgba(raw, 0.95 * fadeIn * (1 - k));
      ctx!.lineWidth = 1.3;
      ctx!.strokeRect(-item.size / 2, -item.size / 2, item.size, item.size);
      ctx!.restore();
      return;
    }

    const ordered = smooth(g2 - 20, g2 + 26, xf);
    const modeled = smooth(g3 - 12, g3 + 18, xf);
    const toDim = smooth(g3 - col() * 0.04, dimX() - 6, xf);
    const toFact = smooth(dimX() + col() * 0.1, factX() - 4, xf);
    const rowY = height * (0.16 + (item.row / (ROWS - 1)) * 0.68);
    // En Transformación avanzan a saltos de celda, como filas que se van llenando.
    const snapped = Math.round(xf / 16) * 16;
    let x = mix(xf, snapped, ordered * (1 - modeled));
    let y = mix(mix(mix(scatterY, rowY, ordered), groupY(item.group), toDim), height / 2, toFact);
    let w = mix(item.size, 6, ordered);
    let h = w;
    let color = mixColor(raw, palette.clean, ordered);
    let alpha = 0.95 * fadeIn;

    if (item.u > FLOW_END) {
      // Salto en arco desde la tabla de hechos hasta su celda en el gráfico.
      const k = (item.u - FLOW_END) / (1 - FLOW_END);
      const e = k * k * (3 - 2 * k);
      if (item.bar >= 0) {
        x = mix(g4, barX(item.bar), e);
        y =
          mix(height / 2, base() - (item.slot + 0.5) * cell(), e) -
          Math.sin(Math.PI * k) * height * 0.16;
        w = mix(6, barWidth(), e);
        h = mix(6, cell() - 2, e);
        color = mixColor(palette.clean, palette.decide, smooth(0.1, 0.7, k));
        alpha *= chartAlpha();
      } else {
        x = mix(g4, g4 + col() * 0.2, e);
        y = height / 2;
        alpha *= 1 - e;
      }
    }

    ctx!.save();
    ctx!.translate(x, y);
    ctx!.rotate((item.spin + time * item.spinSpeed) * (1 - ordered));
    ctx!.fillStyle = rgba(color, alpha);
    roundedRect(-w / 2, -h / 2, w, h, 1.5);
    ctx!.fill();
    ctx!.restore();
  }

  function draw(): void {
    if (width === 0) return;
    ctx!.clearRect(0, 0, width, height);
    drawBackdrop();
    drawTableRows();
    drawModel();
    drawChart(!reduceMotion.matches);
    items.forEach(drawItem);
  }

  /** Reserva una celda libre del gráfico para un registro que empieza su salto. */
  function reserve(item: Item): void {
    const free = BAR_CELLS.map((_, i) => i).filter((i) => (reserved[i] ?? 0) < (BAR_CELLS[i] ?? 0));
    const bar = free[Math.floor(Math.random() * free.length)];
    if (doneFor >= 0 || bar === undefined) {
      item.bar = -1;
      return;
    }
    item.bar = bar;
    item.slot = reserved[bar] ?? 0;
    reserved[bar] = item.slot + 1;
  }

  function step(now: number): void {
    const calm = reduceMotion.matches ? CALM_FACTOR : 1;
    const dt = Math.min((now - last) / 1000, 0.05) / calm;
    last = now;
    time += dt;

    for (const item of items) {
      item.u += (dt / TRAVEL_SECONDS) * item.speed;
      if (!item.dirty && item.bar === -2 && item.u > FLOW_END) reserve(item);
      if (item.u >= 1) {
        if (item.bar >= 0) stacks[item.bar] = Math.max(stacks[item.bar] ?? 0, item.slot + 1);
        Object.assign(item, createItem(0));
      }
    }

    const landed = stacks.reduce((sum, count) => sum + count, 0);
    if (doneFor < 0 && landed >= BAR_TOTAL) doneFor = 0;
    else if (doneFor >= 0) doneFor += dt;
    if (doneFor > HOLD_SECONDS + FADE_SECONDS) {
      stacks.fill(0);
      reserved.fill(0);
      doneFor = -1;
    }

    draw();
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
      draw();
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
    if (!shouldRun()) draw();
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
