## ADDED Requirements

### Requirement: Grilla de proyectos En Ejecución en la página de Inicio

La página de Inicio SHALL mostrar una sección "Proyectos Destacados" con todos los proyectos cuyo `status` es `'En Ejecución'`, usando el componente `ProjectCard`. El layout es una grilla de 6 columnas donde cada card ocupa 3 columnas (mitad del ancho) con altura fija de 460px en desktop.

La sección incluye: `SectionLabel`, título "Nuestros desarrollos" y un link "Ver todos los proyectos →" que navega a `/proyectos`.

#### Scenario: Solo proyectos En Ejecución

- **WHEN** se renderiza la sección Proyectos Destacados
- **THEN** solo aparecen proyectos con `status === 'En Ejecución'`, nunca los Terminados

#### Scenario: Link a todos los proyectos

- **WHEN** el usuario hace click en "Ver todos los proyectos →"
- **THEN** navega a `/proyectos`

### Requirement: ProjectCard — card de proyecto con imagen y hover

El componente `ProjectCard` SHALL mostrar la imagen del proyecto a pantalla completa con un gradiente overlay oscuro en la parte inferior. Al hacer hover, la card escala levemente (1.015). El contenido inferior muestra: `StatusPill`, nombre del proyecto (uppercase, 36px), ubicación y el texto "VER PROYECTO →" que cambia a color accent en hover.

Al hacer click en la card, navega a `/proyectos/[slug]`.

#### Scenario: Hover escala la card

- **WHEN** el usuario hace hover sobre una ProjectCard
- **THEN** la card escala a 1.015 con transición suave de 0.5s y el texto "VER PROYECTO →" cambia a color accent

#### Scenario: Click navega a la ficha

- **WHEN** el usuario hace click en una ProjectCard
- **THEN** navega a `/proyectos/[slug]` del proyecto correspondiente
