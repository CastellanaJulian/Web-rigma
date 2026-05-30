## ADDED Requirements

### Requirement: Campo featured en datos de proyectos
Cada proyecto SHALL tener un campo `featured: boolean`. En el prototipo, los proyectos marcados como `featured: true` serán los 2 En Ejecución actuales. En producción, este campo vendrá de Sanity como toggle configurable por el cliente.

#### Scenario: Datos mock con featured
- **WHEN** se carga el prototipo
- **THEN** exactamente 2 proyectos tienen `featured: true` en `ALL_PROJECTS`

### Requirement: Fila de proyectos destacados
Cuando el filtro activo es "Todos" y hay proyectos con `featured: true`, la grilla SHALL renderizar primero una fila de featured, donde cada card featured ocupa `span 3` en el grid de 6 columnas (altura 460px). Los proyectos no-featured SHALL renderizarse a continuación con span calculado por `getResponsiveSpan`.

#### Scenario: Dos proyectos featured visibles
- **WHEN** el filtro es "Todos" y hay 2 proyectos con `featured: true`
- **THEN** aparecen en la primera fila como dos cards de igual tamaño que ocupan todo el ancho

#### Scenario: Proyectos no-featured debajo
- **WHEN** el filtro es "Todos" y hay proyectos con `featured: false`
- **THEN** aparecen debajo de los featured con tamaño variable según cantidad

### Requirement: Featured respeta el filtro activo
Cuando el filtro activo es "En ejecución" o "Terminados", la distinción `featured` SHALL ignorarse. Todos los proyectos visibles recibirán el mismo span calculado por `getResponsiveSpan`. Si un proyecto `featured: true` no pasa el filtro activo, no aparece.

#### Scenario: Filtro "En ejecución" sin fila featured
- **WHEN** el usuario activa el filtro "En ejecución"
- **THEN** todos los proyectos En Ejecución se muestran con el mismo span, sin distinción de featured

#### Scenario: Proyecto featured filtrado fuera
- **WHEN** un proyecto tiene `featured: true` y `status: 'Terminado'` y el filtro activo es "En ejecución"
- **THEN** ese proyecto no aparece en la grilla
