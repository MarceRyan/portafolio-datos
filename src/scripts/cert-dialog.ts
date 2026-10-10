/**
 * Abre y cierra la ventana de cada certificado con <dialog> nativo:
 * Escape cierra, el foco queda atrapado dentro y vuelve a la tarjeta al cerrar.
 * Un clic fuera del recuadro (en el fondo) también cierra.
 */
document.addEventListener('click', (event) => {
  const target = event.target as Element | null;
  if (!target) return;

  const opener = target.closest<HTMLElement>('[data-cert-open]');
  if (opener) {
    const dialog = document.getElementById(opener.dataset.certOpen ?? '');
    if (dialog instanceof HTMLDialogElement) dialog.showModal();
    return;
  }

  if (target.closest('[data-cert-close]')) {
    target.closest('dialog')?.close();
    return;
  }

  // El clic en el fondo llega con el propio <dialog> como destino.
  if (target instanceof HTMLDialogElement && target.classList.contains('cert-dialog')) {
    target.close();
  }
});

export {};
