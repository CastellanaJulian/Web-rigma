## Why

El sitio tiene 5 páginas diseñadas en alta fidelidad pero solo HTMLs estáticos y un scaffolding Next.js vacío en `site/`. Antes de implementar cualquier página necesitamos la capa base: tokens de diseño, tipografía, y los componentes que aparecen en todas las pantallas (Navbar, Footer, ContactCTA) más los primitivos compartidos.

## What Changes

- Configurar tokens de diseño (colores, tipografía, espaciado) como CSS variables en `globals.css` usando `@theme` de Tailwind v4
- Integrar fuente Montserrat vía `next/font/google`
- Implementar `Navbar` con navegación desktop y hamburger mobile
- Implementar `Footer` con logo, links, dirección y contacto
- Implementar `ContactCTA` — sección reutilizable de llamado a la acción al final de las páginas
- Crear primitivos compartidos: `Logo`, `Btn`, `SectionLabel`, `StatusPill`
- Instalar librerías necesarias para el proyecto completo (`react-leaflet`, `embla-carousel-react`, `react-hook-form`, `zod`, `sharp`)

## Capabilities

### New Capabilities

- `design-tokens`: Variables CSS y configuración de fuente que definen la identidad visual del sitio
- `navbar`: Barra de navegación global con soporte responsive
- `footer`: Pie de página global con información de contacto y links
- `contact-cta`: Sección reutilizable de llamado a la acción para contacto
- `shared-primitives`: Componentes UI atómicos reutilizables (Logo, Btn, SectionLabel, StatusPill)

### Modified Capabilities

## Impact

- **Archivos modificados:** `site/src/app/globals.css`, `site/src/app/layout.tsx`
- **Archivos creados:** `site/src/components/layout/Navbar.tsx`, `site/src/components/layout/Footer.tsx`, `site/src/components/shared/*.tsx`
- **Dependencias nuevas:** `react-leaflet`, `leaflet`, `@types/leaflet`, `embla-carousel-react`, `react-hook-form`, `zod`, `sharp`
- **Sin breaking changes** — el scaffold actual tiene los componentes vacíos, se reemplazan
