## ADDED Requirements

### Requirement: FilterTabs con estado reactivo

La página `/proyectos` SHALL incluir tabs de filtro (Todos / En ejecución / Terminados) que filtran la grilla al hacer click. El tab activo tiene el texto en ink con border-bottom accent de 2px; los inactivos en textSecondary. Los tabs están separados de la grilla por una línea horizontal.

#### Scenario: Filtro activo se indica visualmente

- **WHEN** el usuario accede a `/proyectos`
- **THEN** el tab "Todos" está activo (borde accent, texto ink) y los demás inactivos

#### Scenario: Cambio de filtro actualiza la grilla

- **WHEN** el usuario hace click en "En ejecución"
- **THEN** la grilla muestra solo proyectos con `status === 'En Ejecución'` con animación de entrada

#### Scenario: Empty state cuando no hay resultados

- **WHEN** el filtro activo no tiene proyectos (por ej. "Terminados" si no hubiera)
- **THEN** se muestra un estado vacío con ícono, mensaje y link a WhatsApp

---

### Requirement: ProyectosGrid con layout de 6 columnas

La grilla de proyectos SHALL usar `gridTemplateColumns: repeat(6, 1fr)` con gap de 16px. En el filtro "Todos", los proyectos featured ocupan span 3 (tamaño lg) y los restantes span 2 o 3 según su cantidad. En "En ejecución" todas las cards son lg (span 3). En "Terminados" todas son md con span variable.

#### Scenario: Layout featured en filtro Todos

- **WHEN** el filtro es "Todos"
- **THEN** Cosquín 1534 y Av. Larrazábal 1255 aparecen como cards lg (span 3, título 36px) y Zelada 6171 como card md

#### Scenario: Animación cardSlideUp al cambiar filtro

- **WHEN** el usuario cambia de tab
- **THEN** las cards aparecen con animación slide-up escalonada (delay 40ms por índice)

#### Scenario: Responsive en mobile

- **WHEN** el viewport es menor a `md`
- **THEN** todas las cards ocupan el ancho completo (1 por fila)

---

### Requirement: MapaSection con Leaflet + OpenStreetMap

La página SHALL incluir una sección "Dónde construimos" con un mapa interactivo (altura 480px) centrado en Mataderos. Cada proyecto tiene un marker con ícono accent. Al hacer click en un marker, se muestra un popup con imagen del proyecto, StatusPill, nombre, ubicación y link "VER PROYECTO →" a `/proyectos/[slug]`.

#### Scenario: Mapa carga en el cliente

- **WHEN** el componente monta en el browser
- **THEN** el mapa se inicializa con tiles de CartoDB Light y markers para los 3 proyectos

#### Scenario: Popup navega a la ficha

- **WHEN** el usuario hace click en "VER PROYECTO →" dentro del popup
- **THEN** navega a `/proyectos/[slug]` del proyecto correspondiente
