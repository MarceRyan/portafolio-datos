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
  /** Color oficial de la marca, para logos que solo existen en una tinta. */
  color?: string;
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
    name: 'Encontrar',
    description: 'Los datos nacen sueltos en hojas, formularios, archivos y páginas web.',
    state: 'raw',
  },
  {
    id: 'extraccion',
    number: 2,
    name: 'Recolectar',
    description: 'Programas que los traen solos, sin descargas a mano.',
    state: 'raw',
  },
  {
    id: 'transformacion',
    number: 3,
    name: 'Limpiar',
    description: 'Quito errores y registros que no sirven, y les doy un mismo formato.',
    state: 'clean',
  },
  {
    id: 'modelado',
    number: 4,
    name: 'Ordenar',
    description: 'Los guardo en una base ordenada, lista para consultar y cruzar.',
    state: 'clean',
  },
  {
    id: 'decision',
    number: 5,
    name: 'Decidir',
    description: 'Convierto los datos en información clara para tomar mejores decisiones.',
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
    color: '#21A366',
    context: 'Hojas de cálculo donde se registra y comparte la información del día a día',
  },
  {
    stage: 'fuentes',
    name: 'Formularios',
    icon: 'simple-icons:googleforms',
    color: '#7248B9',
    context: 'Encuestas y registros que la gente llena y que se guardan solos en una tabla',
  },
  // TODO(marcelo): confirmar o ajustar las descripciones de abajo con tus casos reales.
  {
    stage: 'fuentes',
    name: 'Texto y CSV',
    icon: 'ph:file-csv-fill',
    context: 'Archivos de texto separados por columnas, fáciles de leer y cargar',
  },
  {
    stage: 'fuentes',
    name: 'JSON',
    icon: 'simple-icons:json',
    color: '#F5A623',
    context: 'Datos que entregan las aplicaciones y que se pasan a tablas',
  },
  {
    stage: 'fuentes',
    name: 'Páginas web',
    icon: 'ph:globe-fill',
    context: 'Información publicada en internet que se puede leer de forma automática',
  },
  {
    stage: 'extraccion',
    name: 'Python',
    icon: 'logos:python',
    context: 'Scripts que juntan, limpian y cruzan datos sin trabajo manual',
  },
  {
    stage: 'extraccion',
    name: 'Selenium',
    icon: 'logos:selenium',
    context: 'Un navegador que se maneja solo para descargar información de una web',
  },
  {
    stage: 'extraccion',
    name: 'Apps Script',
    icon: 'simple-icons:googleappsscript',
    color: '#4285F4',
    context: 'Pequeños programas que automatizan tareas en hojas, correos y formularios',
  },
  {
    stage: 'transformacion',
    name: 'SSIS',
    monogram: 'SSIS',
    context: 'Flujos que cargan los datos paso a paso, en orden y a la hora indicada',
  },
  {
    stage: 'transformacion',
    name: 'SQL',
    monogram: 'SQL',
    context: 'Consultas para filtrar, revisar y corregir miles de registros a la vez',
  },
  {
    stage: 'transformacion',
    name: 'Power Query',
    monogram: 'PQ',
    context: 'Limpia y da forma a los datos antes de usarlos en un reporte',
  },
  {
    stage: 'modelado',
    name: 'SQL Server',
    icon: 'devicon:microsoftsqlserver',
    context: 'Base de datos donde la información queda guardada y lista para consultar',
  },
  {
    stage: 'modelado',
    name: 'PostgreSQL',
    icon: 'logos:postgresql',
    context: 'Base de datos libre para guardar y consultar tablas',
  },
  {
    stage: 'modelado',
    name: 'Snowflake',
    icon: 'logos:snowflake-icon',
    context: 'Almacén de datos en la nube que crece según lo que se necesite',
  },
  {
    stage: 'modelado',
    name: 'Modelado dimensional',
    monogram: 'MD',
    context: 'Ordena los datos en tablas conectadas para responder preguntas rápido',
  },
  {
    stage: 'decision',
    name: 'Power BI y DAX',
    icon: 'logos:microsoft-power-bi',
    context: 'Tableros interactivos que muestran lo importante de un vistazo',
  },
  {
    stage: 'decision',
    name: 'Modelos predictivos en Python',
    icon: 'logos:python',
    context: 'Estima qué va a pasar a partir de lo que ya pasó',
  },
  {
    stage: 'decision',
    name: 'Power Automate',
    icon: 'simple-icons:powerautomate',
    color: '#0066FF',
    context: 'Flujos que envían correos y avisos de forma automática',
  },
];
