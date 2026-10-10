/** Fecha de la última revisión de esta sección (ISO). Actualízala cuando cambie algo. */
export const nowUpdated = '2026-10-10';

export interface NowItem {
  text: string;
  /** Icono de Phosphor (relleno). */
  icon: string;
}

export const now: readonly NowItem[] = [
  { text: 'Construyendo tableros y automatizaciones de datos.', icon: 'ph:chart-line-up-fill' },
  {
    text: 'Moderación de talleres en Data Science Research Perú (DSRP).',
    icon: 'ph:users-three-fill',
  },
];
