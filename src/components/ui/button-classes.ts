export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'sm';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-ui font-semibold ' +
  'transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]';

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
  return `${base} ${sizes[size]} ${variants[variant]}`;
}
