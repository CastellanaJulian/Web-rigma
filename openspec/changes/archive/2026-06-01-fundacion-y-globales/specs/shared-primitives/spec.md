## ADDED Requirements

### Requirement: Componente Logo

El sistema SHALL tener un componente `Logo` que renderiza el logotipo de Rigma (cuadrado con "RIG" / "MA" en dos líneas, borde fino). Acepta props `size` (número, px) y `color` (string CSS). Por defecto: `size=40`, `color=ink`.

#### Scenario: Logo en navbar (dark)

- **WHEN** el Navbar renderiza `<Logo color="#ffffff" />`
- **THEN** aparece el logo en blanco para el fondo oscuro

#### Scenario: Logo escala proporcionalmente

- **WHEN** se pasa `size={56}`
- **THEN** el logo mantiene proporciones cuadradas y el texto escala acorde

### Requirement: Componente Btn

El sistema SHALL tener un componente `Btn` con variantes `primary` y `secondary`. `primary`: fondo blanco, texto ink, hover con fondo accent. `secondary`: fondo transparente, borde blanco/30, texto blanco, hover fondo blanco/10. Acepta `variant`, `children`, `href` (si es link) y `onClick`.

#### Scenario: Btn primary muestra hover

- **WHEN** el usuario hace hover sobre un `<Btn variant="primary">`
- **THEN** el fondo cambia a accent (`#B59969`) con transición suave

#### Scenario: Btn como link de navegación

- **WHEN** se pasa `href="/contacto"` al Btn
- **THEN** se renderiza como `<Link>` de Next.js, no como `<button>`

### Requirement: Componente SectionLabel

El sistema SHALL tener un componente `SectionLabel` que renderiza una etiqueta de sección con una línea decorativa dorada a la izquierda. Texto en Montserrat 600, 10px, uppercase, letter-spacing 0.2em. Acepta prop `dark` (boolean) para versión sobre fondos oscuros.

#### Scenario: SectionLabel en fondo claro

- **WHEN** `<SectionLabel>PROYECTOS</SectionLabel>` (sin prop dark)
- **THEN** texto color `textSecondary`, línea color `accent`

#### Scenario: SectionLabel en fondo oscuro

- **WHEN** `<SectionLabel dark>PROYECTOS</SectionLabel>`
- **THEN** texto color `onDarkSecondary` (blanco/65), línea color `accent`

### Requirement: Componente StatusPill

El sistema SHALL tener un componente `StatusPill` que renderiza el estado de un proyecto como una pastilla con punto indicador. Estados posibles: `'En Ejecución'` (punto accent) y `'Terminado'` (punto gris). Acepta prop `dark` (boolean) para versión sobre fondos oscuros.

#### Scenario: StatusPill En Ejecución

- **WHEN** `<StatusPill status="En Ejecución" />`
- **THEN** muestra punto dorado (accent) + texto "EN EJECUCIÓN"

#### Scenario: StatusPill Terminado

- **WHEN** `<StatusPill status="Terminado" />`
- **THEN** muestra punto gris + texto "TERMINADO"
