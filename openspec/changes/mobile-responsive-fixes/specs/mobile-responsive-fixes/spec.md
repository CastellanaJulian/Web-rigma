## ADDED Requirements

### Requirement: Hero oculta flechas en mobile
En viewports menores a `md` (768px), el carrusel del hero SHALL ocultar los botones de navegación de flechas. El avance automático y el deslizamiento táctil deben continuar funcionando.

#### Scenario: Flechas ocultas en mobile
- **WHEN** el usuario abre la página de inicio en un viewport < 768px
- **THEN** los botones de flecha izquierda y derecha no deben ser visibles ni interactuables

#### Scenario: Flechas visibles en desktop
- **WHEN** el usuario abre la página de inicio en un viewport >= 768px
- **THEN** los botones de flecha izquierda y derecha deben estar visibles

### Requirement: Hero altura reducida en mobile
En viewports menores a `md`, el hero SHALL tener altura máxima de `85svh` para caber en pantalla sin scroll en la mayoría de dispositivos móviles modernos.

#### Scenario: Hero cabe en pantalla mobile
- **WHEN** el usuario abre la página en un dispositivo mobile moderno (iOS 15.4+ / Android 12+)
- **THEN** el hero completo debe ser visible sin necesidad de hacer scroll vertical

### Requirement: Botón "Ver todos los proyectos" posicionado debajo del grid en mobile
En viewports menores a `md`, el link "Ver todos los proyectos" SHALL aparecer debajo de las cards de proyectos, no al lado del título de sección.

#### Scenario: Botón debajo del grid en mobile
- **WHEN** el usuario ve la sección "Nuestros desarrollos" en mobile
- **THEN** el botón "Ver todos los proyectos" debe estar posicionado después de las cards

#### Scenario: Botón al lado del título en desktop
- **WHEN** el usuario ve la sección "Nuestros desarrollos" en desktop
- **THEN** el botón debe aparecer alineado a la derecha del título de sección

### Requirement: NosotrosSnippet reordena contenido en mobile
En viewports menores a `md`, el bloque Nosotros SHALL mostrar el contenido en este orden: label → título → imagen cuadrada a ancho completo → texto → stats → botón. La imagen SHALL tener `aspect-ratio: 1/1` y ocupar el ancho completo del layout.

#### Scenario: Imagen entre título y texto en mobile
- **WHEN** el usuario ve la sección "Nosotros" en mobile
- **THEN** la imagen debe aparecer después del título y antes del párrafo de texto

#### Scenario: Layout de dos columnas en desktop
- **WHEN** el usuario ve la sección "Nosotros" en desktop
- **THEN** el layout debe ser de dos columnas (texto izquierda, imagen derecha)

### Requirement: ProjectCard sin efecto hover en dispositivos touch
La card de proyecto SHALL aplicar el efecto de escala (`scale(1.015)`) únicamente en dispositivos que soportan hover real (`@media (hover: hover)`). En dispositivos touch no SHALL existir efecto visual al tocar.

#### Scenario: Sin scale en touch
- **WHEN** el usuario toca una card en un dispositivo mobile
- **THEN** la card no debe escalar ni mostrar ningún efecto de transform

#### Scenario: Scale en desktop con mouse
- **WHEN** el usuario pasa el mouse sobre una card en desktop
- **THEN** la card debe escalar ligeramente (`scale(1.015)`)

### Requirement: Mapa requiere dos dedos para interactuar en mobile
El mapa de Leaflet en la página de proyectos SHALL mostrar un overlay de ayuda cuando el usuario intenta desplazarse sobre el mapa con un solo dedo, indicando que debe usar dos dedos para moverlo.

#### Scenario: Overlay al scroll con un dedo
- **WHEN** el usuario intenta hacer scroll sobre el mapa con un solo dedo en mobile
- **THEN** debe aparecer un mensaje indicando "Usa dos dedos para mover el mapa"

#### Scenario: Mapa interactivo con dos dedos
- **WHEN** el usuario usa dos dedos para interactuar con el mapa
- **THEN** el mapa debe responder normalmente al gesto

### Requirement: Imagen de historia en Nosotros con altura adecuada en mobile
La imagen principal de la sección Historia en la página Nosotros SHALL tener una altura mínima visible en mobile que permita apreciar el contenido visual, posicionada debajo del título de la sección.

#### Scenario: Imagen visible en mobile
- **WHEN** el usuario ve la sección Historia en mobile
- **THEN** la imagen debe tener suficiente altura para ser visible y estar debajo del título

### Requirement: Canales de contacto en columna en mobile
En viewports menores a `md`, los canales de contacto (WhatsApp, Email, Oficina) SHALL mostrarse en una columna vertical, no en tres columnas horizontales.

#### Scenario: Canales en columna en mobile
- **WHEN** el usuario ve la página de contacto en mobile
- **THEN** los tres canales de contacto deben estar apilados verticalmente sin desbordamiento horizontal

#### Scenario: Canales en fila en desktop
- **WHEN** el usuario ve la página de contacto en desktop
- **THEN** los tres canales deben estar en una fila de tres columnas

### Requirement: Imagen de contacto con padding simétrico en mobile
En viewports menores a `md`, la imagen de la columna derecha de la página Contacto SHALL tener el mismo padding horizontal en ambos lados.

#### Scenario: Padding simétrico en mobile
- **WHEN** el usuario ve la página de contacto en mobile
- **THEN** la imagen debe tener igual espacio a izquierda y derecha

### Requirement: Menú mobile con espaciado generoso y animación correcta
El menú mobile SHALL tener padding interno generoso entre los links. El botón hamburguesa SHALL animarse correctamente a una "X" al abrir el menú, con las líneas formando una cruz centrada y alineada.

#### Scenario: Links con espaciado cómodo
- **WHEN** el usuario abre el menú mobile
- **THEN** cada link debe tener suficiente área de toque (mínimo 48px de alto) y espaciado visual entre ítems

#### Scenario: Animación correcta de la X
- **WHEN** el usuario abre el menú mobile
- **THEN** las tres líneas del ícono hamburguesa deben formar una "X" perfectamente centrada y sin deformación
