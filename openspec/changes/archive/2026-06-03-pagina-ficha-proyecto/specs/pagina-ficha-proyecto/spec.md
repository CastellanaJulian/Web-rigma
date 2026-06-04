## ADDED Requirements

### Requirement: Secciones condicionales según disponibilidad de datos

La ficha de proyecto SHALL mostrar u ocultar secciones según los datos disponibles del proyecto. Las secciones condicionales son: galería (requiere `images.length > 0`), planos (requiere `plans.length > 0`), ubicación/mapa (requiere `coordinates`), y proyecto relacionado (requiere `relatedProject`).

#### Scenario: Galería oculta cuando no hay imágenes

- **WHEN** `project.images` está vacío
- **THEN** la sección Galería no se renderiza

#### Scenario: Mapa oculto cuando no hay coordenadas

- **WHEN** `project.coordinates` es undefined
- **THEN** la sección Ubicación no se renderiza

#### Scenario: POIs visibles solo cuando existen

- **WHEN** el mapa está visible pero `project.pointsOfInterest` es vacío o undefined
- **THEN** el mapa muestra solo el marker del proyecto, sin lista de POIs ni markers secundarios

---

### Requirement: KeyDataStrip con ítems dinámicos

La ficha SHALL mostrar una barra horizontal con datos clave debajo del hero. Cada ítem solo se muestra si tiene valor. El ítem "Avance de obra" incluye una barra de progreso visual si `project.progress` existe.

#### Scenario: Barra de progreso visible solo para proyectos En Ejecución

- **WHEN** el proyecto tiene `progress` definido (ej: 60)
- **THEN** el ítem "Avance de obra" muestra el porcentaje y una barra de progreso accent

#### Scenario: Ítems sin valor no se muestran

- **WHEN** `project.highlights.delivery` es undefined
- **THEN** el ítem "Entrega estimada" no aparece en el strip

---

### Requirement: GaleriaSection con zoom en hover

La sección de galería SHALL mostrar las imágenes del proyecto en un grid asimétrico. Al hacer hover sobre cualquier imagen, la imagen escala a 1.04 con una transición suave y aparece un overlay semitransparente oscuro.

#### Scenario: Zoom en hover

- **WHEN** el usuario hace hover sobre una imagen de la galería
- **THEN** la imagen escala a 1.04 con transición 0.5s y aparece overlay `rgba(30,30,30,0.15)`

---

### Requirement: PlanosSection con acordeón y lightbox

La sección de planos SHALL mostrar los planos agrupados por tipología en un acordeón. Al hacer click en un plano, se abre un lightbox/modal a pantalla completa con la imagen ampliada. El modal se cierra al hacer click fuera de la imagen.

#### Scenario: Acordeón expande un grupo a la vez

- **WHEN** el usuario hace click en el encabezado de un grupo
- **THEN** ese grupo se expande y muestra sus planos; el grupo anterior se cierra

#### Scenario: Lightbox bloquea el scroll

- **WHEN** el lightbox está abierto
- **THEN** `body.overflow: hidden` previene el scroll de la página

#### Scenario: Lightbox se cierra al hacer click fuera

- **WHEN** el usuario hace click en el overlay del lightbox
- **THEN** el modal se cierra y el scroll se restaura

---

### Requirement: LocationSection con mapa y POIs interactivos

La sección de ubicación SHALL mostrar un mapa Leaflet con el marker del proyecto (accent) y, si los hay, markers de POIs con iconos según su categoría. Al hacer hover sobre un POI en la lista lateral, el popup del marker correspondiente se abre en el mapa.

#### Scenario: Hover en lista resalta marker en mapa

- **WHEN** el usuario hace hover sobre un POI en la lista lateral
- **THEN** el popup del marker correspondiente en el mapa se abre automáticamente

#### Scenario: Mapa centrado en el proyecto

- **WHEN** la sección carga
- **THEN** el mapa está centrado en `project.coordinates` con zoom 15
