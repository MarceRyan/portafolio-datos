---
name: redactar-caso
description: Redacta o mejora el texto de un caso de estudio del portafolio de Marcelo con su estructura (contexto, problema, datos, arquitectura, solución, resultados) sin inventar nada. Úsala al escribir o revisar el cuerpo de un .mdx de src/content/casos.
---

# Redactar un caso

El lector es un reclutador o líder técnico que dedica menos de un minuto. El caso debe responder: ¿qué pregunta había?, ¿qué construyó Marcelo?, ¿qué se pudo decidir?

## Reglas de contenido

- **Solo hechos que Marcelo dio.** Cifras, fechas, nombres de herramientas, tamaños de datos y resultados salen de él. Si falta uno, pregúntalo o anota `TODO(marcelo): ...` en un comentario MDX `{/* ... */}`; en pantalla nunca va la palabra TODO.
- **Omite secciones sin datos reales.** Mejor un caso corto y verdadero que uno largo y genérico.
- Voz en primera persona, verbos concretos ("extraje", "modelé", "automaticé"). Sin "apasionado", "transformo datos en insights", "solución robusta", "de manera eficiente".
- Sin rayas largas (em dash). Usa coma, punto o guion corto.
- Los casos confidenciales no exponen datos reales ni nombres internos; la página ya muestra el aviso.

## Estructura (omite lo que no tenga datos)

1. **Contexto**: dónde y para quién, en 2 o 3 líneas.
2. **Problema**: la pregunta de negocio, sin jerga.
3. **Datos**: de dónde vienen (texto, JSON, bases, archivos); el volumen solo si es real.
4. **Arquitectura**: el `<Flow>`; el caption dice cómo viaja el dato de crudo a decisión.
5. **Solución**: decisiones técnicas y por qué (modelo, transformaciones, automatización).
6. **Resultados**: solo cifras reales. Lo medible también va en `impact` del frontmatter.

## Resumen y pregunta

- `question`: una pregunta que haría la gerencia, no el analista.
- `summary`: una frase, qué se construyó y con qué.

Al terminar, relee: si hay algo que Marcelo no dijo, quítalo.
