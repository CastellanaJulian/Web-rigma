## Why

El contenido de las secciones principales de la home (hero, nosotros, pilares) y el mapa de la ficha de proyecto están hardcodeados en el código. El cliente no puede actualizar textos, métricas ni la ubicación del mapa sin intervención técnica.

## What Changes

- Agregar campos de contenido a `nosotrosPage` en Sanity: título del snippet, texto, y las dos métricas (m² y unidades)
- Nuevo singleton `homePage` en Sanity con el título y subtítulo del hero, y los 4 pilares de "Por qué elegirnos"
- Agregar campos `locationTitle` y `barrio` al fieldset `ubicacion` del schema `project`
- `NosotrosSnippet.tsx` pasa a leer título, texto y métricas desde Sanity (con fallbacks al texto actual)
- `HeroCarousel.tsx` pasa a leer título y subtítulo desde Sanity (con fallbacks)
- `PorQueSection.tsx` pasa a leer los 4 pilares desde Sanity (con fallback al array hardcodeado)
- `LocationSection.tsx` reemplaza el fetch hardcodeado a "Mataderos" por el campo `barrio` del proyecto; si `barrio` está vacío no dibuja polígono

## Capabilities

### New Capabilities

- `sanity-home-page-content`: Gestión del contenido editable de la home (hero title/subtitle, pilares) desde Sanity mediante un singleton `homePage`
- `sanity-nosotros-snippet`: Campos de contenido del snippet de nosotros y métricas dentro de `nosotrosPage`
- `dynamic-map-location`: Título de sección y polígono de barrio del mapa en la ficha de proyecto, configurables por proyecto desde Sanity

### Modified Capabilities

- `sanity-nosotros-page`: Se agregan campos de contenido al documento existente (`snippetTitulo`, `snippetTexto`, `metricaM2`, `metricaUnidades`)
- `sanity-project-schema`: Se agregan `locationTitle` y `barrio` al fieldset `ubicacion`
- `pagina-ficha-proyecto`: El mapa ahora usa datos dinámicos para el título y el polígono de barrio

## Impact

- **Sanity schemas**: `nosotrosPage.ts`, `project.ts` (modificados); `homePage.ts` (nuevo); `schemas/index.ts` (registro)
- **Queries**: `queries.ts` — `getNosotrosPage()` ampliada; nuevo `getHomePage()`; `projectFields` ampliado con `locationTitle` y `barrio`
- **Tipos TypeScript**: `Project` type ampliado; nuevo tipo para homePage data
- **Componentes**: `HeroCarousel.tsx`, `NosotrosSnippet.tsx`, `PorQueSection.tsx`, `LocationSection.tsx`
- **Pages**: `(site)/page.tsx` (home) y `(site)/proyectos/[slug]/page.tsx` (ficha)
- Sin cambios en APIs externas ni dependencias nuevas
