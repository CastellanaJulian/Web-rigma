# CLAUDE.md — Rigma Web

> Archivo de contexto para colaboración con IA. Toda decisión tomada en el proyecto debe reflejarse acá para mantener coherencia entre sesiones y entre colaboradores.
> Última actualización: 10 de junio 2026

---

## Proyecto

**Rigma** es una empresa constructora/desarrolladora inmobiliaria familiar con trayectoria de tres generaciones. Este repositorio contiene su sitio web institucional/portfolio.

**Dominio:** rigma.com.ar  
**Objetivo del sitio:** Presentar la empresa, sus proyectos y capturar leads calificados.  
**Fecha de inicio del proyecto:** 18 de abril de 2026

---

## Equipo y colaboración

- Dos desarrolladores trabajando en conjunto con IA (Claude Code)
- Flujo: cada colaborador trabaja en su entorno local, usa este archivo como contexto compartido
- **Regla:** toda decisión de diseño, arquitectura o contenido que se tome debe actualizarse en este archivo antes de hacer commit

---

## Etapas del proyecto

| # | Etapa                  | Estado       | Descripción |
|---|------------------------|-------------|-------------|
| 1 | Descubrimiento         | ✅ Completo  | Relevamiento con el cliente |
| 2 | Diseño visual          | ✅ Completo  | Wireframes → Alta fidelidad → sitio implementado |
| 3 | Desarrollo y testeo    | ✅ Completo  | Sanity integrado a las 5 páginas, formulario conectado a Google Sheets, responsive |
| 4 | Salida a producción    | 🔄 En curso  | Sitio deployado en Vercel (URL aparte); falta cutover del dominio rigma.com.ar y entrega al cliente |

**Estado actual (Etapa 4 — cutover pendiente):**
- [x] Sitio nuevo (`site/`) implementado y deployado en Vercel en una URL propia (preview/staging) — todavía no sirve `rigma.com.ar`
- [x] Sanity Studio embebido en `/studio` (las 5 páginas leen contenido del CMS)
- [x] Formulario de contacto conectado → Google Apps Script → Google Sheet "Leads"
- [x] Responsive mobile/tablet en todo el sitio
- [x] SEO técnico base en `site/`: `metadataBase`, title template, metadata única por página, `generateMetadata` en fichas, `sitemap.ts` y `robots.ts` (dominio canónico `www.rigma.com.ar`)
- [ ] Cutover de `rigma.com.ar`: cambiar Root Directory de Vercel a `site/` (hoy apunta a la landing)
- [ ] Integrar Vercel Analytics en `site/`
- [ ] Carga de contenido real por el cliente en el Studio + completar datos faltantes de proyectos

**Checklist del cutover (todo en el dashboard de Vercel — sin tocar código):**
1. [ ] Cambiar Root Directory del proyecto de Vercel: `landing-en-construccion/v0` → `site/`
2. [ ] Configurar dominio canónico **con www**: marcar `www.rigma.com.ar` como primary y que `rigma.com.ar` (apex) redirija a `www` (308). El código ya usa `www` como canónico (`layout.tsx`, `sitemap.ts`, `robots.ts`) y el QR impreso apunta a `www`.
3. [ ] Integrar Vercel Analytics en `site/`.
4. [ ] **Post-cutover (lo hace el cliente):** dar de alta el dominio en Google Search Console + enviar `https://www.rigma.com.ar/sitemap.xml`. (Recomendado: crear el Google Business Profile de la oficina.)

---

## Stack técnico

| Tecnología   | Rol                        | Notas |
|--------------|---------------------------|-------|
| Next.js 16   | Framework (App Router)    | Con directorio `src/`, alias `@/*` |
| TypeScript   | Tipado estático           | |
| Tailwind CSS v4 | Estilos               | Tokens en `@theme` dentro de `globals.css` |
| ESLint       | Linting                   | |
| Sanity       | CMS headless              | Plan gratuito — Studio embebido en `/studio`, schemas en `site/src/sanity/` |
| Vercel       | Hosting                   | Plan gratuito — `site/` deployado en URL propia; Root Directory de `rigma.com.ar` aún apunta a la landing (cutover pendiente) |
| Vercel Analytics | Analytics de tráfico  | Integrar en `site/` al momento del cutover |
| Google Apps Script + Google Sheets | Captura de leads | Web App `doPost()` que escribe cada consulta del formulario como fila en la hoja "Leads" |
| react-leaflet + leaflet | Mapas          | OpenStreetMap — usado en `/proyectos` y ficha de proyecto |
| embla-carousel-react | Carrusel      | Hero carousel y galería de imágenes |
| react-hook-form | Formularios            | Validación del formulario de contacto (la app usa también `zod`) |
| sharp        | Optimización de imágenes  | Requerido por `next/image` |

