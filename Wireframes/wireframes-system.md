# Wireframes — Sistema visual y de componentes

> Fuente de verdad estructural durante la fase B (wireframes).
> Documenta el sistema visual y de componentes para mantener coherencia entre pantallas.
> Última actualización: 11 de mayo 2026

> ⚠️ **Alcance:** este archivo describe el sistema de **wireframes** (mid-fi, neutral). El sistema de marca — paleta de colores definitiva, tipografía final, identidad visual — se documenta por separado en `design-system.md` cuando entremos en la etapa de alta fidelidad.

---

## Objetivo

Mantener coherencia entre pantallas de wireframe a medida que se suman vistas nuevas (Proyectos, Ficha de Proyecto, Nosotros, Contacto). Sirve como referencia para:
- Saber qué componentes existen y cómo se usan antes de crear uno nuevo.
- Validar tipografía, escala, espaciado y placeholders contra una sola fuente.
- Onboardear a un colaborador (humano o IA) en minutos.

---

## Lineamientos generales

### Fidelidad
- **Mid-fi:** formas claras con tipografía real, sin color de marca, sin sombras, sin imágenes finales.
- Solo escalas neutras (blanco, grises, casi negro).
- Imágenes representadas con placeholders rayados (ver sección *Patrones de placeholder*).
- Aire generoso entre secciones — el ritmo arquitectónico es parte del lenguaje.

### Anchos de pantalla soportados
- **Desktop primero:** 1440 px de ancho de artboard como base.
- Mobile / tablet se incorporan en la fase de alta fidelidad. **No** se diseñan responsive en mid-fi.
- Padding horizontal de página: **56 px** constante (ver *Sistema de espaciado*).

### Estructura de pantalla
- **El sitemap manda.** Cada pantalla sigue la estructura definida en `sitemap/Rigma-group-sitemap.csv` y en `CLAUDE.md → Arquitectura del sitio`. No hay límite numérico de bloques desde el sistema visual — la cantidad y orden de secciones los define el sitemap.
- Si durante el armado de wireframes aparece la necesidad de agregar o sacar un bloque que no está en el sitemap, **primero se actualiza el sitemap + `CLAUDE.md`**, luego se construye.
- Dos secciones consecutivas con fondo oscuro están permitidas solo si una corta el ritmo (hero oscuro → contacto oscuro funciona, pero `Por qué (B)` + `Contacto (A)` queda saturado).

---

## Sistema tipográfico

> **Decisión:** una sola familia sans-serif geométrica para todo el wireframe. Sin serif, sin monoespaciada. Inspirado en el cartel de obra de Rigma — la jerarquía se construye con **pesos + tamaños + letter-spacing en MAYÚSCULAS**, no con cambios de familia.

### Familia (Google Font)

| Rol           | Familia          | Pesos cargados                          | Notas |
|---------------|------------------|-----------------------------------------|-------|
| Única familia | **Montserrat**   | 300 / 400 / 500 / 600 / 700 (+ italic 400) | Geométrica diseñada en Buenos Aires, free, full-weight. Encaja con el espíritu del cartel de obra de Rigma. |

Fallback: `system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif`.

> ⚠️ Esta es la familia **del wireframe**. La familia definitiva de marca se decide en alta fidelidad y se documenta en `design-system.md`. Montserrat es la aproximación más cercana al cartel sin comprometer la decisión de marca todavía.

### Pesos y patrón de uso

| Peso         | Uso principal                                                              |
|--------------|----------------------------------------------------------------------------|
| **300 Light**    | Body terciario, captions, italic editorial cuando se busca delicadeza.   |
| **400 Regular**  | Body principal, párrafos largos, descripciones.                          |
| **500 Medium**   | Links del nav, CTAs inline, items activos, labels, kickers UPPERCASE.    |
| **600 SemiBold** | Subtítulos, nombres de proyecto, énfasis dentro de body.                 |
| **700 Bold**     | Titulares display (H1, H2 grandes), logotipo, números de stats.          |

### Escala de tamaños

Todos los valores en px (ancho base 1440). Una sola familia: **Montserrat**.

| Token         | Tamaño | Peso | Line-height | Letter-spacing | Uso                                                          |
|---------------|--------|------|-------------|----------------|--------------------------------------------------------------|
| `display-xl`  | 96     | 700  | 0.95        | -0.025em       | H1 hero, titular emocional de Contacto A.                    |
| `display-lg`  | 88     | 700  | 0.95        | -0.025em       | H1 hero overlay sobre imagen.                                |
| `display-md`  | 64     | 700  | 1.0         | -0.02em        | H2 sección destacada, números grandes en `Por qué (B)`.      |
| `display-sm`  | 56     | 700  | 1.05        | -0.02em        | H2 estándar de sección + números de stats.                   |
| `heading-lg`  | 36     | 700  | 1.0         | -0.015em       | Logotipo en footer.                                          |
| `heading-md`  | 32     | 600  | 1.05        | -0.015em       | Nombre de proyecto en lista editorial (Variante B).          |
| `heading-sm`  | 28     | 600  | 1.1         | -0.01em        | Título de pilar en `Por qué (B)`.                            |
| `heading-xs`  | 24     | 700  | 1.0         | 0.02em         | Título de pilar (A). (El logotipo usa el componente `Logo`, no este token.) |
| `quote`       | 20     | 400  | 1.5         | -0.005em       | Texto de testimonio (italic opcional).                       |
| `card-title`  | 18     | 600  | 1.2         | -0.005em       | Título de card de proyecto (Variante A).                     |
| `body-lg`     | 18     | 400  | 1.6         | normal         | Subtítulo emocional grande (Contacto A).                     |
| `body-md`     | 16     | 400  | 1.5–1.7     | normal         | Párrafos principales de bloques de texto.                    |
| `body-sm`     | 15     | 400  | 1.6–1.7     | normal         | Bajadas de hero, descripciones secundarias.                  |
| `body-xs`     | 14     | 400  | 1.6         | normal         | Body en pilares variante B.                                  |
| `ui-md`       | 13     | 500  | 1.2         | normal         | Links del nav, links CTA inline, botones.                    |
| `ui-sm`       | 12     | 500  | 1.2         | normal         | Bajada de localización en cards.                             |
| `label-md`    | 12     | 500  | 1.2         | 0.10em         | CTA pill de navbar, year en lista de proyectos. **UPPERCASE**. |
| `label-sm`    | 11     | 500  | 1.2         | 0.12em         | Numeración `01`, kicker de sección, labels de form, columna titles del footer. **UPPERCASE**. |
| `label-xs`    | 10     | 600  | 1.2         | 0.10em         | Status pill (`En ejecución`, `Terminado`). **UPPERCASE**.    |
| `label-2xs`   | 9      | 600–700 | 1.2      | 0.14em         | Labels técnicos chicos: KeyDataStrip, form labels, footer column titles. **UPPERCASE**. |

