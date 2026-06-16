# seo-crawling Specification

## Purpose
TBD - created by archiving change seo-tecnico-base. Update Purpose after archive.
## Requirements
### Requirement: Sitemap del sitio

El sitio SHALL exponer `/sitemap.xml` generado por Next (`site/src/app/sitemap.ts`) que liste las páginas públicas estáticas y todas las fichas de proyecto, con URLs absolutas bajo `https://www.rigma.com.ar`.

#### Scenario: Páginas estáticas presentes

- **WHEN** un buscador solicita `/sitemap.xml`
- **THEN** el XML incluye las URLs de `/`, `/proyectos`, `/nosotros`, `/contacto`, `/terminos` y `/privacidad`

#### Scenario: Fichas de proyecto incluidas

- **WHEN** se genera el sitemap
- **THEN** por cada proyecto existente en Sanity se incluye una entrada `/proyectos/<slug>` usando los slugs reales obtenidos de la capa de datos

### Requirement: Robots del sitio

El sitio SHALL exponer `/robots.txt` generado por Next (`site/src/app/robots.ts`) que permita el rastreo general, bloquee las rutas no públicas y referencie el sitemap.

#### Scenario: Rutas no públicas bloqueadas

- **WHEN** un crawler lee `/robots.txt`
- **THEN** las reglas permiten `/` (allow) y deniegan `/studio` y `/api`

#### Scenario: Referencia al sitemap

- **WHEN** un crawler lee `/robots.txt`
- **THEN** la salida incluye `Sitemap: https://www.rigma.com.ar/sitemap.xml`

