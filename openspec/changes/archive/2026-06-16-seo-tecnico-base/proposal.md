## Why

Hoy las 5 páginas del sitio nuevo (`site/`) comparten el mismo `<title>` ("Rigma Group") y la misma descripción, porque solo existe metadata en el `layout.tsx` raíz. Para los buscadores esto equivale a 5 páginas duplicadas: Google no distingue Inicio, Proyectos, Nosotros, Contacto ni las fichas de proyecto. Antes del cutover del dominio conviene dejar la base de SEO técnico resuelta, ya que Next.js 16 lo cubre de forma nativa sin dependencias nuevas.

## What Changes

- **metadataBase + title template** en `layout.tsx` raíz: URL canónica `https://www.rigma.com.ar` y plantilla de título `"%s | Rigma Group"`.
- **Metadata única por página** (title + description propios) en las 5 páginas del route group `(site)`:
  - `/` (Inicio), `/proyectos`, `/nosotros`, `/contacto` → metadata estática.
  - `/proyectos/[slug]` → `generateMetadata` dinámico con el nombre del proyecto leído de Sanity.
- **`sitemap.ts`** en `site/src/app`: lista las páginas estáticas + las fichas de proyecto (slugs desde Sanity, reusando `queries.ts`).
- **`robots.ts`** en `site/src/app`: permite el rastreo general, bloquea `/studio` y `/api`, y referencia el sitemap.

**Fuera de alcance (explícito):** Open Graph / preview de WhatsApp, JSON-LD / datos estructurados, campos SEO editables en Sanity, manifest/favicon, y la verificación/configuración en Google Search Console (la realiza el cliente después del cutover).

## Capabilities

### New Capabilities
- `seo-metadata`: Metadata por página (title, description, URL canónica) y plantilla de título global para que cada ruta sea indexable de forma diferenciada.
- `seo-crawling`: Archivos `sitemap.xml` y `robots.txt` generados por Next para guiar a los buscadores sobre qué indexar y qué excluir.

### Modified Capabilities
<!-- Ninguna: no existen specs previas cuyos requisitos cambien. -->

## Impact

- **Código nuevo:** `site/src/app/sitemap.ts`, `site/src/app/robots.ts`.
- **Código modificado:** `site/src/app/layout.tsx`; `site/src/app/(site)/{page,proyectos/page,nosotros/page,contacto/page}.tsx`; `site/src/app/(site)/proyectos/[slug]/page.tsx`.
- **Datos:** lectura de slugs/títulos de proyectos vía `site/src/sanity/queries.ts` (puede requerir una query nueva de slugs).
- **Dependencias:** ninguna nueva (API nativa de Next 16).
- **Operativo:** `sitemap.ts`/`robots.ts` declaran `www.rigma.com.ar`, que todavía sirve la landing (cutover pendiente). Quedan listos pero no deben enviarse a Search Console hasta completar el cutover.
