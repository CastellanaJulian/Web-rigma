## Why

La ficha de proyecto es la página de conversión principal — es donde el comprador decide si consulta o no. Sin ella el sitio no puede cerrar leads calificados. Es la página más compleja: tiene secciones condicionales, mapa con POIs, galería asimétrica, acordeón de planos con lightbox y proyecto relacionado.

## What Changes

- Implementar `site/src/app/proyectos/[slug]/page.tsx` completo
- Agregar tipo `POI` al tipo `Project` y `pointsOfInterest?: POI[]` al tipo
- Agregar POIs de ejemplo a Cosquín 1534 en `data/projects.ts`
- Agregar imágenes de ejemplo a `projects.ts` (usando las ya disponibles en `public/images/`)

**Secciones de la página:**
1. **Hero**: imagen de fondo a 86vh, status pill, nombre, botón CONTACTANOS
2. **KeyDataStrip**: barra horizontal con datos clave (ubicación, entrega, unidades disponibles, avance de obra con barra de progreso)
3. **DescriptionSection**: texto + card de datos del proyecto + grid de highlights con animación scroll
4. **GaleriaSection**: galería asimétrica con zoom en hover — *condicional: solo si `project.images.length > 0`*
5. **PlanosSection**: acordeón por tipología + lightbox al click — *condicional: solo si `project.plans?.length > 0`*
6. **LocationSection**: mapa Leaflet con marker del proyecto + POI markers — *condicional: solo si `project.coordinates` existe. POIs opcionales.*
7. **ProyectoRelacionado**: card del proyecto relacionado — *condicional: solo si `project.relatedProject` existe*
8. **ContactSectionHome**: formulario de contacto reutilizado

## Capabilities

### New Capabilities

- `pagina-ficha-proyecto`: Ficha de proyecto con secciones condicionales, galería, planos y mapa

### Modified Capabilities

- `featured-projects`: tipo `Project` agrega `pointsOfInterest?: POI[]`

## Impact

- `site/src/app/proyectos/[slug]/page.tsx` — reemplaza scaffold
- `site/src/types/project.ts` — agrega tipo `POI` y campo `pointsOfInterest`
- `site/src/data/projects.ts` — agrega POIs a Cosquín e imágenes de ejemplo
- Reutiliza `ContactSectionHome`, `SectionLabel`, `StatusPill`, `useInView`
- Leaflet ya instalado — mismo patrón de dynamic import que `MapaSection`