**Import alias:** `@/*` → `src/*`

> Etapa 3 completada: las 5 páginas del sitio ya leen contenido desde Sanity (`site/src/sanity/queries.ts` + `client.ts`) y el formulario de contacto persiste leads en Google Sheets. Resta el cutover del dominio y la carga de contenido real por el cliente.

---

## Infraestructura actual (en producción)

### Repositorio
- **GitHub:** [CastellanaJulian/Web-rigma](https://github.com/CastellanaJulian/Web-rigma)
- **Rama principal:** `main`
- **Flujo:** push a `main` → Vercel deploya automáticamente

### Landing "en construcción"
- **Ruta en repo:** `landing-en-construccion/v0/`
- **Generada con:** v0 (Vercel)
- **Stack:** Next.js + Tailwind + shadcn/ui
- **Deploy root directory en Vercel:** `landing-en-construccion/v0`
- **URL:** rigma.com.ar
- **Título en navegador:** Rigma Group
- **Favicon:** `/public/logo-rigma.png`
- **Analytics:** Vercel Analytics — `<Analytics />` sin condición de NODE_ENV
- **QR generado:** apunta a `https://www.rigma.com.ar` — archivo local en `/Users/julian/web-rigma/rigma-qr.png` (no subido al repo)

### Sitio nuevo (`site/`) — el sitio definitivo
- **Ruta en repo:** `site/`
- **Stack:** Next.js 16 + React 19 + TypeScript + Tailwind v4 + ESLint, App Router, `src/`, alias `@/*`
- **Páginas:** las 5 (`/`, `/proyectos`, `/proyectos/[slug]`, `/nosotros`, `/contacto`) bajo el route group `(site)`, todas leyendo contenido desde Sanity
- **Sanity Studio embebido:** ruta `/studio` (aislado del layout del sitio con route group)
- **Schemas Sanity:** `src/sanity/schemas/{project,nosotrosPage,contactoPage,siteSettings}.ts` (index en `schemas/index.ts`)
- **Capa de datos Sanity:** `src/sanity/{client.ts,queries.ts,image.ts,env.ts,structure.ts}`
- **API route del formulario:** `src/app/api/contact/route.ts` (reenvía a Apps Script — ver sección Formulario de contacto)
- **Config Sanity:** `sanity.config.ts` + `sanity.cli.ts` en la raíz de `site/`
- **Correr en local:** `cd site && npm run dev` → `localhost:3000` (Studio en `localhost:3000/studio`)
- **Deploy:** Vercel, en URL propia (preview/staging). Reemplazará a `landing-en-construccion/` en `rigma.com.ar` al hacer el cutover (Etapa 4).

### Sanity
- **Project ID:** `0q5stz3o`
- **Organization ID:** `oirIJubQi`
- **Dataset único:** `production` (public — lectura sin token, `useCdn: true`)
- **API version:** `2026-05-23`
- **Plan:** Free
- **Studio:** embebido en `/studio` del sitio (no se usa Studio standalone `*.sanity.studio`). En español (`@sanity/locale-es-es`), tema claro, sin Vision ni Releases.
- **Variables de entorno** (`site/.env.local`, gitignored): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`. Tienen fallback hardcodeado en `src/sanity/env.ts` (son valores públicos), así que el build no depende de ellas.

---

## Identidad de marca

### Paleta de colores
- **Base oscura:** `rgb(30, 30, 30)` — casi negro
- **Escala de grises:** se trabaja en grises intermedios (a definir exactos en diseño)
- **Blanco:** `#ffffff`
- Paleta monocromática — no hay colores de acento definidos aún

### Tipografía
- Definitiva: no definida — se decide en alta fidelidad
- Referencia de estilo: elegante, seria, con personalidad de marca premium/institucional
- **En wireframes:** Montserrat (300/400/500/600/700 + italic 400) — geométrica, diseñada en Buenos Aires, alineada al cartel de obra de Rigma. Ver `Wireframes/wireframes-system.md`.

### Logo
- Disponible en escala de grises
- ⚠️ Pendiente: subir archivo al repo en `/public/logo.svg` (o formato disponible)

### Slogan
> **"Viví diferente, viví RIGMA"**

### Tono de comunicación
- Profesional pero cercano
- Énfasis en calidad, trayectoria y atención al detalle
- Apunta a compradores de unidades funcionales (no perfil corporativo)

---

## Información institucional

### Sobre Rigma
- **Año de fundación:** 2016
- **Tipo:** Empresa constructora familiar, 3 generaciones de trayectoria en el rubro
- **Especialidad:** Desarrollo de espacios multifuncionales (funcionalidad, flexibilidad, confort)

### Historia (copy confirmado por cliente)
> Somos una empresa constructora familiar con una sólida trayectoria que se remonta a tres generaciones dentro del rubro. A lo largo del tiempo, hemos consolidado una forma de trabajo basada en la responsabilidad, el compromiso y la mejora continua. Este recorrido nos permite combinar la tradición constructiva con una mirada actual, adaptada a las nuevas necesidades del mercado.
>
> Nos especializamos en el desarrollo de espacios multifuncionales, pensados para optimizar el uso, la flexibilidad y el confort en cada proyecto. Nos diferenciamos por priorizar la calidad en cada etapa, desde el diseño hasta la ejecución, cuidando tanto los detalles constructivos como la experiencia final del usuario. Buscamos que cada obra no solo cumpla una función, sino que aporte valor real a quienes la habitan.
>
> Nuestro enfoque integra planificación, eficiencia y una fuerte atención al detalle, lo que nos permite ofrecer soluciones integrales y personalizadas. Entendemos cada proyecto como único, y trabajamos con cercanía con el cliente para lograr resultados que combinen funcionalidad, estética y durabilidad.

### Métricas destacadas
| Métrica                  | Valor        |
|--------------------------|-------------|
| M² construidos           | +32.000     |
| Unidades funcionales     | +220        |
| Años de trayectoria      | +3 generaciones (desde 2016 como Rigma) |

### Misión
> Desarrollar espacios de calidad que se adapten a las nuevas formas de vivir, combinando funcionalidad, diseño y eficiencia constructiva, con un compromiso constante en cada detalle del proceso.

### Filosofía
> Creemos en una construcción consciente, donde cada proyecto es una oportunidad para mejorar la forma en que las personas habitan los espacios. Priorizamos la cercanía con el cliente, la optimización de recursos y la búsqueda permanente de soluciones prácticas, duraderas y bien pensadas.

---

## Contacto y canales

| Canal       | Valor                        | Notas |
|-------------|------------------------------|-------|
| Email       | Rigmagrupo@gmail.com         | Destino de consultas del formulario web |
| Teléfono    | +54 11 6596 2401             | |
| WhatsApp    | +54 11 6596 2401             | Mismo número que teléfono |
| Dirección   | Guardia Nacional 739, PB     | Pública — mostrar en Contacto y Footer |
| Instagram   | Pendiente                    | A futuro |
| Facebook    | No                           | |
| LinkedIn    | No                           | |

### Formulario de contacto — ✅ conectado
- **Destino:** una **Google Sheet** (pestaña "Leads"), vía **Google Apps Script** (Web App `doPost()`). Se descartó Resend/email por ser más simple de transferir al cliente y no requerir DNS.
- **Flujo:** `ContactForm.tsx` → `POST /api/contact` (server, en Vercel) → `fetch(APPS_SCRIPT_URL)` → Apps Script `appendRow()`. El browser **nunca** le pega a Google directo (CORS + oculta la URL).
- **Columnas de la hoja (6, en orden):** Fecha/Hora (generada en el server), Nombre, Celular, Email, Proyecto, Mensaje.
- **Variable de entorno:** `APPS_SCRIPT_URL` (sin `NEXT_PUBLIC_`, solo server-side, en Vercel env vars). Si falta → la route responde 502.
- **Mapeo de proyecto:** el `<select>` manda un código (`cosquin`, `larrazabal`, `zelada`, `otro`) que la API route convierte a etiqueta legible (`Cosquín 1534`, etc.) antes de escribir.
- **Anti-spam:** campo honeypot oculto `website`; si llega completo, la route responde `ok:true` pero no escribe la fila.
- **Resiliencia:** validación server-side espejo de la del form; reintento único (400ms) ante 500 transitorio de Apps Script.
- **Setup del script:** el código `doPost()` para pegar en la hoja (Extensiones → Apps Script → Implementar como Web App, "Ejecutar como: yo", "Quién accede: Cualquiera") está documentado en `openspec/changes/archive/2026-06-10-captura-leads-google-sheets/design.md`.
- Campos del form: nombre, celular, email, proyecto de interés, mensaje.

---

## Proyectos (datos mock)

> Información parcial provista por el cliente. Usar como base para mocks en Etapa 2. Se completa y sube a Sanity en Etapa 3.

### Proyecto 1 — Zelada 6171
| Campo            | Valor |
|-----------------|-------|
| Nombre          | Zelada 6171 |
| Estado          | Finalizado |
| Ubicación       | Zelada 6171 (barrio a confirmar) |
| M² totales      | 2.150 m² |
| Entrega         | 22/06/2025 |
| Descripción     | Pendiente completar |
| Tipologías      | Pendiente completar |
| Amenities       | Pendiente completar |
| Financiación    | Consultar — comunicar por contacto |

### Proyecto 2 — Cosquín 1534
| Campo            | Valor |
|-----------------|-------|
| Nombre          | Cosquín 1534 |
| Estado          | En Ejecución (~60% avance) |
| Ubicación       | Mataderos |
| M² totales      | 1.800 m² construibles |
| Inicio          | Julio 2025 |
| Entrega         | Diciembre 2026 |
| Total unidades  | 8 departamentos de 4 ambientes |
| Disponibles     | 4 unidades (2 de 112 m², 1 de 120 m², 1 de 113 m² + 9 m² terraza) |
| Cocheras        | Se venden por separado |
| Terrazas        | Se venden por separado |
| Amenities       | Cocheras, terrazas verdes, puertas Pentágono, puertas interiores exclusivas, grifería Peirano línea Wave, pisos porcelanato importado, portero eléctrico, mesadas de mármol, interior de placar, accesorios de baño, bañera, piso radiante, caldera dual individual por dpto, anafe y caldera a gas, horno eléctrico, lavadero, cámaras de seguridad, cerco eléctrico, internet |
| Financiación    | Pendiente completar |

### Proyecto 3 — Av. Larrazábal 1255
| Campo            | Valor |
|-----------------|-------|
| Nombre          | Av. Larrazábal 1255 |
| Estado          | Pendiente confirmar |
| Ubicación       | Mataderos |
| Descripción     | Edificio de 17 unidades funcionales, 1 SUM, 1 patio, 1 subsuelo con cochera, 16 cocheras en PB |
| Amenities       | Puertas interiores exclusivas, pisos porcelanato importado, portero eléctrico, mesadas de mármol, interior de placar, accesorios de baño, bañera, piso radiante, caldera dual individual, anafe y caldera a gas, horno eléctrico, lavadero, cámaras de seguridad, cerco eléctrico, internet |
| Tipologías      | Pendiente completar |
| M² por unidad   | Pendiente completar |
| Fecha inicio    | Pendiente completar |
| Entrega         | Pendiente completar |
| Financiación    | Pendiente completar |

### Proyecto 4
- Pendiente de información del cliente

---

## Arquitectura del sitio

### Páginas (5)

#### 1. Inicio `/`
- Hero (tagline + CTA)
- Proyectos destacados
- Snippet de Nosotros
- Por qué elegirnos
- Testimonios *(contenido pendiente — usar placeholders)*
- CTA de Contacto
- Footer

#### 2. Proyectos `/proyectos`
- Header de sección
- Filtros: Todos / En Ejecución / Terminados
- Grilla de proyectos (cards)
- CTA de Contacto
- Footer

#### 3. Ficha de Proyecto `/proyectos/[slug]`
- Hero del proyecto
- Info clave (superficie, ubicación, estado, unidades disponibles, entrega)
- Descripción
- Galería de imágenes (renders)
- Planos *(sección separada — no todos los usuarios quieren ver planos)*
- Ubicación (Google Maps embed)
- Proyecto relacionado
- CTA de Contacto
- Footer

#### 4. Nosotros `/nosotros`
- Header institucional
- Historia de la empresa *(copy confirmado — ver sección anterior)*
- Números / métricas (+32.000 m², +220 UF)
- Equipo *(pendiente definir si incluye fotos y quiénes)*
- Pilares / Filosofía *(copy confirmado)*
- CTA de redirección
- Footer

#### 5. Contacto `/contacto`
- Layout split `1fr 1fr` a pantalla completa — sin secciones apiladas
- **Columna izquierda:** H1 "Hablemos." + subtítulo + formulario (Nombre, Celular, Email, Proyecto de interés, Mensaje, botón `ENVIAR CONSULTA →`) + canales en fila horizontal debajo (WhatsApp · Email · Oficina)
- **Columna derecha:** imagen institucional a sangre (equipo / obra / empresa)
- Footer

### Componentes globales
- `Navbar` — presente en todas las páginas
- `Footer` — presente en todas las páginas. Incluye: logo, dirección, teléfono, email, links de navegación
- `ContactCTA` — sección reutilizable al final de casi todas las páginas

---

## Modelo de datos: Proyecto

```ts
type Project = {
  id: string
  slug: string
  title: string
  location: string
  neighborhood?: string
  status: 'En Ejecución' | 'Terminado'
  progress?: number           // porcentaje de avance (solo si En Ejecución)
  coverImage: string
  images: string[]            // galería / renders
  plans?: string[]            // planos (opcional, sección separada)
  description: string
  highlights: {
    totalSurface?: string
    unitSurface?: string
    totalUnits?: number
    availableUnits?: number
    floors?: number
    delivery?: string         // ej: "Diciembre 2026"
    startDate?: string
  }
  typologies?: string[]       // ej: ["4 ambientes 112 m²", "4 ambientes 120 m²"]
  amenities?: string[]
  financing?: string          // texto libre o null
  coordinates?: {
    lat: number
    lng: number
  }
  relatedProject?: string     // slug de proyecto relacionado
}
```

---

## Referencias de diseño

| Sitio | Por qué gustó |
|-------|--------------|
| [edifizzi.com](https://edifizzi.com/) | Animaciones e imagen de marca |
| [grupopills.com.ar](https://grupopills.com.ar/projects.html) | Cómo se muestran los proyectos |
| [dbdesarrollos.com.ar](https://dbdesarrollos.com.ar) | Competidor principal — referencia de mercado |

---

## Pendientes críticos (bloquean avance)

- [ ] Subir logo al repo (`/public/logo.svg` o formato disponible)
- [ ] Confirmar estado y datos faltantes de Proyecto 3 (Av. Larrazábal 1255)
- [ ] Cargar información de Proyecto 4 (y proyectos 5 y 6 si existen)
- [ ] Confirmar barrio de Zelada 6171
- [ ] Hacer el cutover en Vercel: apuntar `rigma.com.ar` a `site/` (hoy sirve la landing)
- [ ] Confirmar si la sección Equipo lleva fotos y quiénes aparecen
- [ ] **Textos legales** (`/terminos`, `/privacidad`): razón social (RIGMA GROUP S.R.L.) y CUIT (30-71893343-5) ya cargados. Falta el placeholder `[MATRÍCULA]` (corredor inmobiliario CUCICBA, si corresponde). Revisar con profesional. El cliente debe definir si inscribe la base de leads ante la AAIP (Ley 25.326).

## Pendientes no críticos

- [ ] Testimonios de clientes (3 bloques para completar)
- [ ] Cámaras o asociaciones del rubro (para footer)
- [ ] Descripción y tipologías de Zelada 6171
- [ ] Financiación de Cosquín 1534
- [ ] Instagram (a futuro)

---

## Convenciones de trabajo con IA

- Siempre leer este archivo al inicio de una sesión
- Antes de tomar decisiones de diseño o arquitectura, verificar si están documentadas acá
- Al finalizar una sesión con cambios importantes, actualizar las secciones relevantes
- Los placeholders de contenido deben ser realistas (no "Lorem ipsum"), usar datos del rubro inmobiliario argentino
- El tono de los textos es español rioplatense, formal pero cercano

---

## Referencias internas

- Proyecto de referencia en este repo: `landing-gustavo/` — landing page similar con Next.js + Tailwind, útil para ver patrones de componentes ya usados
- Wireframes mid-fi en `Wireframes/` — fuente de verdad de estructura de pantallas durante Etapa 2. Archivos: `inicio.html`, `proyectos.html`, `ficha-proyecto.html`, `contacto.html` (falta `nosotros.html`). Complementar con `wireframes-system.md` (componentes y tokens) y `wireframes-decisions.md` (decisiones y justificaciones).
