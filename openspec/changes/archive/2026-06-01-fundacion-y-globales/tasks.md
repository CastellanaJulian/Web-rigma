## 1. Setup y dependencias

- [x] 1.1 Instalar dependencias: `react-leaflet`, `leaflet`, `@types/leaflet`, `embla-carousel-react`, `react-hook-form`, `zod`, `sharp`
- [x] 1.2 Verificar que el proyecto `site/` compila sin errores tras instalar

## 2. Tokens de diseño y tipografía

- [x] 2.1 Reemplazar `globals.css` con los tokens del `@theme`: colores `bg`, `bg-warm`, `surface`, `surface-warm`, `accent`, `ink`, `ink-elevated`, `line`
- [x] 2.2 Integrar Montserrat vía `next/font/google` en `layout.tsx` (pesos 300, 400, 500, 600, 700) y asignar la variable `--font-sans`
- [x] 2.3 Eliminar el dark mode automático del sistema operativo en `globals.css` (la paleta de Rigma es siempre clara)
- [x] 2.4 Verificar en el browser que `bg-accent`, `text-ink` y la fuente Montserrat funcionan en una página de prueba

## 3. Primitivos compartidos

- [x] 3.1 Crear `src/components/shared/Logo.tsx` — cuadrado con "RIG/MA", props `size` y `color`
- [x] 3.2 Crear `src/components/shared/SectionLabel.tsx` — label con línea accent, prop `dark`
- [x] 3.3 Crear `src/components/shared/StatusPill.tsx` — pastilla de estado con punto indicador, prop `dark`
- [x] 3.4 Crear `src/components/shared/Btn.tsx` — variantes `primary` y `secondary`, soporta `href` (Link) y `onClick` (button)

## 4. Navbar

- [x] 4.1 Implementar `src/components/layout/Navbar.tsx` con layout desktop: Logo izquierda, links derecha, sticky con fondo semitransparente + blur
- [x] 4.2 Resaltar el link activo con `usePathname()` de Next.js (subrayado accent)
- [x] 4.3 Crear `MobileMenu` como Client Component dentro de Navbar: botón hamburger que despliega los links en mobile
- [x] 4.4 Aplicar estilos responsive: links ocultos en `< md`, hamburger visible en `< md`
- [ ] 4.5 Verificar Navbar visualmente en desktop (1440px), tablet (768px) y mobile (390px)  ← pendiente revisión visual del usuario

## 5. Footer

- [x] 5.1 Implementar `src/components/layout/Footer.tsx` con fondo `ink`, tres columnas en desktop (logo+slogan, links, contacto)
- [x] 5.2 Agregar año de copyright dinámico con `new Date().getFullYear()`
- [x] 5.3 Aplicar layout mobile: columnas apiladas verticalmente
- [ ] 5.4 Verificar Footer visualmente en desktop y mobile  ← pendiente revisión visual del usuario

## 6. ContactCTA

- [x] 6.1 Implementar `src/components/shared/ContactCTA.tsx` con fondo oscuro, título, subtítulo y botón que navega a `/contacto`
- [ ] 6.2 Verificar que el componente se ve bien en las páginas que ya lo importan (`page.tsx` de Inicio y Proyectos)  ← pendiente revisión visual del usuario

## 7. Limpieza y verificación final

- [x] 7.1 Correr `npm run build` en `site/` y confirmar que compila sin errores ni warnings de TypeScript
- [ ] 7.2 Verificar en el browser que todas las rutas existentes renderizan correctamente con Navbar y Footer  ← pendiente revisión visual del usuario
- [x] 7.3 Actualizar CLAUDE.md sección "Stack técnico" con las librerías incorporadas (`react-leaflet`, `embla-carousel-react`, `react-hook-form`, `zod`, `sharp`) y cambiar el Root Directory de Vercel documentado de `landing-en-construccion/v0` a `site`

## 8. Migración de Sanity y limpieza del repo

- [x] 8.1 Copiar `dev/src/sanity/schemas/` → `site/src/sanity/schemas/`
- [x] 8.2 Copiar `dev/src/sanity/structure.ts` y `dev/src/sanity/env.ts` → `site/src/sanity/`
- [x] 8.3 Copiar `dev/sanity.config.ts` y `dev/sanity.cli.ts` → `site/`
- [x] 8.4 Borrar la carpeta `dev/` completa del repo
- [x] 8.5 Verificar que `site/` compila correctamente tras la migración
