## Why

La validación visual del prototipo reveló tres fricciones: la transición de filtros es brusca (remount sin stagger), la tipografía de las cards LG y MD se siente inconsistente, y la grilla no expresa jerarquía de contenido — el cliente necesita poder destacar 2 proyectos que siempre aparezcan primeros y más grandes, independientemente del estado.

## What Changes

- Transición de filtros: reemplazar fade simultáneo por stagger escalonado (60ms por card)
- Tipografía: unificar título, ubicación y CTA a los mismos valores en cards LG y MD (22px/700)
- Grilla: introducir concepto de `featured` — 2 proyectos destacados fijos arriba (span 3 cada uno), resto con ancho variable según cantidad
- Datos mock: agregar campo `featured: boolean` a `ALL_PROJECTS` en el prototipo
- Comportamiento de filtros: `featured` respeta el filtro activo — si el proyecto destacado no coincide con el filtro, no aparece como destacado

## Capabilities

### New Capabilities

- `featured-projects`: Lógica de proyectos destacados — flag en datos, layout de fila featured, degradación cuando pasan por filtro

### Modified Capabilities

- `pagina-proyectos`: Cambios en comportamiento de grilla (jerarquía featured/resto), tipografía de cards y animación de filtros

## Impact

- `diseno-final/proyectos.html`: único archivo afectado
- No hay dependencias externas ni breaking changes para otros prototipos
