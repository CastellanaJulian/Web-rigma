## 1. Modelo de datos

- [x] 1.1 Agregar tipo `Plan = { src: string; description: string }` en `site/src/types/project.ts`
- [x] 1.2 Cambiar campo `plans?: string[]` a `plans?: Plan[]` en el tipo `Project`
- [x] 1.3 Agregar campo `locationDescription?: string` en el tipo `Project`
- [x] 1.4 Actualizar mock `cosquin-1534` en `projects.ts`: convertir `plans` al nuevo formato con descripciones reales (ej: `{ src: '/images/img-plano.jpg', description: '4 ambientes 112 m²' }`)

## 2. CSS global

- [x] 2.1 Agregar keyframe `accordionDown` en `site/src/app/globals.css` (`from: opacity 0, translateY -4px` → `to: opacity 1, translateY 0`)
- [x] 2.2 Agregar overrides de Leaflet en `globals.css`: `.leaflet-popup-content-wrapper` (border-radius 2px, box-shadow suave, padding 0, overflow hidden), `.leaflet-popup-content` (margin 0), `.leaflet-popup-close-button` (top 8px, right 8px, tamaño 24x24)

## 3. PlanosSection

- [x] 3.1 Actualizar `PlanosSection.tsx`: cambiar tipo de prop `plans` de `string[]` a `Plan[]` (importar tipo)
- [x] 3.2 Adaptar la lógica de grupos para usar `plan.src` y `plan.description` en lugar de construir sublabels desde `typologies`
- [x] 3.3 Asegurar que la `description` del plano se muestre bajo el nombre en la tarjeta (ya existe el renderizado condicional; ahora el campo siempre tiene valor)
- [x] 3.4 Asegurar que la `description` del plano se muestre en el lightbox bajo el label
- [x] 3.5 Aplicar `animation: 'accordionDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)'` al div que se expande al abrir un grupo

## 4. LocationSection

- [x] 4.1 Agregar prop `locationTitle: string` (derivado de `neighborhood ?? location`) y `locationDescription?: string` en el tipo de props de `LocationSection`
- [x] 4.2 Cambiar fondo de la sección a `#E3E3E3`
- [x] 4.3 Eliminar el `<h2>` actual ("Dónde está el proyecto"); reemplazarlo por el título de barrio + bajada en la columna derecha (encima de las cards de POI)
- [x] 4.4 Cambiar grid de `1fr 300px` a `1fr 380px`
- [x] 4.5 Rediseñar cards POI: eliminar box de icono, eliminar label de categoría, cambiar padding a `12px 14px`, agregar `border: 1px solid transparent` con transición a accent en hover, nombre en color accent cuando activo
- [x] 4.6 Implementar interacción bidireccional: en `onMouseEnter` de cada card, llamar a `markersRef.current[i].openPopup()` además de `setActiveIdx(i)`
- [x] 4.7 En el `useEffect` que sincroniza `activeIdx` con los markers, cambiar de class toggle a eventos `mouseover`/`mouseout` en los markers para actualizar `activeIdx` y resaltar la card correspondiente

## 5. Page.tsx

- [x] 5.1 Actualizar el condicional de render de `PlanosSection`: `project.plans && project.plans.length > 0` (sin cambio funcional, pero verificar que el tipo infiera correctamente)
- [x] 5.2 Pasar las nuevas props a `LocationSection`: `locationTitle={project.neighborhood ?? project.location}` y `locationDescription={project.locationDescription}`
