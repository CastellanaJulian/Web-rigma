## ADDED Requirements

### Requirement: Singleton contactoPage con imagen institucional
El schema `contactoPage` SHALL ser un documento singleton con un campo `imagen` de tipo `image` con `hotspot: true` y description "Recomendado: vertical 3:4, mínimo 800px de ancho".

#### Scenario: Un único documento editable
- **WHEN** el cliente accede a "Contacto" en el Studio
- **THEN** ve directamente el formulario con el campo de imagen (singleton, sin lista)

#### Scenario: Cliente ajusta punto focal
- **WHEN** el cliente sube una imagen vertical
- **THEN** puede mover el punto focal para controlar cómo se recorta en distintos tamaños
