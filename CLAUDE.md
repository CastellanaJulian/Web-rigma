# CLAUDE.md — Rigma Web

> Archivo de contexto para colaboración con IA. Toda decisión tomada en el proyecto debe reflejarse acá para mantener coherencia entre sesiones y entre colaboradores.
> Última actualización: 11 de mayo 2026

---

## Proyecto

**Rigma** es una empresa constructora/desarrolladora inmobiliaria familiar con trayectoria de tres generaciones. Este repositorio contiene su sitio web institucional/portfolio.

**Dominio:** rigma.com.ar  
**Objetivo del sitio:** Presentar la empresa, sus proyectos y capturar leads calificados.  
**Fecha de inicio del proyecto:** 18 de abril de 2026

---

## Equipo y colaboración

- Dos desarrolladores trabajando en conjunto con IA (Claude Code / Claude Design)
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
- [x] Wireframes — generados el 3/5/2026, pendiente validación con cliente
- [ ] Diseño en alta fidelidad
- [ ] Prototipo estático con placeholders

---

## Stack técnico

| Tecnología   | Rol                        | Notas |
|--------------|---------------------------|-------|
| Next.js 16+  | Framework (App Router)    | Con directorio `src/` |
| TypeScript   | Tipado estático           | |
| Tailwind CSS | Estilos                   | |
| ESLint       | Linting                   | |
| Sanity       | CMS headless              | Plan gratuito — se integra en Etapa 3 |
| Vercel       | Hosting                   | Plan gratuito — ya deployado con dominio rigma.com.ar |
| Vercel Analytics | Analytics de tráfico  | Ya integrado en la landing |

**Import alias:** `@/*` → `src/*`

> ⚠️ Durante la Etapa 2 se trabaja con datos mock estáticos. Sanity se integra en la Etapa 3.

---

## Infraestructura actual

