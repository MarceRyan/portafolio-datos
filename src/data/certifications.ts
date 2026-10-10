export interface Certificate {
  /** Nombre del archivo en src/assets/images/certificados/ (sin extensión). */
  image: string;
  /** Código impreso en el certificado. */
  credentialId: string;
  /** Página pública donde la institución verifica el certificado. */
  verifyUrl?: string;
}

export interface Credential {
  title: string;
  institution: string;
  year: number;
  /** Icono de Iconify que representa a la institución o el tipo de título. */
  icon: string;
  /** Color oficial de la marca, para logos que solo existen en una tinta. */
  color?: string;
  /** Si existe, la tarjeta abre el certificado en una ventana. */
  certificate?: Certificate;
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
    color: '#03EF62',
    certificate: {
      image: 'associate-data-engineer',
      credentialId: 'DEA0017621016194',
      // TODO(marcelo): confirmar que este enlace de verificación abre tu certificado.
      verifyUrl: 'https://www.datacamp.com/certificate/DEA0017621016194',
    },
  },
  {
    title: 'Associate Data Analyst',
    institution: 'DataCamp',
    // El certificado indica "Certified on January 18, 2025".
    year: 2025,
    icon: 'simple-icons:datacamp',
    color: '#03EF62',
    certificate: {
      image: 'associate-data-analyst',
      credentialId: 'DAA0019221260436',
      // TODO(marcelo): confirmar que este enlace de verificación abre tu certificado.
      verifyUrl: 'https://www.datacamp.com/certificate/DAA0019221260436',
    },
  },
];
