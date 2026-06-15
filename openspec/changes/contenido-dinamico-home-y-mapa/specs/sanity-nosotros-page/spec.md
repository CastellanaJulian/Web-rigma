## ADDED Requirements

### Requirement: Campos de contenido del snippet en nosotrosPage
El schema `nosotrosPage` SHALL incluir los campos: `snippetTitulo` (string), `snippetTexto` (text, rows: 4), `metricaM2` (number, description: "Ej: 32000") y `metricaUnidades` (number, description: "Ej: 220"). Estos campos SHALL aparecer agrupados bajo un fieldset o sección "Snippet — Inicio" en el Studio para diferenciarlos de los campos de imagen.

#### Scenario: Cliente completa el snippet desde el Studio
- **WHEN** el cliente accede a "Nosotros" en el Studio
- **THEN** ve los campos de imagen existentes y además la sección "Snippet — Inicio" con título, texto y métricas

#### Scenario: Campos opcionales no bloquean publicación
- **WHEN** el cliente deja `snippetTitulo` vacío
- **THEN** puede publicar el documento y el frontend usa el fallback hardcodeado
