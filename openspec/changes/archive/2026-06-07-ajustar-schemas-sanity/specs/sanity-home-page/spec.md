## ADDED Requirements

### Requirement: Featured slot sin imagen propia
El featuredSlot en `homePage` SHALL contener solo una referencia al proyecto (`project: reference`), sin campo `coverImage` propio. La imagen que se muestra en la grilla del Inicio se toma directamente de `project.coverImage`.

#### Scenario: Slot sin imagen duplicada
- **WHEN** el cliente configura un proyecto destacado en el Inicio
- **THEN** solo ve el campo "Proyecto" (referencia) sin campo de imagen adicional

### Requirement: Imagen del snippet Nosotros
El documento `homePage` SHALL tener un campo `imagenNosotros` de tipo `image` con `hotspot: true` y description que indique el ratio recomendado.

#### Scenario: Cliente carga imagen del snippet
- **WHEN** el cliente edita la página de Inicio
- **THEN** puede subir y recortar con punto focal la imagen que acompaña el snippet de Nosotros
