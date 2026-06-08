## Why

Los schemas de Sanity actuales no cubren todos los tipos de contenido que necesita el sitio de Rigma, y algunos campos existentes no coinciden con lo que el frontend ya usa (mock data). Se ajustan y completan los schemas antes de conectar el frontend al CMS en la Etapa 3.

## What Changes

- **Modificar `project.ts`**: reemplazar `nearbyPoints: string[]` por `pointsOfInterest` (array de objetos estructurados con nombre, categoría, detalle y geopoint); agregar `locationDescription`; agregar descriptions y validations en campos clave.
- **Modificar `homePage.ts`**: eliminar `coverImage` del featuredSlot (se usa la imagen del proyecto); agregar `imagenNosotros` para el snippet de Nosotros en el Inicio.
- **Eliminar `team.ts`**: el equipo no entra en el scope del sitio.
- **Crear `nosotrosPage.ts`**: singleton con `imagenHistoria` e `imagenFilosofia`.
- **Crear `contactoPage.ts`**: singleton con `imagen` para la columna derecha de la página Contacto.
- **Crear `siteSettings.ts`**: singleton con datos de contacto (whatsapp, email, dirección) que aparecen en footer y página Contacto.
- **Actualizar `schemas/index.ts`**: registrar los nuevos schemas, eliminar `team`.
- **Actualizar `structure.ts`**: menú del Studio organizado por páginas del sitio, con los nuevos singletons y sin Equipo.

## Capabilities

### New Capabilities

- `sanity-project-schema`: Schema completo del documento Proyecto, con POIs estructurados y descripción de ubicación.
- `sanity-home-page`: Singleton homePage con proyectos destacados (sin imagen propia por slot) e imagen del snippet Nosotros.
- `sanity-nosotros-page`: Singleton nosotrosPage con imágenes editoriales de las secciones Historia y Filosofía.
- `sanity-contacto-page`: Singleton contactoPage con imagen institucional de la columna derecha.
- `sanity-site-settings`: Singleton siteSettings con datos de contacto editables por el cliente.
- `sanity-studio-structure`: Menú lateral del Studio organizado por páginas del sitio público.

### Modified Capabilities

## Impact

- Archivos modificados: `site/src/sanity/schemas/project.ts`, `site/src/sanity/schemas/homePage.ts`, `site/src/sanity/schemas/index.ts`, `site/src/sanity/structure.ts`
- Archivos nuevos: `site/src/sanity/schemas/nosotrosPage.ts`, `site/src/sanity/schemas/contactoPage.ts`, `site/src/sanity/schemas/siteSettings.ts`
- Archivos eliminados: `site/src/sanity/schemas/team.ts`
- Sin impacto en el frontend todavía — las queries al CMS se conectan en un change separado (Etapa 3).
