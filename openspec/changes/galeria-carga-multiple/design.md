## Contexto

Sanity renderiza dos inputs distintos según el `of` de un array:

| `of` del array              | Input de carga                          | Selección múltiple en file picker |
|-----------------------------|-----------------------------------------|-----------------------------------|
| `[{ type: 'image' }]`       | Botón "Upload" → `<input multiple>`     | ✅ sí                              |
| `[{ type: 'object', … }]`   | Botón "Add item" → form del objeto      | ❌ no (una por vez)               |

El drag & drop de varios archivos funciona en ambos casos **solo** porque el objeto `galleryImage` tiene un único campo de tipo `image`; Sanity reparte cada archivo arrastrado en un item. Pero esa heurística no aplica al selector de archivos, que sigue el `multiple` del `<input>` del campo individual.

## Decisión

Aplanar `images` a `array of image`. La descripción por imagen no se usa (frontend la oculta), así que el wrapper de objeto no aporta valor y sí cuesta usabilidad de carga.

```
ANTES                              DESPUÉS
images: array of                   images: array of
  object galleryImage                image
    ├ imagen (image, hotspot)          options: { hotspot: true }
    └ descripcion (string)           (sin metadata)
```

## Por qué el frontend casi no se toca

El mapper ya quedó retrocompatible de un cambio anterior:

```ts
// queries.ts
.map((i) => ({ src: img((i.imagen ?? i) as SanityImage, 1600), caption: i.descripcion }))
//                          ▲ si no hay .imagen, usa el item como imagen
```

Con la galería plana, `i` es directamente la imagen → `i.imagen ?? i` resuelve a `i`. `caption` queda `undefined` y `GaleriaSection` lo oculta (`{images[idx]?.caption && …}`). No hay cambios de render obligatorios; la limpieza del GROQ y de los tipos es opcional pero recomendada.

## Riesgo descartado

Migración de datos: **no aplica**. El dataset no es productivo y no hay galerías cargadas en formato `galleryImage`. Si en el futuro existieran, el Studio las marcaría como "unknown type" (aunque el frontend las seguiría leyendo), pero ese caso no se da hoy.

## Corrección durante la implementación

Aplanar a `array of image` **no** habilitó la selección múltiple desde el selector de archivos. Verificado en runtime de Sanity 5.30: el botón nativo "Añadir elemento" siempre crea un ítem por vez; la única carga masiva nativa es el drag & drop (que ya funcionaba). No hay opción de schema para cambiar ese botón.

**Solución final:** un input custom (`components: { input: MultiImageUploadInput }`) en el campo `images` que:
- conserva el input por defecto (`renderDefault`) → grilla, preview y reordenamiento por arrastre,
- oculta por CSS el botón nativo "Añadir elemento" (`data-testid` `add-item` / `add-single-object-button`),
- agrega un botón que dispara un `<input type="file" multiple>`, sube cada imagen con `client.assets.upload('image', file)` y las inserta todas en el array con un solo patch (`setIfMissing([]) + insert(items, 'after', [-1])`).

El aplanado del schema sigue siendo necesario: el input custom inserta ítems `{ _type: 'image', asset }`, que es justamente la forma plana.

## Alternativas consideradas

- **Conservar el objeto y educar a usar drag & drop:** rechazado, el usuario quiere el selector de archivos múltiple.
- **`array of image` con `fields: [descripcion]`:** mantendría la carga múltiple y la descripción, pero la descripción no se usa, así que se descarta por simplicidad.
