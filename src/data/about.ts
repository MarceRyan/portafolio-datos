/** Textos de "Sobre mí". Se editan aquí y se reflejan en la portada. */
export const about = {
  headline: 'De ordenar procesos a ordenar datos.',
  story:
    '¡Hola! Soy Marcelo, analista de datos con formación en Ingeniería de Sistemas y Computación. Antes de dedicarme a los datos trabajé en logística, administración y soporte técnico. Di el paso al análisis gracias a la constancia y a las ganas de aprender, y hoy los datos son mi día a día.',
  today:
    'Con más de dos años de experiencia, mi trabajo abarca el camino completo del dato: creo programas que recolectan la información, la limpio, la ordeno en una base y la convierto en decisiones a través del storytelling con datos. También automatizo tareas repetitivas para que el equipo dedique su tiempo a analizar.',
  learning:
    'Sigo aprendiendo y explorando nuevas tecnologías, con especial interés en la inteligencia artificial. Me certifiqué como Associate Data Engineer y Associate Data Analyst, y modero talleres de datos e inteligencia artificial en Data Science Research Perú.',
  /** Tecnologías con las que trabajo (nombres de src/data/tool-refs.ts). */
  tech: [
    'SQL',
    'SQL Server',
    'Python',
    'Power BI',
    'SSIS',
    'Excel',
    'Google Sheets',
    'Apps Script',
    'Power Automate',
    'Selenium',
    'RStudio',
    'Claude',
  ],
  /** Datos rápidos de la ficha (todos salen del CV). */
  facts: [
    {
      label: 'Formación',
      value: 'Bachiller en Ingeniería de Sistemas y Computación',
      icon: 'ph:graduation-cap-fill',
    },
    { label: 'Experiencia', value: 'Más de dos años en datos', icon: 'ph:briefcase-fill' },
    { label: 'Ubicación', value: 'Lima, Perú', icon: 'ph:map-pin-fill' },
    {
      label: 'Busco',
      value: 'Analista de Datos, Analista BI e Ingeniero de Datos',
      icon: 'ph:target-fill',
    },
  ],
} as const;
