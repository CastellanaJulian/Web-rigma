## Why

El cliente aprobó el prototipo HTML del Inicio (`diseno-final/index.html`). La siguiente pantalla a validar es Proyectos — necesitamos un prototipo de alta fidelidad coherente con el sistema visual ya aprobado para avanzar hacia la etapa de desarrollo.

## What Changes

- Nuevo archivo `diseno-final/proyectos.html` — prototipo HTML estático de la página `/proyectos`
- Reutiliza todos los componentes del `index.html` aprobado (NavBar, SectionLabel, StatusPill, ProjectCard, ContactoSection, Footer, design tokens)
- Agrega tres componentes nuevos exclusivos de esta pantalla: PageHeader, FilterTabs, ProyectosGrid
- Agrega una sección de mapa interactivo con Leaflet + OpenStreetMap (placeholder para validación; en producción será Mapbox)
- No modifica ningún archivo existente

## Capabilities

### New Capabilities

- `pagina-proyectos`: Página de listado de proyectos con filtros (Todos / En ejecución / Terminados), grilla con jerarquía LG/MD según estado, mapa interactivo con pines por proyecto y formulario de contacto
- `mapa-proyectos`: Sección de mapa interactivo con Leaflet + OSM, pines por proyecto con tooltip de nombre, click en pin redirige a ficha del proyecto

### Modified Capabilities

## Impact

- Archivo nuevo: `diseno-final/proyectos.html`
- Sin cambios en `diseno-final/index.html`, `site/`, `dev/` ni ningún otro archivo
- Dependencias CDN que se agregan al HTML: Leaflet CSS + JS (unpkg, sin API key)
- Para producción: reemplazar Leaflet por Mapbox GL JS con API key
