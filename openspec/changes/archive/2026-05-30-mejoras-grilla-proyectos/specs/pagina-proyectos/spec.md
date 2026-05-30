## MODIFIED Requirements

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

## ADDED Requirements

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