### Patrones de uso

- **Énfasis editorial dentro de titulares** (reemplaza el viejo *italic + muted* serif): la palabra emfatizada va con **peso 300 + color `muted`**, sobre el resto en peso 700 + color `ink`. Ej: `Construimos lugares donde quedarse.` ← `lugares` light + muted; el resto bold + ink. El contraste de peso + color crea jerarquía sin recurrir a italic/serif.
  - Variante alternativa: misma palabra en **italic 400 + muted** (Montserrat tiene italic), si se busca un tono más cálido/manuscrito.
- **MAYÚSCULAS + letter-spacing positivo** sustituyen a la mono en kickers, labels y status pills. Patrón: peso 500–600, tamaño 10–12, letter-spacing 0.08–0.12em. Igual que en el cartel de obra (`INTERIORES DE CALIDAD`, `CONSULTAS`, `COCHERAS DISPONIBLES`).
- **Letter-spacing negativo** (-0.02 a -0.025em) en titulares grandes (≥ 56 px) para compactar bold y darle peso arquitectónico. En sizes medios y body, letter-spacing normal.
- **Letter-spacing positivo** (0.08–0.12em) **solo** en MAYÚSCULAS y a tamaño chico (≤ 12 px). Nunca en body en minúscula.
- **Line-height:** ≤1.05 en display; 1.1–1.2 en headings y UI; 1.5–1.7 en body.
- **No usar pesos extremos** (100 Thin, 800 ExtraBold, 900 Black) — se rompe la coherencia con el cartel.

### Jerarquía por pantalla

```
Kicker de sección  →  label-sm UPPERCASE  ("01 ─ PROYECTOS", peso 500, tracking 0.12em)
Título de bloque   →  display-sm o display-md  (peso 700, tracking negativo)
Body / bajada      →  body-md  (peso 400)
Items / labels     →  ui-md  (peso 500)
Metadata           →  label-xs / label-sm UPPERCASE  (peso 500–600)
```

---

## Sistema de espaciado

Escala base alineada a múltiplos de 4 (compatible con Tailwind default).

```
4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40 · 48 · 56 · 64 · 80 · 96 · 120 · 160
```

### Padding interno

| Contexto                              | Valor                            |
|---------------------------------------|----------------------------------|
| Sección estándar (vertical)           | 120 px arriba y abajo            |
| Sección emocional (Contacto A)        | 160 px arriba y abajo            |
| Sección hero split (HeroB)            | 80 px top, 0 bottom              |
| Hero overlay (HeroA, dark)            | 40 px (interno del overlay)      |
| Padding horizontal de página          | **56 px** constante              |
| Navbar                                | 24 px vertical · 56 px horizontal|
| Footer                                | 64 top · 56 horiz · 32 bottom    |
| Card de testimonio                    | 40 × 32 px                       |
| Card del bloque de stats              | 40 × 32 px                       |
| Form (Contacto B)                     | 40 px todo lado                  |

### Margin entre elementos

| De → A                                       | Valor       |
|----------------------------------------------|-------------|
| Kicker → H2                                  | 24 px       |
| H2 → primer párrafo                          | 24–32 px    |
| Párrafo → CTA                                | 28–32 px    |
| H2 → grilla de items                         | 48–80 px    |
| Cards en grilla (gap)                        | 16, 24 ó 32 px (según densidad) |
| Columnas split (HeroB, Nosotros A, Contacto B)| 48–96 px    |
| Footer columna grid gap                      | 48 px       |
| Items dentro de lista vertical (footer)      | 8 px        |

### Reglas
- El padding horizontal de **56 px** se mantiene en toda sección, incluso oscuras, incluso a sangre. La única excepción es un placeholder que ocupa todo el `inset` (hero overlay).
- Entre dos secciones consecutivas no se suman paddings: cada sección encapsula su propio respiro vertical.

---

## Sistema de color (en wireframes)

> Solo escalas neutras. Sin paleta de marca todavía — eso entra en `design-system.md` cuando arranque alta fidelidad.

### Tema claro (default)

