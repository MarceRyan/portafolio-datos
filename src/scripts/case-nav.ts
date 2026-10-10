/**
 * En la página de un proyecto, las flechas izquierda y derecha del teclado llevan al
 * proyecto anterior o siguiente. No actúa mientras se escribe ni con teclas modificadoras.
 */
import { navigate } from 'astro:transitions/client';

document.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented)
    return;
  const target = event.target as HTMLElement | null;
  if (target?.closest('input, textarea, select, [contenteditable="true"], [role="tablist"]'))
    return;
  const rel = event.key === 'ArrowLeft' ? 'prev' : 'next';
  const link = document.querySelector<HTMLAnchorElement>(`[data-case-nav] [data-nav="${rel}"]`);
  if (!link) return;
  event.preventDefault();
  void navigate(link.href);
});

export {};
