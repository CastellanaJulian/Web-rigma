## Why

El sitio público (`site/`) sirve todo su contenido desde un mock estático (`src/data/projects.ts`) y datos hardcodeados (teléfono, email, dirección). El Studio de Sanity y los schemas ya están listos, pero ninguna página consume el CMS todavía. Para cerrar la Etapa 3, el cliente tiene que poder editar proyectos y datos institucionales desde el Studio y verlos reflejados en el sitio sin tocar código ni redeployar.

## What Changes

- Se introduce una capa de lectura de Sanity en `site/`: cliente de fetch, queries GROQ, generación de URLs de imagen (`urlFor`) y render de Portable Text.
- Las 4 ubicaciones que hoy importan el mock pasan a leer de Sanity: ficha de proyecto (`/proyectos/[slug]`), listado (`/proyectos`), destacados del home (`ProyectosDestacados`) y footer.
- La página `/proyectos` se refactoriza: hoy es `'use client'` con filtros en `useState` e importa el mock directo. Se parte en una **page server** que hace el fetch y un **componente client** que recibe la lista y maneja los filtros.
- Los singletons del CMS se conectan: `siteSettings` (teléfono/email/dirección → footer + contacto), `homePage` (destacados + imagen Nosotros), `nosotrosPage` (imágenes), `contactoPage` (imagen).
- Estrategia de render: **ISR `revalidate: 60`** en las páginas server. Sin webhook por ahora.
- Comportamiento ante CMS vacío: **cablear directo con empty states** — si no hay contenido, las secciones muestran estados vacíos en lugar de caer al mock.
- El schema `project` cambia `plans` de `image[]` a un objeto `{ imagen, descripcion }[]` para conservar la leyenda de tipología por plano que hoy tiene el mock. **BREAKING** para el schema (el contenido aún no está cargado, así que no hay migración de datos).
- Se elimina `src/data/projects.ts` una vez que ningún archivo lo importe.
- `next.config.ts` agrega `cdn.sanity.io` a los dominios permitidos de `next/image`.

## Capabilities

### New Capabilities
- `sanity-content-fetching`: Capa de datos de lectura del sitio público — cliente Sanity, queries GROQ tipadas, `urlFor` para imágenes, render de Portable Text, estrategia de render ISR y contrato de empty states cuando el CMS no tiene contenido.

### Modified Capabilities
- `sanity-project-schema`: El campo `plans` pasa de array de imágenes planas a array de objetos `{ imagen, descripcion }` para conservar la descripción de tipología por plano.

## Impact

- **Dependencias nuevas:** `@sanity/image-url`, `@portabletext/react` (en `site/`). `next-sanity` ya está instalado.
- **Código nuevo:** `src/sanity/client.ts`, `src/sanity/queries.ts` (GROQ), `src/sanity/image.ts` (`urlFor`), helpers de tipos derivados de las queries.
- **Código modificado:** `proyectos/[slug]/page.tsx`, `proyectos/page.tsx` (split server/client), `home/ProyectosDestacados.tsx`, `layout/Footer.tsx`, `contacto/page.tsx`, `nosotros/page.tsx`, componentes de ficha que renderizan imágenes/descripción/planos/POIs, `next.config.ts`, `schemas/project.ts`.
- **Código eliminado:** `src/data/projects.ts` (mock). El type `src/types/project.ts` se reemplaza por tipos derivados de las queries de Sanity.
- **Render:** páginas pasan de estáticas/mock a server components con `revalidate: 60`. La página `/proyectos` deja de ser un único client component.
- **Mapeos schema↔código a resolver:** `description` (string → Portable Text), imágenes (string → asset ref), `plans` (nuevo objeto), `pointsOfInterest` (`coordinates{}` + `category`, derivar `iconType`), `relatedProject` (reference → resolver slug), destacados (de `homePage.featuredProjects` en vez de `priority`), `_id` vs `id`.
