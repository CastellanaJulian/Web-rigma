## 1. Tipos y datos mock

- [x] 1.1 Agregar tipo `POI` y campo `pointsOfInterest?: POI[]` a `site/src/types/project.ts`
- [x] 1.2 Agregar imágenes de ejemplo a Cosquín en `projects.ts`: `images: ['/images/img-1.jpg', ..., '/images/img-5.jpg']`, `plans: ['/images/img-plano.jpg']`
- [x] 1.3 Agregar POIs de ejemplo a Cosquín en `projects.ts` (4 POIs: transporte, salud, educación, comercio)

## 2. HeroSection

- [x] 2.1 Implementar hero: imagen fill a 86vh con gradiente overlay, StatusPill, H1 (nombre del proyecto en uppercase), botón "CONTACTANOS" con scroll a `#contacto` y hover → accent

## 3. KeyDataStrip

- [x] 3.1 Implementar barra horizontal con ítems condicionales (ubicación, entrega, unidades, avance)
- [x] 3.2 Ítem con barra de progreso: línea accent al `project.progress`%

## 4. DescriptionSection

- [x] 4.1 Crear `site/src/components/sections/ficha/DescriptionSection.tsx` como Client Component
- [x] 4.2 Grid `1fr 300px`: texto izquierda + card "Datos del proyecto" derecha (ítems con icono SVG)
- [x] 4.3 Grid 3 columnas de highlights con animación fade-up usando `useInView`

## 5. GaleriaSection

- [x] 5.1 Crear `site/src/components/sections/ficha/GaleriaSection.tsx` como Client Component
- [x] 5.2 Grid asimétrico: col izq span 2 filas (340+200px), col der imagen arriba + abajo; segunda fila 2 imágenes de 200px
- [x] 5.3 Zoom `scale(1.04)` + overlay en hover por imagen

## 6. PlanosSection

- [x] 6.1 Crear `site/src/components/sections/ficha/PlanosSection.tsx` como Client Component
- [x] 6.2 Acordeón por tipología: expand/collapse, fila con planos al expandir
- [x] 6.3 Lightbox: modal fullscreen al click en plano, `body.overflow: hidden`, cierre al click fuera

## 7. LocationSection

- [x] 7.1 Crear `site/src/components/sections/ficha/LocationSection.tsx` como Client Component
- [x] 7.2 Mapa Leaflet con dynamic import, centrado en `project.coordinates`, zoom 15
- [x] 7.3 Contorno Mataderos (mismo fetch Nominatim que MapaSection)
- [x] 7.4 Marker del proyecto (accent, ícono edificio)
- [x] 7.5 Markers de POIs (fondo claro, SVG según `iconType`) — solo si `pois.length > 0`
- [x] 7.6 Lista lateral de POIs con hover que abre popup en mapa — solo si `pois.length > 0`

## 8. ProyectoRelacionado

- [x] 8.1 Implementar sección con `ProjectCard` del proyecto relacionado, obtenido con `getProjectBySlug(project.relatedProject)`

## 9. Composición de la página

- [x] 9.1 Reemplazar `site/src/app/proyectos/[slug]/page.tsx` con composición completa y secciones condicionales
- [x] 9.2 Agregar `id="contacto"` al wrapper de `ContactSectionHome` para el scroll del botón Hero

## 10. Verificación

- [x] 10.1 `npm run build` sin errores — confirmar SSR-safe (Leaflet en useEffect)
- [x] 10.2 Verificar visualmente contra `diseno-final/ficha-proyecto.html`
- [x] 10.3 Verificar que secciones se ocultan correctamente para proyectos sin datos (Zelada)
