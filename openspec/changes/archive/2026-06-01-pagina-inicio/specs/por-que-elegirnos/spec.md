## ADDED Requirements

### Requirement: Sección Por qué elegirnos con 4 pilares

La página de Inicio SHALL incluir una sección con fondo `bg-warm` (`#E3E3E3`) que muestra 4 pilares en grilla de 4 columnas. Cada pilar tiene: ícono SVG, título y descripción. Los 4 pilares son:

1. **Calidad en cada detalle** — Materiales premium, puertas exclusivas y terminaciones de primer nivel que cuidan el valor de cada propiedad en el tiempo.
2. **Plazos que se cumplen** — Obras con avance documentado y fechas de entrega comprometidas desde el primer día.
3. **Trayectoria comprobada** — Más de 32.000 m² construidos y tres generaciones en el rubro respaldan cada proyecto que firmamos.
4. **Espacios multifuncionales** — Proyectos pensados para optimizar el uso, el confort y la calidad de vida en cada metro cuadrado.

#### Scenario: 4 columnas en desktop

- **WHEN** el viewport es mayor a `lg` (1024px)
- **THEN** los 4 pilares se muestran en una sola fila de 4 columnas iguales

#### Scenario: 2 columnas en tablet, 1 en mobile

- **WHEN** el viewport es menor a `lg`
- **THEN** los pilares se reorganizan en 2 columnas (tablet) o 1 columna (mobile)

### Requirement: Animación staggered al entrar en viewport

Cuando la sección entra en el viewport, los 4 pilares SHALL aparecer con una animación fade-up escalonada (staggered): el primero a los 0ms, el segundo a los 220ms, el tercero a los 440ms y el cuarto a los 660ms.

#### Scenario: Animación se dispara al hacer scroll

- **WHEN** el usuario hace scroll hasta la sección "Por qué elegirnos"
- **THEN** los 4 pilares aparecen uno tras otro con la animación fade-up escalonada

#### Scenario: Sin animación si el usuario ya pasó la sección

- **WHEN** el usuario vuelve a hacer scroll hacia arriba después de haber visto la sección
- **THEN** los pilares ya están visibles, no se reanima
