## Why

El sitio tiene problemas de layout y usabilidad en mobile que afectan la experiencia en el dispositivo principal del usuario final: texto que se corta, componentes que desbordan el viewport, interacciones hover que no aplican en touch y un menú hamburgesa que se ve deforme. Es necesario corregirlos antes de mostrar el sitio al cliente.

## What Changes

- **Hero (Inicio):** ocultar flechas de navegación en mobile; reducir altura a `85svh` para que entre en una pantalla sin scroll
- **Proyectos Destacados (Inicio):** mover el botón "Ver todos los proyectos" debajo del grid de cards en mobile
- **Nosotros Snippet (Inicio):** en mobile, reordenar sección para mostrar título → imagen cuadrada ancho completo → texto → stats → botón
- **ProjectCard:** desactivar efecto scale hover en dispositivos touch (usar `@media (hover: hover)`)
- **Mapa (Proyectos):** integrar `leaflet-gesture-handling` para requerir dos dedos al scrollear sobre el mapa
- **Historia (Nosotros):** aumentar altura de imagen principal en mobile
- **Contacto:** canales de contacto en columna en mobile (hoy desbordan en 3 columnas); imagen con padding simétrico en mobile
- **MobileMenu (global):** aumentar espaciado entre links; corregir animación de la X (translateY mal calibrado con el gap)

## Capabilities

### New Capabilities

- `mobile-responsive-fixes`: Correcciones de layout, interacción y componentes para mobile en todas las páginas del sitio

### Modified Capabilities

- `navbar`: Cambio de comportamiento del menú mobile (espaciado y animación de cierre)
- `pagina-ficha-proyecto`: Sin cambios de spec, solo visual mobile

## Impact

- `site/src/components/sections/home/HeroCarousel.tsx`
- `site/src/components/sections/home/ProyectosDestacados.tsx`
- `site/src/components/sections/home/NosotrosSnippet.tsx`
- `site/src/components/shared/ProjectCard.tsx`
- `site/src/components/sections/proyectos/MapaSection.tsx`
- `site/src/app/nosotros/page.tsx`
- `site/src/app/contacto/page.tsx`
- `site/src/components/layout/MobileMenu.tsx`
- Nueva dependencia: `leaflet-gesture-handling`
