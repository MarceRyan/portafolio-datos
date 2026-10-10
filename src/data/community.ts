export interface Workshop {
  title: string;
  /** Icono de Phosphor que representa el tema del taller. */
  icon: string;
}

export interface Task {
  text: string;
  icon: string;
}

export const community = {
  organization: 'Data Science Research Perú',
  short: 'DSRP',
  role: 'Moderador voluntario',
  since: 'julio de 2026',
  summary:
    'Facilito los talleres y el espacio de preguntas, apoyo al ponente y cierro cada sesión con un resumen propio.',
  /** Lo que hago en cada sesión (el mismo resumen, separado en pasos). */
  tasks: [
    { text: 'Facilito el taller y el espacio de preguntas', icon: 'ph:chats-circle-fill' },
    { text: 'Apoyo al ponente durante la sesión', icon: 'ph:hand-heart-fill' },
    { text: 'Cierro cada sesión con un resumen propio', icon: 'ph:note-pencil-fill' },
  ] satisfies Task[],
  // Talleres que moderé. TODO(marcelo): agregar la fecha de cada taller si quieres mostrarla.
  workshops: [
    { title: 'De escribir código a programar con IA', icon: 'ph:code-fill' },
    { title: 'Taller práctico de IA', icon: 'ph:sparkle-fill' },
    { title: 'Análisis avanzado', icon: 'ph:chart-line-up-fill' },
    { title: 'Documentación y razonamiento con Claude', icon: 'ph:file-text-fill' },
    { title: 'Potencia tu pipeline con IA', icon: 'ph:flow-arrow-fill' },
  ] satisfies Workshop[],
} as const;
