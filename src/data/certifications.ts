export interface Credential {
  title: string;
  institution: string;
  year: number;
}

export const certifications: readonly Credential[] = [
  {
    title: 'Bachiller en Ingeniería de Sistemas y Computación',
    institution: 'Universidad Nacional Daniel Alcides Carrión',
    year: 2024,
  },
  { title: 'Associate Data Engineer', institution: 'DataCamp', year: 2024 },
  { title: 'Associate Data Analyst', institution: 'DataCamp', year: 2024 },
];
