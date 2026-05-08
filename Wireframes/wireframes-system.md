# Wireframes — Sistema visual y de componentes

> Fuente de verdad estructural durante la fase B (wireframes).
> Documenta el sistema visual y de componentes para mantener coherencia entre pantallas.
> Última actualización: 7 de mayo 2026

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
| `heading-xs`  | 24     | 700  | 1.0         | 0.02em         | Logotipo en navbar (`RIGMA` UPPERCASE) / título de pilar (A).|
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

### NavBar
- Layout: `space-between` entre logo, nav links, CTA pill.
- Padding `24 × 56`. Border-bottom `1px line`.
- **Logo:** `heading-xs` UPPERCASE (Montserrat 24, peso 700, letterSpacing 0.02em). Copy `RIGMA` — caja gráfica al estilo del cartel.
- **Nav links:** `ui-md` (Montserrat 13, peso 500), gap 36px. Estado activo: color `ink`. Resto: `ink2`.
- **CTA pill:** `label-md` UPPERCASE (Montserrat 12, peso 500, letterSpacing 0.10em), padding `8 × 14`, border 1px line, borderRadius 999. Copy `HABLEMOS →`.
- **Variante `dark={true}`:** texto blanco, line `rgba(255,255,255,0.15)`, muted `rgba(255,255,255,0.65)`. Misma estructura.

### Footer
- Padding `64 / 56 / 32`. Background `surface`. Top border `1px line`.
- Grid de 4 columnas: `2fr 1fr 1fr 1fr`, gap 48.
- **Columna 1:** logo `heading-lg` (Montserrat 36, peso 700, UPPERCASE `RIGMA`) + bajada `ui-md` muted (max-width 280, line-height 1.6).
- **Columnas 2–4:** título `label-sm UPPERCASE` (Montserrat 11, peso 500, letterSpacing 0.10em) → lista de items `ui-md` color `ink2` con gap 8.
- **Bottom row:** separator + 2 spans `label-sm` UPPERCASE: `© 2026 RIGMA GROUP` y `BUENOS AIRES · ARGENTINA`.

### SectionLabel (numeración editorial)
- Layout horizontal: `[01] ─ KICKER`.
- `label-sm` UPPERCASE (Montserrat 11, peso 500, letterSpacing 0.12em), color `muted`.
- Separador: rect 24×1 color `line2`.
- En sección oscura: wrap en `<div style={{ color: 'rgba(255,255,255,0.7)' }}>` para heredar transparencia.
- Prop `align`: `left` (default) o `center`.

### ContactCTA / Bloque de contacto
- Dos variantes ya definidas:
  - **Variante A — emocional:** sección oscura, display-xl, input subrayado simple, fila inferior con datos de contacto en mono.
  - **Variante B — formulario completo:** split 1fr/1fr, lado izquierdo con título + tabla de datos, lado derecho con form completo (incluye `select` de proyecto de interés).
- En ambas, el footer se mantiene como sección separada después.

---

## Componentes reutilizables

### Card de proyecto — variante grilla (`ProyectosGrid`)
- Aspect ratio del placeholder: `4/5`.
- Margin del placeholder al meta: 14 px.
- Bottom row: flex `space-between` con dos columnas:
  - Izquierda: `card-title` (Montserrat 18, peso 600) + `ui-sm` muted (location).
  - Derecha: status pill `label-xs` UPPERCASE, padding `4 × 8`, border 1px. Color depende del estado:
    - `EN EJECUCIÓN` → border + texto `ink`.
    - `TERMINADO` → border `line2` + texto `muted`.

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
- **Label:** `label-sm` UPPERCASE (Montserrat 11, peso 500, letterSpacing 0.10em), marginBottom 8.
- **Input texto:** solo borderBottom `1px line2`, height 28 (estilo línea minimal).
- **Select:** border completo 1px line2, padding `10 × 14`, fontSize 13, indica con chevron `▾` a la derecha.
- **Textarea:** border completo 1px line2, height 96.
- **Submit:** background `ink`, color blanco, padding `14 × 24`, `ui-md` peso 500, sin borderRadius. Copy en UPPERCASE: `ENVIAR CONSULTA →`.
- **Variante inline (Contacto A):** input + botón sobre un mismo `borderBottom` blanco transparente. Sin label, placeholder muteado (`tu@email.com`).

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

### Placeholder de planos / mapas (pendiente)
- Aún no se diseñó — cuando entre la pantalla de Ficha de proyecto, definir si se mantiene el patrón rayado o se introduce una variante (grilla, contornos).

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

- [ ] Patrón de **planos** (Ficha de proyecto): definir si se mantiene rayado o se cambia a línea.
- [ ] Patrón de **mapa** (Ficha de proyecto): placeholder antes de embed real.
- [ ] **Filtros / tabs** (página Proyectos): definir estados (activo, hover) y separador.
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
