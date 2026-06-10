## ADDED Requirements

### Requirement: Planos con descripción
El campo `plans` del schema de Proyecto SHALL ser un array de objetos `{ imagen: image, descripcion: string }`, reemplazando el anterior array de `image` plano. Esto SHALL permitir asociar una leyenda de tipología a cada plano (ej. "4 ambientes 112 m²").

#### Scenario: Cliente carga un plano con leyenda
- **WHEN** el cliente agrega un ítem a "Planos" en el Studio
- **THEN** el formulario muestra un campo de imagen y un campo de descripción para la leyenda del plano

#### Scenario: Frontend muestra la leyenda del plano
- **WHEN** la ficha de un proyecto renderiza la sección de planos
- **THEN** cada plano se muestra con su imagen y su descripción asociada