| Token       | Hex       | Uso                                                      |
|-------------|-----------|----------------------------------------------------------|
| `bg`        | `#ffffff` | Fondo de página y de cards.                              |
| `ink`       | `#171717` | Texto principal, logo, fondos invertidos (sección oscura).|
| `ink2`      | `#404040` | Texto secundario / body.                                 |
| `muted`     | `#737373` | Labels, metadata, italic editorial, body terciario.      |
| `line`      | `#e5e5e5` | Bordes principales, separadores.                         |
| `line2`     | `#d4d4d4` | Bordes sutiles (form fields), comilla decorativa.        |
| `surface`   | `#fafafa` | Fondo de bloque diferenciado (Nosotros A, Testimonios, Footer). |
| `surface2`  | `#f5f5f5` | Base de placeholders rayados.                            |
| `canvas-bg` | `#f0eee9` | Fondo del **canvas de Claude Design** — NO se usa en producción. |

### Tema oscuro (overlay y secciones invertidas)

| Token              | Valor                          | Uso                                            |
|--------------------|--------------------------------|------------------------------------------------|
| `dark-bg`          | `#171717` (= `ink`)            | Fondo de sección oscura (`Por qué (B)`, `Contacto (A)`).|
| `dark-fg`          | `#ffffff`                      | Texto principal.                               |
| `dark-muted`       | `rgba(255,255,255,0.65)`       | Texto secundario.                              |
| `dark-muted-soft`  | `rgba(255,255,255,0.5–0.7)`    | Body terciario, separadores tenues.            |
| `dark-line`        | `rgba(255,255,255,0.15)`       | Bordes en sección oscura.                      |
| `dark-placeholder-bg`   | `#1f1f1f`                 | Base del placeholder rayado en hero oscuro.    |
| `dark-placeholder-stripe`| `rgba(255,255,255,0.06)` | Stripes del placeholder oscuro.                |

### Gradientes
- Hero overlay (HeroA): `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)`.
- Nosotros B overlay: `linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)`.
- Solo se usan **sobre fotos placeholder** para garantizar contraste de texto blanco.

---

## Componentes globales

### Logo
- Cuadrado con borde + texto `RIG / MA` en dos líneas, left-aligned dentro del cuadrado.
- **Estructura:** `div` cuadrado (width = height = `size`) con `border: ~5% de size`. Dentro, dos `div` con `RIG` y `MA` en Montserrat 500, `fontSize ≈ 40% de size`, `lineHeight: 1.05`.
- **Props:** `size` (px, default 40) · `color` (hex/rgba, default `ink`). El color se aplica tanto al borde como al texto.
- **Usos estándar:**
  - Navbar claro: `size=40, color=ink`
  - Footer oscuro: `size=44, color=rgba(255,255,255,0.85)`
  - Hero oscuro (si aplica): `size=48, color=rgba(255,255,255,0.9)`
- Encapsula la identidad del logotipo real (cuadrado con borde + texto partido en dos líneas) como lo muestra la imagen de marca provista por el cliente.

### NavBar
- Layout: `space-between` entre logo, nav links, CTA pill.
- Padding `24 × 56`. Border-bottom `1px line`.
- **Logo:** componente `<Logo size={40} color={ink} />` (ver sección *Logo* arriba).
- **Nav links:** `ui-md` (Montserrat 13, peso 500), gap 36px. Estado activo: color `ink`. Resto: `ink2`.
- **CTA pill:** `label-md` UPPERCASE (Montserrat 12, peso 500, letterSpacing 0.10em), padding `8 × 14`, border 1px line, borderRadius 999. Copy `HABLEMOS →`.
- **Variante `dark={true}`:** texto blanco, line `rgba(255,255,255,0.15)`, muted `rgba(255,255,255,0.65)`. Misma estructura.

### Footer
- Padding `64 / 56 / 32`. Background `ink` (oscuro). Sin top border — el contraste de fondo ya separa.
- Grid de 4 columnas: `2fr 1fr 1fr 1fr`, gap 48.
- **Columna 1:** componente `<Logo size={44} color="rgba(255,255,255,0.85)" />` + bajada `ui-sm` muted (max-width 280, line-height 1.8). Color texto: `rgba(255,255,255,0.5)`.
- **Columnas 2–4:** título `label-2xs` UPPERCASE (Montserrat 9, peso 700, letterSpacing 0.16em) color `rgba(255,255,255,0.35)` → lista de items `ui-sm` color `rgba(255,255,255,0.6)` con gap 10.
- **Bottom row:** `1px solid rgba(255,255,255,0.08)` + span `label-xs` UPPERCASE: `© 2026 RIGMA GROUP · TODOS LOS DERECHOS RESERVADOS`.
- Íconos de contacto (WhatsApp): SVG stroke fino monocromático, color `rgba(255,255,255,0.5)`.

### SectionLabel (numeración editorial)
- Layout horizontal: `[01] ─ KICKER`.
- `label-sm` UPPERCASE (Montserrat 11, peso 500, letterSpacing 0.12em), color `muted`.
- Separador: rect 24×1 color `line2`.
- En sección oscura: wrap en `<div style={{ color: 'rgba(255,255,255,0.7)' }}>` para heredar transparencia.
- Prop `align`: `left` (default) o `center`.

### ContactCTA / Bloque de contacto
- Dos variantes definidas:
  - **Variante A — emocional:** sección oscura, display-xl, input subrayado simple, fila inferior con datos de contacto.
  - **Variante B — formulario completo (implementada en Ficha y Proyectos):** columna centrada `maxWidth: 640`, SectionLabel + h2 (fontSize 30, peso 700), seguido del formulario completo. Ver sección *Form fields* para el detalle de campos y estilos.
- En ambas, el footer se mantiene como sección separada después.

---

