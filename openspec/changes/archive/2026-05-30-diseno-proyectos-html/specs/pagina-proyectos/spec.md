## ADDED Requirements

### Requirement: Página de listado con header de sección
La página Proyectos SHALL mostrar un header con SectionLabel "Proyectos", título H1 "Nuestros proyectos" y subtítulo descriptivo. El header SHALL usar los tokens del sistema aprobado (fondo `bg` #FBFBFB, título en `ink` 700 56px).

#### Scenario: Header visible al cargar la página
- **WHEN** el usuario navega a la página Proyectos
- **THEN** se muestra el header con SectionLabel, H1 y subtítulo antes de los filtros

### Requirement: Filtros de proyectos por estado
La página SHALL incluir FilterTabs con tres opciones: "Todos", "En ejecución", "Terminados". El tab activo SHALL mostrar underline de 2px en `t.accent` (#B59969) y texto en `t.ink` peso 600. Los tabs inactivos SHALL mostrar texto en `t.textSecondary` peso 500.

#### Scenario: Filtro activo por defecto
- **WHEN** el usuario carga la página
- **THEN** el tab "Todos" está activo con underline accent

#### Scenario: Cambio de filtro
- **WHEN** el usuario hace click en "En ejecución"
- **THEN** solo se muestran proyectos con status "En Ejecución" y el tab cambia a activo

#### Scenario: Filtro sin resultados
- **WHEN** el filtro activo no tiene proyectos disponibles
- **THEN** se muestra el EmptyState con mensaje y CTA de WhatsApp

### Requirement: Grilla de proyectos con jerarquía visual LG/MD
La grilla SHALL usar CSS Grid de 6 columnas con gap 16px. Los proyectos En Ejecución SHALL ocupar `span 3` (LG, height 460px). Los proyectos Terminados SHALL ocupar `span 2` (MD, aspectRatio 4/5). Cuando el filtro es "Todos", los proyectos En Ejecución SHALL mostrarse primero.

#### Scenario: Vista "Todos" con proyectos mixtos
- **WHEN** el filtro es "Todos" y hay proyectos En Ejecución y Terminados
- **THEN** los En Ejecución aparecen arriba en cards LG y los Terminados debajo en cards MD

#### Scenario: Vista "En ejecución" con solo proyectos activos
- **WHEN** el filtro es "En ejecución"
- **THEN** todos los proyectos se muestran en cards LG (span 3)

#### Scenario: Vista "Terminados" con solo proyectos finalizados
- **WHEN** el filtro es "Terminados"
- **THEN** todos los proyectos se muestran en cards MD (span 2)

### Requirement: ProjectCard con hover y contenido en overlay
Cada card SHALL mostrar imagen de proyecto con overlay gradiente oscuro (bottom-to-top). El contenido sobre overlay SHALL incluir: StatusPill dark, nombre del proyecto (UPPERCASE), ubicación y CTA "VER PROYECTO →". Al hover, la card SHALL escalar a `scale(1.015)` con `transition 0.5s ease`. El CTA SHALL cambiar a color `t.accent` al hover.

#### Scenario: Hover en card LG
- **WHEN** el usuario hace hover sobre una card LG
- **THEN** la card escala suavemente y el texto "VER PROYECTO →" cambia a color accent

#### Scenario: Contenido mínimo de la card
- **WHEN** se renderiza cualquier card
- **THEN** se muestran StatusPill, nombre del proyecto, ubicación y CTA "VER PROYECTO →"

### Requirement: NavBar con ítem activo "PROYECTOS"
La NavBar SHALL marcar "PROYECTOS" como el ítem activo con underline `1.5px solid t.accent` y color `t.ink`. Los demás ítems SHALL mostrar color `t.textSecondary` sin underline.

#### Scenario: Estado activo correcto en página Proyectos
- **WHEN** se renderiza la página Proyectos
- **THEN** el ítem "PROYECTOS" en la NavBar tiene underline accent y los demás no

### Requirement: Sección de contacto con formulario completo
La página SHALL incluir la sección ContactoSection idéntica a la del `index.html`: fondo `t.ink`, formulario con campos Nombre, Celular, Email, Proyecto de interés (select), Mensaje, y botón "ENVIAR CONSULTA" con hover a `t.accent`.

#### Scenario: Formulario presente en la página
- **WHEN** el usuario hace scroll hasta el final de la grilla
- **THEN** encuentra el formulario de contacto completo en fondo oscuro
