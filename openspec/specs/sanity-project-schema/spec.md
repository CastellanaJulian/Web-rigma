## ADDED Requirements

### Requirement: Puntos de interés estructurados
El schema de Proyecto SHALL tener un campo `pointsOfInterest` como array de objetos, reemplazando el anterior `nearbyPoints: string[]`. Cada objeto SHALL contener: `name` (string, required), `category` (string, dropdown con opciones Transporte/Salud/Educación/Comercio, required), `detail` (string, opcional), `coordinates` (geopoint, opcional).

#### Scenario: Cliente carga un punto de interés
- **WHEN** el cliente abre un proyecto en el Studio y agrega un ítem a "Puntos de interés cercanos"
- **THEN** el formulario muestra campos de Nombre, Categoría (dropdown), Detalle y Ubicación (mapa interactivo geopoint)

#### Scenario: Categoría determina ícono en frontend
- **WHEN** el campo `category` tiene valor "Transporte"
- **THEN** el frontend puede mapear ese valor a un ícono sin necesidad de campo de ícono adicional

### Requirement: Descripción de ubicación
El schema de Proyecto SHALL tener un campo `locationDescription` de tipo `text` (3 rows) para texto descriptivo de la zona del proyecto.

#### Scenario: Campo disponible en el Studio
- **WHEN** el cliente edita un proyecto
- **THEN** puede escribir un párrafo descriptivo de la ubicación en el campo "Descripción de la zona"

### Requirement: Validaciones en campos clave
Los campos `title`, `slug` y `status` SHALL tener `validation: r.required()`. El campo `order` SHALL tener `validation: r.min(1)`. El campo `progress` ya tiene min(0)/max(100) y se mantiene.

#### Scenario: Intento de publicar proyecto sin nombre
- **WHEN** el cliente intenta publicar un proyecto sin completar `title`
- **THEN** Sanity muestra error de validación y bloquea la publicación

### Requirement: Descriptions de ayuda en campos
Los campos `slug`, `order`, `coverImage`, `images`, `plans`, `coordinates`, `relatedProject` SHALL tener una `description` en español que oriente al cliente sobre qué ingresar o cómo usar el campo.

#### Scenario: Cliente ve ayuda contextual
- **WHEN** el cliente abre el campo `coordinates`
- **THEN** ve el texto "Buscá la dirección y soltá el pin" debajo del label

### Requirement: Planos con descripción
El campo `plans` del schema de Proyecto SHALL ser un array de objetos `{ imagen: image, descripcion: string }`, reemplazando el anterior array de `image` plano. Esto SHALL permitir asociar una leyenda de tipología a cada plano (ej. "4 ambientes 112 m²").

#### Scenario: Cliente carga un plano con leyenda
- **WHEN** el cliente agrega un ítem a "Planos" en el Studio
- **THEN** el formulario muestra un campo de imagen y un campo de descripción para la leyenda del plano

#### Scenario: Frontend muestra la leyenda del plano
- **WHEN** la ficha de un proyecto renderiza la sección de planos
- **THEN** cada plano se muestra con su imagen y su descripción asociada