## Componentes reutilizables

### Card de proyecto — overlay con jerarquía LG / MD (`ProyectosGrid`)

**Grilla:** `repeat(6, 1fr)`, gap 16. Proyectos En Ejecución siempre ordenados primero.

**Tamaño LG** (proyectos En Ejecución, salvo filtro "Terminados"):
- `gridColumn: 'span 3'` → 2 cards por fila en grilla de 6 cols.
- `height: 460px` (sin aspectRatio).

**Tamaño MD** (proyectos Terminados, o todos cuando el filtro es "Terminados"):
- `gridColumn: 'span 2'` → 3 cards por fila en grilla de 6 cols.
- `aspectRatio: '4/5'` (sin height fija).

**Comportamiento por filtro:**
- `Todos` → LG (span 3) primero + MD (span 2) debajo. Fila 1: 2 En Ejecución. Fila 2: 3 Terminados.
- `En ejecución` → todos LG (span 3) → 2 por fila pareja.
- `Terminados` → todos MD (span 2) → 3 por fila pareja.

**Anatomía de cada card (overlay):**
- `position: relative`, `overflow: hidden`, cursor pointer.
- **Placeholder** rayado como fondo absoluto `inset: 0`.
- **Gradiente overlay** de abajo hacia arriba: `rgba(23,23,23,0.80-0.82)` → transparente.
- **Contenido** sobre overlay (absoluto, `bottom: 0`), padding `48 36` (LG) / `20 20` (MD):
  - `StatusPill` con prop `dark={true}` (border blanco semitransparente).
  - Nombre del proyecto: Montserrat, uppercase, peso 700 (LG: 48px) / peso 600 (MD: 18px), color blanco.
  - Ubicación: `label-xs` UPPERCASE, `rgba(255,255,255,0.6)`.
  - CTA `VER PROYECTO →`: Montserrat 10px, peso 700, tracking 0.12em, blanco, borderBottom `rgba(255,255,255,0.4)`.

### Project Row — variante lista editorial (`ProyectosLista`)
- Grid: `60px 1.5fr 1fr 80px 140px 40px`. Gap 24, padding `28 0`, border-bottom 1px line.
- Columnas:
  1. Numeración `label-md` UPPERCASE muted (`01`, `02`...).
  2. Nombre `heading-md` (Montserrat 32, peso 600, letterSpacing -0.015em).
  3. Ubicación `ui-md` ink2.
  4. Año `label-md` UPPERCASE muted.
  5. Status `label-xs` UPPERCASE con bullet `●`.
  6. Flecha → 18 muted alineada a la derecha.
- Por debajo de la lista: grilla de 4 thumbs `ratio="4/3"` como soporte visual, gap 16, marginTop 56.

### Stats Block (Nosotros A)
- 2×2 grid con bordes internos. Padding por celda `40 × 32`.
- **Número:** `display-sm` (Montserrat 56, peso 700, lineHeight 1, letterSpacing -0.02em), color `ink`.
- **Label:** `label-sm` UPPERCASE (Montserrat 11, peso 500, letterSpacing 0.10em), color `muted`, marginTop 12.
- Bordes: `borderRight` en columna izquierda (índices pares), `borderBottom` en filas superiores (índices < 2).
- **Métricas (datos reales del cliente — fuente: `CLAUDE.md → Métricas destacadas`):**
  | Número      | Label                       |
  |-------------|-----------------------------|
  | `+32.000`   | `M² CONSTRUIDOS`            |
  | `+220`      | `UNIDADES FUNCIONALES`      |
  | `+3`        | `GENERACIONES DE TRAYECTORIA` |
  | `2016`      | `AÑO DE FUNDACIÓN`          |

### Pilares — `Por qué (A)` (claro, 4 cols)
- 4 columnas, gap 32, border-top + paddingTop 32.
- Marca geométrica (32×32 px) por pilar — hay 4 formas predefinidas en el código: cuadrado, círculo, rombo (cuadrado rotado 45°), cuadrado lleno. Margin-bottom de la marca: 32.
- Título: `heading-xs` (Montserrat 24, peso 700, letterSpacing -0.005em), marginBottom 12.
- Descripción: `ui-md` muted, lineHeight 1.6.

### Pilares — `Por qué (B)` (oscuro, 2 cols numerado)
- Grid 2 cols, gap 64. Cada pilar es a su vez grid `80px 1fr` gap 24, paddingTop 32, border-top `rgba(255,255,255,0.15)`.
- **Número grande:** `display-md` (Montserrat 64, peso 700), color `rgba(255,255,255,0.6)`.
- Título: `heading-sm` (Montserrat 28, peso 600, letterSpacing -0.01em).
- Descripción: `body-xs` (Montserrat 14, peso 400, lineHeight 1.6), `rgba(255,255,255,0.7)`.

### Testimonial Card
- Padding `40 × 32`, bg `bg`, border 1px line.
- **Comilla decorativa:** carácter `"` Montserrat 48, peso 700, lineHeight 0.5, color `line2`, height fija 24, marginBottom 16.
- **Quote:** `quote` (Montserrat 20, peso 400, italic, lineHeight 1.5), color `ink`. El italic le da el tono editorial sin necesidad de cambiar de familia.
- **Footer del card:** padding-top 20 + border-top line. Avatar circular 36×36 placeholder (`line` bg) + nombre `ui-md` peso 500 + sub `label-sm` UPPERCASE muted (proyecto asociado).

### Form fields
Patrón único para todos los formularios del sitio. **No usar `<Placeholder>` para campos de formulario** — usar elementos HTML reales con los estilos a continuación.

