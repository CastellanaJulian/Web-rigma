## ADDED Requirements

### Requirement: PageHeader institucional

La página `/nosotros` SHALL comenzar con un header con H1 "Tres generaciones. Una forma de construir." (salto de línea entre las dos frases) y un párrafo subtítulo descriptivo de la empresa.

#### Scenario: Header visible al cargar la página

- **WHEN** el usuario accede a `/nosotros`
- **THEN** ve el H1 en dos líneas y el subtítulo debajo, antes de cualquier otra sección

---

### Requirement: HistoriaSection con imagen panorámica y métricas animadas

La página SHALL incluir una sección con: (1) imagen `img-obra.jpg` a ancho completo con proporción 16:6, (2) grilla de dos columnas con el copy de historia a la izquierda y las métricas animadas a la derecha. Las métricas (+32.000 M² y +220 UF) SHALL animarse con CountUp al entrar en viewport, separadas por una línea divisoria.

#### Scenario: Imagen panorámica a ancho completo

- **WHEN** el usuario accede a `/nosotros`
- **THEN** la imagen ocupa el 100% del ancho con proporción 16:6, con `objectPosition: bottom`

#### Scenario: CountUp se anima al hacer scroll

- **WHEN** el usuario hace scroll hasta las métricas
- **THEN** los números animan de 0 al valor final; +32.000 se muestra con punto como separador de miles

#### Scenario: Layout responsivo en mobile

- **WHEN** el viewport es menor a `md`
- **THEN** el copy de historia y las métricas se apilan en una sola columna

---

### Requirement: PilaresSection con animación staggered

La página SHALL incluir una sección con fondo cálido (`#E3E3E3`) que muestra: imagen `img-plano.jpg` a la izquierda y 3 pilares de filosofía a la derecha. Los pilares SHALL aparecer con animación fade-up escalonada (0/220/440ms) cuando la sección entra en viewport. Cada pilar tiene título y descripción, separados por líneas divisorias.

#### Scenario: Pilares animados al entrar en viewport

- **WHEN** el usuario hace scroll hasta la sección de pilares
- **THEN** los 3 pilares aparecen uno tras otro con fade-up escalonado; no se reaniman al volver a scrollear

#### Scenario: Layout responsivo en mobile

- **WHEN** el viewport es menor a `md`
- **THEN** la imagen aparece arriba y los pilares debajo en una sola columna

---

### Requirement: RedireccionSection con imagen de fondo y CTAs

La página SHALL terminar con una sección oscura de `minHeight: 580px` con `img-4.jpg` como fondo, gradiente overlay oscuro, y contenido posicionado en la parte inferior: título, subtítulo, botón "VER PROYECTOS" (navega a `/proyectos`) y link "Contactarnos →" (navega a `/contacto`).

#### Scenario: Botón VER PROYECTOS navega correctamente

- **WHEN** el usuario hace click en "VER PROYECTOS"
- **THEN** navega a `/proyectos`

#### Scenario: Hover en botón cambia a accent

- **WHEN** el usuario hace hover sobre "VER PROYECTOS"
- **THEN** el fondo del botón cambia de blanco a accent (`#B59969`) con transición suave
