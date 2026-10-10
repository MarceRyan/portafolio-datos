export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'sm';

const base =
  'relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-ui font-semibold ' +
  'transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]';

// Barra de carga: al pasar el cursor, una línea cian se llena de izquierda a derecha en la base.
const loadingBar =
  'after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-clean ' +
  'after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.23,1,0.32,1)] ' +
  'hover:after:scale-x-100 focus-visible:after:scale-x-100 disabled:after:hidden';

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-base',
  sm: 'h-10 px-4 text-sm',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-bg hover:bg-soft',
  secondary: 'border border-soft text-ink hover:bg-surface',
};

/** Clases compartidas por enlaces y botones de formulario. */
export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): string {
  return `${base} ${loadingBar} ${sizes[size]} ${variants[variant]}`;
}