**`fieldStyle` (aplicar a `input`, `select`, `textarea`):**
```js
{
  width: '100%', padding: '12px 14px',
  fontSize: 13, fontWeight: 400, color: t.ink,
  background: t.bg, border: `1px solid ${t.line2}`,
  borderRadius: 2, appearance: 'none',
}
```

**`labelStyle` (aplicar a `<label>`):**  
`label-2xs` — Montserrat 9px, peso 700, letterSpacing 0.14em, UPPERCASE, color `muted`, marginBottom 8.

- **Input texto:** `<input type="text" placeholder="..." style={fieldStyle} readOnly />`
- **Input email:** `<input type="email" placeholder="nombre@email.com" style={fieldStyle} readOnly />`
- **Select:** `<select style={{ ...fieldStyle, color: t.ink }}>` con primera `<option disabled>` como placeholder
- **Textarea:** `<textarea rows={4} style={{ ...fieldStyle, resize: 'vertical' }} readOnly />`
- **Submit:** `width: 100%`, padding `16px`, Montserrat 11px peso 700 letterSpacing 0.14em UPPERCASE, bg `ink`, color blanco, borderRadius 2, marginTop 8. Copy: `ENVIAR CONSULTA`

**Layout del bloque de contacto con formulario:**
- Sección: `padding: 96px 56px`, borderTop `1px line`
- Contenedor centrado: `maxWidth: 640, margin: '0 auto'`
- SectionLabel + h2 (fontSize 30, peso 700), marginBottom 48
- Campos en `flexDirection: column, gap: 24`
- Fila Nombre + Celular: `grid 1fr 1fr, gap: 16`
- Selector de proyecto incluye siempre las 3 opciones reales + "Otro / No sé aún"
- Pre-seleccionar proyecto solo cuando el formulario es específico de una ficha de proyecto

**Variante inline (Contacto A):** input + botón sobre un mismo `borderBottom` blanco transparente. Sin label, placeholder muteado (`tu@email.com`).

### CTA links / botones inline
- **Link CTA con underline:** `ui-md` peso 500, color `ink`, `borderBottom: 1px ink`, paddingBottom 2. Ej: `Ver proyectos`, `Conocer más →`.
- **Link CTA secundario:** `ui-md` muted, sin border. Ej: `Contactarnos`.
- **Botón sólido sobre claro:** bg `ink` o blanco según contexto, padding `14 × 24`, `ui-md` peso 500, sin borderRadius.
- **Botón outline:** transparente con border `rgba(255,255,255,0.4)` (en oscuro) o border `ink` (en claro).

### Status pill
- `label-xs` UPPERCASE (Montserrat 10, peso 600, letterSpacing 0.10em), padding `4 × 8`, border 1px.
- Estados:
  - `EN EJECUCIÓN` — color + border `ink`.
  - `TERMINADO` — color `muted`, border `line2`.
- En lista editorial (variante B) la pill se reemplaza por bullet textual `● {STATUS}` sin border.

### Carrusel indicator (Hero A)
- Fila de 4 segmentos. Activo: 32×2 px blanco; inactivo: 8×2 px `rgba(255,255,255,0.4)`.
- A la derecha del set, label `label-sm` UPPERCASE letterSpacing 0.10em opacidad 0.7: `AUTO · 6S`.

### PlanosList (acordeón por tipología + modal)
- Acordeón: cada grupo tipológico tiene una cabecera clicable (nombre + sublabel + chevron). Solo un grupo abierto a la vez.
- **Grupos tipológicos estándar:** Monoambiente · 2 ambientes · 3 ambientes (o los que apliquen al proyecto).
- **Cabecera:** nombre `body-sm` peso 600 ink + sublabel `ui-sm` muted + chevron SVG que rota 180° al abrir. Border-bottom `1px line`. Cursor pointer.
- **Contenido expandido:** fila horizontal de thumbnails con gap 16, padding `28 0 32`.
  - **Thumbnail:** 180×128 px, placeholder rayado con `label="plano"`, border `1px line`, borderRadius 2.
  - Debajo: `ui-sm` peso 600 ink (nombre de unidad) + `label-xs` muted (m²).
  - Cursor `zoom-in`.
- **Modal al click en thumbnail:**
  - Overlay oscuro `rgba(23,23,23,0.78)`, click fuera cierra.
  - Panel: bg `bg`, padding 48, maxWidth 680, `position: relative`.
  - **X de cierre:** botón absoluto `top: 16, right: 16`, 32×32, border `1px line`, `×` en `ui-md` muted.
  - Placeholder grande: height 420, label canónico `plano · {tipologia} {variante}`.
  - Footer del modal: nombre `body-md` peso 700 + sublabel `ui-sm` muted | botón `DESCARGAR PDF` outline.

### LocationBlock (mapa + puntos de interés)
- Grid `1fr 380px`, gap 64, padding `80 × 56`, bg `surface`, border-top `1px line`.
- **Columna izquierda — Mapa:** placeholder rayado `aspect-ratio: 4/3`, border `1px line`. Label canónico: `mapa · {dirección}, {barrio}, {ciudad}`.
- **Columna derecha — Info:**
  - Título `body-md` peso 700 ink (ej: `Mataderos, Ciudad de Buenos Aires`).
  - Párrafo introductorio `body-sm` peso 300 ink2, marginBottom 32, max 3 líneas.
  - Lista de 4 puntos máximo. Cada punto: icono SVG stroke (28×28, strokeWidth 1.4, color `ink2`) + texto `body-sm` ink2.
  - **Íconos disponibles para POIs:** `transport`, `health`, `education`, `commerce`.
