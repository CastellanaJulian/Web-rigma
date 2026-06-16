# seo-metadata Specification

## Purpose
TBD - created by archiving change seo-tecnico-base. Update Purpose after archive.
## Requirements
### Requirement: URL canónica base del sitio

El layout raíz SHALL definir `metadataBase` apuntando a `https://www.rigma.com.ar` para que toda URL relativa de metadata y sitemap resuelva contra el dominio canónico con `www`.

#### Scenario: Resolución de URL relativa

- **WHEN** Next genera una URL de metadata a partir de una ruta relativa
- **THEN** la URL absoluta resultante usa el host `https://www.rigma.com.ar`

### Requirement: Plantilla de título global

El layout raíz SHALL definir un `title` con `default` `"Rigma Group"` y `template` `"%s | Rigma Group"`, de modo que cada página aporte solo su segmento y el título final quede compuesto.

#### Scenario: Página con título propio

- **WHEN** una página exporta `title: 'Proyectos'`
- **THEN** el `<title>` renderizado es `"Proyectos | Rigma Group"`

#### Scenario: Página sin título propio

- **WHEN** una ruta no define su propio `title` (ej. la home)
- **THEN** el `<title>` renderizado es `"Rigma Group"`

### Requirement: Metadata única por página estática

Cada una de las páginas estáticas del route group `(site)` —Inicio (`/`), Proyectos (`/proyectos`), Nosotros (`/nosotros`) y Contacto (`/contacto`)— SHALL exportar su propio `title` y `description` únicos, escritos en español rioplatense y alineados al tono de marca.

#### Scenario: Cada página declara metadata diferenciada

- **WHEN** un buscador rastrea `/proyectos`, `/nosotros` y `/contacto`
- **THEN** cada una expone un `<title>` y una `<meta name="description">` distintos entre sí y distintos de la home

### Requirement: Metadata dinámica de la ficha de proyecto

La ruta `/proyectos/[slug]` SHALL implementar `generateMetadata` que use el nombre del proyecto (leído de Sanity) como `title` y una `description` derivada de los datos del proyecto.

#### Scenario: Proyecto existente

- **WHEN** se solicita la metadata de `/proyectos/cosquin-1534`
- **THEN** el `<title>` incluye el nombre del proyecto (ej. `"Cosquín 1534 | Rigma Group"`) y la `description` describe ese proyecto

#### Scenario: Slug inexistente

- **WHEN** `generateMetadata` recibe un slug que no corresponde a ningún proyecto
- **THEN** devuelve metadata neutra sin romper el render del 404 de la página

