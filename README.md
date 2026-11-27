# Rigma — Sitio institucional con CMS

**🌐 En producción: [www.rigma.com.ar](https://www.rigma.com.ar)**

<!-- TODO: captura del home (desktop + mobile) -->
<!-- ![Rigma](docs/captura-home.png) -->

Sitio web para **Rigma**, una constructora y desarrolladora inmobiliaria familiar. El objetivo: presentar la empresa y sus proyectos, y **captar leads calificados**. El cliente carga y edita todo el contenido desde un CMS sin depender de un desarrollador.

## El problema

- La empresa no tenía un sitio que mostrara su portfolio de obras ni un canal para recibir consultas.
- Necesitaban **actualizar proyectos, fotos y textos por su cuenta**.
- Presupuesto acotado: la infraestructura tenía que funcionar en planes gratuitos.

## Qué hice

Llevé el proyecto de punta a punta, junto a otro desarrollador:

1. **Discovery** con el cliente: objetivos, públicos y arquitectura de información (sitemap).
2. **Diseño**: wireframes, después un design system con tokens y por último alta fidelidad (`/Wireframes`, `/diseno-final`, `design-system.md`).
3. **Desarrollo** del sitio en Next.js con Sanity integrado en las 5 páginas.
4. **Salida a producción**: deploy, SEO técnico y migración del dominio.

## Funcionalidades

- **CMS embebido** (Sanity Studio en `/studio`): proyectos, home, nosotros, contacto y configuración general, con galerías de carga múltiple y orden drag & drop.
- **Mapa interactivo de proyectos** (Leaflet) en el listado y en cada ficha.
- **Captura de leads**: el formulario validado con zod y react-hook-form escribe cada consulta en una Google Sheet vía Apps Script. Costo cero y fácil de usar para el cliente.
- **SEO técnico**: metadata por página, `generateMetadata` en las fichas, `sitemap.ts`, `robots.ts` y dominio canónico.
- Responsive completo (mobile, tablet, desktop).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Estilos | Tailwind CSS v4 (tokens en `@theme`) |
| CMS | Sanity (headless, Studio embebido) |
| Formularios | react-hook-form + zod → Google Apps Script → Google Sheets |
| Mapas | react-leaflet + tiles CARTO |
| Infra | Vercel |

## Cómo trabajamos con IA

El proyecto se construyó con **Claude Code** y un flujo de **desarrollo guiado por specs**:

- **`CLAUDE.md` como fuente de verdad compartida**: cada decisión de diseño, arquitectura o contenido se registra ahí antes del commit. Así dos desarrolladores y sus agentes trabajan con el mismo contexto entre sesiones.
- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)**: cada funcionalidad arranca como una spec (`openspec/specs/`: captura de leads, mapa de proyectos, fichas, etc.) y cada cambio como una propuesta (`openspec/changes/`). Después se aplica y se archiva.
- **Skills y comandos propios** en `.claude/` para proponer, explorar, aplicar y archivar cambios.

## Estructura

```
site/            → app Next.js (sitio + Studio)
  src/sanity/    → schemas, queries y cliente de Sanity
openspec/        → specs y cambios (desarrollo guiado por specs)
Wireframes/      → wireframes y decisiones de diseño
diseno-final/    → diseño de alta fidelidad
CLAUDE.md        → contexto y decisiones del proyecto
```

## Correr en local

```bash
cd site
npm install
npm run dev
```

Variables de entorno (`site/.env.local`):

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` · `NEXT_PUBLIC_SANITY_DATASET` · `NEXT_PUBLIC_SANITY_API_VERSION` | Conexión con Sanity |
| `NEXT_PUBLIC_CARTO_API_KEY` | Tiles del mapa |
| `APPS_SCRIPT_URL` | Web App de Google Apps Script que guarda los leads |
