# pagina-nosotros Specification

## Purpose
TBD - created by archiving change diseno-nosotros-html. Update Purpose after archive.
## Requirements
### Requirement: Page header institucional
La página SHALL mostrar un header con SectionLabel "Nosotros", H1 "Tres generaciones. Una forma de construir." en dos líneas (56px/700/letterSpacing -0.025em, maxWidth 680) y párrafo subtítulo descriptivo (16px/300).

#### Scenario: Header visible al cargar
- **WHEN** el usuario navega a /nosotros
- **THEN** ve el H1 en dos líneas y el subtítulo antes del scroll

### Requirement: Sección Historia con imagen panorámica y métricas
La sección Historia SHALL mostrar: una imagen `Img` a lo ancho con aspectRatio 16:6 y objectFit cover, seguida de un grid 2 columnas con texto de historia en la izquierda y las dos métricas (+32.000 m² / +220 UF) en la derecha. Las métricas SHALL usar 56px/700 para el número y 11px uppercase para el label, separadas por un divider `t.line`.

#### Scenario: Imagen panorámica visible
- **WHEN** se carga la sección Historia
- **THEN** se muestra una imagen a todo el ancho con proporción 16:6

#### Scenario: Métricas con tipografía de impacto
- **WHEN** el usuario scrollea a la sección Historia
- **THEN** ve los números +32.000 y +220 en gran tamaño con sus labels

### Requirement: Sección Filosofía en dark con tres pilares
La sección Filosofía SHALL tener fondo `t.ink` y un grid 2 columnas: Placeholder oscuro a la izquierda, y 3 pilares apilados a la derecha separados por `borderBottom: 1px solid t.onDarkLine`. Cada pilar SHALL tener título (20px/600, blanco) y descripción (14px/400, `t.onDarkSecondary`). El copy de los 3 pilares es el confirmado en CLAUDE.md.

#### Scenario: Pilares visibles en dark
- **WHEN** el usuario llega a la sección Filosofía
- **THEN** ve tres pilares con título y descripción sobre fondo oscuro

#### Scenario: Separadores entre pilares
- **WHEN** se renderizan los pilares
- **THEN** hay un divider sutil entre cada pilar excepto después del último

### Requirement: Sección CTA de redirección
La sección SHALL mostrar un H2 (48px/700), párrafo descriptivo y dos CTAs en fila: botón "VER PROYECTOS →" (`background: t.ink`, hover a `t.accent`) y HoverLink "Contactarnos →" (transiciona a `t.accent` al hover).

#### Scenario: Hover en botón VER PROYECTOS
- **WHEN** el usuario hace hover sobre "VER PROYECTOS →"
- **THEN** el fondo cambia a `t.accent`

#### Scenario: Hover en link Contactarnos
- **WHEN** el usuario hace hover sobre "Contactarnos →"
- **THEN** el texto y el underline cambian a `t.accent`

### Requirement: NavBar con ítem activo "NOSOTROS"
La NavBar SHALL marcar "NOSOTROS" como activo con underline `1.5px solid t.accent` y color `t.ink`.

#### Scenario: Estado activo correcto
- **WHEN** se renderiza la página Nosotros
- **THEN** el ítem "NOSOTROS" tiene underline accent y los demás no

