# CLAUDE.md — Rigma Web

> Archivo de contexto para colaboración con IA. Toda decisión tomada en el proyecto debe reflejarse acá para mantener coherencia entre sesiones y entre colaboradores.
> Última actualización: 12 de mayo 2026

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
| 2 | Diseño visual          | 🔄 En curso  | Wireframes → Alta fidelidad → Prototipo estático |
| 3 | Desarrollo y testeo    | ⏳ Pendiente | Integración Sanity, iteración sobre diseño |
| 4 | Salida a producción    | ⏳ Pendiente | Deploy Vercel, entrega al cliente |

**Sub-etapas actuales (Etapa 2):**
- [x] Wireframes — 5/5 pantallas completadas (`ficha-proyecto`, `proyectos`, `inicio`, `contacto`, `nosotros`). Pendiente validación con cliente.
- [ ] Diseño en alta fidelidad
- [ ] Prototipo estático con placeholders

---

## Stack técnico

| Tecnología   | Rol                        | Notas |
|--------------|---------------------------|-------|
| Next.js 16   | Framework (App Router)    | Con directorio `src/`, alias `@/*` |
| TypeScript   | Tipado estático           | |
| Tailwind CSS v4 | Estilos               | Tokens en `@theme` dentro de `globals.css` |
| ESLint       | Linting                   | |
| Sanity       | CMS headless              | Plan gratuito — schemas migrados a `site/src/sanity/` |
| Vercel       | Hosting                   | Plan gratuito — Root Directory: `site/` (antes `landing-en-construccion/v0`) |
| Vercel Analytics | Analytics de tráfico  | Integrar en `site/` al momento del cutover |
| react-leaflet + leaflet | Mapas          | OpenStreetMap — usado en `/proyectos` y ficha de proyecto |
| embla-carousel-react | Carrusel      | Hero carousel y galería de imágenes |
| react-hook-form + zod | Formularios  | Validación del formulario de contacto |
| sharp        | Optimización de imágenes  | Requerido por `next/image` |

**Import alias:** `@/*` → `src/*`

> Etapa 2: el sitio público sigue con datos mock estáticos. Sanity Studio + schemas ya están inicializados en `dev/` para que el cliente pueda cargar contenido en paralelo al diseño. Las queries del frontend al CMS se conectan en Etapa 3.

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

### Sitio nuevo en desarrollo (`site/`)
- **Ruta en repo:** `site/`
- **Stack:** Next.js 16 + React 19 + TypeScript + Tailwind v4 + ESLint, App Router, `src/`, alias `@/*`
- **Sanity Studio embebido:** schemas en `src/sanity/schemas/` — Studio a integrar en Etapa 3
- **Schemas Sanity:** `src/sanity/schemas/{project,homePage,team,siteSettings,testimonial}.ts`
- **Config Sanity:** `sanity.config.ts` + `sanity.cli.ts` en la raíz de `site/`
- **Correr en local:** `cd site && npm run dev` → `localhost:3000`
- **Estado:** en desarrollo activo — reemplazará a `landing-en-construccion/` en producción al finalizar Etapa 2

### Sanity
- **Project ID:** `0q5stz3o`
- **Organization ID:** `oirIJubQi`
- **Dataset único:** `production` (public)
- **Plan:** Free
- **URL del Studio standalone:** pendiente (correr `cd dev && npx sanity deploy` con login interactivo)
- **Variables de entorno** (`dev/.env.local`, gitignored): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`. Ejemplo en `dev/.env.local.example`.

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

### Formulario de contacto
- Destino: **Email** (Rigmagrupo@gmail.com) vía **Resend** (Etapa 3)
- FROM: `noreply@rigma.com.ar` → TO: `Rigmagrupo@gmail.com`
- Requiere: cuenta Resend (free tier), registros DNS en `rigma.com.ar` (TXT + CNAME de Resend), API key en Vercel env vars
- Debe incluir selector de proyecto de interés para calificar el lead
- Campos mínimos: nombre, teléfono, email, proyecto de interés, mensaje

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
- [ ] Definir tipografía en etapa de alta fidelidad
- [ ] Confirmar si la sección Equipo lleva fotos y quiénes aparecen

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
