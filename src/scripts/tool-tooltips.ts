/**
 * Tooltips de herramientas del motor de decisiones.
 * - Ratón: aparecen tras una breve espera; si ya hay uno abierto, el siguiente es inmediato.
 * - Teclado: aparecen al enfocar. Escape cierra.
 * - Táctil: un toque abre y otro cierra.
 * Por debajo de `md` el texto se muestra siempre en línea (ver DecisionEngine.astro).
 * Todo se delega en `document`, así que sobrevive a las transiciones de vista.
 */
const SHOW_DELAY_MS = 250;
const WARM_MS = 400;
const EDGE_MARGIN = 12;

const desktop = matchMedia('(min-width: 768px)');
let warmUntil = 0;
let showTimer: number | undefined;
let current: HTMLButtonElement | null = null;

function buttonFrom(target: EventTarget | null): HTMLButtonElement | null {
  return target instanceof Element ? target.closest<HTMLButtonElement>('[data-tool]') : null;
}

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

function hide(button: HTMLButtonElement): void {
  window.clearTimeout(showTimer);
  tipFor(button)?.removeAttribute('data-open');
  button.setAttribute('aria-expanded', 'false');
  if (current === button) {
    current = null;
    warmUntil = performance.now() + WARM_MS;
  }
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

document.addEventListener('pointerover', (event) => {
  if (!desktop.matches || event.pointerType !== 'mouse') return;
  const button = buttonFrom(event.target);
  if (!button || buttonFrom(event.relatedTarget) === button) return;
  if (performance.now() < warmUntil || current) show(button, true);
  else showTimer = window.setTimeout(() => show(button, false), SHOW_DELAY_MS);
});

document.addEventListener('pointerout', (event) => {
  if (event.pointerType !== 'mouse') return;
  const button = buttonFrom(event.target);
  if (!button || buttonFrom(event.relatedTarget) === button) return;
  hide(button);
});

document.addEventListener('focusin', (event) => {
  const button = buttonFrom(event.target);
  if (button && desktop.matches) show(button, true);
});

document.addEventListener('focusout', (event) => {
  const button = buttonFrom(event.target);
  if (button) hide(button);
});

document.addEventListener('click', (event) => {
  const button = buttonFrom(event.target);
  // El ratón ya abre por hover; el clic solo alterna con el dedo.
  if (!button || !desktop.matches || (event as PointerEvent).pointerType === 'mouse') return;
  if (current === button) hide(button);
  else show(button, true);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && current) hide(current);
});

// Al navegar, el DOM anterior desaparece: se limpia el estado.
document.addEventListener('astro:before-swap', () => {
  window.clearTimeout(showTimer);
  current = null;
});

export {};