- El embed real de Google Maps reemplaza al placeholder en alta fidelidad.

---

## Componentes específicos de Ficha de Proyecto

> Componentes que aparecen en `/proyectos/[slug]`. Razones de diseño en [wireframes-decisions.md → 3.1](wireframes-decisions.md).

### KeyDataStrip (info clave bajo el hero)
- Fila horizontal a sangre con 4-5 datos primarios del proyecto.
- Layout: `display: flex` con `justify-content: space-between`, padding `40 × 56`, border-bottom `1px line`.
- Cada celda es un par **label + valor**:
  - Label arriba: `label-sm` UPPERCASE muted (`ESTADO`, `UBICACIÓN`, `ENTREGA`, `UNIDADES DISPONIBLES`, `M² CONSTRUIBLES`).
  - Valor abajo: `heading-xs` peso 700 ink, marginTop 8.
- Separador entre celdas: 1px vertical line, altura completa, color `line`.
- **Para `En Ejecución`:** una de las celdas debe ser `AVANCE DE OBRA` con valor formato `60%`.
- **Para `Terminado`:** la celda equivalente es `ENTREGADO` con el año.
- Ejemplo Cosquín 1534:
  | ESTADO       | UBICACIÓN | ENTREGA      | UNIDADES DISPONIBLES | AVANCE DE OBRA |
  |--------------|-----------|--------------|----------------------|----------------|
  | En Ejecución | Mataderos | Diciembre 2026 | 4 de 8             | 60%            |

### FichaTecnica (bloque técnico extendido)
- Aparece después de la descripción, antes de la galería.
- `SectionLabel` arriba (`05 · FICHA TÉCNICA` o el número que corresponda).
- Grid de 2 columnas, gap 96, padding `120 × 56`:
  - **Columna izquierda — Tipologías:** lista de items con divider entre cada uno. Cada item:
    - Nombre tipología (`heading-md`, peso 600).
    - Datos de la unidad (`label-sm` UPPERCASE muted): `4 AMBIENTES · 112 M² · DISPONIBLE` o `4 AMBIENTES · 113 M² + 9 M² TERRAZA · DISPONIBLE`.
  - **Columna derecha — Amenities y servicios:** lista vertical sin bullets, cada item `body-sm` ink2 con padding-bottom 12 y border-bottom 1px line. Ejemplos: `Cocheras (se venden por separado)`, `Terrazas verdes`, `Puertas Pentágono`, `Piso radiante`.
- Si hay datos extra que no encajan (ej. financiación, condiciones especiales): se suman como una tercera fila a sangre con `label-sm` UPPERCASE muted + `body-md`.

### GaleriaAsimetrica
- Grid CSS con 1 imagen "héroe" grande arriba + 4-6 thumbs abajo.
- Estructura:
  - **Toma héroe:** `aspect-ratio: 16/9`, ancho 100% del container.
  - **Thumbs row:** grid `repeat(4, 1fr)` (o `repeat(6, 1fr)` si hay 6), `aspect-ratio: 4/3`, gap 12.
- Padding del bloque: `120 × 56`. Gap vertical entre héroe y thumbs: 12.
- `SectionLabel` arriba, opcional `quote` o body corto a la derecha (ej. `04 · RENDERS DEL PROYECTO`).
- **Regla de contenido (decisión 3.1.2):**
  - Si `project.status === 'En Ejecución'` → label de placeholders `render · {nombre} · {detalle}`.
  - Si `project.status === 'Terminado'` → label de placeholders `foto · {nombre} · {detalle}`.
  - **Nunca mezclar** los dos tipos en la misma galería.
- **Lightbox (click en imagen o en "Ver galería completa"):** overlay oscuro `rgba(0,0,0,0.92)` a pantalla completa con:
  - Placeholder grande centrado (max-width ~900, height ~70vh), label `render · {nombre}` debajo en blanco muted.
  - Flechas prev/next SVG stroke blanco, posicionadas en los bordes verticales del overlay.
  - Contador de posición `"3 / 5"` en `label-xs` blanco opacidad 0.6, arriba a la izquierda.
  - X de cierre en esquina superior derecha — mismo estilo que el modal de PlanosList (40×40, border `rgba(255,255,255,0.2)`).
  - Click fuera de la imagen (en el overlay) también cierra.
  - Botón "Ver galería completa" en la grilla → abre lightbox en el índice 0.

### PlanosList
- Sección dedicada (no es parte de la galería).
- `SectionLabel` arriba (`05 · PLANTA Y TIPOLOGÍAS`).
- Grid horizontal con 1 thumb de planta tipo del edificio + 1 thumb por tipología:
  - **Thumb planta tipo:** ancho doble, `aspect-ratio: 16/10`. Label en cápsula: `planta tipo · piso completo`.
  - **Thumbs por tipología:** `aspect-ratio: 4/3`, ancho normal. Cada uno con label estructurado:
    - `label-sm` UPPERCASE muted: tipo de unidad (`TIPOLOGÍA A`, `TIPOLOGÍA B`...).
    - `heading-xs` ink: m² + ambientes (`112 M² · 4 AMBIENTES`).
- Click en cualquier thumb → modal con plano alta resolución + datos completos de la tipología.
- Para Cosquín 1534: 1 planta tipo + 4 tipologías (2×112m², 1×120m², 1×113m²+9m² terraza).

