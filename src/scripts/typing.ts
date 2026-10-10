/**
 * Escribe y borra en bucle las palabras de `data-typing` (un arreglo JSON).
 * Sin JavaScript queda la primera palabra, fija. Se reinicia en cada página
 * (ClientRouter) y detiene sus temporizadores al salir.
 */
const PAUSE_MS = 1600;
const TYPE_MS = 85;
const DELETE_MS = 45;

// Un temporizador activo por elemento (así la lista no crece con cada letra).
const timers = new Map<HTMLElement, number>();

function run(el: HTMLElement): void {
  const words = JSON.parse(el.dataset.typing ?? '[]') as string[];
  if (words.length < 2) return;
  let index = 0;
  let length = words[0]?.length ?? 0;
  let deleting = true;

  const tick = (): void => {
    length += deleting ? -1 : 1;
    if (deleting && length < 0) {
      deleting = false;
      index = (index + 1) % words.length;
      length = 0;
    }
    const word = words[index] ?? '';
    el.textContent = word.slice(0, length);
    const full = !deleting && length >= word.length;
    if (full) deleting = true;
    timers.set(el, window.setTimeout(tick, full ? PAUSE_MS : deleting ? DELETE_MS : TYPE_MS));
  };
  timers.set(el, window.setTimeout(tick, PAUSE_MS));
}

function stop(): void {
  timers.forEach((id) => window.clearTimeout(id));
  timers.clear();
}

function start(): void {
  stop();
  document.querySelectorAll<HTMLElement>('[data-typing]').forEach(run);
}

document.addEventListener('astro:page-load', start);
document.addEventListener('astro:before-swap', stop);
// Si el script llega después del aviso de carga (pasa en desarrollo), arranca igual.
if (document.readyState !== 'loading') start();

export {};
