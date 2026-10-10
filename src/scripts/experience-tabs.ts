/**
 * Pestañas del recorrido profesional.
 * Sin JavaScript todos los paneles quedan visibles; con él se muestra uno por vez.
 * Teclado: flechas, Inicio y Fin cambian de pestaña (patrón WAI-ARIA de tabs).
 * En la línea horizontal (`data-exp-tabs="rail"`) la pestaña elegida se desplaza a la vista.
 */
function init(root: HTMLElement): void {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = tabs.map((tab) =>
    document.getElementById(tab.getAttribute('aria-controls') ?? ''),
  );
  if (tabs.length === 0) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  function select(index: number, userAction: boolean): void {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      const panel = panels[i];
      if (panel) panel.hidden = !on;
    });
    if (userAction && root.dataset.expTabs !== 'list') {
      tabs[index]?.scrollIntoView({
        behavior: reduce.matches ? 'auto' : 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }

  const initial = Math.max(
    0,
    tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'),
  );
  select(initial, false);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index, true));
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      let next = -1;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
        next = index === last ? 0 : index + 1;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
        next = index === 0 ? last : index - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = last;
      if (next === -1) return;
      event.preventDefault();
      select(next, true);
      tabs[next]?.focus();
    });
  });
}

const start = (): void => {
  document.querySelectorAll<HTMLElement>('[data-exp-tabs]:not([data-ready])').forEach((root) => {
    root.dataset.ready = '';
    init(root);
  });
};
document.addEventListener('astro:page-load', start);
// Si el script llega después del aviso de carga (pasa en desarrollo), arranca igual.
if (document.readyState !== 'loading') start();

export {};
