/**
 * Cuenta desde 0 hasta el valor final una sola vez, cuando el número entra en pantalla.
 * El HTML ya trae el valor final: sin JavaScript o con `prefers-reduced-motion`
 * el número se queda estático.
 */
const DURATION_MS = 1400;
const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

function run(el: HTMLElement, target: number, format: (value: number) => string): void {
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / DURATION_MS, 1);
    el.textContent = format(target * easeOutCubic(t));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function init(): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  document.querySelectorAll<HTMLElement>('[data-count-to]').forEach((el) => {
    const target = Number(el.dataset.countTo);
    const decimals = Number(el.dataset.decimals ?? 0);
    const suffix = el.dataset.suffix ?? '';
    if (Number.isNaN(target)) return;

    const format = (value: number) => `${value.toFixed(decimals)}${suffix}`;
    el.textContent = format(0);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run(el, target, format);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
  });
}

init();

export {};
