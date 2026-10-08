export interface Credential {
  title: string;
  institution: string;
  year: number;
  /** Icono de Iconify que representa a la institución o el tipo de título. */
  icon: string;
}

export const certifications: readonly Credential[] = [
  {
    title: 'Bachiller en Ingeniería de Sistemas y Computación',
    institution: 'Universidad Nacional Daniel Alcides Carrión',
    year: 2024,
    icon: 'ph:graduation-cap-fill',
  },
  {
    title: 'Associate Data Engineer',
    institution: 'DataCamp',
    year: 2024,
    icon: 'simple-icons:datacamp',
  },
  {
    title: 'Associate Data Analyst',
    institution: 'DataCamp',
    year: 2024,
    icon: 'simple-icons:datacamp',
  },
];
