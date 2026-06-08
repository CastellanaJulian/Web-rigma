## Context

El proyecto usa Sanity v3 como CMS headless. Los schemas viven en `site/src/sanity/schemas/` y el Studio se hostea en sanity.io (plan Free). El cliente es no técnico — la usabilidad del Studio es una restricción de diseño tan importante como la correctitud del schema.

Estado actual: los schemas `project`, `homePage` y `team` existen pero tienen gaps respecto al frontend mock (`projects.ts`). El campo `nearbyPoints` es un array de strings simples, mientras que el frontend espera objetos con categoría y coordenadas. `team` fue descartado del scope. Faltan los singletons de páginas (nosotros, contacto, configuración).

## Goals / Non-Goals

**Goals:**
- Schemas completos y correctos para todos los tipos de contenido del sitio
- Studio usable por un cliente no técnico: labels claros, descriptions útiles, campos condicionales
- Singletons para páginas que tienen contenido editable pero son únicas (homePage, nosotrosPage, contactoPage, siteSettings)
- POIs con estructura suficiente para mostrar iconos por categoría y pines en el mapa

**Non-Goals:**
- Conectar el frontend a Sanity (eso es Etapa 3, change separado)
- Migrar datos mock a Sanity (se hace manualmente al finalizar los schemas)
- Schemas para contenido fuera de scope (blog, noticias, etc.)

## Decisions

### POIs como objetos estructurados en lugar de strings

Los POIs necesitan categoría (para el ícono) y coordenadas (para el pin en el mapa). Un array de strings no puede expresar eso.

El campo `coordinates` dentro de cada POI es de tipo `geopoint` — el mismo tipo que usa la ubicación del proyecto, que Sanity renderiza como mapa interactivo con buscador. El cliente no necesita ingresar lat/lng manualmente.

Alternativa descartada: strings simples — perderían categoría e ícono en la UI del sitio.

### coverImage del featuredSlot eliminada

El slot destacado en homePage usaba su propia imagen (podía diferir de la del proyecto). Se decidió usar directamente la `coverImage` del proyecto para reducir la carga de gestión del cliente (menos imágenes a subir y mantener).

Alternativa descartada: imagen por slot — más flexible pero innecesaria para 3-4 proyectos.

### Datos de contacto en siteSettings (no hardcodeados)

Teléfono, email y dirección aparecen en el footer y en la página Contacto. Si cambia el número de WhatsApp, el cliente lo actualiza en un solo lugar. El singleton tiene 3 campos, sin complejidad.

### team eliminado del schema

El equipo no entra en el scope del sitio. El schema se elimina; si se decide incluirlo en el futuro, se crea en un change separado.

### Ícono de POI derivado de la categoría en el frontend

El cliente elige la categoría (Transporte, Salud, Educación, Comercio) y el frontend mapea el ícono correspondiente. No hay campo de ícono en el schema — reduce opciones y errores para el cliente.

## Risks / Trade-offs

- **Campo `locationDescription` nuevo en project** → el frontend mock ya lo usa (`projects.ts`), así que el schema se alinea al mock existente. Sin riesgo de regresión porque el frontend sigue usando datos mock.
- **Eliminar `team.ts`** → si el schema ya fue deployado al Studio, Sanity puede tener documentos de tipo `team` existentes. Verificar antes de eliminar. En este caso el Studio aún no fue deployado con datos reales, por lo que es seguro.
- **`featuredSlot` sin `coverImage`** → si hay documentos homePage ya creados en Sanity con imágenes de slot, esas imágenes quedan huérfanas. Dado que el Studio está vacío, no hay datos que migrar.

## Migration Plan

1. Aplicar cambios en los schemas localmente
2. Correr `cd site && npm run dev` para verificar que el Studio compila sin errores de TypeScript
3. Hacer commit y push a `main` — Vercel no está configurado para `site/` aún, no hay deploy automático que romper
4. El cliente carga los datos desde el Studio hosteado en sanity.io (deploying Studio es un step separado con `npx sanity deploy`)

Rollback: revertir el commit. El frontend no consume Sanity todavía, así que no hay impacto en producción.
