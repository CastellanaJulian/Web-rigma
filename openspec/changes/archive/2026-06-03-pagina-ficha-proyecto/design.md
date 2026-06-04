## Context

`site/src/app/proyectos/[slug]/page.tsx` existe como scaffold con `generateStaticParams`. El diseño de referencia (`diseno-final/ficha-proyecto.html`) implementa la página completa para Cosquín 1534 como prototipo. El tipo `Project` ya tiene la mayoría de los campos necesarios; falta `pointsOfInterest`.

## Goals / Non-Goals

**Goals:**
- Ficha completa con todas las secciones del diseño de referencia
- Secciones condicionales que se ocultan cuando no hay datos
- Mapa: visible solo si hay `coordinates`; POIs visibles solo si los hay
- Galería con zoom en hover
- Planos en acordeón con lightbox
- Transición de Etapa 2 → Etapa 3 limpia: solo cambia la fuente de datos

**Non-Goals:**
- Lightbox de galería fullscreen (el diseño solo tiene zoom + overlay oscuro en hover)
- Integración Sanity (Etapa 3)
- Animación de transición entre secciones

## Decisions

### D1: Estructura de la página — Server Component con Client Components internos

La página es un Server Component que obtiene el proyecto y renderiza las secciones. Las secciones que necesitan interactividad (`GaleriaSection`, `PlanosSection`, `LocationSection`, `DescriptionSection`) son Client Components en archivos separados en `components/sections/ficha/`.

```
proyectos/[slug]/page.tsx  (server)
├── HeroSection            (inline en page — solo estado hover del botón → client)
├── KeyDataStrip           (inline — sin estado)
├── DescriptionSection     (client — useInView para highlights)
├── GaleriaSection         (client — hover state por imagen)
├── PlanosSection          (client — acordeón + modal)
├── LocationSection        (client — Leaflet)
├── ProyectoRelacionado    (inline — link a otro proyecto)
└── ContactSectionHome     (client — ya existe)
```

### D2: Tipo POI y campo en Project

```ts
export type POI = {
  lat: number
  lng: number
  category: string
  name: string
  detail: string
  iconType: 'transport' | 'health' | 'education' | 'commerce'
}

// En Project:
pointsOfInterest?: POI[]
```

El `iconType` determina qué SVG renderiza el componente. Sanity solo guarda el string. En Etapa 3 el editor asigna `iconType` desde un selector.

### D3: Condicionalidad de secciones

```tsx
// page.tsx
{project.images.length > 0 && <GaleriaSection images={project.images} />}
{project.plans && project.plans.length > 0 && <PlanosSection plans={project.plans} typologies={project.typologies} />}
{project.coordinates && (
  <LocationSection
    coordinates={project.coordinates}
    projectName={project.title}
    projectStatus={project.status}
    pois={project.pointsOfInterest ?? []}
  />
)}
{project.relatedProject && <ProyectoRelacionado slug={project.relatedProject} />}
```

### D4: KeyDataStrip — ítems condicionales

Los ítems del strip solo se muestran si tienen valor. La barra de progreso solo aparece si `project.progress` existe:

```ts
const items = [
  { label: 'Ubicación', value: project.neighborhood ?? project.location },
  project.highlights.delivery && { label: 'Entrega estimada', value: project.highlights.delivery },
  project.highlights.availableUnits && { label: 'Unidades disponibles', value: `${project.highlights.availableUnits} de ${project.highlights.totalUnits}` },
  project.progress && { label: 'Avance de obra', value: `${project.progress}%`, bar: true, pct: project.progress },
].filter(Boolean)
```

### D5: GaleriaSection — grid asimétrico

Layout fijo de 2 columnas con `gridTemplateRows`:
```
Col izq: imagen grande (span 2 filas = 340px + 200px + 6px gap = 546px)
Col der: imagen media arriba (340px) + imagen media abajo (200px)
```
Segunda fila: 2 imágenes iguales de 200px.

Cada imagen tiene zoom `scale(1.04)` + overlay `rgba(30,30,30,0.15)` en hover.

Si `project.images.length < 5` → se muestran las que hay sin intentar renderizar las faltantes.

### D6: PlanosSection — acordeón con lightbox

Grupos de planos por tipología (derivados de `project.typologies`). Cada grupo es un acordeón expandible. Al hacer click en un plano, abre un modal/lightbox a pantalla completa con la imagen ampliada. `body.overflow: hidden` mientras el modal está abierto.

La imagen del plano usa las rutas en `project.plans[]`. En mock, se usan imágenes de placeholder.

### D7: LocationSection — mapa con proyecto + POIs

El mapa siempre muestra el marker del proyecto (accent, ícono de edificio). Los POIs son markers más pequeños (fondo claro, SVG según `iconType`). Al hacer hover sobre un POI en la lista lateral, se abre su popup en el mapa y viceversa.

```
Mapa           | Lista de POIs
(Leaflet)      | [icono] Categoría / Nombre / Detalle
               | (hover resalta en ambos)
```

El mapa también muestra el contorno de Mataderos (mismo fetch a Nominatim que en MapaSection).

### D8: Imágenes de ejemplo en mock

Para que la galería funcione en Etapa 2, se asignan imágenes existentes a Cosquín:
```ts
images: ['/images/img-1.jpg', '/images/img-2.jpg', '/images/img-3.jpg', '/images/img-4.jpg', '/images/img-5.jpg'],
plans: ['/images/img-plano.jpg'],
```

## Risks / Trade-offs

- **Galería con imágenes de obra** — Las imágenes mock son renders genéricos, no del proyecto. Aceptable en Etapa 2; el cliente sube las reales en Etapa 3 via Sanity.
- **POIs con coordenadas aproximadas** — Las coords de los POIs en el mock son referencias del diseño de referencia, no verificadas en campo.
- **PlanosSection con una sola imagen** — El mock tiene un solo plano; el acordeón colapsa en un único grupo con un solo plano. En Etapa 3 el cliente carga los planos reales.
- **Hero siendo Client Component** — El botón "CONTACTANOS" tiene hover state, lo que requiere client. Se marca `'use client'` solo el componente Hero, no toda la página.
