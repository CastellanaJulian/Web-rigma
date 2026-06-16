## 1. Metadata base (layout raíz)

- [x] 1.1 En `site/src/app/layout.tsx`, agregar `metadataBase: new URL('https://www.rigma.com.ar')` al objeto `metadata`
- [x] 1.2 Convertir `title` a objeto con `default: 'Rigma Group'` y `template: '%s | Rigma Group'`
- [x] 1.3 Mantener/ajustar la `description` global por defecto

## 2. Metadata por página estática

- [x] 2.1 `site/src/app/(site)/page.tsx` (Inicio): exportar `metadata` con `title` por defecto y `description` propia
- [x] 2.2 `site/src/app/(site)/proyectos/page.tsx`: exportar `metadata` con `title: 'Proyectos'` + `description`
- [x] 2.3 `site/src/app/(site)/nosotros/page.tsx`: exportar `metadata` con `title: 'Nosotros'` + `description`
- [x] 2.4 `site/src/app/(site)/contacto/page.tsx`: exportar `metadata` con `title: 'Contacto'` + `description`

## 3. Metadata dinámica de la ficha

- [x] 3.1 En `site/src/app/(site)/proyectos/[slug]/page.tsx`, agregar `generateMetadata({ params })` que use `getProjectBySlug`
- [x] 3.2 Componer `title` = nombre del proyecto y `description` derivada (barrio/estado o extracto); devolver metadata neutra si el slug no existe

## 4. Sitemap y robots

- [x] 4.1 (Opcional) Agregar `getProjectSlugs()` liviano en `site/src/sanity/queries.ts`, o reusar `getAllProjects()`
- [x] 4.2 Crear `site/src/app/sitemap.ts`: rutas estáticas (`/`, `/proyectos`, `/nosotros`, `/contacto`, `/terminos`, `/privacidad`) + fichas `/proyectos/<slug>` desde Sanity
- [x] 4.3 Crear `site/src/app/robots.ts`: `allow: '/'`, `disallow: ['/studio', '/api']`, `sitemap: 'https://www.rigma.com.ar/sitemap.xml'`

## 5. Verificación

- [x] 5.1 `cd site && npm run build` sin errores de tipos/lint
- [x] 5.2 `npm run dev` y verificar `/sitemap.xml` (incluye estáticas + fichas) y `/robots.txt` (bloquea `/studio` y `/api`, referencia sitemap)
- [x] 5.3 Verificar en el HTML que cada página tenga `<title>` y `<meta name="description">` únicos, y que la ficha use el nombre del proyecto
- [x] 5.4 Dejar nota: no enviar el sitemap a Search Console hasta completar el cutover del dominio
