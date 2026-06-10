## 1. Schema — galería plana

- [x] 1.1 En `site/src/sanity/schemas/project.ts`, reemplazar el `of` del campo `images` (objeto `galleryImage`) por `of: [{ type: 'image', options: { hotspot: true } }]`
- [x] 1.2 Eliminar el campo `descripcion` y el `preview` del objeto `galleryImage` (ya no aplican)
- [x] 1.3 Actualizar la `description` del campo para reflejar que se pueden seleccionar varias imágenes desde el selector de archivos (no solo arrastrando)
- [x] 1.4 Conservar la validación `r.min(5).warning(...)` y `options: { layout: 'grid' }`

## 2. Frontend — alinear con la estructura nueva (obligatorio)

- [x] 2.1 En `site/src/sanity/queries.ts`, simplificar la proyección GROQ de `images[]` a `{ asset, _type }`
- [x] 2.2 Simplificar el mapper de `images` (quitar `i.imagen ?? i` y `caption: i.descripcion`, dejar el item como imagen directa)
- [x] 2.3 Limpiar el tipo `RawGalleryImage` (`caption` en `GalleryImage` queda como opcional sin uso de datos — lo conserva `GaleriaSection`, sin cambios)

## 3. Input custom de carga múltiple (el aplanado solo no alcanzó)

- [x] 3.1 Crear `site/src/sanity/components/MultiImageUploadInput.tsx`: conserva `renderDefault`, oculta el botón nativo "Añadir elemento" y agrega un botón "Subir imágenes (varias a la vez)" cableado a `<input type="file" multiple>` que sube con `client.assets.upload` e inserta todo con un patch
- [x] 3.2 Asignar `components: { input: MultiImageUploadInput }` al campo `images` en `project.ts`
- [x] 3.3 Verificar tipos (`tsc --noEmit`) y lint OK

## 4. Verificación

- [ ] 4.1 `cd site && npm run dev` y abrir el Studio: en la galería, tocar "Subir imágenes (varias a la vez)" y confirmar que el selector deja elegir varias y se suben todas
- [ ] 4.2 Confirmar que "Añadir elemento" ya no aparece y que arrastrar varias sigue funcionando
- [ ] 4.3 Cargar un proyecto con galería y verificar que la ficha (`/proyectos/[slug]`) renderiza las imágenes sin errores y sin caption
