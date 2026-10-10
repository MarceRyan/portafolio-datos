export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

const es = {
  'a11y.skip': 'Saltar al contenido',
  'nav.how': 'Cómo trabajo',
  'nav.cases': 'Proyectos',
  'nav.about': 'Sobre mí',
  'nav.contact': 'Contacto',
  'nav.cv': 'Descargar CV',
  'nav.menuOpen': 'Abrir menú',
  'nav.menuClose': 'Cerrar menú',
  'nav.primary': 'Navegación principal',
  'theme.toggle': 'Modo oscuro',
  'footer.signature': 'Marcelo Morales',
  'footer.location': 'Lima, Perú',
} as const;

export type UiKey = keyof typeof es;

export const ui: Record<Lang, Partial<Record<UiKey, string>>> = {
  es,
  // TODO(marcelo): traducir al inglés cuando se active la versión en inglés.
  en: {},
};
