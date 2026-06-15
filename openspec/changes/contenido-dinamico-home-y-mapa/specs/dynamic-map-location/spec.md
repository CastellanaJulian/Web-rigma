## ADDED Requirements

### Requirement: locationTitle editable por proyecto
El schema `project` SHALL tener un campo `locationTitle` (string, required) en el fieldset `ubicacion`. Este campo SHALL alimentar el título que se muestra en el sidebar de la sección del mapa en la ficha.

#### Scenario: Título personalizado en el mapa
- **WHEN** `project.locationTitle = "Mataderos, CABA"`
- **THEN** el sidebar del mapa muestra "Mataderos, CABA" como encabezado

### Requirement: barrio para polígono dinámico
El schema `project` SHALL tener un campo `barrio` (string, opcional) en el fieldset `ubicacion`, con description clara de que delimita el polígono en el mapa. Si está vacío, no se dibuja polígono.

#### Scenario: Polígono dibujado con barrio cargado
- **WHEN** `project.barrio = "Mataderos"`
- **THEN** `LocationSection` hace fetch a Nominatim con `q=Mataderos,Buenos+Aires,Argentina` y dibuja el polígono dorado

#### Scenario: Sin polígono cuando barrio está vacío
- **WHEN** `project.barrio` es undefined o string vacío
- **THEN** `LocationSection` no hace el fetch a Nominatim y el mapa muestra solo el marker del proyecto

### Requirement: LocationSection recibe barrio como prop
`LocationSection` SHALL recibir `barrio?: string` como prop y usarlo en la URL de Nominatim en lugar del string hardcodeado. La URL SHALL ser construida como: `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(barrio)},Buenos+Aires,Argentina&format=geojson&polygon_geojson=1&limit=1`.

#### Scenario: Barrio con espacios o caracteres especiales
- **WHEN** `project.barrio = "Villa del Parque"`
- **THEN** la URL usa `encodeURIComponent` y Nominatim devuelve el polígono correcto
