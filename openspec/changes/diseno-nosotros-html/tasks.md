## 1. Scaffolding y componentes base

- [x] 1.1 Crear `diseno-final/nosotros.html` copiando head de `proyectos.html` (DOCTYPE, meta, title, fonts, React+Babel CDN, reset CSS, #root)
- [x] 1.2 Copiar design tokens `const t = { ... }` sin modificaciones
- [x] 1.3 Copiar componentes: `Img`, `Placeholder`, `SectionLabel`, `Logo`, `HoverLink`
- [x] 1.4 Copiar `NavBar` — cambiar ítem activo a "NOSOTROS" (underline `t.accent`)
- [x] 1.5 Copiar `Footer` sin modificaciones

## 2. PageHeader

- [x] 2.1 Crear componente `PageHeader` — SectionLabel "Nosotros", H1 "Tres generaciones.<br />Una forma de construir." (56px/700/-0.025em, maxWidth 680), párrafo subtítulo (16px/300, `t.textSecondary`)
- [x] 2.2 Padding de sección: `80px 56px 64px`

## 3. HistoriaSection

- [x] 3.1 Crear componente `HistoriaSection` con padding `48px 56px 120px`, borderBottom `t.line`
- [x] 3.2 SectionLabel "Historia"
- [x] 3.3 `Img` panorámica — src `./assets/img-1.jpg`, `width: 100%`, `aspectRatio: '16/6'`, `objectFit: cover`, marginBottom 64. Fallback `Placeholder`
- [x] 3.4 Grid 2 columnas `1fr 1fr`, gap 80, alignItems start
- [x] 3.5 Columna izquierda: dos párrafos de historia (copy de CLAUDE.md), 16px/400, lineHeight 1.75, `t.textSecondary`
- [x] 3.6 Columna derecha: métrica "+32.000" (56px/700/-0.02em, `t.ink`) + label "M² construidos" (11px/500 uppercase `t.textSecondary`), separador `borderBottom: 1px solid t.line`, métrica "+220" + label "Unidades funcionales"

## 4. PilaresSection

- [x] 4.1 Crear componente `PilaresSection` — fondo `t.ink`, padding `120px 56px`
- [x] 4.2 SectionLabel dark "Filosofía de trabajo"
- [x] 4.3 Grid 2 columnas `1fr 1fr`, gap 80, alignItems stretch
- [x] 4.4 Columna izquierda: `Placeholder` con fondo oscuro (`repeating-linear-gradient` sobre negro), `width: 100%`, `height: 100%`, minHeight 400
- [x] 4.5 Columna derecha: 3 pilares con copy confirmado — "Calidad en cada etapa", "Compromiso con el cliente", "Espacios que agregan valor". Cada pilar: título 20px/600 blanco, descripción 14px/400 `t.onDarkSecondary`. Separados por `borderBottom: 1px solid t.onDarkLine` entre ellos (no en el último)

## 5. RedireccionSection

- [x] 5.1 Crear componente `RedireccionSection` — padding `120px 56px`, borderBottom `t.line`
- [x] 5.2 SectionLabel "Más sobre nosotros"
- [x] 5.3 H2 "Conocé nuestros proyectos o escribinos directamente." (48px/700/-0.02em, maxWidth 680)
- [x] 5.4 Párrafo descriptivo (15px/300, `t.textSecondary`, marginBottom 40)
- [x] 5.5 Botón "VER PROYECTOS →" — `background: t.ink`, `color: white`, hover a `t.accent`, padding `14px 28px`, 11px/700 uppercase
- [x] 5.6 HoverLink "Contactarnos →" — `baseColor: t.ink`, `baseBorder: t.ink`, 13px/500

## 6. Ensamblado y verificación

- [x] 6.1 Crear `App` — NavBar → PageHeader → HistoriaSection → PilaresSection → RedireccionSection → Footer
- [x] 6.2 Verificar scroll completo: secciones en orden, espaciados correctos
- [x] 6.3 Verificar imagen panorámica carga y tiene proporción 16:6
- [x] 6.4 Verificar métricas: números grandes, labels correctos
- [x] 6.5 Verificar dark section: fondo ink, texto blanco, pilares con separadores
- [x] 6.6 Verificar hovers en CTA: botón → accent, link → accent
