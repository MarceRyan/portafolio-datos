/**
 * Los elementos con `data-reveal` aparecen en cascada una sola vez al entrar en pantalla:
 * el script los arma (`data-armed`) y los dispara (`data-in`); cada componente define el efecto.
 * Sin JavaScript queda el estado final. Con movimiento reducido, el CSS deja solo el fundido.
 */
function init(): void {
  if (!('IntersectionObserver' in window)) return;

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((list) => {
    if (list.hasAttribute('data-in') || list.hasAttribute('data-armed')) return;
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
// Si el script llega después del aviso de carga (pasa en desarrollo), arranca igual.
if (document.readyState !== 'loading') init();

export {};
