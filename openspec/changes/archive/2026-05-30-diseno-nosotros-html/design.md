## Context

Mismo patrón que el resto de prototipos: HTML autocontenido con React 18 via CDN + Babel. Design tokens y componentes base copiados de `proyectos.html`. Wireframe validado en `Wireframes/nosotros.html`. Todo el copy de Historia y Filosofía está confirmado en CLAUDE.md.

Estructura de secciones (en orden):
1. NavBar — "NOSOTROS" activo
2. PageHeader — título institucional + subtítulo
3. HistoriaSection — imagen panorámica + 2 columnas (texto | métricas)
4. PilaresSection — fondo `t.ink`, imagen izquierda + 3 pilares derecha
5. RedireccionSection — CTA doble: botón primario + link secundario
6. Footer

## Goals / Non-Goals

**Goals:**
- Página completa con copy real confirmado
- Imagen panorámica 16:6 con `Img` + fallback `Placeholder`
- Métricas (+32.000 m² / +220 UF) con tipografía de impacto (56px/700)
- Sección filosofía en dark (`t.ink`) con 3 pilares
- CTA de redirección con botón primario y HoverLink secundario

**Non-Goals:**
- Sección Equipo (omitida hasta confirmación del cliente)
- ContactoSection al final (esta página termina en CTA + Footer)
- Contadores animados en métricas
- Responsive / mobile

## Decisions

### D1 — Componentes: copiar de proyectos.html sin modificar

Logo, NavBar, Footer, Img, Placeholder, HoverLink, SectionLabel copiados literalmente. NavBar activo = "NOSOTROS".

### D2 — PageHeader: H1 en dos líneas con salto explícito

"Tres generaciones.<br />Una forma de construir." — 56px/700, letterSpacing -0.025em, maxWidth 680. Mantiene exactamente el wireframe validado.

### D3 — Imagen panorámica: `./assets/img-1.jpg`, aspect ratio 16:6

`Img` con `width: 100%`, `aspectRatio: '16/6'`, `objectFit: cover`. El cliente reemplazará por foto institucional en producción.

### D4 — Métricas: números en 56px/700, labels en 11px uppercase muted

Mismo tratamiento tipográfico que en el wireframe. Los dos bloques separados por `borderBottom: 1px solid t.line` entre ellos.

### D5 — PilaresSection: dark con imagen en Placeholder oscuro

Fondo `t.ink`. Columna izquierda: `Placeholder` con gradiente oscuro (estilo consistente con el dark). Columna derecha: 3 pilares con `borderBottom: 1px solid t.onDarkLine` entre ellos. Copy confirmado en CLAUDE.md.

### D6 — RedireccionSection: botón primario + HoverLink

"VER PROYECTOS →" — `background: t.ink`, `color: white`, hover a `t.accent`.
"Contactarnos →" — `HoverLink` con `baseColor: t.ink`, `baseBorder: t.ink`, transiciona a accent al hover.

## Risks / Trade-offs

- **Imagen panorámica con asset de proyecto** → el cliente verá una foto de un edificio en la sección Historia. Es contextualmente correcto aunque no sea la foto institucional final.
- **Sección Equipo ausente** → el prototipo muestra la página sin esa sección. Si el cliente pregunta, la respuesta es que está pendiente de datos.
