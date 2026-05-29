# Rigma Web — Design System (alta fidelidad)

> Reemplaza la paleta y la tipografía mid-fi de `wireframes-system.md`.
> Espaciado, anatomía de componentes, layouts y reglas de extensión se heredan **sin cambios** del system de wireframes.
> Última actualización: 23 de mayo 2026

---

## Fuente del sistema visual

Extraído del **cerco de obra** y la **landing en construcción** live en `rigma.com.ar`. Identidad ya validada por el cliente — esto **extiende**, no propone.

Rasgos clave:

- **Modo claro como base, oscuro como destaque.** El sitio default va en claro; las secciones que requieren peso institucional o emoción (hero, "Por qué elegirnos", contacto, footer) van en oscuro casi negro cálido. La landing actual y el cerco son referencia del lenguaje de las **secciones oscuras**, no del sitio entero.
- **Acento beige como recurso narrativo, no decorativo.** Marca palabras emfatizadas (`GROUP`, `PRÓXIMAMENTE`, `se está`), labels UPPERCASE y separadores. Nunca como texto largo, nunca como fondo.
- **Una sola familia (Montserrat) con jerarquía construida por peso + tamaño + tracking en mayúsculas + italic puntual.** Confirma la decisión 2.6 del wireframes-decisions.

---

## Colores

> Paleta de 5 tokens validada en Figma — fuente de verdad. Los tokens de apoyo (`surface`, `surface-warm`) son utilidades derivadas, no están en la paleta de Figma.

### Paleta primaria (Figma)

| Token          | Hex       | Uso                                                                            |
|----------------|-----------|--------------------------------------------------------------------------------|
| `bg`           | `#FBFBFB` | Fondo base del sitio y color claro de tipografía sobre oscuro.                 |
| `bg-warm`      | `#E3E3E3` | Fondo terciario cálido — secciones de destaque sobre claro (ej. "Por qué elegirnos"). |
| `accent`       | `#B59969` | Acento de marca. Italic editorial, kickers UPPERCASE, dot de status, separadores decorativos, hover de links sobre oscuro. |
| `ink`          | `#1E1E1E` | Texto principal sobre claro. Fondo de secciones destacadas oscuras (hero, contacto, footer). |
| `ink-elevated` | `#353631` | Superficie elevada sobre `ink` — panel de destaque dentro de sección oscura (ref. panel "CONSULTAS" del cerco). Cards, hover states, navbar scroll. |

### Tokens de apoyo (utilidades, no en Figma)

| Token          | Hex       | Uso                                                                            |
|----------------|-----------|--------------------------------------------------------------------------------|
| `surface`      | `#E9E9E9` | Borde/separador sobre `bg`. Cards neutras.                                     |
| `surface-warm` | `#CFC5BC` | Superficie clara cálida para paneles de apoyo.                                 |

**Texto sobre `bg` / claro (default):**

| Nivel        | Valor                       |
|--------------|-----------------------------|
| Primario     | `#1E1E1E`                   |
| Secundario   | `rgba(30,30,30,0.65)`       |
| Terciario    | `rgba(30,30,30,0.45)`       |
| Línea/border | `#E9E9E9`                   |

**Texto sobre `ink` / sección oscura:**

| Nivel        | Valor                       |
|--------------|-----------------------------|
| Primario     | `#FFFFFF`                   |
| Secundario   | `rgba(255,255,255,0.65)`    |
| Terciario    | `rgba(255,255,255,0.45)`    |
| Línea/border | `rgba(255,255,255,0.15)`    |

---

## Tipografía

**Familia única:** Montserrat (Google Fonts).
**Fallback:** `system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif`.

**Pesos cargados:** 300 · 400 · 400 italic · 500 · 600 · 700.

**Uso por peso:**

| Peso             | Uso principal                                                                       |
|------------------|-------------------------------------------------------------------------------------|
| **300 Light**    | Titular hero sobre fondo oscuro (palabra principal). Body terciario sutil.          |
| **400 Regular**  | Body, descripciones, subtítulos.                                                    |
| **400 Italic**   | Palabra emfatizada en titular sobre fondo oscuro, en color `accent`.                |
| **500 Medium**   | Labels UPPERCASE con tracking, nav links, CTAs inline.                              |
| **600 SemiBold** | Nombres de proyecto, subtítulos, énfasis dentro de body.                            |
| **700 Bold**     | Titulares display sobre fondo claro, números de métricas, logotipo.                 |

**Escala de tamaños:** se mantiene la tabla `display-xl` … `label-2xs` de `wireframes-system.md → Sistema tipográfico`. Mismos tokens, mismos line-heights, mismo tracking.

**Patrón de énfasis editorial (canónico, reservado para fondo oscuro):**

> Titular en peso **300** + color blanco. Palabra emfatizada en **italic 400** + color `accent`.
> Ejemplo de la landing: `Algo grande` *(300, blanco)* `se está` *(italic 400, accent)* `construyendo.` *(300, blanco)*

Sobre fondo claro, los titulares van en peso 700 + `ink` (sin italic, sin accent). El patrón editorial es identitario de la sección oscura — usarlo sobre blanco lo desgasta.

---

## Lo que se hereda de `wireframes-system.md`

Sin cambios:

- **Espaciado**: escala 4-base, padding horizontal de página 56, padding vertical de sección 120 (160 en secciones emocionales).
- **Anatomía de componentes**: Logo, NavBar, Footer, SectionLabel, Card de proyecto, Project Row, Stats Block, Pilares, Form fields, PlanosList, LocationBlock, ContactPage.
- **Layouts por pantalla**: estructura validada de los 5 wireframes.
- **Iconografía**: stroke fino estilo Lucide, strokeWidth 1.4 — color `ink` sobre fondo claro, blanco sobre `ink`.
- **Reglas de extensión**: reusar antes de crear, documentar antes de commit, respetar la escala.

---

## Cambios frente a `wireframes-system.md`

| De (wireframe)                   | A (alta fidelidad)                                                            |
|----------------------------------|-------------------------------------------------------------------------------|
| `ink: #171717`                   | `ink: #1E1E1E`                                                                |
| `ink2: #404040`                  | `rgba(30,30,30,0.65)` sobre claro / `rgba(255,255,255,0.65)` sobre `ink`      |
| `muted: #737373`                 | `rgba(30,30,30,0.45)` sobre claro / `rgba(255,255,255,0.45)` sobre `ink` · `accent` cuando es énfasis de marca |
| `line: #e5e5e5`                  | `surface: #E9E9E9` (cumple doble función) · `rgba(255,255,255,0.15)` sobre `ink` |
| `surface: #fafafa`               | `surface: #E9E9E9` o `surface-warm: #CFC5BC` (según sección) · `ink-elevated: #353631` (en oscuro) |
| Sin color de marca               | `accent: #B59969`                                                             |
| Hero overlay con `rgba(0,0,0,X)` | `rgba(30,30,30,X)` para coherencia con `ink`                                  |


