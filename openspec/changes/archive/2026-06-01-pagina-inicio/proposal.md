## Why

La fundación del sitio está lista (tokens, Navbar, Footer, ContactCTA, primitivos). El siguiente paso es implementar la página de Inicio (`/`), que es la primera pantalla que verá cualquier visitante y la que comunica la identidad de Rigma. Actualmente `app/page.tsx` tiene solo comentarios placeholder.

## What Changes

- Implementar el **Hero carousel** a pantalla completa con 4 slides, título animado, dos CTAs y navegación por flechas + indicadores
- Implementar la sección **Proyectos Destacados** con grilla de ProjectCards de los proyectos en ejecución
- Implementar el **Snippet de Nosotros** con texto institucional, estadísticas animadas (CountUp) e imagen
- Implementar la sección **Por qué elegirnos** con 4 pilares y animación de aparición al hacer scroll
- Copiar imágenes de `diseno-final/assets/` a `site/public/images/` para uso con `next/image`
- Crear el componente reutilizable `ProjectCard` (se usará también en `/proyectos`)
- Reemplazar `app/page.tsx` con la composición completa de secciones

## Capabilities

### New Capabilities

- `hero-carousel`: Carousel a pantalla completa con slides de imagen, título, CTAs y auto-advance
- `nosotros-snippet`: Sección de presentación institucional con estadísticas animadas
- `por-que-elegirnos`: Grilla de 4 pilares con animación staggered al entrar en viewport

### Modified Capabilities

- `featured-projects`: La spec define el concepto de proyectos destacados — esta implementación la concreta en la página de Inicio con el componente `ProjectCard`

## Impact

- **Archivos modificados:** `site/src/app/page.tsx`
- **Archivos creados:** `site/src/components/sections/home/HeroCarousel.tsx`, `site/src/components/sections/home/NosotrosSnippet.tsx`, `site/src/components/sections/home/PorQueSection.tsx`, `site/src/components/shared/ProjectCard.tsx`, `site/src/hooks/useInView.ts`
- **Assets copiados:** `diseno-final/assets/*.jpg` → `site/public/images/`
- **Sin breaking changes** — no modifica componentes existentes
