## 1. Preparación y estructura base

- [x] 1.1 Crear `diseno-final/proyectos.html` copiando el scaffolding del `index.html` (DOCTYPE, head, CDN links de React + Babel, reset CSS, font Montserrat, contenedor #root)
- [x] 1.2 Agregar en el `<head>` los CDN links de Leaflet (CSS + JS) desde unpkg
- [x] 1.3 Copiar literalmente los design tokens (`const t = { ... }`) del `index.html` aprobado — sin modificaciones
- [x] 1.4 Definir el array `ALL_PROJECTS` con los 3 proyectos reales + 1 filler, con campos: id, slug, name, loc, status, img (usando las imágenes de `./assets/`)

## 2. Componentes reutilizados del index.html

- [x] 2.1 Copiar componente `Img` con fallback a `Placeholder`
- [x] 2.2 Copiar componente `Placeholder` (striped)
- [x] 2.3 Copiar componente `SectionLabel` (con línea en `t.accent`)
- [x] 2.4 Copiar componente `StatusPill` (dot activo en `t.accent`)
- [x] 2.5 Copiar componente `Logo`
- [x] 2.6 Copiar componente `HoverLink`
- [x] 2.7 Copiar componente `NavBar` — cambiar ítem activo de "INICIO" a "PROYECTOS" (underline `t.accent`)
- [x] 2.8 Copiar componente `Footer` — sin modificaciones
- [x] 2.9 Copiar componente `ContactoSection` — sin modificaciones (formulario completo en fondo `t.ink`)

## 3. Componentes nuevos: listado de proyectos

- [x] 3.1 Crear `PageHeader` — SectionLabel "Proyectos", H1 "Nuestros proyectos" (56px 700), subtítulo en `t.textSecondary`
- [x] 3.2 Crear `FilterTabs` — tabs Todos/En ejecución/Terminados, tab activo con underline 2px `t.accent`, estado inactivo en `t.textSecondary`, borderBottom 1px `t.line` en el container con marginBottom -1 en tab activo
- [x] 3.3 Crear `EmptyState` — ícono SVG búsqueda centrado, texto "Pronto sumaremos...", CTA "ESCRIBIR POR WHATSAPP" underline
- [x] 3.4 Extender `ProjectCard` con prop `size: 'lg' | 'md'` — LG: span 3, height 460px, título 48px 700; MD: span 2, aspectRatio 4/5, título 18px 600. Hover scale(1.015) + CTA cambia a `t.accent` en ambas variantes
- [x] 3.5 Crear función `getCardSize(project, filter)` — retorna 'lg' si En Ejecución (o filtro en-ejecución), 'md' si Terminado (o filtro terminados)
- [x] 3.6 Crear `ProyectosGrid` — CSS Grid 6 cols, gap 16, sort En Ejecución primero cuando filtro es "todos", renderiza EmptyState si array vacío

## 4. Sección de mapa con Leaflet

- [x] 4.1 Crear `MapaSection` — SectionLabel "Ubicaciones", título "Dónde construimos", contenedor del mapa (height 480px, full-width sin padding lateral)
- [x] 4.2 Definir array `MAP_PROJECTS` con datos de pines: `{ name, slug, lat, lng }` — Zelada con coordenadas reales, Cosquín y Larrazábal con coordenadas aproximadas en Mataderos
- [x] 4.3 Inicializar mapa Leaflet con `useEffect` + `useRef`, centro en Mataderos (~lat -34.657, lng -58.504), zoom 14, tiles OSM
- [x] 4.4 Crear marcadores personalizados usando `L.divIcon` con SVG de pin en color `t.accent` (#B59969)
- [x] 4.5 Agregar tooltip con nombre del proyecto a cada marcador (`.bindTooltip`)
- [x] 4.6 Agregar handler de click en cada marcador — en prototipo: `alert('Ir a /proyectos/' + slug)`
- [x] 4.7 Agregar comentario en el componente: `// PROTOTIPO: Leaflet + OSM. En producción: reemplazar por Mapbox GL JS con estilo oscuro.`

## 5. Ensamblado final y verificación

- [x] 5.1 Crear componente `App` ensamblando: NavBar → PageHeader → FilterTabs → ProyectosGrid → MapaSection → ContactoSection → Footer
- [x] 5.2 Verificar que los filtros funcionan correctamente y la grilla responde al estado
- [x] 5.3 Verificar que el mapa carga sin errores de consola y los pines aparecen en Mataderos
- [x] 5.4 Verificar hover en cards (scale + cambio de color CTA)
- [x] 5.5 Verificar que el footer y la sección de contacto son visualmente idénticos al `index.html`
- [x] 5.6 Abrir el archivo en el navegador y hacer un recorrido visual completo antes de marcar como listo

## 6. Refinamientos post-validación

- [x] 6.1 Agregar animación `gridFadeIn` (fadeIn + translateY) al cambiar filtro — `key={filter}` en la sección + clase CSS con `@keyframes`
- [x] 6.2 Grid responsive según cantidad de proyectos — `getResponsiveSpan(count)`: 1→span 6, múltiplo 3→span 2, resto→span 3. `ProjectCard` acepta prop `span` explícita
- [x] 6.3 Ocultar texto de atribución de Leaflet/CartoDB — `attributionControl: false` en opciones del mapa
