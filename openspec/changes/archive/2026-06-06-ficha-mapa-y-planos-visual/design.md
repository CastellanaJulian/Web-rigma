## Context

La ficha de proyecto (`/proyectos/[slug]`) tiene dos secciones con desvíos respecto al diseño final HTML en `diseno-final/ficha-proyecto.html`:

1. **LocationSection** (`LocationSection.tsx`): fondo sin color, sin título/bajada, interacción unidireccional (cards → mapa, no mapa → cards), popups Leaflet con estilos default (border-radius alto, sombra fuerte, botón de cierre pegado al borde), cards POI con estructura incorrecta (box de icono, categoría visible, sin border en hover).

2. **PlanosSection** (`PlanosSection.tsx`): la animación `accordionDown` del acordeón no está definida (nunca se migró a `globals.css`), y el campo de descripción por plano queda vacío porque el tipo `Project.plans` es `string[]` (solo paths, sin descripción).

Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Leaflet/react-leaflet, inline styles para spacing crítico.

## Goals / Non-Goals

**Goals:**
- Alinear `LocationSection` al diseño final: fondo gris, título/bajada dinámicos, cards POI rediseñadas, interacción bidireccional, popups Leaflet con estilos del sistema
- Restaurar animación de acordeón en `PlanosSection`
- Hacer la descripción por plano obligatoria y visible en card y lightbox
- Cambiar `Project.plans` de `string[]` a `Plan[]` para sostener la descripción requerida

**Non-Goals:**
- No se cambia la lógica de agrupación de planos por tipología (se simplifica)
- No se toca el diseño de otras secciones de la ficha
- No se cambia el tile provider del mapa (sigue siendo CartoDB light)

## Decisions

### D1: Cambiar `Project.plans` de `string[]` a `Plan = { src: string; description: string }[]`

La descripción por plano es requerida según el diseño. Codificarla en el tipo garantiza que no pueda quedar vacía en runtime. Alternativa descartada: mantener `string[]` + `planDescriptions: string[]` paralelo — propenso a desincronización por índice.

El cambio es **BREAKING**: afecta `projects.ts`, `PlanosSection.tsx` y el condicional de render en `page.tsx` (`project.plans.length > 0`).

### D2: Popups Leaflet — overrides en `globals.css`, no en JS

Los estilos `.leaflet-popup-content-wrapper`, `.leaflet-popup-content` y `.leaflet-popup-close-button` son clases CSS que Leaflet inyecta en el DOM. La forma idiomática de sobreescribirlas es CSS global con `!important`. Alternativa descartada: crear un custom popup component en React — mayor complejidad, sin beneficio real para este caso.

### D3: Interacción bidireccional — estado React compartido via `activeIdx`

El estado `activeIdx: number | null` ya existe en el componente. Para la dirección mapa → cards: en los markers Leaflet se usan los eventos `mouseover`/`mouseout` para actualizar `activeIdx`. Para la dirección cards → mapa: el `onMouseEnter` de cada card llama a `marker.openPopup()`. Un `useEffect` sincroniza la clase CSS `.active` en el elemento DOM del marker según `activeIdx`, igual que en el diseño final. No se necesita estado adicional.

### D4: Título y bajada de ubicación — nueva prop `locationDescription` + derivar título de `neighborhood`

El título se deriva de `project.neighborhood ?? project.location` en `page.tsx` y se pasa como prop a `LocationSection`. La bajada es texto libre por proyecto: se agrega el campo `locationDescription?: string` al tipo `Project`. Si el campo no existe, la bajada simplemente no se renderiza (para proyectos sin ese dato). Alternativa descartada: texto generado automáticamente con template — menos flexible para proyectos con ubicaciones específicas.

### D5: `accordionDown` keyframe — en `globals.css`

El keyframe es reutilizable (podría usarse en otros acordeones) y el lugar correcto en Next.js para CSS global es `globals.css`. Alternativa descartada: inline `<style>` en el componente — antipatrón en React, duplica reglas en cada render.

## Risks / Trade-offs

- **BREAKING en `Project.plans`** → Los proyectos que ya tienen `plans` (solo `cosquin-1534`) necesitan actualización manual en `projects.ts`. Los otros proyectos no tienen `plans`, así que no se ven afectados. Mitigation: actualizar en el mismo commit.
- **Leaflet CSS overrides en globals.css** → Aplican a cualquier mapa Leaflet en el sitio. Actualmente hay dos: `LocationSection` (ficha) y `MapaSection` (página proyectos). Los overrides son compatibles con ambos usos. Mitigation: verificar visualmente `MapaSection` luego del cambio.
- **Marker DOM manipulation vía `getElement()`** → Leaflet expone el elemento DOM del marker. Si el marker no está aún montado en el DOM cuando se ejecuta el `useEffect`, `getElement()` retorna `null`. El código ya tiene guardias `if (!el) return` para este caso.

## Migration Plan

1. Actualizar tipo `Project` (agregar `Plan` type, cambiar `plans`, agregar `locationDescription`)
2. Actualizar `projects.ts` (cosquín con nuevo formato de planos + `locationDescription`)
3. Actualizar `globals.css` (keyframe + Leaflet overrides)
4. Actualizar `PlanosSection.tsx` (nuevo tipo + animación)
5. Actualizar `LocationSection.tsx` (fondo, título/bajada, cards, interacción)
6. Actualizar `page.tsx` (pasar `locationDescription` al componente)

Rollback: git revert. No hay base de datos ni migraciones involucradas — todo es data mock + UI.

## Open Questions

- *(ninguna — todo clarificado en sesión de exploración)*
