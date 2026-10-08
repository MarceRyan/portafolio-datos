import { toolRef, type ToolRef } from './tool-refs';

/** Color del hito en la línea de tiempo: dato crudo, limpio o decisión. */
export type Era = 'raw' | 'clean' | 'decide';

export interface Period {
  /** Mes de inicio, formato `AAAA-MM`. */
  start: string;
  /** Mes de fin, o `null` si el cargo sigue vigente. */
  end: string | null;
}

export interface HighlightGroup {
  label: string;
  items: readonly string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface Role {
  id: string;
  title: string;
  org: string;
  place: string;
  periods: readonly Period[];
  era: Era;
  /** Icono de Phosphor (relleno) que identifica el tipo de puesto. */
  icon: string;
  tools?: readonly ToolRef[];
  highlights?: readonly string[];
  groups?: readonly HighlightGroup[];
  metrics?: readonly Metric[];
}

/** De más reciente a más antiguo. */
export const experience: readonly Role[] = [
  {
    id: 'analista-datos-minedu',
    title: 'Analista de Datos',
    org: 'MINEDU, programa "Educación Básica para Todos"',
    place: 'Lima',
    periods: [{ start: '2025-01', end: null }],
    era: 'decide',
    icon: 'ph:chart-line-up-fill',
    tools: [
      toolRef.python,
      toolRef.sql,
      toolRef.excel,
      toolRef.selenium,
      toolRef.ssis,
      toolRef.sqlServer,
      toolRef.powerBi,
      toolRef.powerAutomate,
      toolRef.appsScript,
    ],
    groups: [
      {
        label: 'Extraer y automatizar',
        items: [
          'Web scraping con Selenium del campus SIFODS.',
          'Automatizaciones en Python para reportes y migración a SQL Server.',
          'Power Automate para correos masivos.',
          'Apoyo en un sistema de gestión de llamadas en Apps Script.',
          'Formularios de asistencia en Apps Script.',
        ],
      },
      {
        label: 'Limpiar y validar',
        items: [
          'Consolidación de información de programas y cursos docentes.',
          'SQL y Excel para validar grandes volúmenes de múltiples fuentes.',
          'ETL con SSIS.',
        ],
      },
      {
        label: 'Decidir',
        items: [
          'Modelos predictivos de cierre de programas.',
          'Dashboards en Power BI usados por gerencias.',
        ],
      },
    ],
  },
  {
    id: 'mesa-de-ayuda-minedu',
    title: 'Servicio de Mesa de Ayuda',
    org: 'MINEDU',
    place: 'Lima',
    periods: [{ start: '2024-10', end: '2024-11' }],
    era: 'clean',
    icon: 'ph:headset-fill',
    tools: [toolRef.powerBi],
    highlights: [
      'Fuente de datos para el seguimiento de dinamizadores y canales de atención.',
      'Reportes estratégicos automatizados en Power BI.',
    ],
  },
  {
    id: 'soporte-compu-xperto',
    title: 'Soporte Técnico y Atención Usuaria',
    org: 'Compu Xperto Digital',
    place: 'Pasco',
    periods: [
      { start: '2022-12', end: '2023-04' },
      { start: '2023-12', end: '2024-08' },
    ],
    era: 'raw',
    icon: 'ph:wrench-fill',
  },
  {
    id: 'practicante-ti-yanacancha',
    title: 'Practicante de TI',
    org: 'Municipalidad Distrital de Yanacancha',
    place: 'Pasco',
    periods: [{ start: '2023-04', end: '2023-11' }],
    era: 'clean',
    icon: 'ph:database-fill',
    tools: [toolRef.sql],
    highlights: ['Administración de la base de datos municipal con SQL.'],
  },
  {
    id: 'asistente-gestor-rc-inma',
    title: 'Asistente de Gestor de Proyectos',
    org: 'Corporación RC INMA S.A.C.',
    place: 'Pasco',
    periods: [{ start: '2021-10', end: '2022-11' }],
    era: 'raw',
    icon: 'ph:kanban-fill',
  },
  {
    id: 'asistente-administrativo-ondores',
    title: 'Asistente Administrativo',
    org: 'Comunidad Campesina San Juan de Ondores',
    place: 'Junín',
    periods: [{ start: '2020-08', end: '2021-03' }],
    era: 'raw',
    icon: 'ph:clipboard-text-fill',
  },
  {
    id: 'logistico-rc-inma',
    title: 'Logístico',
    org: 'Corporación RC INMA S.A.C.',
    place: 'Pasco',
    periods: [{ start: '2019-06', end: '2020-05' }],
    era: 'raw',
    icon: 'ph:package-fill',
    tools: [toolRef.java, toolRef.mysql],
    highlights: ['Control de inventario en Java y MySQL.'],
    metrics: [
      { value: '20%', label: 'menos pérdidas' },
      { value: '30%', label: 'más disponibilidad de productos' },
    ],
  },
];

const monthFormat = new Intl.DateTimeFormat('es-PE', { month: 'short', year: 'numeric' });

export function formatMonth(value: string): string {
  const [year, month] = value.split('-').map(Number);
  const text = monthFormat.format(new Date(year ?? 2000, (month ?? 1) - 1, 1)).replace(/\./g, '');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "Ene 2025 a la actualidad" o "Dic 2022 a Abr 2023 y Dic 2023 a Ago 2024". */
export function formatPeriods(periods: readonly Period[]): string {
  return periods
    .map((p) => `${formatMonth(p.start)} a ${p.end ? formatMonth(p.end) : 'la actualidad'}`)
    .join(' y ');
}

/** Año de inicio del primer período (el más antiguo). */
export function startYear(role: Role): number {
  const first = role.periods[0];
  return Number((first?.start ?? '2000').slice(0, 4));
}
