## Context

`site/src/app/proyectos/page.tsx` existe como scaffold. El diseño de referencia (`diseno-final/proyectos.html`) tiene la página completa con Leaflet embebido. `react-leaflet` y `leaflet` ya están instalados. `ProjectCard` existe en `components/shared/` pero solo tiene tamaño lg (36px título, padding 40px).

## Goals / Non-Goals

**Goals:**
- Página `/proyectos` completa con filtros interactivos y grilla dinámica
- Mapa Leaflet funcional con markers y popups
- ProjectCard con variante md para cards secundarias
- Empty state cuando el filtro no retorna resultados

**Non-Goals:**
- Filtros con URL params / deep linking (Etapa 3 si se necesita)
- Mapa con Mapbox GL JS (diseño indica que es prototipo con OSM — se mantiene)
- Animación de transición entre filtros (fuera del diseño de referencia)

## Decisions

### D1: Client Component por filtros y mapa

La página es `'use client'` completa — los filtros requieren `useState` y el mapa requiere `useEffect` con Leaflet. No hay razón para dividirla en server/client.

### D2: Leaflet con dynamic import en useEffect

Leaflet usa `window` directamente y no soporta SSR. En Next.js la solución es importarlo dinámicamente dentro de `useEffect`:

```tsx
useEffect(() => {
  import('leaflet').then(L => {
    import('leaflet/dist/leaflet.css')
    const map = L.map(ref.current, ...).setView([...], 15)
    // ... tiles, markers, popups
  })
}, [])
```

Esto garantiza que Leaflet solo se ejecuta en el cliente. No se usa el componente `MapContainer` de react-leaflet para evitar complicaciones con SSR.

### D3: ProjectCard — nueva prop `size`

Se agrega `size?: 'lg' | 'md'` al componente existente:
- `lg` (default): título 36px, padding `0 40px 36px` — igual al actual (home y proyectos featured)
- `md`: título 22px, padding `0 20px 20px` — para cards secundarias en la grilla

### D4: Lógica de grilla con 6 columnas y prioridad

La grilla siempre es `display: grid; gridTemplateColumns: repeat(6, 1fr); gap: 16px`.

**Campo `priority?: number`** en el tipo `Project`:
- `priority: 1` o `2` → card lg (span 3), aparecen primero
- `priority > 2` → card md, ordenados por prioridad ascendente
- `priority: undefined` → card md, al final (sin orden garantizado)

```ts
function sortAndSplit(projects: Project[]) {
  const sorted = [...projects].sort((a, b) => {
    if (a.priority && b.priority) return a.priority - b.priority
    if (a.priority) return -1
    if (b.priority) return 1
    return 0
  })
  const featured = sorted.filter(p => p.priority && p.priority <= 2)
  const resto    = sorted.filter(p => !p.priority || p.priority > 2)
  return { featured, resto }
}
```

En filtros "En ejecución" / "Terminados", se aplica el mismo sort pero todas las cards son del mismo tamaño (lg o md según filtro).

`getResponsiveSpan(count)`: devuelve 6 si count=1, 2 si count múltiplo de 3, 3 en otros casos.

En mobile (< md), todos los spans colapsan a 6 (full width) via CSS.

### D5: Animación cardSlideUp

Cada card tiene `animation: cardSlideUp 0.5s ease-out both` con `animationDelay: index * 40ms`. La animación se define en `globals.css`:

```css
@keyframes cardSlideUp {
  from { transform: translateY(18px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
```

La key del grid container cambia con el filtro activo para re-triggerear la animación al cambiar de tab.

### D6: Mapa — fuente de datos y tile layer

`MapaSection` recibe `projects: Project[]` como prop y renderiza markers solo para los que tienen `coordinates`. Esto garantiza una única fuente de verdad:

```
Etapa 2: data/projects.ts → page.tsx → MapaSection
Etapa 3: Sanity query     → page.tsx → MapaSection  ← mismo componente, no cambia
```

En Etapa 3 solo cambia cómo `page.tsx` obtiene el array; `MapaSection` es agnóstico al origen.

- Tile: CartoDB Light (`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`)
- View: `[-34.657, -58.504]`, zoom 15 (Mataderos)
- Markers: ícono custom (div 36x36 con fondo accent)
- Popup: HTML string con imagen, StatusPill, nombre, link a `/proyectos/[slug]`
- Coordenadas en mock: agregar a `data/projects.ts` (aproximadas para Cosquín y Larrazábal, real para Zelada: `-34.6568, -58.5041`)

### D7: EmptyState

Cuando el filtro retorna 0 proyectos, se muestra un estado vacío centrado con ícono de búsqueda, texto y link a WhatsApp.

### D8: ContactSection

Se reutiliza `ContactSectionHome` ya implementado — idéntico al de la home.

## Risks / Trade-offs

- **Mapa con coordenadas aproximadas**: Cosquín y Larrazábal usan coordenadas de referencia en Mataderos, no exactas — se actualiza en Etapa 3 con coords reales
- **Leaflet con dynamic import**: puede haber un flash mientras carga; el contenedor tiene altura fija 480px con fondo `surface` como placeholder
- **Sin URL params en filtros**: el estado del filtro se pierde al navegar — aceptable para esta etapa
