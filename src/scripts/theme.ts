/**
 * Tema claro/oscuro.
 * El valor inicial lo fija un script inline en <head> (BaseLayout) antes del
 * primer pintado para evitar el parpadeo; este módulo solo gestiona el botón,
 * la persistencia y los cambios del sistema.
 */
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

function bind(): void {
  apply(readStored() ?? (systemQuery.matches ? 'dark' : 'light'));

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const next: Theme = current() === 'dark' ? 'light' : 'dark';
      writeStored(next);
      apply(next);
    });
  });
}

// Sin preferencia guardada, el tema acompaña al sistema operativo.
systemQuery.addEventListener('change', (event) => {
  if (readStored() === null) apply(event.matches ? 'dark' : 'light');
});

bind();
