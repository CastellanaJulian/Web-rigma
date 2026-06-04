## ADDED Requirements

### Requirement: Sección Nosotros con texto e imagen en la página de Inicio

La página de Inicio SHALL incluir una sección en dos columnas que presenta la empresa: columna izquierda con `SectionLabel`, título, dos párrafos de texto institucional, estadísticas animadas y link a `/nosotros`; columna derecha con imagen institucional en proporción 4:5.

#### Scenario: Layout de dos columnas en desktop

- **WHEN** el viewport es mayor a `md` (768px)
- **THEN** la sección se muestra en dos columnas de igual ancho con separación de 96px

#### Scenario: Columnas apiladas en mobile

- **WHEN** el viewport es menor a `md` (768px)
- **THEN** la imagen aparece primero y el texto debajo (o viceversa), apilados verticalmente

### Requirement: Estadísticas animadas con CountUp al entrar en viewport

Las métricas "+32.000 M² Construidos" y "+220 Unidades Funcionales" SHALL animarse desde 0 hasta el valor final cuando la sección entra en el viewport por primera vez. La animación usa `IntersectionObserver` y `requestAnimationFrame`.

#### Scenario: Animación se dispara una sola vez

- **WHEN** el usuario hace scroll hasta la sección Nosotros por primera vez
- **THEN** los números animan de 0 al valor final; si el usuario vuelve a hacer scroll, los números ya muestran el valor final sin reanimar

#### Scenario: Formato con separador de miles

- **WHEN** el CountUp llega a 32000
- **THEN** se muestra como "+32.000" (con punto como separador de miles)
