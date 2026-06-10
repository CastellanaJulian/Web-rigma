## ADDED Requirements

### Requirement: Cliente Sanity centralizado
El sitio público SHALL tener un único cliente Sanity (`src/sanity/client.ts`) construido con `next-sanity`, configurado con `projectId`, `dataset` y `apiVersion` desde `src/sanity/env.ts` y `useCdn: true`. Todas las lecturas de Sanity del sitio público SHALL pasar por este cliente.

#### Scenario: Lectura del dataset público sin token
- **WHEN** una page server ejecuta una query de lectura contra el dataset `production`
- **THEN** el cliente responde con los datos sin requerir un token de autenticación

#### Scenario: Una sola configuración de cliente
- **WHEN** se agrega una nueva query al sitio
- **THEN** reutiliza el cliente exportado por `src/sanity/client.ts` sin reconfigurar `createClient`

### Requirement: Queries GROQ tipadas y centralizadas
El sitio SHALL definir sus queries GROQ en un módulo central (`src/sanity/queries.ts`) y exponerlas con tipos TypeScript que reflejen el shape devuelto. Las queries SHALL resolver en GROQ las referencias y proyecciones necesarias para el render, evitando lógica de mapeo en los componentes.

#### Scenario: Referencia de proyecto relacionado resuelta
- **WHEN** se consulta la ficha de un proyecto con `relatedProject` cargado
- **THEN** la query devuelve el slug, título, estado e imagen de portada del proyecto relacionado ya resueltos

#### Scenario: Destacados desde homePage
- **WHEN** se consultan los proyectos destacados del home
- **THEN** se obtienen desde `homePage.featuredProjects[].project->` y no desde un campo `priority` del proyecto

#### Scenario: Tipado sin any
- **WHEN** un componente consume el resultado de una query
- **THEN** recibe un tipo TypeScript específico (no `any`) que describe los campos disponibles

### Requirement: Generación de URLs de imagen
El sitio SHALL exponer un helper `urlFor` (`src/sanity/image.ts`) basado en `@sanity/image-url` para construir URLs de imágenes de Sanity respetando el punto focal (hotspot). El dominio `cdn.sanity.io` SHALL estar habilitado en `next.config.ts` para `next/image`.

#### Scenario: Imagen renderizada con next/image
- **WHEN** un componente renderiza una imagen de Sanity con `next/image`
- **THEN** la URL se genera con `urlFor` y `next/image` la carga sin error de dominio no permitido

#### Scenario: Recorte respeta hotspot
- **WHEN** se solicita una imagen con un ancho específico vía `urlFor`
- **THEN** el recorte resultante respeta el punto focal definido en el Studio

### Requirement: Render de Portable Text
El sitio SHALL renderizar los campos de tipo Portable Text (ej. `description` de proyecto) con `@portabletext/react`.

#### Scenario: Descripción rich text renderizada
- **WHEN** la ficha de un proyecto tiene una descripción cargada como Portable Text
- **THEN** se renderiza como HTML con sus bloques y formato, no como `[object Object]` ni texto plano crudo

### Requirement: Estrategia de render ISR
Las páginas server que leen de Sanity SHALL usar revalidación incremental con `revalidate = 60` (segundos). El sitio NO SHALL leer de Sanity en cada request (modo dynamic) ni hornear el contenido solo en build (estático puro sin revalidación).

#### Scenario: Contenido editado visible sin redeploy
- **WHEN** el cliente publica un cambio en el Studio y recarga la página afectada pasados los 60s
- **THEN** la página muestra el contenido actualizado sin necesidad de un nuevo deploy

#### Scenario: Cache lazy por ruta
- **WHEN** no entran visitas a una ruta durante un período prolongado
- **THEN** no se generan llamadas a Sanity para esa ruta hasta la próxima visita

### Requirement: Empty states sin fallback al mock
Cuando una query a Sanity devuelva vacío o `null`, el componente SHALL mostrar un estado vacío apropiado u omitir la sección. El sitio NO SHALL volver a datos mock como respaldo.

#### Scenario: Listado de proyectos vacío
- **WHEN** no hay documentos `project` publicados
- **THEN** la página `/proyectos` muestra un estado vacío en lugar de proyectos mock

#### Scenario: Sección opcional sin datos
- **WHEN** un proyecto no tiene planos / puntos de interés / proyecto relacionado cargados
- **THEN** esas secciones de la ficha se omiten en lugar de mostrar contenido vacío o roto

### Requirement: Eliminación de la fuente mock
Una vez migrados todos los consumidores, el sitio NO SHALL contener `src/data/projects.ts` ni imports a él. El comportamiento de las páginas SHALL depender exclusivamente de Sanity.

#### Scenario: Sin imports colgados
- **WHEN** se busca `@/data/projects` en el código de `site/src`
- **THEN** no hay ninguna coincidencia y el build compila sin errores

### Requirement: Datos institucionales desde siteSettings
El teléfono/WhatsApp, email y dirección mostrados en el footer y la página de contacto SHALL provenir del documento `siteSettings` de Sanity, no de strings hardcodeados.

#### Scenario: Cambio de teléfono propagado
- **WHEN** el cliente edita el teléfono en `siteSettings` y publica
- **THEN** el nuevo número aparece en el footer y en la página de contacto al recargar