### Repositorio
- **GitHub:** [CastellanaJulian/Web-rigma](https://github.com/CastellanaJulian/Web-rigma)
- **Rama principal:** `main` → producción (rigma.com.ar)
- **Rama de desarrollo:** `staging` → preview en Vercel (URL automática por rama)
- **Flujo:** push a cualquier rama → Vercel genera URL de preview. Push a `main` → deploya en producción

### Estructura del repo
```
web-rigma/
├── landing-en-construccion/v0/   ← landing actual en producción
├── site/                         ← sitio principal en desarrollo
├── Wireframes/                   ← wireframes HTML interactivos
├── sitemap/                      ← sitemap CSV (fuente de verdad de arquitectura)
└── CLAUDE.md
```

### Sitio principal (`site/`)
- **Stack:** Next.js 16 + TypeScript + Tailwind CSS (App Router, directorio `src/`)
- **Rama:** `staging`
- **Estado:** estructura base armada — sin diseño, con datos mock
- **Root directory en Vercel (cuando esté listo):** `site/`

### Landing "en construcción"
- **Ruta en repo:** `landing-en-construccion/v0/`
- **Generada con:** v0 (Vercel)
- **Stack:** Next.js + Tailwind + shadcn/ui
- **Deploy root directory en Vercel:** `landing-en-construccion/v0`
- **URL:** rigma.com.ar
- **Título en navegador:** Rigma Group
- **Favicon:** `/public/logo-rigma.png`
- **Analytics:** Vercel Analytics — `<Analytics />` sin condición de NODE_ENV
- **QR generado:** apunta a `https://www.rigma.com.ar` — archivo local (no subido al repo)

### Cambio a producción (cuando el sitio esté listo)
Cambiar el root directory en Vercel de `landing-en-construccion/v0` a `site/` y mergear `staging` → `main`.

---

## Identidad de marca

### Paleta de colores
- **Base oscura:** `rgb(30, 30, 30)` — casi negro
- **Escala de grises:** se trabaja en grises intermedios (a definir exactos en diseño)
- **Blanco:** `#ffffff`
- Paleta monocromática — no hay colores de acento definidos aún

### Tipografía
- ⚠️ **No definida** — se decide en la etapa de diseño en alta fidelidad (bloquea avance)
- Referencia de estilo: elegante, seria, con personalidad de marca premium/institucional

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
- Destino: **Email** (Rigmagrupo@gmail.com) — Google Sheets como alternativa a evaluar
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

> Fuente de verdad: `sitemap/Rigma-group-sitemap.csv`

### Páginas (5)

#### 1. Inicio `/`
- **Nav bar**
- **Hero** — imagen o video grande con logo/slogan. Puede ser carrusel de proyectos. CTA para ir a ver proyectos
- **Proyectos destacados** — preview de proyectos con CTA a `/proyectos`
- **Nosotros** — 2 o 3 párrafos sobre quiénes son, 3/4 datos fuertes, CTA a `/nosotros`
- **Por qué elegirnos** — pilares que los diferencian de la competencia: icono + título + breve descripción
- **Testimonios** — testimonios de clientes que avalan experiencia y resultados *(contenido pendiente)*
- **Sección de contacto** — información directa y formulario breve para consultas rápidas, tono emocional con CTA
- **Footer**

#### 2. Proyectos `/proyectos`
- **Nav bar**
- **Header** — título y breve subtítulo para contextualizar
- **Filtros** — tabs horizontales: Todos / En Ejecución / Terminados (un solo eje)
- **Grilla de proyectos** — proyectos en ejecución con mayor jerarquía; cards con imagen principal, nombre, ubicación y pill de estado
- **Sección de contacto** — CTA para solicitar más información
- **Footer**

#### 3. Ficha de Proyecto `/proyectos/[slug]`
- **Nav bar**
- **Hero** — imagen/render grande, nombre del proyecto, tagline, pill con estado
- **Información clave** — ubicación, estado, tipologías, fecha de entrega; opcionales: unidades disponibles, % avance de obra
- **Descripción** — máx. 3 párrafos + highlights del proyecto
- **Galería principal** — grilla o carrusel de renders e imágenes; mezcla renders con fotos de obra
- **Planos** — plantas del edificio y planos por unidad con preview *(sección separada — no todos los usuarios quieren verlos)*
- **Ubicación** — Google Maps embebido + puntos clave cercanos
- **Siguiente proyecto / relacionado** — acceso directo a otro proyecto para no perder la navegación
- **Sección de contacto** — WhatsApp con mensaje predeterminado o formulario; objetivo: clasificar el lead
- **Footer**

#### 4. Nosotros `/nosotros`
- **Nav bar**
- **Header institucional** — 1-2 líneas de posicionamiento, titular que transmita la esencia de Rigma
- **Historia** — cómo arrancaron, por qué lo hacen, qué los diferencia y su valor a futuro *(a chequear con cliente)*
- **Números que respaldan** — métricas con contexto (+32.000 m², +220 UF)
- **Equipo** — fotos + nombre y rol; refuerza el negocio familiar y lo hace cercano
- **Pilares / filosofía de trabajo** — 3-4 pilares que guían cómo trabajan
- **Sección de redirección** — invitar a conocer proyectos o contactarse (1 o 2 CTAs)
- **Footer**

#### 5. Contacto `/contacto`
- **Nav bar**
- **Encabezado** — título destacado e invitación a consultar, agendar visitas o pedir información
- **Formulario** — incluye selector de proyecto de interés para calificar el lead; puede ir a mail o Google Sheets
- **Vías alternativas** — dirección física, horarios de atención y redes
- **Footer**

### Componentes globales
- `Navbar` — presente en todas las páginas
- `Footer` — logo, dirección, teléfono, email, links de navegación
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

## Decisiones de diseño tomadas

### Wireframes (sesión 3/5/2026)
- **Formato:** a definir — pendiente decidir si mobile-first (375px) o desktop-first
- **Estilo:** wireframes de media fidelidad — formas claras con tipografía real, sin color
- **Variantes:** 1 por página (el contenido de cada página está validado en la sección Arquitectura del sitio)
- **Herramienta:** HTML interactivo con design canvas pan/zoom — archivo en `design/wireframes/`
- **Estado:** ⚠️ Pendiente de verificación — no cerrado

#### Navbar — 3 variantes exploradas
- **Transparente sobre hero**
- **Sólida siempre visible**
- **Minimal logo + hamburger**

---

## Referencias de diseño

| Sitio | Por qué gustó |
|-------|--------------|
| [edifizzi.com](https://edifizzi.com/) | Animaciones e imagen de marca |
| [grupopills.com.ar](https://grupopills.com.ar/projects.html) | Cómo se muestran los proyectos |
| [dbdesarrollos.com.ar](https://dbdesarrollos.com.ar) | Competidor principal — referencia de mercado |

---

## Archivos del proyecto

| Archivo | Descripción | Ubicación |
|---------|-------------|-----------|
| `ficha-proyecto.html` | Wireframe de ficha de proyecto | `Wireframes/` |
| `proyectos.html` | Wireframe de página de proyectos | `Wireframes/` |
| `wireframes-decisions.md` | Decisiones de diseño de los wireframes | `Wireframes/` |
| `wireframes-system.md` | Sistema y documentación de los wireframes | `Wireframes/` |
| `Rigma-group-sitemap.csv` | Sitemap oficial — fuente de verdad de arquitectura | `sitemap/` |
| `projects.ts` | Datos mock de los 3 proyectos (reemplazado por Sanity en Etapa 3) | `site/src/data/` |
| `project.ts` | Type Project — modelo de datos | `site/src/types/` |

---

## Estructura del sitio (`site/src/`)

```
app/
├── layout.tsx                  ← Navbar + Footer globales
├── page.tsx                    ← Inicio /
├── proyectos/
│   ├── page.tsx                ← Listado /proyectos
│   └── [slug]/
│       └── page.tsx            ← Ficha /proyectos/[slug]
├── nosotros/
│   └── page.tsx
└── contacto/
    └── page.tsx

components/
├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
└── shared/
    └── ContactCTA.tsx          ← Reutilizable en casi todas las páginas

data/
└── projects.ts                 ← Mock data — 3 proyectos cargados

types/
└── project.ts                  ← Type Project
```

---

## Convenciones de trabajo con IA

- Siempre leer este archivo al inicio de una sesión
- Antes de tomar decisiones de diseño o arquitectura, verificar si están documentadas acá
- Al finalizar una sesión con cambios importantes, actualizar las secciones relevantes
- Los placeholders de contenido deben ser realistas (no "Lorem ipsum"), usar datos del rubro inmobiliario argentino
- El tono de los textos es español rioplatense, formal pero cercano
- Los pendientes del proyecto se gestionan en Miro, no en este archivo
