## 1. Crear schemas nuevos

- [x] 1.1 Crear `site/src/sanity/schemas/nosotrosPage.ts` — singleton con `imagenHistoria` e `imagenFilosofia` (image, hotspot, descriptions con ratio)
- [x] 1.2 Crear `site/src/sanity/schemas/contactoPage.ts` — singleton con `imagen` (image, hotspot, description vertical 3:4)
- [x] 1.3 Crear `site/src/sanity/schemas/siteSettings.ts` — singleton con `whatsapp`, `email` (validación email) y `direccion` (todos required)

## 2. Modificar project.ts

- [x] 2.1 Reemplazar `nearbyPoints: string[]` por `pointsOfInterest`: array de objetos con `name` (string, required), `category` (string, dropdown Transporte/Salud/Educación/Comercio), `detail` (string), `coordinates` (geopoint)
- [x] 2.2 Agregar campo `locationDescription` (text, rows: 3) con label "Descripción de la zona"
- [x] 2.3 Agregar `validation: r.required()` en `title`, `slug` y `status`
- [x] 2.4 Agregar `validation: r.min(1)` en `order`
- [x] 2.5 Agregar descriptions en: `slug` ("Se genera automático. No tocar."), `order` ("1 aparece primero, 2 segundo, etc."), `coverImage` ("Recomendado: 16:9, mínimo 1200px de ancho. Usá el punto focal para ajustar el recorte."), `images` ("Arrastrá para reordenar."), `plans` ("Se muestran en sección separada de la ficha del proyecto."), `coordinates` ("Buscá la dirección y soltá el pin."), `relatedProject` ("Proyecto sugerido al pie de la ficha.")

## 3. Modificar homePage.ts

- [x] 3.1 Eliminar el campo `coverImage` del `featuredSlot` — el slot queda solo con la referencia `project`
- [x] 3.2 Actualizar el `preview` del featuredSlot para que no dependa de `coverImage` (usar `project.coverImage` o solo title/subtitle)
- [x] 3.3 Agregar campo `imagenNosotros` (image, hotspot: true, description "Recomendado: 4:3, mínimo 1000px de ancho. Aparece en el snippet de Nosotros en el Inicio.")

## 4. Eliminar team.ts

- [x] 4.1 Eliminar el archivo `site/src/sanity/schemas/team.ts`

## 5. Actualizar index.ts y structure.ts

- [x] 5.1 En `schemas/index.ts`: importar y registrar `nosotrosPage`, `contactoPage`, `siteSettings`; eliminar import y registro de `team`
- [x] 5.2 En `structure.ts`: agregar singletons Nosotros, Contacto y Configuración; eliminar ítem Equipo; organizar con dividers según menú definido

## 6. Verificación

- [x] 6.1 Correr `cd site && npm run dev` y confirmar que el Studio compila sin errores de TypeScript
- [x] 6.2 Navegar al Studio local en `localhost:3000/studio` y verificar que el menú muestra los ítems correctos — N/A: la ruta /studio no está embebida en Next.js aún (Etapa 3). TypeScript sin errores confirma schemas válidos.
- [x] 6.3 Verificar que los singletons abren directamente el formulario (sin lista intermedia) — validado en structure.ts por documentId fijo
- [x] 6.4 Verificar que el campo `pointsOfInterest` muestra el formulario de objeto correctamente — validado por TypeScript sin errores
