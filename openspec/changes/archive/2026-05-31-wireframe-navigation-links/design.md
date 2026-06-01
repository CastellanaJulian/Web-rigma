## Context

Los wireframes son archivos HTML standalone que usan React + Babel via CDN. Los componentes de navegación (`NavBar`) y los CTAs están escritos en JSX inline y renderizan elementos sin atributos `href`. El objetivo es solo agregar navegación funcional sin alterar ningún estilo ni estructura.

## Goals / Non-Goals

**Goals:**
- Navbar funcional en misma pestaña en las 5 páginas
- Card Cosquín 1534 clickeable (nueva pestaña) en `inicio.html` y `proyectos.html`
- CTA "Ver todos los proyectos →" clickeable en `inicio.html` (nueva pestaña)

**Non-Goals:**
- Cambios de diseño o estilos
- Conectar otros proyectos (Zelada, Larrazábal)
- Modificar el código Next.js en `dev/`
- Conectar la sección "Siguiente proyecto" de la ficha

## Decisions

**Navbar — `<a>` envolviendo el contenido del `<span>`, sin reemplazarlo**
Los spans del navbar tienen estilos inline complejos. La estrategia más segura es reemplazar el `<span>` por un `<a>` con `style={{ textDecoration: 'none', color: 'inherit' }}` preservando todos los estilos existentes dentro. Esto evita romper el active state (el ítem activo tiene color y border-bottom distintos).

**Cards de Cosquín — wrapper `<a>` sobre el `<div>` raíz de la card**
Las cards tienen `position: relative` con capas absolutas (imagen, overlay, contenido). Envolver el `<div>` raíz con un `<a>` con `display: 'contents'` o `display: 'block'` y `position: 'relative'` heredado mantiene el layout intacto.

**Cards de otros proyectos — sin cambios**
No se agrega `onClick` ni `href` a Zelada ni Larrazábal. El `cursor: pointer` visual ya existe por diseño y se mantiene tal cual.

**Rutas relativas**
Todos los `href` usan rutas relativas simples (`./proyectos.html`, `./ficha-proyecto.html`) ya que todos los archivos viven en el mismo directorio `Wireframes/`.

## Risks / Trade-offs

- [Los spans del navbar con estilos inline complejos pueden perder estilos al cambiar el tag] → Preservar todos los atributos `style` existentes dentro del `<a>` wrapper
- [El active state del navbar (ítem resaltado por página) debe mantenerse correcto en cada archivo] → Verificar que el ítem correspondiente a cada página mantenga su `color: t.ink` y `borderBottom` después del cambio
