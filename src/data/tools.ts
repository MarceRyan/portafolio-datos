export type StageId = 'fuentes' | 'extraccion' | 'transformacion' | 'modelado' | 'decision';
export type DataState = 'raw' | 'clean' | 'decide';

export interface Stage {
  id: StageId;
  number: number;
  name: string;
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
  { id: 'fuentes', number: 1, name: 'Fuentes', state: 'raw' },
  { id: 'extraccion', number: 2, name: 'Extracción', state: 'raw' },
  { id: 'transformacion', number: 3, name: 'Transformación', state: 'clean' },
  { id: 'modelado', number: 4, name: 'Modelado', state: 'clean' },
  { id: 'decision', number: 5, name: 'Decisión', state: 'decide' },
];

// TODO(marcelo): agregar los SVG oficiales en src/assets/icons/ para las herramientas
// con monograma (SSIS, SQL, Power Query, DAX, Campus SIFODS, Modelado dimensional),
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
    name: 'Campus SIFODS',
    monogram: 'SF',
    context: 'Notas y avances de docentes',
  },
  {
    stage: 'fuentes',
    name: 'Formularios',
    icon: 'simple-icons:googleforms',
    context: 'Registro diario de asistencia',
  },
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

export const alsoUse = 'También uso RStudio, Oracle Database, Git, Scrum y Kanban.';
