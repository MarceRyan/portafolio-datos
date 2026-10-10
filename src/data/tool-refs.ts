export interface ToolRef {
  name: string;
  /** Icono de Iconify (`coleccion:nombre`). Sin icono se usa el monograma. */
  icon?: string;
  monogram?: string;
  /** Color oficial de la marca, para logos que solo existen en una tinta. */
  color?: string;
}

/** Herramientas reutilizables en experiencia y casos. */
export const toolRef = {
  python: { name: 'Python', icon: 'logos:python' },
  excel: { name: 'Excel', icon: 'simple-icons:microsoftexcel', color: '#21A366' },
  sql: { name: 'SQL', monogram: 'SQL' },
  sqlServer: { name: 'SQL Server', icon: 'devicon:microsoftsqlserver' },
  ssis: { name: 'SSIS', monogram: 'SSIS' },
  powerBi: { name: 'Power BI', icon: 'logos:microsoft-power-bi' },
  powerAutomate: { name: 'Power Automate', icon: 'simple-icons:powerautomate', color: '#0066FF' },
  selenium: { name: 'Selenium', icon: 'logos:selenium' },
  appsScript: { name: 'Apps Script', icon: 'simple-icons:googleappsscript', color: '#4285F4' },
  sheets: { name: 'Google Sheets', icon: 'simple-icons:googlesheets', color: '#34A853' },
  forms: { name: 'Formularios', icon: 'simple-icons:googleforms', color: '#7248B9' },
  java: { name: 'Java', icon: 'logos:java' },
  mysql: { name: 'MySQL', icon: 'logos:mysql-icon' },
  claude: { name: 'Claude', icon: 'logos:claude-icon' },
  rstudio: { name: 'RStudio', icon: 'devicon:rstudio' },
} as const satisfies Record<string, ToolRef>;

const byName = new Map<string, ToolRef>(Object.values(toolRef).map((tool) => [tool.name, tool]));

/** Resuelve nombres del frontmatter a herramientas; los desconocidos usan un monograma. */
export function resolveTool(name: string): ToolRef {
  return byName.get(name) ?? { name, monogram: name.slice(0, 3).toUpperCase() };
}

export function resolveTools(names: readonly string[]): ToolRef[] {
  return names.map(resolveTool);
}
