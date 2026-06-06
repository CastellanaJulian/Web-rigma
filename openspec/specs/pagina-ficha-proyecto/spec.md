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

La sección de planos SHALL mostrar los planos en un acordeón con animación de apertura. Cada plano muestra su imagen, un nombre (label) y una descripción (description) debajo. Al hacer click, se abre un lightbox con la imagen ampliada, el label y la description del plano. El modal se cierra al hacer click fuera de la imagen. La animación `accordionDown` (opacity 0→1, translateY -4px→0, duración 0.5s) se aplica al contenedor que se expande.

#### Scenario: Acordeón expande un grupo a la vez

- **WHEN** el usuario hace click en el encabezado de un grupo
- **THEN** ese grupo se expande con animación `accordionDown` y muestra sus planos; el grupo anterior se cierra

#### Scenario: Descripción visible bajo el nombre del plano

- **WHEN** la sección está visible y un grupo está expandido
- **THEN** cada tarjeta de plano muestra el `label` (ej: "Plano 1") y la `description` (ej: "4 ambientes 112 m²") debajo

#### Scenario: Descripción visible en lightbox

- **WHEN** el usuario hace click en un plano y se abre el lightbox
- **THEN** el modal muestra la imagen ampliada, el `label` del plano y la `description` debajo

#### Scenario: Lightbox bloquea el scroll

- **WHEN** el lightbox está abierto
- **THEN** `body.overflow: hidden` previene el scroll de la página

#### Scenario: Lightbox se cierra al hacer click fuera

- **WHEN** el usuario hace click en el overlay del lightbox
- **THEN** el modal se cierra y el scroll se restaura

---

### Requirement: LocationSection con mapa y POIs interactivos

La sección de ubicación SHALL tener fondo `#E3E3E3`. En la columna derecha, encima de las cards de POI, SHALL mostrar un título con el barrio/ubicación del proyecto y un párrafo de descripción de ubicación (si `project.locationDescription` está definido). Las cards de POI SHALL usar el diseño del sistema: padding `12px 14px`, sin box de icono (SVG directo), sin label de categoría, border transparente que se activa en hover con color accent, nombre en color accent cuando activo. El grid SHALL ser `1fr 380px`. Los popups Leaflet SHALL usar estilos del sistema: border-radius 2px, box-shadow `0 8px 32px rgba(0,0,0,0.14)`, botón de cierre con padding interno. La interacción SHALL ser bidireccional: hover en card → abre popup del marker en el mapa; hover en marker del mapa → resalta la card correspondiente en la lista.

#### Scenario: Fondo gris en la sección

- **WHEN** la sección de ubicación es visible
- **THEN** el fondo de la sección es `#E3E3E3`

#### Scenario: Título y bajada de ubicación visibles

- **WHEN** el proyecto tiene `neighborhood` o `location` definidos
- **THEN** la columna derecha muestra el nombre del barrio/ubicación como título encima de las cards de POI

#### Scenario: Bajada de ubicación condicional

- **WHEN** `project.locationDescription` está definido
- **THEN** se muestra un párrafo de descripción entre el título y las cards de POI

#### Scenario: Hover en lista resalta marker en mapa

- **WHEN** el usuario hace hover sobre un POI en la lista lateral
- **THEN** el popup del marker correspondiente en el mapa se abre automáticamente

#### Scenario: Hover en marker resalta card en lista

- **WHEN** el usuario hace hover sobre un marker POI en el mapa
- **THEN** la card correspondiente en la lista lateral se resalta (background accent suave + border accent)

#### Scenario: Popups con estilos del sistema

- **WHEN** se abre cualquier popup del mapa (proyecto o POI)
- **THEN** el popup tiene border-radius 2px, box-shadow `0 8px 32px rgba(0,0,0,0.14)` y el botón de cierre tiene padding interior visible

#### Scenario: Mapa centrado en el proyecto

- **WHEN** la sección carga
- **THEN** el mapa está centrado en `project.coordinates` con zoom 15

---

### Requirement: Tipo Plan con descripción obligatoria

El tipo `Project` SHALL usar `plans?: Plan[]` donde `Plan = { src: string; description: string }`. La descripción de cada plano es un campo requerido (no opcional). Todos los proyectos que tengan planos MUST tener una descripción por cada plano en sus datos.

#### Scenario: Plano sin descripción no puede existir en los datos

- **WHEN** se define un plano en `projects.ts`
- **THEN** TypeScript fuerza la presencia del campo `description` en cada objeto `Plan`
