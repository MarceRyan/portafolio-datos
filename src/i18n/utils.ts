import { defaultLang, ui, type Lang, type UiKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first && first in ui ? (first as Lang) : defaultLang;
}

/** Devuelve la cadena en el idioma pedido y recurre al español si falta. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key] ?? key;
  };
}
