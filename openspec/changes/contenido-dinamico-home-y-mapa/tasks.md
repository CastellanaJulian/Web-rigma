## 1. Sanity Schemas

- [x] 1.1 Crear `site/src/sanity/schemas/homePage.ts` — singleton con `heroTitulo`, `heroSubtitulo`, `pilares[]` (min 4, max 4, cada uno con `titulo` y `descripcion`)
- [x] 1.2 Ampliar `nosotrosPage.ts` — agregar `snippetTitulo` (string), `snippetTexto` (text), `metricaM2` (number), `metricaUnidades` (number), agrupados bajo fieldset "Snippet — Inicio"
- [x] 1.3 Ampliar `project.ts` — agregar `locationTitle` (string) y `barrio` (string) en el fieldset `ubicacion`, con descriptions orientadoras
- [x] 1.4 Registrar `homePage` en `site/src/sanity/schemas/index.ts`
- [x] 1.5 Agregar `homePage` a `structure.ts` como singleton (igual que `nosotrosPage`) bajo el ítem "Inicio"

## 2. Tipos TypeScript

- [x] 2.1 Agregar `locationTitle?: string` y `barrio?: string` al tipo `Project` en `site/src/types/project.ts`
- [x] 2.2 Crear tipo `HomePageData` (o equivalente) con `heroTitulo`, `heroSubtitulo`, `pilares[]`

## 3. Queries Sanity

- [x] 3.1 Agregar `getHomePage()` en `queries.ts` — proyección con `heroTitulo`, `heroSubtitulo`, `pilares[]{ titulo, descripcion }`
- [x] 3.2 Actualizar `getNosotrosPage()` — incluir `snippetTitulo`, `snippetTexto`, `metricaM2`, `metricaUnidades` en la proyección GROQ y en el tipo de retorno
- [x] 3.3 Actualizar `projectFields` — incluir `locationTitle` y `barrio` en la proyección GROQ
- [x] 3.4 Actualizar `mapProject()` — mapear `locationTitle` y `barrio` al view-model `Project`

## 4. Componentes

- [x] 4.1 `HeroCarousel.tsx` — agregar props `heroTitulo?: string` y `heroSubtitulo?: string`; usarlos con fallback al texto hardcodeado actual
- [x] 4.2 `NosotrosSnippet.tsx` — agregar props `snippetTitulo?`, `snippetTexto?`, `metricaM2?`, `metricaUnidades?`; pasar valores dinámicos a `CountUp` con fallbacks
- [x] 4.3 `PorQueSection.tsx` — agregar prop `pilares?: { titulo: string; descripcion: string }[]`; usar con fallback al array hardcodeado si viene undefined o vacío
- [x] 4.4 `LocationSection.tsx` — agregar prop `barrio?: string`; reemplazar la URL hardcodeada de Nominatim por `${encodeURIComponent(barrio)},Buenos+Aires,Argentina`; si `barrio` está vacío, omitir el fetch del polígono

## 5. Pages

- [x] 5.1 `site/src/app/(site)/page.tsx` — agregar fetch de `getHomePage()` en el `Promise.all`; pasar `heroTitulo`, `heroSubtitulo` a `HeroCarousel`; pasar `pilares` a `PorQueSection`
- [x] 5.2 `site/src/app/(site)/page.tsx` — actualizar `getNosotrosPage()` para recibir los nuevos campos y pasarlos a `NosotrosSnippet`
- [x] 5.3 `site/src/app/(site)/proyectos/[slug]/page.tsx` — pasar `project.locationTitle` y `project.barrio` a `LocationSection`

## 6. Verificación

- [x] 6.1 Correr `cd site && npm run build` sin errores de TypeScript
- [ ] 6.2 Verificar en Studio (`localhost:3000/studio`) que aparece el nuevo singleton "Inicio" y los campos nuevos en "Nosotros" y en los proyectos
- [ ] 6.3 Cargar contenido de prueba en Studio y verificar que la home y el mapa reflejan los valores de Sanity
- [ ] 6.4 Dejar `barrio` vacío en un proyecto y verificar que el mapa no dibuja polígono
