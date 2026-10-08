/** Fecha de la última revisión de esta sección (ISO). Actualízala cuando cambie algo. */
export const nowUpdated = '2026-10-07';

export interface NowItem {
  text: string;
  /** Icono de Phosphor (relleno). */
  icon: string;
}

export const now: readonly NowItem[] = [
  { text: 'Tableros y automatizaciones en el MINEDU.', icon: 'ph:chart-line-up-fill' },
  {
    text: 'Moderación de talleres en Data Science Research Perú (DSRP).',
    icon: 'ph:users-three-fill',
  },
  {
    text: 'Terminando mi tesis "Inteligencia de negocios para la toma de decisiones en el SIFODS - MINEDU 2025".',
    icon: 'ph:graduation-cap-fill',
  },
];
