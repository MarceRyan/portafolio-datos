export interface ToolRef {
  name: string;
  /** Icono de Iconify (`coleccion:nombre`). Sin icono se usa el monograma. */
  icon?: string;
  monogram?: string;
}

/** Herramientas reutilizables en experiencia y casos. */
export const toolRef = {
  python: { name: 'Python', icon: 'simple-icons:python' },
  excel: { name: 'Excel', icon: 'simple-icons:microsoftexcel' },
  sql: { name: 'SQL', monogram: 'SQL' },
  sqlServer: { name: 'SQL Server', icon: 'simple-icons:microsoftsqlserver' },
  ssis: { name: 'SSIS', monogram: 'SSIS' },
  powerBi: { name: 'Power BI', icon: 'simple-icons:powerbi' },
  powerAutomate: { name: 'Power Automate', icon: 'simple-icons:powerautomate' },
  selenium: { name: 'Selenium', icon: 'simple-icons:selenium' },
  appsScript: { name: 'Apps Script', icon: 'simple-icons:googleappsscript' },
  sheets: { name: 'Google Sheets', icon: 'simple-icons:googlesheets' },
  forms: { name: 'Formularios', icon: 'simple-icons:googleforms' },
  java: { name: 'Java', icon: 'simple-icons:openjdk' },
  mysql: { name: 'MySQL', icon: 'simple-icons:mysql' },
  claude: { name: 'Claude', icon: 'simple-icons:claude' },
} as const satisfies Record<string, ToolRef>;

const byName = new Map<string, ToolRef>(Object.values(toolRef).map((tool) => [tool.name, tool]));

/** Resuelve nombres del frontmatter a herramientas; los desconocidos usan un monograma. */
export function resolveTool(name: string): ToolRef {
  return byName.get(name) ?? { name, monogram: name.slice(0, 3).toUpperCase() };
}

export function resolveTools(names: readonly string[]): ToolRef[] {
  return names.map(resolveTool);
}
