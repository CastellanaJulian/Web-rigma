## 1. Scaffolding

- [x] 1.1 Crear `diseno-final/contacto.html` copiando el head de `proyectos.html` (DOCTYPE, meta, title, fonts, React+Babel CDN, reset CSS, #root)
- [x] 1.2 Copiar design tokens `const t = { ... }` de `proyectos.html` sin modificaciones
- [x] 1.3 Copiar componentes: `Img`, `Placeholder`, `SectionLabel`, `Logo`, `HoverLink`
- [x] 1.4 Copiar `NavBar` — cambiar ítem activo a "CONTACTO" (underline `t.accent`)
- [x] 1.5 Copiar `Footer` sin modificaciones

## 2. Layout split

- [x] 2.1 Crear componente `ContactoPage` con estructura: `section > div` grid `1fr 1fr`, `minHeight: calc(100vh - 64px)`, `alignItems: stretch`
- [x] 2.2 Columna izquierda: div con padding `48px 64px 48px 56px`, display flex column, fondo `t.bg`
- [x] 2.3 Columna derecha: `Img` con src `./assets/img-2.jpg`, `width: 100%`, `height: 100%`, `objectFit: cover`. Sin padding. Fallback `Placeholder` con label "foto · equipo / obra / empresa"

## 3. Encabezado

- [x] 3.1 H1 "Hablemos." — 66px, fontWeight 700, letterSpacing -0.02em, color `t.ink`, marginBottom 12
- [x] 3.2 Párrafo subtítulo — "Escribinos para consultar sobre proyectos, coordinar una visita o pedir información personalizada." — 14px/300, color `t.textSecondary`, marginBottom 36

## 4. Formulario

- [x] 4.1 Definir `fieldStyle` — `border: 1px solid t.line`, `background: transparent`, `color: t.ink`, `padding: 13px 16px`, `fontSize: 13`, `borderRadius: 2`
- [x] 4.2 Definir `labelStyle` — 9px/700, letterSpacing 0.16em, uppercase, color `t.textTertiary`, marginBottom 8
- [x] 4.3 Fila Nombre + Celular — grid `1fr 1fr`, gap 16
- [x] 4.4 Campo Email
- [x] 4.5 Select Proyecto de interés — opciones: Cosquín 1534, Av. Larrazábal 1255, Zelada 6171, Otro / No sé aún
- [x] 4.6 Textarea Mensaje — rows 4, resize none, auto-expand con onInput
- [x] 4.7 Botón "ENVIAR CONSULTA →" — width 100%, `background: t.ink`, `color: white`, hover a `t.accent` con estado `hovSubmit`

## 5. Canales de contacto

- [x] 5.1 Contenedor canales — marginTop 32, paddingTop 24, `borderTop: 1px solid t.line`, grid 3 columnas, gap 24
- [x] 5.2 Canal WhatsApp — ícono SVG WhatsApp en `t.textSecondary`, label "WhatsApp", valor "+54 11 6596 2401"
- [x] 5.3 Canal Email — ícono SVG envelope, label "Email", valor "Rigmagrupo@gmail.com"
- [x] 5.4 Canal Oficina — ícono SVG pin, label "Oficina", valor "Guardia Nacional 739, PB · CABA"

## 6. Ensamblado y verificación

- [x] 6.1 Crear `App` — NavBar → ContactoPage → Footer
- [x] 6.2 Verificar split layout: columnas iguales, imagen a sangre sin bordes
- [x] 6.3 Verificar formulario: campos, select, textarea, hover en botón
- [x] 6.4 Verificar canales: íconos, labels y valores correctos
- [x] 6.5 Verificar footer idéntico al de `proyectos.html`
