## Context

Archivo único: `diseno-final/proyectos.html` (React 18 via CDN + Babel standalone). El sistema de diseño y tokens están definidos en `index.html` y replicados en `proyectos.html`. La grilla actual usa CSS Grid de 6 columnas con lógica `getResponsiveSpan(count)` para asignar spans. La transición de filtros usa `key={filter}` en el `<section>` para forzar remount + CSS `@keyframes gridFadeIn` sin stagger.

## Goals / Non-Goals

**Goals:**
- Stagger de entrada por card al cambiar filtro
- Tipografía unificada en todas las cards (LG y MD) — 22px/700
- Lógica `featured` en datos y layout: 2 proyectos siempre arriba y grandes
- `featured` respeta filtro activo (si no pasa el filtro, no aparece destacado)

**Non-Goals:**
- Conexión con Sanity (el campo `featured` es mock en el prototipo)
- Responsive / mobile
- Animación de salida de las cards (solo entrada)

## Decisions

### D1 — Stagger via `animationDelay` inline por índice

Cada card recibe `style={{ animationDelay: \`${index * 60}ms\` }}` y aplica `@keyframes cardEnter` (opacity 0→1, translateY 10px→0, 0.35s ease-out). Se mantiene `key={filter}` en la `<section>` para forzar remount al cambiar filtro, lo que reinicia los delays desde cero.

**Alternativa descartada:** CSS `nth-child` selectors — no funciona bien con React porque el DOM se reconstruye y los índices pueden no coincidir con el orden visual.

### D2 — Tipografía unificada a 22px / 700

Cards LG y MD usan el mismo `fontSize: 22`, `fontWeight: 700`, `letterSpacing: '-0.01em'`. La jerarquía visual la aporta exclusivamente el tamaño físico de la card (span y height), no la tipografía.

**Alternativa descartada:** escalar tipografía proporcionalmente al span. Agrega complejidad y fue lo que generó la inconsistencia original.

### D3 — Campo `featured: boolean` en `ALL_PROJECTS`

Los 2 proyectos En Ejecución actuales se marcan `featured: true` en el mock. En `ProyectosGrid`, cuando el filtro es `'todos'`, los `featured` se renderizan primero con span 3 fijo. Los no-featured se renderizan abajo con `getResponsiveSpan`.

Cuando el filtro es `'en-ejecucion'` o `'terminados'`, `featured` no tiene efecto — todos los proyectos visibles reciben el mismo span calculado por `getResponsiveSpan`.

**Por qué span 3 fijo para featured:** siempre son exactamente 2, por lo que 2 × span3 = 6 columnas. No necesita cálculo dinámico.

### D4 — Featured respeta filtro (sin fila featured "pegada")

Si el proyecto featured no coincide con el filtro activo, no aparece. No hay lógica especial para "siempre mostrar la fila featured" — la fila featured es simplemente el resultado de renderizar primero los proyectos que tienen `featured: true` y pasaron el filtro.

**Alternativa descartada:** mantener la fila featured fija en todos los filtros. Sería confuso mostrar un proyecto terminado como destacado cuando el usuario filtra "En ejecución".

## Risks / Trade-offs

- **2 featured hardcodeados en el prototipo** → En producción con Sanity el cliente podría poner `featured: true` en más de 2. La lógica del prototipo no limita a 2, simplemente renderiza todos los `featured` con span 3. Si hay 3 featured, la tercera card span 3 quedará sola en su fila. Aceptable para el prototipo.
- **`key={filter}` remonta toda la sección incluyendo EmptyState** → El EmptyState también aparecerá con animación al cambiar a un filtro vacío. Es comportamiento deseable.
