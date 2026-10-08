/**
 * Tema claro/oscuro.
 * El valor inicial lo fija un script inline en <head> (BaseLayout) antes del primer
 * pintado para evitar el parpadeo. Este módulo gestiona el botón, la persistencia y los
 * cambios del sistema. Usa delegación de eventos y los eventos de las transiciones de
 * vista (ClientRouter), así que sigue funcionando al navegar entre páginas.
 */
import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const root = document.documentElement;
const systemQuery = matchMedia('(prefers-color-scheme: dark)');

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function writeStored(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Almacenamiento bloqueado: el tema sigue funcionando durante la sesión.
  }
}

function current(): Theme {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function apply(theme: Theme): void {
  root.dataset.theme = theme;

  const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.content = bg;
  });

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  });
}

function sync(): void {
  apply(readStored() ?? (systemQuery.matches ? 'dark' : 'light'));
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element) || !event.target.closest('[data-theme-toggle]')) return;
  const next: Theme = current() === 'dark' ? 'light' : 'dark';
  writeStored(next);
  apply(next);
});

// Sin preferencia guardada, el tema acompaña al sistema operativo.
systemQuery.addEventListener('change', (event) => {
  if (readStored() === null) apply(event.matches ? 'dark' : 'light');
});

// El documento nuevo llega sin `data-theme`: se le copia el vigente antes del cambio.
document.addEventListener('astro:before-swap', ((event: TransitionBeforeSwapEvent) => {
  event.newDocument.documentElement.dataset.theme = current();
}) as EventListener);

document.addEventListener('astro:page-load', sync);

export {};
