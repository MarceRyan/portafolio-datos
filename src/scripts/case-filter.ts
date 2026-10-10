/**
 * Filtro por categoría de /proyectos. Sin JavaScript se ven todos los proyectos.
 * La categoría elegida se refleja en la URL (?categoria=bi) para poder compartirla.
 */
const PARAM = 'categoria';

function init(): void {
  const filters = document.querySelector<HTMLElement>('[data-case-filters]');
  const list = document.querySelector<HTMLElement>('[data-cases]');
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  if (!filters || !list) return;

  const buttons = [...filters.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const items = [...list.querySelectorAll<HTMLElement>('[data-category]')];
  const valid = new Set(buttons.map((button) => button.dataset.filter));

  function apply(value: string, updateUrl: boolean): void {
    const selected = valid.has(value) ? value : 'all';
    let visible = 0;
    items.forEach((item) => {
      const show = selected === 'all' || item.dataset.category === selected;
      item.hidden = !show;
      if (show) visible += 1;
    });
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === selected));
    });
    list!.dataset.filtered = String(selected !== 'all');
    if (status) {
      status.textContent =
        visible === 1 ? 'Mostrando 1 proyecto.' : `Mostrando ${visible} proyectos.`;
    }
    if (updateUrl) {
      const url = new URL(location.href);
      if (selected === 'all') url.searchParams.delete(PARAM);
      else url.searchParams.set(PARAM, selected);
      history.replaceState(history.state, '', url);
    }
  }

  filters.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-filter]');
    if (button?.dataset.filter) apply(button.dataset.filter, true);
  });

  apply(new URL(location.href).searchParams.get(PARAM) ?? 'all', false);
  // Al cargar no se anuncia el conteo: solo cuando la persona cambia el filtro.
  if (status) status.textContent = '';
}

document.addEventListener('astro:page-load', init);

export {};
