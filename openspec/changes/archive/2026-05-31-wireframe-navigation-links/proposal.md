## Why

Los wireframes de las 5 páginas del sitio están completos como archivos HTML independientes pero sin conexión entre sí. Conectarlos permite validar el flujo de navegación como prototipo antes de pasar al desarrollo en Next.js.

## What Changes

- Los ítems del navbar (`<span>`) en las 5 páginas se convierten en `<a href>` que navegan en la misma pestaña
- El CTA "Ver todos los proyectos →" en `inicio.html` pasa a ser un link a `proyectos.html` (nueva pestaña)
- La card de Cosquín 1534 en `inicio.html` pasa a ser clickeable hacia `ficha-proyecto.html` (nueva pestaña)
- La card de Cosquín 1534 en `proyectos.html` pasa a ser clickeable hacia `ficha-proyecto.html` (nueva pestaña)
- Las cards de otros proyectos (Zelada, Larrazábal) no reciben ningún link ni cambio de diseño
- La sección "Siguiente proyecto" en `ficha-proyecto.html` no se toca

## Capabilities

### New Capabilities

- `wireframe-navigation`: Navegación funcional entre los wireframes HTML del prototipo

### Modified Capabilities

## Impact

- Archivos afectados: `Wireframes/inicio.html`, `Wireframes/proyectos.html`, `Wireframes/ficha-proyecto.html`, `Wireframes/nosotros.html`, `Wireframes/contacto.html`
- Sin impacto en el código Next.js (`dev/`)
- Sin cambios de diseño, solo atributos de navegación
