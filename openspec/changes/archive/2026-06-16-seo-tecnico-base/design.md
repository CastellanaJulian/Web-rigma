## Context

El sitio nuevo (`site/`) es Next.js 16 con App Router, `src/` y alias `@/*`. La única metadata existente vive en `site/src/app/layout.tsx` (title `"Rigma Group"` + description) y se hereda en las 5 páginas del route group `(site)`. Las fichas de proyecto se generan vía `generateStaticParams` y leen de Sanity con `getProjectBySlug` / `getAllProjects` (`site/src/sanity/queries.ts`). No existen `sitemap.ts` ni `robots.ts`. El dominio final es `https://www.rigma.com.ar`, que hoy todavía sirve la landing (cutover pendiente).

## Goals / Non-Goals

**Goals:**
- Que cada ruta tenga `title` y `description` únicos e indexables de forma diferenciada.
- Exponer `sitemap.xml` y `robots.txt` válidos generados por Next, con el sitemap incluyendo las fichas de proyecto.
- Cero dependencias nuevas; usar solo la API nativa de metadata de Next 16.

**Non-Goals:**
- Open Graph / preview de WhatsApp, Twitter cards.
- JSON-LD / datos estructurados.
- Campos SEO editables desde Sanity.
- `manifest.webmanifest` / set de favicons.
- Verificación o alta en Google Search Console / Business Profile (lo hace el cliente post-cutover).

## Decisions

- **URL canónica sin trailing logic, con `www`:** `metadataBase = new URL('https://www.rigma.com.ar')` en el layout raíz. Se elige `www` para unificar con el QR de la landing existente. Todas las URLs relativas de metadata/sitemap resuelven contra esta base.
- **Title template global:** `title: { default: 'Rigma Group', template: '%s | Rigma Group' }` en el layout. Cada página define solo su segmento (`'Proyectos'`, `'Nosotros'`, etc.) y Next compone `"Proyectos | Rigma Group"`. La home usa el `default`.
- **Metadata estática vs. dinámica:** las 4 páginas fijas (`/`, `/proyectos`, `/nosotros`, `/contacto`) exportan `const metadata`. La ficha `/proyectos/[slug]` usa `generateMetadata({ params })` que reusa `getProjectBySlug` para el `title` (nombre del proyecto) y una `description` derivada (barrio/estado o un extracto). Si el proyecto no existe, devuelve metadata neutra (la página ya maneja el 404).
- **Sitemap reusa la capa de datos existente:** `sitemap.ts` importa de `@/sanity/queries`. Para los slugs alcanza con `getAllProjects()` (ya devuelve `slug`); opcionalmente se agrega una query liviana `getProjectSlugs()` que traiga solo `slug.current` para no sobre-pedir campos. Rutas estáticas hardcodeadas: `/`, `/proyectos`, `/nosotros`, `/contacto`. (Las legales `/terminos` y `/privacidad` se incluyen con `priority` baja.)
- **Robots bloquea áreas no públicas:** `allow: '/'`, `disallow: ['/studio', '/api']`, y `sitemap: 'https://www.rigma.com.ar/sitemap.xml'`. El Studio y las API routes no aportan a SEO y no deben indexarse.
- **`description` por página escritas a mano en español rioplatense** (no autogeneradas), alineadas al tono de marca y con keywords del rubro (desarrolladora, espacios multifuncionales, Mataderos/CABA).

## Risks / Trade-offs

- **Dominio sirve la landing hoy** → El `sitemap`/`robots` apuntan a `www.rigma.com.ar` antes del cutover. Mitigación: no enviar el sitemap a Search Console hasta completar el cutover; documentarlo en tasks. Mientras tanto los archivos son correctos y no rompen nada.
- **`generateMetadata` agrega una lectura a Sanity por ficha** → Mitigación: ya existe `revalidate = 60` y Next dedupe-a el `fetch` con el render de la página, así que el costo extra es marginal.
- **Descriptions hardcodeadas vs. editables por el cliente** → Trade-off aceptado: meterlas en Sanity es Tier 3. Si el cliente quiere editarlas, se promueve más adelante sin romper esta base.

## Migration Plan

1. Implementar metadata + sitemap + robots (sin deploy especial).
2. Deploy normal a la URL de staging de Vercel.
3. **Post-cutover** (cuando `www.rigma.com.ar` sirva `site/`): el cliente da de alta el dominio en Search Console y envía `https://www.rigma.com.ar/sitemap.xml`. Sin pasos de rollback: revertir es borrar los archivos nuevos y la metadata por página.
