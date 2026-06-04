## ADDED Requirements

### Requirement: Carousel a pantalla completa con slides de imagen

La página de Inicio SHALL tener un hero carousel que ocupa el 100% del viewport height (mínimo 640px), con fondo oscuro (`ink`) y slides que hacen transición con fade. Cada slide es una imagen que cubre el área completa con un gradiente overlay.

El título SHALL ser: "Construimos *espacios* que perduran" donde la palabra *espacios* está en itálica y color accent (`#B59969`). Debajo: un subtítulo descriptivo y dos botones CTA ("VER PROYECTOS" → `/proyectos`, "CONTACTANOS" → `/contacto`).

#### Scenario: Slide visible al cargar

- **WHEN** el usuario entra a la página de Inicio
- **THEN** el primer slide es visible inmediatamente con el título y CTAs animados (fade-up desde abajo)

#### Scenario: Transición entre slides

- **WHEN** el carousel avanza (automático o manual)
- **THEN** el slide anterior hace fade-out y el nuevo hace fade-in con transición de 0.5s

### Requirement: Auto-advance y navegación manual

El carousel SHALL avanzar automáticamente cada 6 segundos. El usuario SHALL poder navegar manualmente con flechas laterales o haciendo click en los indicadores de slide.

#### Scenario: Auto-advance se detiene si el usuario interactúa

- **WHEN** el usuario hace click en una flecha o indicador
- **THEN** el carousel navega al slide correspondiente (el auto-advance continúa desde ese punto)

#### Scenario: Indicadores reflejan el slide activo

- **WHEN** el slide activo cambia
- **THEN** el indicador correspondiente se expande (28px) y toma color accent; los demás son puntos pequeños blancos/30

### Requirement: Responsive — hero adaptado a mobile

En viewports menores a `md` (768px) el hero SHALL reducir el tamaño del título y los paddings para que el contenido sea legible sin overflow.

#### Scenario: Título legible en mobile

- **WHEN** el viewport es menor a 768px
- **THEN** el título tiene un tamaño de fuente no mayor a 48px y el padding horizontal es de 24px
