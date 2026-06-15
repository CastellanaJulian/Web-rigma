## Context

El sitio tiene 5 páginas que leen contenido desde Sanity. Sin embargo, varias secciones clave de la home y la ficha de proyecto todavía tienen contenido hardcodeado en los componentes TSX:

- `HeroCarousel.tsx`: título H1 y subtítulo hardcodeados en el JSX
- `NosotrosSnippet.tsx`: título de sección, párrafo de texto, y los dos valores de métricas (`32000` y `220`) hardcodeados en el código
- `PorQueSection.tsx`: array `pilares` con los 4 objetos completamente hardcodeados
- `LocationSection.tsx`: URL de Nominatim con `"Mataderos"` hardcodeado; el título del sidebar se construye en `[slug]/page.tsx` como `"${project.neighborhood}, CABA"` sin campo dedicado

Sanity ya tiene:
- Singleton `nosotrosPage` con 3 campos de imagen (sin contenido de texto)
- Schema `project` con fieldset `ubicacion` (coordinates, locationDescription, pointsOfInterest)
- Queries bien establecidas en `queries.ts` con tipado fuerte

## Goals / Non-Goals

**Goals:**
- Todo el contenido editable de la home gestionable desde Sanity sin tocar código
- Título y polígono del mapa en la ficha configurables por proyecto
- Fallbacks en todos los campos: si Sanity devuelve vacío, se muestra el texto actual (sin romper el sitio)
- Sin cambios visuales: misma UI, solo los datos pasan a ser dinámicos

**Non-Goals:**
- Editar los íconos de los pilares desde Sanity (permanecen hardcodeados por índice)
- Multiidioma ni variantes de contenido
- Preview en tiempo real en Sanity Studio (fuera de scope)
- Cambiar el diseño o animaciones de ningún componente

## Decisions

### D1 — Nuevo singleton `homePage` (no sumar a `siteSettings`)

`siteSettings` existe para datos de contacto globales (teléfono, email, dirección). Agregar hero title y pilares ahí mezclaría responsabilidades y confundiría al cliente en el Studio.

Se crea `homePage` como nuevo `document` singleton, visible en Studio bajo "Inicio". Agrupa: `heroTitulo`, `heroSubtitulo`, `pilares[]`.

### D2 — Métricas en `nosotrosPage` como campos numéricos independientes (no array)

Alternativa descartada: un array genérico `metricas[]` con `{ valor, prefijo, etiqueta }`. Demasiada flexibilidad innecesaria — las métricas son siempre las mismas dos (m² y unidades). Dos campos fijos `metricaM2` y `metricaUnidades` son más simples de cargar y no permiten errores de orden.

El `+` y las etiquetas ("M² Construidos", "Unidades Funcionales") permanecen hardcodeados en el componente.

### D3 — Pilares como array de exactamente 4 en Sanity (`min(4).max(4)`)

Los íconos son SVGs fijos por posición (índice 0→medal, 1→calendar, 2→trending, 3→grid). El array siempre tiene 4 elementos. Se aplica `validation: r.min(4).max(4)` en el schema. No se expone selección de ícono al cliente.

### D4 — Fallbacks en todos los campos de texto

Si `homePage` no existe aún en Sanity (el cliente no lo completó), los componentes muestran el texto hardcodeado actual. Esto garantiza que el sitio nunca quede en blanco durante la transición.

```ts
// Patrón en cada componente:
const titulo = props.heroTitulo ?? 'Construimos espacios que perduran'
```

### D5 — `barrio` y `locationTitle` como campos independientes en fieldset `ubicacion`

`barrio` (string, opcional): alimenta la query de Nominatim. Si está vacío → no se hace fetch → no se dibuja polígono.
`locationTitle` (string, required): texto del sidebar del mapa. Campo separado de `neighborhood` (que ya existe en `infoHorizontal` y alimenta la tira de datos) porque el cliente puede querer mostrar un texto diferente en el mapa.

Si `barrio` tiene valor, `LocationSection` construye: `?q=${barrio},Buenos+Aires,Argentina`.

### D6 — Pasar `barrio` como prop al componente (no hacer fetch desde el componente a Sanity)

`LocationSection` es un componente cliente (`'use client'`). El dato de `barrio` viene del servidor vía props desde `[slug]/page.tsx`. Esto mantiene el patrón ya establecido en el proyecto: server components hacen el fetch, client components reciben props.

## Risks / Trade-offs

- **Nominatim + barrio libre**: Si el cliente escribe un barrio con typo o que Nominatim no reconoce, el polígono simplemente no aparece (falla silenciosa, no rompe el mapa). Mitigation: el campo tiene descripción con ejemplo claro en Sanity.
- **Sanity vacío en producción**: Hasta que el cliente cargue el contenido en `homePage`, se muestran los textos hardcodeados actuales. Mitigation: los fallbacks garantizan esto.
- **`min(4).max(4)` en pilares**: Si en el futuro se quiere cambiar la cantidad de pilares, requiere cambio de schema y componente. Asumimos que 4 es estable por diseño.

## Migration Plan

1. Deployar el cambio — el sitio sigue funcionando igual (fallbacks activos)
2. En Sanity Studio: completar `homePage` → hero + pilares
3. En Sanity Studio: completar `nosotrosPage` → snippetTitulo, snippetTexto, metricaM2, metricaUnidades
4. Para cada proyecto: completar `locationTitle` y opcionalmente `barrio` en el fieldset Ubicación
5. No hay rollback complejo: si se borra contenido de Sanity, los fallbacks del código retoman
