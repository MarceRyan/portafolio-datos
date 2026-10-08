export interface CountTarget {
  value: number;
  decimals: number;
  suffix: string;
}

/** Convierte "32.42%" en valor numérico, decimales y sufijo para el conteo animado. */
export function parseImpact(text: string): CountTarget | null {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(text.trim());
  if (!match) return null;
  const number = match[1] ?? '';
  return {
    value: Number(number),
    decimals: number.includes('.') ? (number.split('.')[1]?.length ?? 0) : 0,
    suffix: match[2] ?? '',
  };
}
