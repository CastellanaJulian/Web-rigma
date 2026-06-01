## ADDED Requirements

### Requirement: Navbar navega entre páginas en misma pestaña
El navbar de cada wireframe SHALL contener links `<a href>` funcionales hacia las otras páginas. La navegación SHALL ocurrir en la misma pestaña (sin `target="_blank"`).

#### Scenario: Click en ítem del navbar desde cualquier página
- **WHEN** el usuario hace click en un ítem del navbar (INICIO, PROYECTOS, NOSOTROS, CONTACTO)
- **THEN** el browser navega a la página correspondiente en la misma pestaña

#### Scenario: Active state del ítem actual se preserva
- **WHEN** el usuario está en una página determinada
- **THEN** el ítem del navbar correspondiente a esa página mantiene su estilo activo (color ink, border-bottom) sin cambios visuales

### Requirement: Card de Cosquín 1534 abre ficha en nueva pestaña
Las cards de Cosquín 1534 en `inicio.html` y `proyectos.html` SHALL ser clickeables y abrir `ficha-proyecto.html` en una nueva pestaña. No SHALL haber ningún cambio visual en el diseño de la card.

#### Scenario: Click en card Cosquín desde inicio
- **WHEN** el usuario hace click en la card de Cosquín 1534 en la página de inicio
- **THEN** se abre `ficha-proyecto.html` en una nueva pestaña

#### Scenario: Click en card Cosquín desde proyectos
- **WHEN** el usuario hace click en la card de Cosquín 1534 en la página de proyectos
- **THEN** se abre `ficha-proyecto.html` en una nueva pestaña

#### Scenario: Cards de otros proyectos no navegan
- **WHEN** el usuario hace click en la card de Zelada 6171 o Av. Larrazábal 1255
- **THEN** no ocurre ninguna navegación

### Requirement: CTA "Ver todos los proyectos" abre proyectos en nueva pestaña
El CTA "Ver todos los proyectos →" en `inicio.html` SHALL ser un link funcional que abre `proyectos.html` en una nueva pestaña.

#### Scenario: Click en CTA desde inicio
- **WHEN** el usuario hace click en "Ver todos los proyectos →" en la página de inicio
- **THEN** se abre `proyectos.html` en una nueva pestaña
