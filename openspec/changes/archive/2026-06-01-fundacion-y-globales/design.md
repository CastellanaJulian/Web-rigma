## Context

El sitio `site/` tiene Next.js 16 + Tailwind v4 + TypeScript pero sus componentes globales (Navbar, Footer) están vacíos y `globals.css` tiene los defaults del template de Next.js. El diseño en alta fidelidad está en `diseno-final/` como HTMLs estáticos con React CDN + Babel. Los tokens de diseño están definidos como un objeto `t` inline en cada HTML. Hay 5 páginas diseñadas solo para desktop.

## Goals / Non-Goals

**Goals:**
- Extraer los tokens de diseño de los HTMLs a CSS variables Tailwind v4
- Implementar Navbar y Footer fieles al diseño, con soporte responsive
- Implementar ContactCTA y primitivos compartidos reutilizables
- Dejar el sistema de tokens como única fuente de verdad para el resto del desarrollo

**Non-Goals:**
- Implementar ninguna de las 5 páginas de contenido
- Integrar Sanity
- Implementar el formulario de contacto
- Optimización de performance o SEO

## Decisions

### D1: Tokens via `@theme` de Tailwind v4

Los tokens del objeto `t` en los HTMLs se mapean a CSS variables dentro del bloque `@theme` en `globals.css`. Tailwind v4 los expone automáticamente como clases utilitarias (`bg-accent`, `text-ink`, etc.).

```css
@theme {
  --color-bg:            #FBFBFB;
  --color-bg-warm:       #E3E3E3;
  --color-surface:       #E9E9E9;
  --color-surface-warm:  #CFC5BC;
  --color-accent:        #B59969;
  --color-ink:           #1E1E1E;
  --color-ink-elevated:  #353631;
  --color-line:          #E9E9E9;

  --font-sans: 'Montserrat', sans-serif;
}
```

Los valores semitransparentes (`textSecondary`, `onDarkSecondary`, etc.) se expresan con opacidad de Tailwind (`text-ink/65`) en lugar de variables separadas — más idiomático en Tailwind v4.

**Alternativa descartada:** definir los tokens en `tailwind.config.ts`. Tailwind v4 ya no usa ese archivo para colores; `@theme` es el mecanismo oficial.

### D2: Montserrat via `next/font/google`

```tsx
// layout.tsx
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' })
```

Se carga con `variable` y se aplica al `<html>`. Esto permite que el `--font-sans` de `@theme` funcione correctamente y el font se sirve desde Vercel sin llamadas externas a Google Fonts.

**Alternativa descartada:** `<link>` a Google Fonts (como en los HTMLs de diseño). Genera un request externo en cada carga, penaliza CLS y no es óptimo para producción.

### D3: Navbar como Client Component solo para el estado mobile

El Navbar es Server Component por defecto, con un `MobileMenu` interno marcado `'use client'` que maneja el estado `isOpen`. Esto mantiene el componente principal como RSC y limita el JS de cliente al mínimo.

```
Navbar (server)
└── MobileMenu (client) ← solo este tiene useState
```

### D4: Mobile-first con breakpoints `md` y `lg`

- `md` (768px): punto de corte tablet/desktop — el Navbar colapsa al hamburger debajo de `md`
- `lg` (1024px): ajustes de padding y grid para desktop completo
- El diseño en alta fidelidad representa el estado `lg`

Las decisiones de layout mobile para cada sección se toman componente a componente durante la implementación, usando el criterio del diseño desktop como referencia.

### D5: Ancho máximo del contenido

El diseño usa `max-width: 1440px` centrado. Se implementa como clase utilitaria en un wrapper `<div className="max-w-[1440px] mx-auto">` en el layout, no como estilos globales en `body` — más flexible para secciones que necesiten ancho completo (hero, footer dark).

## Risks / Trade-offs

- **Navbar mobile sin diseño** → Riesgo de que el hamburger no quede bien a primera vista. Mitigación: implementar un drawer lateral simple y ajustar visualmente en iteración siguiente.
- **Tokens como CSS variables** → Si Tailwind v4 cambia la API de `@theme` en una versión menor, puede romperse. Mitigación: versión fijada en `package.json` (`^4`), bajo riesgo real.
- **No hay diseño tablet** → Los breakpoints intermedios pueden quedar desalineados. Mitigación: revisión visual en cada componente antes de marcar como completo.