### LocationBlock (ubicación con placeholder de mapa)
- Grid 2 columnas, gap 48, padding `120 × 56`.
- **Columna izquierda — Mapa placeholder:**
  - Placeholder rayado, `aspect-ratio: 4/3`.
  - Label en cápsula: `mapa · {dirección completa}` (ej. `mapa · cosquín 1534, mataderos`).
- **Columna derecha — POIs cercanos:**
  - `SectionLabel` arriba (`07 · UBICACIÓN`).
  - Dirección completa en `heading-sm` peso 600.
  - Lista vertical de 4-6 puntos de interés cercanos. Cada item:
    - `label-sm` UPPERCASE: `5 MIN · ESTACIÓN MATADEROS`, `8 MIN · MERCADO CENTRAL`, `12 MIN · ACCESO RICCHIERI`.
    - Padding-bottom 12, border-bottom 1px line.
- Embed real de Google Maps reemplaza al placeholder en alta fidelidad (no en wireframe).

### NextProjectCard (siguiente proyecto a sangre)
- Bloque casi a pantalla completa al final de la ficha (antes del bloque de contacto).
- Layout: `position: relative`, altura mínima 600 px, sin padding lateral.
- **Imagen de fondo:** placeholder rayado (`render` o `foto` según status del *siguiente* proyecto, no del actual).
- **Overlay:** gradiente `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.65))`.
- **Contenido sobre el overlay** (color blanco, padding `80 × 56`):
  - Arriba a la izquierda: `label-sm` UPPERCASE opacidad 0.8 → `08 · SIGUIENTE PROYECTO`.
  - Centro: `display-md` peso 700 (Montserrat 64, letterSpacing -0.02em) — nombre del siguiente proyecto.
  - Línea inmediata bajo el nombre: `label-md` UPPERCASE opacidad 0.85 → `{UBICACIÓN} · {ESTADO}`.
  - CTA inferior: link con underline blanco, `ui-md` peso 500, copy `Ver proyecto →`.
- **Lógica de selección del siguiente** (no es UI, es contenido — vive en el data layer):
  - Si actual = `En Ejecución` → siguiente también `En Ejecución`.
  - Si actual = `Terminado` → siguiente preferentemente `En Ejecución`.

---

## Patrones de placeholder

