/**
 * Textos de "Sobre mí". Se editan aquí y se reflejan en la portada.
 * Lo que va entre **dobles asteriscos** se resalta con el color del capítulo.
 */
export const about = {
  /** Frase de entrada; la parte entre ** se pinta en cian. */
  headline: 'De ordenar procesos a **ordenar datos**.',
  chapters: [
    {
      title: 'De dónde vengo',
      icon: 'ph:path-fill',
      text: '¡Hola! Soy Marcelo, analista de datos con formación en **Ingeniería de Sistemas y Computación**. Antes de dedicarme a los datos trabajé en **logística, administración y soporte técnico**. Di el paso al análisis gracias a la constancia y a las ganas de aprender, y hoy los datos son mi día a día.',
    },
    {
      title: 'Qué hago hoy',
      icon: 'ph:chart-line-up-fill',
      text: 'Con **más de dos años de experiencia**, mi trabajo abarca **el camino completo del dato**: creo programas que recolectan la información, la limpio, la ordeno en una base y la convierto en decisiones a través del **storytelling con datos**. También automatizo tareas repetitivas para que el equipo dedique su tiempo a analizar.',
    },
    {
      title: 'Hacia dónde voy',
      icon: 'ph:rocket-launch-fill',
      text: 'Sigo aprendiendo y explorando nuevas tecnologías, con especial interés en la **inteligencia artificial**. Me certifiqué como **Associate Data Engineer** y **Associate Data Analyst**, y modero talleres de datos e inteligencia artificial en **Data Science Research Perú**.',
    },
  ],
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
} as const;

/** Separa un texto en partes normales y resaltadas (las que van entre **). */
export function highlights(text: string): { text: string; strong: boolean }[] {
  return text
    .split('**')
    .map((part, index) => ({ text: part, strong: index % 2 === 1 }))
    .filter((part) => part.text.length > 0);
}
