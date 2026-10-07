// TODO(marcelo): datos temporales de la Fase 2. La Fase 3 los reemplaza por la
// Content Collection `casos` (src/content/casos/*.mdx).
export interface CasoDestacado {
  slug: string;
  title: string;
  question: string;
  built: string;
  result?: { value: number; decimals: number; suffix: string; label: string };
}

export const casosDestacados: readonly CasoDestacado[] = [
  {
    slug: 'tablero-competencia-lectora',
    title: 'Tablero de seguimiento del programa Competencia Lectora',
    question: '¿Llegará el programa a buen cierre, y dónde hay que actuar antes?',
    built:
      'Integré la información de los equipos pedagógicos con Python, Excel, SSIS y SQL Server, construí el tablero en Power BI y elaboré reportes de monitoreo y modelos predictivos para estimar el cierre, apoyando la toma de decisiones de las gerencias.',
    result: {
      value: 32.42,
      decimals: 2,
      suffix: '%',
      label: 'de logro nacional en 2025, el más alto registrado por el programa',
    },
  },
  {
    slug: 'extraccion-avances-docentes',
    title: 'Extracción automatizada de avances docentes',
    question: '¿Cómo saber el avance de cada docente sin descargar reportes a mano?',
    built:
      'Web scraping con Selenium del campus virtual del SIFODS y migración a SQL Server con Python, reduciendo procesos manuales.',
  },
  {
    slug: 'satisfaccion-docente-rot',
    title: 'Satisfacción docente en el canal ROT',
    question: '¿Qué tan satisfechos quedan los docentes después de cada atención?',
    built:
      'Tablero en Power BI para gerencias que cruza la encuesta de satisfacción (escala 1 a 10) con el volumen de atenciones por canal y programa.',
  },
];
