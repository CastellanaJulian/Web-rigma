## Context

`site/src/app/nosotros/page.tsx` existe como scaffold vacío. El diseño de referencia (`diseno-final/nosotros.html`) tiene 4 secciones. Se reutilizan `useInView` y `SectionLabel` ya implementados. Las imágenes `img-obra.jpg` y `img-4.jpg` ya están en `public/images/`; falta copiar `img-plano.jpg`.

## Goals / Non-Goals

**Goals:**
- 4 secciones completas con el diseño de referencia
- CountUp animado para métricas (misma lógica que NosotrosSnippet)
- Animación staggered en pilares de filosofía (mismo patrón que PorQueSection)
- RedireccionSection oscura con imagen de fondo y CTAs funcionales

**Non-Goals:**
- Sección de equipo (contenido pendiente del cliente — omitida por ahora)
- Testimonios (contenido pendiente — omitidos)

## Decisions

### D1: Estructura de componentes — todo en page.tsx

La página tiene 4 secciones que no se reutilizan en otro lugar. Se implementan como funciones internas en `page.tsx` marcado `'use client'`, igual que `contacto/page.tsx`. No justifica archivos separados.

```
nosotros/page.tsx ('use client')
├── PageHeader        ← estático
├── HistoriaSection   ← CountUp (necesita client)
├── PilaresSection    ← useInView stagger (necesita client)
└── RedireccionSection ← hover state (necesita client)
```

### D2: CountUp — inline en page.tsx

El hook `useInView` ya existe en `@/hooks/useInView`. El CountUp se implementa como función local en `page.tsx` (mismo patrón que en `NosotrosSnippet`), no como componente separado ya que solo se usa acá.

### D3: HistoriaSection — imagen panorámica + grilla

Imagen `img-obra.jpg` a ancho completo con `aspectRatio: '16/6'` usando `next/image` con `width` y `height` relativos (no `fill`):

```tsx
<div style={{ position: 'relative', width: '100%', aspectRatio: '16/6' }}>
  <Image src="/images/img-obra.jpg" fill className="object-cover object-bottom" />
</div>
```

Debajo, grilla `grid-cols-1 md:grid-cols-2` con gap 80px:
- Izquierda: copy de historia (2 párrafos)
- Derecha: métricas con CountUp, separadas por `border-bottom`

### D4: PilaresSection — imagen + pilares con stagger

Grilla `grid-cols-1 md:grid-cols-2`, fondo `bg-warm` (`#E3E3E3`):
- Izquierda: `img-plano.jpg` con `fill`, `minHeight: 400px`
- Derecha: 3 pilares separados por línea, animación staggered 0/220/440ms con `useInView`

### D5: RedireccionSection — sección hero oscura

Patrón igual al HeroCarousel pero estático (sin carousel):
- `position: relative`, `minHeight: 580px`, `background: #1E1E1E`
- `img-4.jpg` con `fill` como fondo
- Gradiente overlay idéntico al hero
- Contenido posicionado en `position: absolute; bottom: 0`
- Botón "VER PROYECTOS" (blanco → accent en hover) + link "Contactarnos →" con `hover-accent-link-dark` CSS class

### D6: Responsive

| Sección | Desktop | Mobile |
|---|---|---|
| PageHeader | padding 80px 56px | padding clamp |
| HistoriaSection | 2 cols gap 80px | 1 col, métricas debajo del copy |
| PilaresSection | 2 cols | 1 col, imagen arriba |
| RedireccionSection | texto max-width 620px | padding reducido |

## Risks / Trade-offs

- **Sin sección Equipo**: contenido pendiente del cliente. Se omite y el diseño fluye directamente de Historia a Pilares.
- **CountUp duplicado**: misma lógica que NosotrosSnippet. En Etapa 3 se podría extraer a un componente compartido; por ahora es aceptable la duplicación.
