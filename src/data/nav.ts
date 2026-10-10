import type { UiKey } from '../i18n/ui';

export interface NavItem {
  label: UiKey;
  href: string;
  /** Prefijo de ruta para marcar el enlace como actual (aria-current). */
  matchPrefix?: string;
}

export const nav: readonly NavItem[] = [
  { label: 'nav.how', href: '/#como-trabajo' },
  { label: 'nav.cases', href: '/proyectos', matchPrefix: '/proyectos' },
  { label: 'nav.about', href: '/#sobre-mi' },
  { label: 'nav.contact', href: '/#contacto' },
];
