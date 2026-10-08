/**
 * La línea de talleres se dibuja una sola vez al entrar en pantalla y los talleres
 * aparecen en cascada. Sin JavaScript o con `prefers-reduced-motion` queda el estado final.
 */
function init(): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  document.querySelectorAll<HTMLElement>('[data-community-line]').forEach((list) => {
    if (list.hasAttribute('data-in')) return;
    list.setAttribute('data-armed', '');

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        list.setAttribute('data-in', '');
      },
      { threshold: 0.3 },
    );
    observer.observe(list);
  });
}

document.addEventListener('astro:page-load', init);

export {};
