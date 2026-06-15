## MODIFIED Requirements

### Requirement: Sección de ubicación con título y polígono dinámicos
La ficha de proyecto SHALL mostrar la sección de mapa cuando `project.coordinates` está definido (comportamiento sin cambio). El título del sidebar SHALL leer de `project.locationTitle`. El polígono del barrio SHALL dibujarse dinámicamente usando `project.barrio` vía Nominatim. Si `project.barrio` está vacío, el polígono no se dibuja.

#### Scenario: Mapa con título y polígono dinámicos
- **WHEN** `project.locationTitle = "Mataderos, CABA"` y `project.barrio = "Mataderos"`
- **THEN** el sidebar muestra "Mataderos, CABA" y el mapa dibuja el polígono del barrio Mataderos

#### Scenario: Mapa sin polígono
- **WHEN** `project.coordinates` está definido pero `project.barrio` está vacío
- **THEN** la sección de mapa se renderiza con el marker del proyecto pero sin polígono de barrio

#### Scenario: Mapa oculto cuando no hay coordenadas
- **WHEN** `project.coordinates` es undefined
- **THEN** la sección Ubicación no se renderiza (sin cambio respecto al comportamiento actual)
