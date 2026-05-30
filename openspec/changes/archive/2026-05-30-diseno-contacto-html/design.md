## Context

Mismo patrón que `proyectos.html`: archivo HTML autocontenido con React 18 via CDN + Babel standalone. Design tokens y componentes base (NavBar, Footer, Logo, Img, Placeholder, HoverLink, SectionLabel, StatusPill) se copian literalmente de `proyectos.html`. El wireframe validado está en `Wireframes/contacto.html`.

La página Contacto es la única en el sitio con layout split 50/50. No tiene ContactoSection al final (ella misma es la sección de contacto). No tiene héroe, grilla de proyectos ni sección de mapa.

## Goals / Non-Goals

**Goals:**
- Layout split `1fr 1fr` a pantalla completa (menos navbar 64px)
- Formulario en columna izquierda con los mismos campos que ContactoSection
- Canales de contacto (WhatsApp, Email, Oficina) debajo del formulario
- Imagen a sangre en columna derecha con fallback Placeholder
- Hover en botón y canales coherente con el sistema

**Non-Goals:**
- Envío real del formulario (prototipo estático)
- Responsive / mobile
- Animaciones de entrada

## Decisions

### D1 — Componentes: copiar de proyectos.html sin modificar

Logo, NavBar, Footer, Img, Placeholder, HoverLink, SectionLabel copiados literalmente. NavBar activo = "CONTACTO" con underline `t.accent`.

### D2 — Formulario en fondo claro (bg #FBFBFB)

A diferencia de ContactoSection (fondo `t.ink`), la columna izquierda usa `t.bg`. Los campos tienen `border: 1px solid t.line`, `background: transparent`, `color: t.ink`. El botón "ENVIAR CONSULTA →" es `background: t.ink, color: white` con hover a `t.accent` (mismo patrón que en index.html pero invertido en el color base).

**Alternativa descartada:** reutilizar el ContactoSection dark en la columna izquierda. El split 1fr/1fr con imagen en la derecha ya aporta el peso oscuro — duplicar el dark en el form lo haría pesado visualmente.

### D3 — H1 "Hablemos." a 66px / 700

El wireframe tenía 44px. En alta fidelidad, "Hablemos." es el único titular de la página y merece el mismo peso visual que los headings de las otras páginas (index.html usa 72px en el hero, proyectos.html usa 56px). 66px mantiene coherencia y da presencia sin competir con el formulario debajo.

### D4 — Imagen derecha: Img + fallback Placeholder a sangre

La columna derecha no tiene padding. `Img` cubre `width: 100%, height: 100%` con `object-fit: cover`. Si falla, `Placeholder` con label "foto · equipo / obra / empresa". En producción se reemplaza por una imagen real del equipo o de una obra.

### D5 — Canales: grid 3 columnas con ícono SVG + label + valor

Debajo del formulario, separados por `borderTop: 1px solid t.line`. Tres canales: WhatsApp (+54 11 6596 2401), Email (Rigmagrupo@gmail.com), Oficina (Guardia Nacional 739, PB · CABA). Íconos en `t.textSecondary`, labels en `t.textTertiary` uppercase, valores en `t.ink`.

### D6 — Sin ContactoSection ni sección extra al final del scroll

La página termina en Footer después del split. No hay CTA de contacto redundante — el usuario ya está en la página de contacto.

## Risks / Trade-offs

- **Imagen placeholder** → el cliente verá el patrón rayado en la columna derecha. Aceptable en prototipo; mitigación: label descriptiva en el placeholder.
- **Split layout en pantallas angostas** → no aplica (prototipo desktop only, sin responsive).
