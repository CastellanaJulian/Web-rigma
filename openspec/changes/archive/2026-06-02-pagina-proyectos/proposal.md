## Why

La página `/proyectos` es el portfolio completo de Rigma — el lugar donde los compradores evalúan qué hay disponible. Sin ella el sitio no tiene un listado navegable de proyectos. Además incluye el mapa de ubicaciones, que es un diferencial de presentación frente a competidores.

## What Changes

- Implementar `site/src/app/proyectos/page.tsx` con 4 secciones completas
- **PageHeader**: "Nuestros proyectos" + subtítulo
- **FilterTabs**: tabs Todos / En ejecución / Terminados con estado activo, border-bottom accent, filter reactivo
- **ProyectosGrid**: grilla 6 columnas con cards. Featured = span 3 (lg), resto = span variable (md). Animación `cardSlideUp` por index. Empty state cuando el filtro no tiene resultados
- **MapaSection**: mapa Leaflet + OpenStreetMap con markers para cada proyecto y popups con imagen + status + link
- **ContactSectionHome**: reutiliza el componente ya existente (formulario oscuro "Encontrá tu próxima inversión")
- Actualizar `ProjectCard` para aceptar prop `size: 'lg' | 'md'` — cambia font-size del título y padding interno

## Capabilities

### New Capabilities

- `pagina-proyectos`: Página portfolio con filtros, grilla dinámica, mapa y formulario de contacto

### Modified Capabilities

- `featured-projects`: `ProjectCard` ahora acepta `size` prop para variantes lg/md

## Impact

- `site/src/app/proyectos/page.tsx` — reemplaza scaffold
- `site/src/components/shared/ProjectCard.tsx` — agrega prop `size`
- Leaflet ya instalado — se inicializa con dynamic import en `useEffect` para evitar SSR issues
- Reutiliza `ContactSectionHome` existente
