## Context

El sitio usa Next.js 16 + Tailwind v4. Los componentes mezclan inline styles (para animaciones y valores dinámicos) con clases Tailwind (para responsive). El breakpoint mobile es `md` (768px). Los problemas afectan a 8 archivos en 4 páginas. No hay cambios de datos ni de API — todo es presentación.

## Goals / Non-Goals

**Goals:**
- Corregir todos los problemas visuales y de interacción en mobile identificados en la sesión de testing
- Mantener el comportamiento desktop intacto
- No introducir nuevas dependencias salvo `leaflet-gesture-handling` (necesario para el mapa)

**Non-Goals:**
- Rediseñar componentes más allá de lo necesario para el fix
- Mejorar performance o animaciones
- Cambios en desktop

## Decisions

### 1. Flechas del Hero: condicional con clase Tailwind
Envolver `<ArrowBtn>` en un `<div className="hidden md:block">`. Es la forma más limpia — sin JS, sin media query custom. Las flechas siguen existiendo en el DOM para desktop.

### 2. Altura del Hero: `85svh` en mobile, `100vh` en desktop
`svh` (small viewport height) descuenta la barra del browser en mobile. En Tailwind no existe `h-[85svh]` como clase builtin, se usa inline style con `clamp` o clase arbitraria. Opción elegida: inline style condicional con `min(85svh, 100vh)` aplicado solo en mobile via CSS custom en `globals.css` con media query, para no complejizar el componente React.

Alternativa descartada: `100dvh` — no tiene soporte universal en Android < 12.

### 3. Botón "Ver todos" en ProyectosDestacados: reordenar markup
En lugar de mover el botón con JS o position absolute, se divide el header en dos: el título siempre arriba, el botón condicionalmente aparece al final del grid en mobile usando `hidden md:block` / `block md:hidden` en dos instancias del mismo link. Simple y sin overhead.

### 4. NosotrosSnippet: romper grid en mobile con orden explícito
El layout actual es `grid-cols-1 md:grid-cols-2`. En mobile el texto tiene `order-2` y la imagen `order-1` — la imagen ya sube primero. El cambio es: en mobile, la imagen va *entre* el título y el subtítulo (dentro de la columna de texto). Para lograr esto sin refactorizar el grid completo, se mueve la imagen al interior del div de texto, envuelta en un bloque `block md:hidden` con `aspect-ratio: 1/1` y `w-full`. La imagen del grid derecho queda solo visible en desktop con `hidden md:block`.

### 5. ProjectCard hover: `@media (hover: hover)`
Tailwind soporta el variant `hover:` pero no discrimina entre hover real y touch. La solución es cambiar el estado `hovered` de JS por una clase CSS que solo aplica en dispositivos con hover real. Se agrega al `globals.css`:
```css
@media (hover: hover) {
  .project-card:hover { transform: scale(1.015); }
}
```
Y se elimina el `useState(hovered)` del componente.

### 6. Mapa — leaflet-gesture-handling
Plugin oficial para Leaflet que intercepta el scroll/drag de un dedo y muestra un overlay "Usa dos dedos para mover el mapa". Es la solución estándar para este problema. Se instala como dependencia y se inicializa junto al mapa.

### 7. Canales de contacto: `grid-cols-1` en mobile
Cambiar `gridTemplateColumns: 'repeat(3, 1fr)'` por `repeat(1, 1fr)` en mobile. Se implementa con Tailwind: `grid grid-cols-1 md:grid-cols-3`.

### 8. Imagen contacto: padding simétrico en mobile
El padding izquierdo es `0` en desktop para que la imagen vaya al corte. En mobile se agrega `paddingLeft` igual al `paddingRight` usando Tailwind (`px-4 md:pl-0`).

### 9. MobileMenu: fullscreen overlay panel desde arriba
- El contenedor cambia de `absolute top-full` a `fixed top-[64px] left-0 right-0 bottom-0` (64px = altura del navbar)
- Se agrega `overflow-y-auto` para que el contenido sea scrolleable si el celu es muy chico
- Padding vertical generoso: `py-8 px-6`
- Links: `py-5` en lugar de `py-4`, font size aumentado a 13px
- Fix de la X: el gap entre líneas es `gap-1.5` (6px). El `translateY` para la cruz debe ser exactamente `6px` (el gap) — actualmente está en `5px` lo que la desalinea.

## Risks / Trade-offs

- **`85svh` en Safari iOS antiguo** → `svh` tiene soporte desde iOS 15.4. Para versiones anteriores cae a `vh` normal. Aceptable dado el target del cliente.
- **Dos instancias del botón "Ver todos"** → duplica un elemento en el DOM. El botón es un `<Link>` simple sin lógica, el overhead es despreciable.
- **leaflet-gesture-handling**: agrega ~5KB al bundle de la página de proyectos. Aceptable.

## Open Questions

Ninguna — todos los cambios están definidos y acotados.
