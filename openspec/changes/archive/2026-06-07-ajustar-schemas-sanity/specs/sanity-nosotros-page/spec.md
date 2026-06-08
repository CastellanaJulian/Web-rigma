## ADDED Requirements

### Requirement: Singleton nosotrosPage con imágenes editoriales
El schema `nosotrosPage` SHALL ser un documento singleton (forzado desde `structure.ts` con documentId fijo) con dos campos de imagen: `imagenHistoria` e `imagenFilosofia`, ambos de tipo `image` con `hotspot: true`.

#### Scenario: Un único documento editable
- **WHEN** el cliente accede a "Nosotros" en el Studio
- **THEN** ve directamente el formulario de edición (sin lista de documentos, es singleton)

### Requirement: Descriptions con ratio recomendado
`imagenHistoria` SHALL tener description "Recomendado: 16:9, mínimo 1200px de ancho". `imagenFilosofia` SHALL tener description "Recomendado: 1:1, mínimo 800px".

#### Scenario: Cliente ve dimensiones recomendadas
- **WHEN** el cliente ve el campo de imagen en el Studio
- **THEN** puede leer el ratio y dimensiones recomendadas antes de subir la imagen
