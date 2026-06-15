## ADDED Requirements

### Requirement: Singleton homePage con hero y pilares
El schema `homePage` SHALL ser un documento singleton (forzado desde `structure.ts` con documentId fijo) con los campos: `heroTitulo` (string), `heroSubtitulo` (text), y `pilares` (array de exactamente 4 objetos con `titulo` y `descripcion`).

#### Scenario: Un único documento editable
- **WHEN** el cliente accede a "Inicio" en el Studio
- **THEN** ve directamente el formulario de edición (sin lista, es singleton)

### Requirement: Validación de pilares exactamente 4
El campo `pilares` SHALL tener `validation: r.min(4).max(4)`. Cada pilar SHALL tener `titulo` (string, required) y `descripcion` (text, required).

#### Scenario: Cliente intenta publicar con menos de 4 pilares
- **WHEN** el cliente elimina un pilar del array
- **THEN** Sanity muestra error de validación y bloquea la publicación

### Requirement: HeroCarousel lee título y subtítulo desde homePage
El componente `HeroCarousel` SHALL recibir `heroTitulo` y `heroSubtitulo` como props y renderizarlos. Si alguno viene vacío o undefined, SHALL usar el texto hardcodeado actual como fallback.

#### Scenario: Contenido cargado en Sanity
- **WHEN** `homePage.heroTitulo` tiene valor en Sanity
- **THEN** el hero muestra ese título en lugar del texto hardcodeado

#### Scenario: Sanity sin contenido (fallback)
- **WHEN** `homePage` no existe o `heroTitulo` está vacío
- **THEN** el hero muestra "Construimos espacios que perduran" (fallback hardcodeado)

### Requirement: PorQueSection lee pilares desde homePage
El componente `PorQueSection` SHALL recibir `pilares[]` como prop. Los íconos SHALL permanecer hardcodeados por índice de posición (0→medal, 1→calendar, 2→trending, 3→grid). Si `pilares` viene vacío o undefined, SHALL usar el array hardcodeado actual como fallback.

#### Scenario: Pilares cargados desde Sanity
- **WHEN** `homePage.pilares` tiene 4 elementos
- **THEN** la sección muestra los títulos y descripciones de Sanity con los íconos correspondientes por posición

#### Scenario: Fallback cuando Sanity no tiene pilares
- **WHEN** `homePage.pilares` está vacío o undefined
- **THEN** la sección muestra los 4 pilares hardcodeados actuales
