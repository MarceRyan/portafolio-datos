/**
 * Tooltips de herramientas del motor de decisiones.
 * - Ratón: aparecen tras una breve espera; si ya hay uno abierto, el siguiente es inmediato.
 * - Teclado: aparecen al enfocar. Escape cierra.
 * - Táctil: un toque abre y otro cierra.
 * Por debajo de `md` el texto se muestra siempre en línea (ver DecisionEngine.astro).
 */
const SHOW_DELAY_MS = 250;
const WARM_MS = 400;
const EDGE_MARGIN = 12;

const desktop = matchMedia('(min-width: 768px)');
let warmUntil = 0;
let showTimer: number | undefined;
let current: HTMLButtonElement | null = null;

function tipFor(button: HTMLButtonElement): HTMLElement | null {
  const id = button.getAttribute('aria-describedby');
  return id ? document.getElementById(id) : null;
}

/** Evita que el tooltip se salga de la pantalla en las columnas de los extremos. */
function keepInViewport(tip: HTMLElement): void {
  tip.style.setProperty('--shift', '0px');
  const rect = tip.getBoundingClientRect();
  const maxRight = document.documentElement.clientWidth - EDGE_MARGIN;
  let shift = 0;
  if (rect.right > maxRight) shift = maxRight - rect.right;
  if (rect.left + shift < EDGE_MARGIN) shift = EDGE_MARGIN - rect.left;
  tip.style.setProperty('--shift', `${shift}px`);
}

function show(button: HTMLButtonElement, instant: boolean): void {
  window.clearTimeout(showTimer);
  if (current && current !== button) hide(current);
  const tip = tipFor(button);
  if (!tip) return;
  tip.toggleAttribute('data-instant', instant || performance.now() < warmUntil);
  keepInViewport(tip);
  tip.setAttribute('data-open', '');
  button.setAttribute('aria-expanded', 'true');
  current = button;
}

function hide(button: HTMLButtonElement): void {
  window.clearTimeout(showTimer);
  const tip = tipFor(button);
  tip?.removeAttribute('data-open');
  button.setAttribute('aria-expanded', 'false');
  if (current === button) {
    current = null;
    warmUntil = performance.now() + WARM_MS;
  }
}

function init(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-tool]').forEach((button) => {
    button.addEventListener('pointerenter', (event) => {
      if (!desktop.matches || event.pointerType !== 'mouse') return;
      if (performance.now() < warmUntil || current) show(button, true);
      else showTimer = window.setTimeout(() => show(button, false), SHOW_DELAY_MS);
    });

    button.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      hide(button);
    });

    button.addEventListener('focus', () => {
      if (desktop.matches) show(button, true);
    });

    button.addEventListener('blur', () => hide(button));

    button.addEventListener('click', (event) => {
      // El ratón ya abre por hover; el clic solo alterna con el dedo.
      if (!desktop.matches || (event as PointerEvent).pointerType === 'mouse') return;
      if (current === button) hide(button);
      else show(button, true);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && current) hide(current);
  });
}

init();

export {};
