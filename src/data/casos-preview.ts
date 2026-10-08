import { toolRef, type ToolRef } from './tool-refs';

// TODO(marcelo): datos temporales de la Fase 2. La Fase 3 los reemplaza por la
// Content Collection `casos` (src/content/casos/*.mdx) con los mismos slugs.
export type CasoCategory = 'ingenieria' | 'analisis' | 'bi' | 'automatizacion';

export const categoryLabels: Record<CasoCategory, string> = {
  ingenieria: 'Ingeniería de datos',
  analisis: 'Análisis',
  bi: 'Business Intelligence',
  automatizacion: 'Automatización',
};

export interface CasoPreview {
  slug: string;
  title: string;
  category: CasoCategory;
  stack: readonly ToolRef[];
  /** Se muestra entre "Decisiones que ayudé a tomar". */
  decision?: {
    result?: { value: number; decimals: number; suffix: string; label: string };
  };
}

export const casosPreview: readonly CasoPreview[] = [
  {
    slug: 'tablero-competencia-lectora',
    title: 'Tablero de seguimiento del programa Competencia Lectora',
    category: 'bi',
    stack: [toolRef.python, toolRef.excel, toolRef.ssis, toolRef.sqlServer, toolRef.powerBi],
    decision: {
      result: {
        value: 32.42,
        decimals: 2,
        suffix: '%',
        label: 'de logro nacional en 2025, el más alto registrado por el programa',
      },
    },
  },
  {
    slug: 'extraccion-avances-docentes',
    title: 'Extracción automatizada de avances docentes',
    category: 'ingenieria',
    stack: [toolRef.selenium, toolRef.python, toolRef.sqlServer],
    decision: {},
  },
  {
    slug: 'satisfaccion-docente-rot',
    title: 'Satisfacción docente en el canal ROT',
    category: 'bi',
    stack: [toolRef.powerBi],
    decision: {},
  },
  {
    slug: 'rotacion-de-clientes-power-bi',
    title: 'Análisis de rotación de clientes en Power BI',
    category: 'bi',
    stack: [toolRef.powerBi],
  },
  {
    slug: 'automatizacion-comunicacion-atenciones',
    title: 'Automatización de la comunicación y registro de atenciones',
    category: 'automatizacion',
    stack: [toolRef.powerAutomate, toolRef.appsScript],
  },
  {
    slug: 'asistente-finanzas-personales',
    title: 'Asistente de finanzas personales',
    category: 'automatizacion',
    stack: [toolRef.sheets, toolRef.appsScript],
  },
];
