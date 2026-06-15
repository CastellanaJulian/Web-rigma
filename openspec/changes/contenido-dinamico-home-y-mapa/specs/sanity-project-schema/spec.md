## ADDED Requirements

### Requirement: Campos locationTitle y barrio en fieldset ubicacion
El schema `project` SHALL tener dos nuevos campos en el fieldset `ubicacion`: `locationTitle` (string) con description "Título que se muestra como encabezado en la sección del mapa. Ej: Mataderos, CABA" y `barrio` (string) con description "Nombre del barrio para delimitar el polígono en el mapa. Debe coincidir con un barrio reconocible por OpenStreetMap. Ej: Mataderos. Si se deja vacío, no se dibuja el área en el mapa."

#### Scenario: Cliente ve los campos en el Studio
- **WHEN** el cliente abre un proyecto y expande el fieldset "Ubicación"
- **THEN** ve los campos locationTitle y barrio junto a los campos existentes (coordinates, locationDescription, pointsOfInterest)

#### Scenario: Descripción orientadora del campo barrio
- **WHEN** el cliente coloca el cursor en el campo barrio
- **THEN** lee la descripción que explica que delimita el polígono y da el ejemplo "Mataderos"
