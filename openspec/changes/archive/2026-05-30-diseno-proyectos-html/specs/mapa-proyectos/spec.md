## ADDED Requirements

### Requirement: Mapa interactivo entre la grilla y el contacto
La página SHALL incluir una sección de mapa después de ProyectosGrid y antes de ContactoSection. El mapa SHALL tener height de 480px con padding horizontal de 56px (igual al resto del contenido). La sección SHALL mostrar SectionLabel "Ubicaciones" y título "Dónde construimos" antes del mapa. SHALL haber 120px de separación entre el mapa y la sección de contacto.

#### Scenario: Mapa visible en la página
- **WHEN** el usuario hace scroll pasada la grilla de proyectos
- **THEN** encuentra la sección de mapa con título, el mapa interactivo y 120px de espacio antes de la sección de contacto

### Requirement: Tiles CartoDB Positron
El mapa SHALL usar tiles de CartoDB Positron (`light_all`) — fondo blanco, calles en gris sutil, sin colores. Requiere conexión a internet. No requiere API key.

#### Scenario: Estilo del mapa al cargar
- **WHEN** se carga el prototipo con conexión a internet
- **THEN** el mapa muestra fondo blanco con calles en gris minimalista (Positron)

### Requirement: Marcadores con ícono de edificio e interactividad
Cada proyecto SHALL tener un marcador cuadrado (36×36px) con fondo `t.accent` (#B59969), ícono de edificio SVG blanco y borde-radius 2px. Al hacer hover el marcador SHALL cambiar el fondo a `t.ink` (#1E1E1E) y elevar con `translateY(-3px)`. El cursor SHALL ser pointer para comunicar interactividad.

#### Scenario: Marcador visible en el mapa
- **WHEN** se carga el mapa
- **THEN** aparecen 3 marcadores cuadrados dorados con ícono de edificio

#### Scenario: Hover en marcador
- **WHEN** el usuario hace hover sobre un marcador
- **THEN** el fondo cambia a negro y el marcador se eleva levemente

### Requirement: Popup con imagen, estado, dirección y ubicación
Al hacer click en un marcador SHALL abrirse un popup de 260px de ancho con: imagen del proyecto (164px height, object-fit cover), StatusPill con estado (dot dorado si En Ejecución), nombre del proyecto (uppercase 15px 700), ubicación (10px uppercase muted) y CTA "VER PROYECTO →" con hover a `t.accent`. NO incluye tipologías. El mapa SHALL hacer autoPan para que el popup siempre quede visible. El botón de cierre SHALL tener fondo blanco con sombra para ser visible sobre la imagen.

#### Scenario: Popup al click en marcador
- **WHEN** el usuario hace click en un marcador
- **THEN** se abre un popup con imagen, pill de estado, nombre, ubicación y CTA. El mapa se mueve si es necesario para mostrar el popup completo

#### Scenario: Hover en CTA del popup
- **WHEN** el usuario hace hover sobre "VER PROYECTO →"
- **THEN** el texto y el subrayado cambian a `t.accent` (#B59969)

#### Scenario: Botón de cierre visible
- **WHEN** el popup está abierto
- **THEN** el botón × es visible sobre la imagen con fondo blanco semitransparente

### Requirement: Polígono del barrio Mataderos
El mapa SHALL dibujar el límite real del barrio Mataderos obtenido desde la API de Nominatim/OpenStreetMap al cargar. El polígono SHALL tener borde dorado (`t.accent`) punteado (dashArray 5 5), relleno dorado al 10% de opacidad. Si la petición falla o devuelve un punto (sin polígono), SHALL fallar silenciosamente sin romper el mapa.

#### Scenario: Polígono de Mataderos visible
- **WHEN** se carga el mapa con conexión a internet
- **THEN** aparece el contorno real de Mataderos con relleno y borde dorado punteado

#### Scenario: Fallo silencioso
- **WHEN** la API de Nominatim no responde o devuelve un punto
- **THEN** el mapa sigue funcionando normalmente sin polígono

### Requirement: Tecnología del mapa
En el prototipo SHALL usarse Leaflet 1.9.4 + CartoDB Positron tiles (sin API key, cargado desde CDN unpkg). Zoom inicial: 15, centro: lat -34.657 lng -58.504 (Mataderos). `scrollWheelZoom: false`. El componente SHALL estar anotado indicando que en producción se reemplaza por Mapbox GL JS con estilo personalizado.

#### Scenario: Mapa carga sin API key
- **WHEN** se abre el prototipo HTML con conexión a internet
- **THEN** el mapa carga correctamente sin requerir autenticación ni API key
