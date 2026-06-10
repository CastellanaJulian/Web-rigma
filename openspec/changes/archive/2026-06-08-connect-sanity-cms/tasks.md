## 1. Fundaciones (capa de datos)

- [x] 1.1 Instalar `@sanity/image-url` y `@portabletext/react` en `site/`
- [x] 1.2 Crear `src/sanity/client.ts` con `createClient` de `next-sanity` (env desde `env.ts`, `useCdn: true`)
- [x] 1.3 Crear `src/sanity/image.ts` con helper `urlFor` (builder de `@sanity/image-url`)
- [x] 1.4 Agregar `images.remotePatterns` con `cdn.sanity.io` en `next.config.ts`
- [x] 1.5 Crear componente reutilizable de Portable Text (`src/components/shared/PortableText.tsx` o similar) con `@portabletext/react`

## 2. Schema de planos

- [x] 2.1 Modificar `src/sanity/schemas/project.ts`: `plans` pasa a `array of object { imagen: image, descripcion: string }` con descriptions de ayuda
- [x] 2.2 Proyecto de prueba "Zelada" publicado en el Studio con contenido completo (portada, 7 imágenes, descripción, highlights, coordenadas, POI). Plano cargado con schema viejo → soportado por mapeo tolerante

## 3. Queries GROQ y tipos

- [x] 3.1 Crear `src/sanity/queries.ts` con `getAllProjects` (listado: campos de card + status + slug)
- [x] 3.2 Agregar `getProjectBySlug` resolviendo `relatedProject->`, `plans[]`, `pointsOfInterest[]`, `description` (Portable Text), imágenes
- [x] 3.3 Agregar `getFeaturedProjects` desde `homePage.featuredProjects[].project->`
- [x] 3.4 Agregar `getSiteSettings`, `getHomePage`, `getNosotrosPage`, `getContactoPage`
- [x] 3.5 Definir tipos TS para cada query (en `src/types/project.ts`, repurposado como view-model); incluir helper `category → iconType` para POIs

## 4. Migración: ficha de proyecto

- [x] 4.1 `proyectos/[slug]/page.tsx`: reemplazar mock por `getProjectBySlug`, `generateStaticParams` desde `getAllProjects`, agregar `export const revalidate = 60`
- [x] 4.2 Adaptar `HeroSection`, `GaleriaSection` a imágenes Sanity (`urlFor` + `next/image`); guard de cover vacío en Hero
- [x] 4.3 Adaptar `DescriptionSection` a Portable Text
- [x] 4.4 Adaptar `PlanosSection` al nuevo shape `{ imagen, descripcion }`
- [x] 4.5 `LocationSection` ya consume `coordinates{}` + `pointsOfInterest` con `iconType` (resuelto en el mapeo de la query)
- [x] 4.6 Adaptar `SiguienteProyecto` al `relatedProject` resuelto (prop `RelatedProject`); omitir si no hay
- [x] 4.7 Ficha verificada: `/proyectos/zelada` devuelve 200 con título, imágenes de `cdn.sanity.io`, highlights ("Marzo 2030"), descripción Portable Text y plano (compat)

## 5. Migración: listado /proyectos (split server/client)

- [x] 5.1 Convertir `proyectos/page.tsx` a server component `async` con `getAllProjects` y `revalidate = 60`
- [x] 5.2 Crear `ProyectosClient.tsx` (`'use client'`) que recibe `projects` por props y mantiene los filtros con `useState`
- [x] 5.3 Mover `MapaSection` y lógica de filtros/orden al componente client; quitar import del mock (`priority` → `order`)
- [x] 5.4 Empty state cuando no hay proyectos (`EmptyState` en la grilla)

## 6. Migración: home y footer

- [x] 6.1 `home/ProyectosDestacados.tsx`: leer de `getFeaturedProjects`; empty state (return null) si no hay destacados
- [x] 6.2 `layout/Footer.tsx`: leer links de proyectos de Sanity y datos de contacto de `getSiteSettings`

## 7. Singletons institucionales

- [x] 7.1 `contacto/page.tsx`: split server/client; teléfono/email/dirección desde `getSiteSettings`; imagen desde `getContactoPage`
- [x] 7.2 Home: imagen del snippet Nosotros desde `getHomePage`
- [x] 7.3 `nosotros/page.tsx`: split server/client; imágenes de historia y filosofía desde `getNosotrosPage`

## 8. Limpieza y verificación

- [x] 8.1 Confirmar con `grep` que no quedan imports a `@/data/projects` (cero coincidencias)
- [x] 8.2 Eliminar `src/data/projects.ts` (mock). `src/types/project.ts` se conservó repurposado como view-model tipado desde Sanity
- [x] 8.3 `npm run build` verde (TS OK, ISR `revalidate 1m` en todas las rutas) y archivos nuevos sin errores de lint
- [x] 8.4 Las 5 páginas verificadas en local con contenido real (todas 200; siteSettings fluye a footer/contacto). Pendiente del cliente: crear el documento "Inicio" (homePage) para destacados + imagen Nosotros
