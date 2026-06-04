## Context

`app/page.tsx` existe como scaffold vacío que importa `ContactCTA`. El diseño de referencia (`diseno-final/index.html`) tiene la página completa implementada como React CDN con estilos inline. Hay que trasladar eso a componentes Next.js con Tailwind v4, `next/image` y las librerías ya instaladas. Las imágenes de placeholder están en `diseno-final/assets/`.

## Goals / Non-Goals

**Goals:**
- Página de Inicio completa y funcional con todas las secciones del diseño
- Componente `ProjectCard` reutilizable (se usará en `/proyectos` también)
- Animaciones del diseño preservadas (fade-up hero, CountUp, stagger PorQue)
- Imágenes servidas con `next/image` para optimización automática

**Non-Goals:**
- Integración con Sanity (datos vienen de `data/projects.ts`)
- Implementar el formulario de contacto (la página usa `ContactCTA` existente)
- Testimonios (contenido pendiente — sección omitida por ahora)
- Optimización SEO avanzada

## Decisions

### D1: HeroCarousel con Embla

El carousel del hero usa `embla-carousel-react` (ya instalado). Maneja el swipe touch en mobile sin configuración extra, y el auto-advance se implementa con `setInterval` dentro de un `useEffect`. Las flechas y los indicadores de slide son componentes propios.

```
HeroCarousel (client)
├── embla ref + API
├── slides (next/image fill)
├── gradiente overlay
├── ArrowBtn izquierda/derecha
├── Contenido (título, subtitle, CTAs)  ← animado con CSS transition en mount
└── Indicadores (dots expandibles + contador)
```

**Alternativa descartada:** slider manual con CSS transitions sin librería. Más código, sin soporte touch.

### D2: CountUp con hook propio en lugar de librería

La animación de "+32.000 M²" y "+220 UF" usa un `useInView` hook propio basado en `IntersectionObserver` + `requestAnimationFrame`. Evita agregar otra dependencia para algo simple.

```ts
// hooks/useInView.ts
export function useInView(threshold = 0.4): [RefObject<Element>, boolean]
```

```ts
// dentro de NosotrosSnippet
const [ref, inView] = useInView()
// cuando inView → animar de 0 a target con rAF
```

### D3: Animación staggered de PorQué con el mismo `useInView`

La sección "Por qué elegirnos" usa el mismo hook `useInView` para detectar cuando entra en viewport. Al activarse, cada pilar recibe `transition-delay` incremental (0ms, 220ms, 440ms, 660ms). Se implementa con clases Tailwind + style inline para el delay.

### D4: ProjectCard como componente compartido en `components/shared/`

`ProjectCard` se usa en la home (Proyectos Destacados) y en `/proyectos` (grilla completa). Va en `components/shared/` para evitar duplicación. Recibe el tipo `Project` de `types/project.ts`.

Props: `project: Project`, `className?: string`. El tamaño (span en grid) lo controla el padre vía `className`.

### D5: Imágenes en `public/images/`

Las imágenes de `diseno-final/assets/` se copian a `site/public/images/`. Se usan con `next/image` con `fill` en contenedores con `position: relative`. Esto habilita la optimización (WebP, lazy load, srcset) sin cambiar los paths cuando lleguen imágenes reales de Sanity.

Estructura:
```
public/images/
  img-1.jpg   ← cosquin (interior)
  img-2.jpg   ← larrazabal (terraza)
  img-3.jpg   ← zelada (sala)
  img-4.jpg   ← obra (andamios)
  img-obra2.jpg
  img-plano.jpg
  plano-1.png
```

### D6: Composición de `app/page.tsx`

La página es un Server Component que importa las secciones. Los componentes con estado (HeroCarousel, NosotrosSnippet con CountUp, PorQueSection) son Client Components marcados con `'use client'`.

```tsx
// app/page.tsx (server)
export default function Home() {
  return (
    <>
      <HeroCarousel />         {/* client */}
      <ProyectosDestacados />  {/* server — solo lee datos */}
      <NosotrosSnippet />      {/* client — CountUp */}
      <PorQueSection />        {/* client — scroll animation */}
      <ContactCTA />           {/* server */}
    </>
  )
}
```

### D7: Responsive — fluid typography + colapso mecánico de grillas

No hay diseño mobile. La estrategia es:

**Tipografía con `clamp()`** — el título del hero y otros textos grandes escalan automáticamente entre un mínimo y un máximo según el viewport, sin breakpoints discretos:

```css
/* Hero título: 44px en 390px → 88px en 1440px */
font-size: clamp(44px, 7vw, 88px);

/* Hero padding horizontal */
padding-left: clamp(24px, 7vw, 112px);
padding-right: clamp(24px, 7vw, 112px);
```

**Grillas con reglas mecánicas** — cada sección colapsa según un patrón predecible:

| Sección | Desktop (`lg`) | Tablet (`md`) | Mobile |
|---|---|---|---|
| Proyectos Destacados | 2 cards × span 3 | 1 card por fila | 1 card por fila |
| Nosotros | 2 columnas | 2 columnas | 1 columna (imagen arriba) |
| Por qué elegirnos | 4 columnas | 2 columnas | 1 columna |

**Hero en mobile** — mantiene la imagen de fondo a pantalla completa, igual que desktop. Solo cambia el tamaño del texto y el padding (via clamp).

**Alternativa descartada:** diseñar pantallas mobile antes de codear. Para un sitio institucional con layouts predecibles, el colapso mecánico + ajuste visual en DevTools es suficiente.

## Risks / Trade-offs

- **Sin imágenes reales** → El sitio se ve con placeholders. Se acepta en esta etapa; el cliente sube imágenes en Etapa 3 via Sanity.
- **Hero sin diseño mobile** → El layout del hero (título 88px, padding 112px) no va a escalar bien en mobile sin ajustes. Mitigación: reducir `fontSize` y padding con clases responsive.
- **CountUp sin SSR** → El hook de IntersectionObserver solo corre en el cliente. El componente debe ser `'use client'` para evitar errores de hidratación.
