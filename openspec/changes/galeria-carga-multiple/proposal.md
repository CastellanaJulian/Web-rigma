## Why

El campo `images` (galería de renders y obra) del schema de Proyecto está modelado como un **array de objetos** `galleryImage` (`{ imagen: image, descripcion: string }`). Sanity trata este caso distinto a un array de `image` plano: el botón de carga abre el formulario del objeto campo por campo, así que el selector de archivos del sistema operativo solo permite elegir **una imagen por vez**. La carga masiva solo funciona arrastrando archivos.

El usuario necesita poder seleccionar varias imágenes a la vez desde el selector de archivos (en Mac y Windows). Además, el campo `descripcion` por imagen de la galería **no se usa** en el proyecto: el frontend lo renderiza condicionalmente como `caption` y, al no completarse, no muestra nada. Es metadata innecesaria que justifica el wrapper de objeto.

El dataset todavía no es productivo: no hay galerías cargadas que conservar, por lo que no se requiere migración de datos.

## What Changes

- **Schema `project.ts` → `images`:** aplanar el array de objetos `galleryImage` a un array de `image` puro (`of: [{ type: 'image', options: { hotspot: true } }]`). Esto restaura el selector de archivos con selección múltiple y mantiene el drag & drop de varias imágenes.
- **Se elimina** el campo `descripcion` de la galería (no se usa).
- **GROQ query (`queries.ts`):** simplificar la proyección de `images[]` a `{ asset, _type }` (limpieza; el mapper ya es retrocompatible).
- **Sin cambios en el render:** `GaleriaSection` oculta el `caption` cuando no existe, y el mapper ya soporta el formato plano (`i.imagen ?? i`).
- **Fuera de alcance:** el campo `plans` (planos) conserva su estructura de objeto con `descripcion`, porque la leyenda de tipología sí se usa ahí.

## Capabilities

### Modified Capabilities

- `sanity-project-schema`: La galería pasa a ser un array de `image` plano (sin descripción), habilitando carga múltiple desde el selector de archivos.

## Impact

- `site/src/sanity/schemas/project.ts` — campo `images`
- `site/src/sanity/queries.ts` — proyección GROQ y (opcional) tipos `RawGalleryImage` / mapper
- Sin migración de datos (dataset no productivo)
- Sin cambios en `site/src/components/sections/ficha/GaleriaSection.tsx`
