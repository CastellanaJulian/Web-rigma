## ADDED Requirements

### Requirement: Navbar fija con logo y links de navegación

El sitio SHALL tener una barra de navegación visible en todas las páginas, con el logo de Rigma a la izquierda y los links `INICIO`, `PROYECTOS`, `NOSOTROS`, `CONTACTO` a la derecha. La barra es `sticky top-0` con fondo semitransparente y blur (glassmorphism sutil).

Especificaciones visuales:
- Altura: 72px
- Fondo: `rgba(251,251,251,0.92)` + `backdrop-filter: blur(8px)`
- Borde inferior: `1px solid` color `line`
- Padding horizontal: 56px en desktop, 24px en mobile
- Links: Montserrat 600, 11px, `letter-spacing: 0.12em`, uppercase
- Link activo: color `ink` + `border-bottom: 1.5px solid accent`
- Link inactivo: color `ink/65` + `border-bottom: 1.5px solid transparent`
- Z-index sobre el contenido

#### Scenario: Link activo refleja la página actual

- **WHEN** el usuario está en `/proyectos`
- **THEN** el link `PROYECTOS` muestra el subrayado dorado (accent) y color `ink` completo

#### Scenario: Navbar visible al hacer scroll

- **WHEN** el usuario hace scroll hacia abajo en cualquier página
- **THEN** la navbar permanece visible en la parte superior (sticky)

### Requirement: Navbar responsive con menú hamburger en mobile

En viewports menores a `md` (768px) la navbar SHALL ocultar los links y mostrar un ícono hamburger. Al presionarlo, se abre un menú que ocupa el ancho completo con los 4 links apilados verticalmente.

#### Scenario: Links ocultos en mobile

- **WHEN** el viewport es menor a 768px
- **THEN** los links de navegación no son visibles; aparece el ícono hamburger

#### Scenario: Menú se abre al presionar hamburger

- **WHEN** el usuario presiona el ícono hamburger
- **THEN** se despliega el menú con los 4 links de navegación visibles

#### Scenario: Menú se cierra al navegar

- **WHEN** el usuario presiona un link del menú mobile
- **THEN** el menú se cierra y el usuario navega a la ruta correspondiente
