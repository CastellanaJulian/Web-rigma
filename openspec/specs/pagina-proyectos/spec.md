# pagina-proyectos Specification

## Purpose
TBD - created by archiving change diseno-proyectos-html. Update Purpose after archive.
## Requirements
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
La grilla SHALL usar CSS Grid de 6 columnas con gap 16px. Cuando el filtro es "Todos", los proyectos con `featured: true` SHALL renderizarse primero con `span 3` fijo (fila destacada). Los proyectos restantes (`featured: false`) SHALL renderizarse debajo con span calculado por `getResponsiveSpan(count)`. Cuando el filtro es "En ejecución" o "Terminados", todos los proyectos visibles reciben el mismo span por `getResponsiveSpan`, sin distinción de featured.

#### Scenario: Vista "Todos" con proyectos featured y no-featured
- **WHEN** el filtro es "Todos" y hay 2 proyectos featured y 2 no-featured
- **THEN** los featured aparecen arriba en span 3 cada uno y los no-featured abajo con ancho variable

#### Scenario: Vista "En ejecución"
- **WHEN** el filtro es "En ejecución"
- **THEN** todos los proyectos En Ejecución se muestran con el mismo span (featured ignorado)

#### Scenario: Vista "Terminados"
- **WHEN** el filtro es "Terminados"
- **THEN** todos los proyectos Terminados se muestran con el mismo span (featured ignorado)

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

### Requirement: Transición de filtros con stagger por card
Al cambiar el filtro activo, la sección de la grilla SHALL remontarse (via `key={filter}`) y cada card SHALL entrar con animación `cardEnter` (opacity 0→1, translateY 10px→0, 0.35s ease-out) con `animationDelay` de `index × 60ms`. Las cards con índice 0, 1, 2, 3 entran con delay 0ms, 60ms, 120ms, 180ms respectivamente.

#### Scenario: Stagger al cambiar filtro
- **WHEN** el usuario hace click en un tab de filtro diferente al activo
- **THEN** las cards de la nueva vista entran escalonadas, cada una 60ms después de la anterior

#### Scenario: Primera card sin delay
- **WHEN** se renderiza la grilla
- **THEN** la primera card (índice 0) entra sin delay

### Requirement: Tipografía unificada en ProjectCard
Todas las ProjectCard (independientemente de size LG o MD) SHALL usar el mismo título: `fontSize: 22`, `fontWeight: 700`, `letterSpacing: '-0.01em'`, `textTransform: 'uppercase'`. La jerarquía visual entre cards se expresa exclusivamente a través del span y la altura de la card, no a través de variaciones tipográficas.

#### Scenario: Tipografía consistente entre LG y MD
- **WHEN** se renderiza la grilla con cards LG y MD simultáneamente
- **THEN** el nombre del proyecto tiene el mismo tamaño y peso en ambos tipos de card

