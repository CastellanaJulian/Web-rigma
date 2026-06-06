## Why

La sección de Ubicación y la sección de Planos de la ficha de proyecto tienen desvíos visuales y funcionales respecto al diseño final (`diseno-final/ficha-proyecto.html`). La interacción del mapa es unidireccional (solo cards → mapa), los popups de Leaflet usan estilos default que no corresponden al sistema de diseño, y las cards de POIs tienen padding, iconos y estructura incorrectos. Los planos perdieron la animación de acordeón y no muestran la descripción por tipología.

## What Changes

- **Mapa — fondo:** la sección pasa de fondo transparente a `#E3E3E3`
- **Mapa — título y bajada:** se agrega un título de barrio dinámico y un párrafo de descripción de ubicación encima de las cards de POI (columna derecha)
- **Mapa — interacción bidireccional:** hover en marker del mapa → resalta la card correspondiente en la lista; hover en card → abre popup del marker (ya existía solo para click)
- **Mapa — popups Leaflet:** se agregan overrides CSS en `globals.css` para corregir border-radius (2px), box-shadow y posición del botón de cierre
- **Mapa — cards POI:** rediseño alineado al diseño final: sin box de icono, sin label de categoría, padding `12px 14px`, border transparente con transición, nombre en color accent cuando activo, grid `1fr 380px`
- **Planos — animación acordeón:** se restaura el keyframe `accordionDown` en `globals.css` y se aplica al contenedor expandido
- **Planos — descripción obligatoria:** el tipo `plans` cambia de `string[]` a `{ src: string; description: string }[]`; cada plano lleva su descripción (ej: "4 ambientes 112 m²") visible debajo del nombre; campo requerido **BREAKING**
- **Data mock:** `cosquin-1534` actualiza `plans` al nuevo tipo con descripciones reales

## Capabilities

### New Capabilities
- ninguna

### Modified Capabilities
- `pagina-ficha-proyecto`: cambian los requisitos de `LocationSection` (fondo, título/bajada, interacción bidireccional, estilos POI cards), `PlanosSection` (animación, descripción obligatoria por plano) y el modelo de datos `Project.plans`

## Impact

- `site/src/types/project.ts` — tipo `Project.plans` cambia de `string[]` a `Plan[]` (**BREAKING**)
- `site/src/data/projects.ts` — actualizar mock de `cosquin-1534`
- `site/src/components/sections/ficha/LocationSection.tsx` — reescritura parcial
- `site/src/components/sections/ficha/PlanosSection.tsx` — adaptación al nuevo tipo + animación
- `site/src/app/globals.css` — agregar keyframe `accordionDown` + overrides CSS de Leaflet
- `site/src/app/proyectos/[slug]/page.tsx` — pasar nueva prop `locationDescription` a `LocationSection`
