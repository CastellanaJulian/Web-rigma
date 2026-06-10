## Context

El Studio de Sanity y todos los schemas (`project`, `homePage`, `nosotrosPage`, `contactoPage`, `siteSettings`) ya están definidos y embebidos en `site/`. El dataset `production` existe pero está prácticamente vacío (1 documento `project` sin datos). El sitio público renderiza desde `src/data/projects.ts` (mock) y strings hardcodeados.

Restricciones conocidas:
- **No hay capa de lectura de Sanity todavía** — no existe cliente, queries ni render de imágenes/Portable Text. Hay que construirla desde cero.
- **`projectId`/`dataset` son públicos** y ya tienen fallback en `src/sanity/env.ts`, por lo que el sitio puede leer sin `.env.local`. La lectura del dataset público no requiere token.
- **`/proyectos` es un client component** (`'use client'` + `useState` para filtros) — no puede hacer fetch server-side tal como está.
- **Plan Sanity Free + Vercel Hobby** — la estrategia de render debe ser barata.
- El mock (`Project`) y el schema **no encajan 1:1**: `description` (string vs Portable Text), imágenes (string vs asset ref), `plans` (`{src,description}` vs `image[]`), `pointsOfInterest` (`lat,lng,iconType` vs `coordinates{},category`), `relatedProject` (slug vs reference), destacados (`priority` vs `homePage.featuredProjects`), `id` vs `_id`.

## Goals / Non-Goals

**Goals:**
- Que las 5 páginas y los componentes globales lean su contenido desde Sanity.
- Que el cliente edite en el Studio y vea los cambios en ≤60s recargando la página, sin redeploy.
- Eliminar el mock por completo, sin dejar imports colgados.
- Tipado de extremo a extremo: las queries devuelven tipos derivados, no `any`.
- Empty states limpios cuando el CMS no tiene contenido (no romper, no caer al mock).

**Non-Goals:**
- Webhook de revalidación on-demand (queda como upgrade futuro; se deja `revalidate` como mecanismo).
- Cargar el contenido real en el Studio (es tarea del cliente/aparte).
- Formulario de contacto vía Resend (es otra unidad de trabajo, no Sanity).
- Migración de datos existentes (el dataset está vacío, no hay qué migrar).
- Preview en vivo / draft mode del Studio.

## Decisions

### 1. Estrategia de render: ISR `revalidate = 60`
Cada page server exporta `export const revalidate = 60`. El cache es lazy (solo revalida cuando entra una visita pasados los 60s) y por-ruta.
- **Por qué:** equilibrio entre frescura y costo. En tráfico bajo casi no consume cuota de Sanity. El cliente ve sus ediciones en <1 min.
- **Alternativas:** *Dynamic* (`no-store`) — cada visita pega a Sanity, caro y lento, descartado. *Webhook on-demand* — instantáneo y sin "primera visita stale", pero suma setup (endpoint + secret + config en Sanity); se difiere a una iteración futura sin necesidad de rehacer nada.
- **Trade-off aceptado:** con ISR por tiempo, la primera visita después de un hueco largo ve contenido stale mientras se regenera en background; la siguiente ya ve lo nuevo. Se mitiga con la instrucción al cliente de recargar dos veces la página editada.

### 2. Un solo cliente Sanity centralizado (`src/sanity/client.ts`)
`createClient` de `next-sanity` con `projectId`/`dataset`/`apiVersion` desde `env.ts`, `useCdn: true`. Todas las queries pasan por este cliente.
- **Por qué:** evita reconfigurar el cliente en cada page; `useCdn:true` sirve desde el CDN de Sanity (más barato/rápido) y es compatible con ISR.

### 3. Queries GROQ centralizadas y tipadas (`src/sanity/queries.ts`)
Las queries resuelven en GROQ todo lo que el componente necesita, evitando lógica de mapeo en el render:
- `relatedProject->{ "slug": slug.current, title, status, coverImage }` (resuelve la reference).
- `coverImage`/`images`/`plans[].imagen` se traen como objetos asset; la URL se arma con `urlFor`.
- `description` se trae como Portable Text (`block[]`).
- destacados desde `*[_type=="homePage"][0].featuredProjects[].project->{...}`.
- Tipos: se definen tipos TS a mano que reflejan el shape de cada query (no se adopta `sanity-codegen` en esta iteración para no sumar build step).
- **Alternativa:** mapear en JS dentro de cada page → disperso y propenso a errores; descartado.

