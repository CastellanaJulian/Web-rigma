## 1. Assets e imágenes

- [x] 1.1 Copiar imágenes de `diseno-final/assets/` → `site/public/images/` (`img-1.jpg` a `img-5.jpg`, `img-obra.jpg`, `img-obra2.jpg`)

## 2. Hook utilitario

- [x] 2.1 Crear `site/src/hooks/useInView.ts` — hook con `IntersectionObserver` que devuelve `[ref, isInView]`, usado por CountUp y PorQue

## 3. Componente ProjectCard

- [x] 3.1 Crear `site/src/components/shared/ProjectCard.tsx` — card con imagen `fill`, gradiente overlay, hover scale, StatusPill, nombre, ubicación y "VER PROYECTO →"
- [x] 3.2 La card navega a `/proyectos/[slug]` al hacer click (usar `next/link`)

## 4. HeroCarousel

- [x] 4.1 Crear `site/src/components/sections/home/HeroCarousel.tsx` como Client Component con Embla Carousel
- [x] 4.2 Implementar slides con `next/image` fill + gradiente overlay
- [x] 4.3 Implementar animación de título y CTAs al montar (fade-up con CSS transition)
- [x] 4.4 Implementar flechas de navegación (prev/next) y auto-advance cada 6 segundos
- [x] 4.5 Implementar indicadores de slide (dots expandibles + contador "01/04")
- [x] 4.6 Aplicar fluid typography al hero: `font-size: clamp(44px, 7vw, 88px)` en el título, `padding: clamp(24px, 7vw, 112px)` horizontal — la imagen de fondo se mantiene a pantalla completa en todos los viewports

## 5. Sección Proyectos Destacados

- [x] 5.1 Crear `site/src/components/sections/home/ProyectosDestacados.tsx` — filtra proyectos `En Ejecución` y los muestra en grilla con `ProjectCard`
- [x] 5.2 Layout responsive: `grid-cols-1 md:grid-cols-2` — 1 card por fila en mobile/tablet, 2 en desktop (cada una mitad del ancho)

## 6. Sección Nosotros Snippet

- [x] 6.1 Crear `site/src/components/sections/home/NosotrosSnippet.tsx` como Client Component
- [x] 6.2 Layout responsive: `grid-cols-1 md:grid-cols-2` — en mobile imagen arriba + texto abajo, en desktop imagen a la derecha
- [x] 6.3 Implementar CountUp usando `useInView` + `requestAnimationFrame` para "+32.000 M²" y "+220 UF"
- [x] 6.4 Formatear el número 32000 como "32.000" (punto como separador de miles)

## 7. Sección Por qué elegirnos

- [x] 7.1 Crear `site/src/components/sections/home/PorQueSection.tsx` como Client Component
- [x] 7.2 Implementar los 4 pilares con íconos SVG inline, título y descripción
- [x] 7.3 Implementar animación staggered con `useInView` — cada pilar tiene `transition-delay` de 0/220/440/660ms
- [x] 7.4 Layout responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

## 8. Composición de la página

- [x] 8.1 Reemplazar `site/src/app/page.tsx` con la composición completa: HeroCarousel + ProyectosDestacados + NosotrosSnippet + PorQueSection + ContactCTA

## 9. Verificación

- [x] 9.1 Correr `npm run build` en `site/` y confirmar que compila sin errores
- [x] 9.2 Verificar visualmente en el browser — comparar sección por sección con `diseno-final/index.html`
- [x] 9.3 Verificar responsive en mobile (390px) y tablet (768px)
