export type StageId = 'fuentes' | 'extraccion' | 'transformacion' | 'modelado' | 'decision';
export type DataState = 'raw' | 'clean' | 'decide';

export interface Stage {
  id: StageId;
  number: number;
  name: string;
  /** Qué ocurre con el dato en esta etapa (definición general, no un logro). */
  description: string;
  /** Estado del dato al salir de la etapa: dato crudo, limpio o decisión. */
  state: DataState;
}

export interface Tool {
  stage: StageId;
  name: string;
  /** Icono de Iconify (`coleccion:nombre`). Sin icono se usa el monograma. */
  icon?: string;
  /** Texto del monograma de respaldo cuando no hay logo disponible. */
  monogram?: string;
  /** Dónde apliqué la herramienta. Sin dato queda un TODO visible. */
  context?: string;
}

export const stageStates: Record<DataState, string> = {
  raw: 'Dato crudo',
  clean: 'Dato limpio',
  decide: 'Decisión',
};

export const stages: readonly Stage[] = [
  {
    id: 'fuentes',
    number: 1,
    name: 'Fuentes',
    description: 'El dato nace disperso: hojas, formularios, archivos y páginas.',
    state: 'raw',
  },
  {
    id: 'extraccion',
    number: 2,
    name: 'Extracción',
    description: 'Lo traigo a un solo lugar, sin descargas manuales.',
    state: 'raw',
  },
  {
    id: 'transformacion',
    number: 3,
    name: 'Transformación',
    description: 'Lo limpio, lo valido y le doy una estructura común.',
    state: 'clean',
  },
  {
    id: 'modelado',
    number: 4,
    name: 'Modelado',
    description: 'Lo organizo en una base lista para consultar y cruzar.',
    state: 'clean',
  },
  {
    id: 'decision',
    number: 5,
    name: 'Decisión',
    description: 'Lo convierto en tableros, proyecciones y avisos que alguien usa.',
    state: 'decide',
  },
];

// TODO(marcelo): agregar los SVG oficiales en src/assets/icons/ para las herramientas
// con monograma (SSIS, SQL, Power Query, DAX, Modelado dimensional),
// respetando los lineamientos de marca de cada empresa.
export const tools: readonly Tool[] = [
  {
    stage: 'fuentes',
    name: 'Excel',
    icon: 'simple-icons:microsoftexcel',
    context: 'Reportes de equipos pedagógicos',
  },
  {
    stage: 'fuentes',
    name: 'Formularios',
    icon: 'simple-icons:googleforms',
    context: 'Registro diario de asistencia',
  },
  // TODO(marcelo): indicar dónde trabajé con archivos de texto y CSV, JSON y páginas web.
  { stage: 'fuentes', name: 'Texto y CSV', icon: 'ph:file-csv-fill' },
  { stage: 'fuentes', name: 'JSON', icon: 'simple-icons:json' },
  { stage: 'fuentes', name: 'Páginas web', icon: 'ph:globe-fill' },
  {
    stage: 'extraccion',
    name: 'Python',
    icon: 'simple-icons:python',
    context: 'Automatización de reportes periódicos',
  },
  {
    stage: 'extraccion',
    name: 'Selenium',
    icon: 'simple-icons:selenium',
    context: 'Scraping del campus virtual del SIFODS',
  },
  {
    stage: 'extraccion',
    name: 'Apps Script',
    icon: 'simple-icons:googleappsscript',
    context: 'Sistema de registro de llamadas',
  },
  {
    stage: 'transformacion',
    name: 'SSIS',
    monogram: 'SSIS',
    context: 'ETL del tablero Competencia Lectora',
  },
  {
    stage: 'transformacion',
    name: 'SQL',
    monogram: 'SQL',
    context: 'Validación de grandes volúmenes',
  },
  {
    stage: 'transformacion',
    name: 'Power Query',
    monogram: 'PQ',
    context: 'Preparación para Power BI',
  },
  {
    stage: 'modelado',
    name: 'SQL Server',
    icon: 'simple-icons:microsoftsqlserver',
    context: 'Destino de migraciones automatizadas',
  },
  // TODO(marcelo): indicar dónde apliqué PostgreSQL, Snowflake y el modelado dimensional.
  { stage: 'modelado', name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
  { stage: 'modelado', name: 'Snowflake', icon: 'simple-icons:snowflake' },
  { stage: 'modelado', name: 'Modelado dimensional', monogram: 'MD' },
  {
    stage: 'decision',
    name: 'Power BI y DAX',
    icon: 'simple-icons:powerbi',
    context: 'Tableros para gerencias del MINEDU',
  },
  {
    stage: 'decision',
    name: 'Modelos predictivos en Python',
    icon: 'simple-icons:python',
    context: 'Proyección del cierre de programas',
  },
  {
    stage: 'decision',
    name: 'Power Automate',
    icon: 'simple-icons:powerautomate',
    context: 'Envío masivo de correos a docentes',
  },
];

export interface ExtraSkill {
  name: string;
  icon: string;
}

/** "También uso": herramientas y metodologías que no pertenecen a una sola etapa. */
export const alsoUse: readonly ExtraSkill[] = [
  { name: 'RStudio', icon: 'simple-icons:rstudioide' },
  { name: 'Oracle Database', icon: 'simple-icons:oracle' },
  { name: 'Git', icon: 'simple-icons:git' },
  { name: 'Scrum', icon: 'ph:arrows-clockwise-fill' },
  { name: 'Kanban', icon: 'ph:kanban-fill' },
];