### 4. Imágenes: `urlFor` + `cdn.sanity.io` en `next.config`
Helper `src/sanity/image.ts` con `@sanity/image-url` (builder configurado con el cliente). Los componentes pasan de `<Image src="/images/x.jpg">` a `<Image src={urlFor(img).width(...).url()}>` respetando hotspot. Se agrega `images.remotePatterns` con `cdn.sanity.io` en `next.config.ts`.
- **Por qué:** `next/image` necesita dominio permitido; `urlFor` permite pedir el tamaño/recorte correcto y respeta el punto focal definido en el Studio.

### 5. Render de descripción con `@portabletext/react`
`description` deja de ser string. Se renderiza con `<PortableText value={...} />`, con componentes custom mínimos si hace falta para estilos.

### 6. Split de `/proyectos` en server + client
`proyectos/page.tsx` pasa a server component (`async`, hace el fetch, `revalidate`). Se crea `ProyectosClient.tsx` (`'use client'`) que recibe `projects` por props y mantiene los filtros con `useState`. El componente client no importa nada de Sanity.
- **Por qué:** es la única forma de combinar fetch server-side con interactividad client. Patrón estándar de App Router.

### 7. `plans` como objeto `{ imagen, descripcion }`
Se modifica el schema `project`: `plans` pasa de `array of image` a `array of object { imagen: image, descripcion: string }`.
- **Por qué:** conservar la leyenda de tipología por plano (ej. "4 amb 112 m²") que el mock tenía y el schema había perdido. El dataset está vacío → sin migración.

### 8. Empty states, no fallback al mock
Cuando una query devuelve vacío/null, el componente muestra un estado vacío (o se omite la sección). No se reintroduce el mock como respaldo.
- **Por qué:** decisión del usuario — mantener una única fuente de verdad (Sanity) y evitar la ambigüedad de "¿esto es real o es mock?".
- **Trade-off:** hasta que el cliente cargue contenido, el sitio se ve "pelado". Aceptado.

### 9. `pointsOfInterest`: derivar `iconType` de `category`
El schema guarda `category` (Transporte/Salud/Educación/Comercio) y `coordinates{lat,lng}`. El mapa necesita `iconType` y `lat,lng` planos. Se mapea en la query/un helper: `category → iconType` (tabla fija) y se aplanan las coordenadas.

## Risks / Trade-offs

- **Primera visita stale tras edición (ISR por tiempo)** → Mitigación: instruir al cliente a recargar la página editada dos veces; documentar para upgrade a webhook si molesta.
- **Sitio vacío hasta cargar contenido** → Mitigación: empty states prolijos; coordinar con el cliente la carga antes del cutover a producción.
- **Mismatch schema↔código mal mapeado** (planos, POIs, related, Portable Text)** → Mitigación: tipar las queries y verificar la ficha de proyecto completa con un documento de prueba cargado en el Studio antes de borrar el mock.
- **Romper el render de imágenes** (de string local a CDN) → Mitigación: agregar `cdn.sanity.io` a `next.config` y probar `next/image` con un asset real antes de migrar todos los componentes.
- **Borrar el mock antes de tiempo** → Mitigación: eliminar `src/data/projects.ts` solo cuando `grep` confirme cero imports.

## Migration Plan

1. Fundaciones (cliente, `urlFor`, Portable Text, `next.config`, deps) — no toca render aún.
2. Modificar schema `plans` y cargar 1 proyecto de prueba en el Studio para validar.
3. Migrar consumidores en orden: ficha `[slug]` → `/proyectos` (split) → `ProyectosDestacados` → `Footer`.
4. Conectar singletons: `siteSettings`, `homePage`, `nosotrosPage`, `contactoPage`.
5. Verificar las 5 páginas con contenido de prueba.
6. Eliminar `src/data/projects.ts` y `src/types/project.ts` (reemplazado por tipos de query); confirmar build limpio.

**Rollback:** mientras el mock no se borre (pasos 1–5), revertir un consumidor es volver el import al mock. El paso 6 es el punto de no retorno; se hace último y solo con todo verificado.

## Open Questions

- ¿La descripción de proyecto en el Studio será Portable Text (rich text) o alcanza con texto plano? El schema actual usa `block[]` (Portable Text) — se asume rich text.
- ¿`relatedProject` se elige siempre a mano, o si está vacío se sugiere uno automático? Se asume manual; si está vacío, se omite la sección.