### Placeholder de imagen
- Patrón: `repeating-linear-gradient(135deg, base 0 14px, stripe 14px 15px)`. Se mantiene — comunica de inmediato "esto es placeholder, no contenido final" sin riesgo de que el cliente lo confunda con un diseño cerrado.
- Light: base `surface2` (#f5f5f5), stripe `rgba(0,0,0,0.045)`.
- Dark: base `#1f1f1f`, stripe `rgba(255,255,255,0.06)`.
- Border: 1px line (claro) o `rgba(255,255,255,0.1)` (oscuro).
- **Label en cápsula central:**
  - `label-sm` lowercase (Montserrat 11, peso 500, letterSpacing 0.04em). Excepción al patrón de UPPERCASE — acá la minúscula refuerza el "esto es nota técnica del wireframe".
  - Padding `4 × 8`, background `rgba(255,255,255,0.85)` (claro) o `rgba(0,0,0,0.4)` (oscuro).
- Convención de naming del label: descripción concreta y minúsculas. Usar nombres reales de proyecto (ver tabla en *Anotaciones de copy y datos*).
  - ✅ `render · cosquín 1534`
  - ✅ `render · av. larrazábal 1255`
  - ✅ `foto · oficina / equipo / obra`
  - ❌ `image`, `placeholder`, `IMG_001`, `edificio lacroze`

### Placeholder de avatar
- Círculo 36×36 con background `line` (#e5e5e5). Sin label.

### Placeholder de mapa
- Mismo patrón rayado diagonal. Aspect ratio: **4/3**.
- Label canónico (lowercase con punto medio): `mapa · {dirección}, {barrio}, {ciudad}` — ej: `mapa · cosquín 1534, mataderos, caba`.
- En alta fidelidad se reemplaza por embed real de Google Maps con styled map neutro.

### Placeholder de plano
- Mismo patrón rayado diagonal. Dimensiones: **180×128 px en miniatura**, **height 420 en modal**.
- Label canónico (lowercase con punto medio): `plano · {tipologia} {variante}` — ej: `plano · monoambiente a`, `plano · 2 ambientes b`.
- En alta fidelidad se reemplaza por la imagen vectorial del plano provista por el cliente.

### Anotaciones de copy y datos

#### Proyectos
Los wireframes usan los nombres reales de Rigma. Lista canónica para usar en cualquier pantalla nueva:

| #  | Nombre              | Ubicación  | Estado          | Año / Entrega    | Origen              |
|----|---------------------|------------|------------------|------------------|---------------------|
| 01 | Cosquín 1534        | Mataderos  | En Ejecución    | Entrega Dic 2026 | Real (cliente)      |
| 02 | Av. Larrazábal 1255 | Mataderos  | TBD             | TBD              | Real (cliente)      |
| 03 | Zelada 6171         | TBD        | Terminado       | Entregado 2025   | Real (cliente)      |
| 04 | _(pendiente)_       | _(TBD)_    | _(TBD)_         | _(TBD)_          | Pendiente del cliente |
| 05 | Murguiondo 2034     | Mataderos  | Terminado       | 2024             | **Filler plausible** |
| 06 | Cafayate 1820       | Mataderos  | Terminado       | 2023             | **Filler plausible** |

Reglas:
- Los reales (01–03) son los que va a vender el cliente — usarlos siempre que sea posible.
- El 04 va vacío hasta que el cliente entregue info.
- Los filler (05–06) solo se usan cuando una grilla amplia (ej. listado completo de Proyectos) necesita más cards de las que tenemos. **Siempre marcarlos como filler en el código** (comentario `// filler` o prop `mock={true}`).
- Si en el wireframe aparece un proyecto que no está en esta tabla, primero sumarlo acá.

#### Texto descriptivo
- Se prefieren placeholders realistas (frases en español del rubro inmobiliario argentino). No usar Lorem ipsum puro en bloques visibles al cliente — sí en cards repetidos donde el contenido se sobreentiende.
- Tono español rioplatense, formal pero cercano (ver `CLAUDE.md → Tono de comunicación`).

#### Métricas
- Los stats reales viven en `CLAUDE.md → Métricas destacadas`. Cualquier bloque que muestre números agregados (Stats Block, hero institucional, footer) usa esos valores — no inventar.

---

## Convenciones de naming en código

- **Variantes A / B** se manejan con prop `variant` en cada sección. La home soporta orden y visibilidad independientes por variante (ver `home-variations.jsx → SECTION_REGISTRY`).
- **Reorderable keys:** `['hero', 'proyectos', 'nosotros', 'porque', 'testimonios', 'contacto']`. `nav` siempre primero, `footer` siempre último.
- **Tokens del sistema** (objeto `G` en código): `bg`, `ink`, `ink2`, `muted`, `line`, `line2`, `surface`, `surface2`, `font` (única, Montserrat). Cuando se traduzca a Tailwind / CSS vars en alta fidelidad, mantener estos nombres como referencia semántica.
- **Si el código heredado de Claude Design todavía tiene `serif` y `mono` en `G`,** se reemplazan por la familia única en cada commit que toque el archivo — no se deja deuda mezclada.

---

## Reglas de extensión

> Estas reglas aplican mientras estamos en fase de wireframe. Una vez aprobada la fase B y avanzando a alta fidelidad, este archivo se congela y la fuente de verdad pasa a `design-system.md`.

1. **Reusar antes de crear.** Cuando se sume una pantalla nueva (Proyectos, Ficha, Nosotros, Contacto), primero revisar si los componentes existentes ya cubren la necesidad. La mayoría de las nuevas pantallas se resuelve con: NavBar + SectionLabel + Card de proyecto + Stats Block + Pilares + Form fields + Footer.

2. **Nuevo componente solo si ningún existente alcanza.** No duplicar variantes que difieran solo en padding o tamaño — primero intentar parametrizar el componente actual.

3. **Documentar antes de commit.** Cuando se cree un componente nuevo, sumarlo a este archivo (sección *Componentes reutilizables*) **antes** de hacer commit, con: anatomía, props, casos de uso y un mini ejemplo si aplica.

4. **Respetar la escala tipográfica y de espaciado.** No introducir tamaños fuera de las escalas listadas — si hace falta uno nuevo, primero discutirlo y agregarlo a la tabla.

5. **Mantener neutralidad cromática.** En wireframe está prohibido introducir color de marca, sombras o gradientes ornamentales. Solo se permiten los gradientes ya definidos para overlay sobre placeholders dark.

6. **Placeholders con label descriptivo.** Todo placeholder debe llevar label en lowercase mono describiendo qué representa (`render · {proyecto}`, `foto · {contexto}`, `plano · {unidad}`). Nunca dejar un placeholder sin label.

7. **Ante una decisión que afecte a múltiples pantallas,** anotarla acá Y en el `CLAUDE.md` de proyecto antes de seguir construyendo wireframes.

---

## Pendientes / a definir cuando se sumen pantallas nuevas

- [x] ~~Patrón de **planos**~~ — resuelto 8/5/2026 (rayado con label `plano · {tipología}`).
- [x] ~~Patrón de **mapa**~~ — resuelto 8/5/2026 (rayado con label `mapa · {dirección}`).
- [x] ~~**Filtros / tabs** (página Proyectos): definir estados (activo, hover) y separador~~ — resuelto 10/5/2026. Tabs horizontales con border-bottom 2px activo (`ink`) / inactivo (transparente). Label `label-sm` UPPERCASE, gap 40. Implementado en `proyectos.html`.
- [x] ~~**Modal de planos**~~ — resuelto 9/5/2026. Ver `PlanosList` en este archivo y decisión 2.9.
- [ ] **Lightbox de galería** (GaleriaAsimetrica): documentado en system (spec completo), pendiente de implementación en `ficha-proyecto.html`.
- [ ] **Grilla mobile** y reglas responsive: se definen en alta fidelidad.
- [ ] **Iconografía** de pilares: hoy son 4 formas geométricas; cuando entre alta fidelidad, decidir si se reemplazan por iconos de stroke (estilo cartel de obra) o se mantienen.
- [ ] **Paleta de marca y tipografía definitiva** → `design-system.md` (Montserrat es solo la elección de wireframe).

---

## Referencias

- **Decisiones y justificación:** [wireframes-decisions.md](wireframes-decisions.md) — el "por qué" detrás de cada decisión documentada acá.
- **Wireframes Home (Variante A y B):** generados con Claude Design — bundle exportado el 7/5/2026. Archivos clave: `Home Wireframes.html` + `home-variations.jsx`.
- **Sitemap:** [sitemap/Rigma-group-sitemap.csv](sitemap/Rigma-group-sitemap.csv) — fuente de verdad de bloques por página.
- **Contexto de proyecto:** [CLAUDE.md](CLAUDE.md) — métricas, contacto, proyectos, stack técnico, identidad de marca.
- **Cartel de obra de Rigma:** referencia tipográfica para la decisión sans-only — ver `wireframes-decisions.md → 2.6`.
