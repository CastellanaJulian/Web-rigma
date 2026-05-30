## Context

El prototipo es un único archivo HTML autocontenido con React 18 vía CDN (mismo patrón que `index.html`). No usa bundler, no tiene build step. El sistema de diseño está completamente definido en `design-system.md` y materializado en `index.html` — este archivo es la fuente de verdad para tokens, componentes y patrones.

La pantalla Proyectos tiene estructura validada en `Wireframes/proyectos.html` (mid-fi). Este diseño eleva ese wireframe a alta fidelidad aplicando los tokens y componentes del sistema aprobado.

## Goals / Non-Goals

**Goals:**
- Archivo `diseno-final/proyectos.html` listo para validación con el cliente
- Coherencia visual 100% con `index.html` (mismos tokens, mismos patrones de interacción)
- Componentes nuevos (PageHeader, FilterTabs, ProyectosGrid, MapaSection) documentados inline
- Mapa funcional como placeholder para validar el concepto con el cliente

**Non-Goals:**
- Integración con Sanity o API real
- Responsive / mobile
- Accesibilidad WCAG
- Animaciones de transición entre filtros (fade/slide) — fuera de scope del prototipo

## Decisions

### D1 — Reutilizar componentes del index.html sin modificar

Copiar literalmente Logo, NavBar, SectionLabel, StatusPill, Img+Placeholder, ContactoSection, Footer del `index.html`. No crear abstracciones nuevas.

**Alternativa descartada:** Extraer componentes a un archivo compartido. Agrega complejidad innecesaria para prototipo HTML estático.

### D2 — ProjectCard: una sola variante con prop `size`

El `index.html` tiene una sola variante de ProjectCard (siempre LG, `span 3`). Para la grilla de proyectos necesitamos LG (`span 3`, height 460px) y MD (`span 2`, `aspectRatio 4/5`). Se extiende el componente existente con una prop `size: 'lg' | 'md'` que ajusta `gridColumn`, `height` y tamaños tipográficos.

**Lógica de tamaño por filtro:**
- Filtro "Todos": En Ejecución → LG, Terminados → MD
- Filtro "En ejecución": todos LG
- Filtro "Terminados": todos MD

**Ordenamiento en "Todos":** proyectos En Ejecución primero (sort), para que queden en su propia fila antes de los MD.

### D3 — FilterTabs: underline en `t.accent`

El wireframe usa `t.ink` para el tab activo. En el sistema de alta fidelidad, `t.accent` (#B59969) es el token para estados activos y énfasis de marca (dot de status, separadores, hover de links). El tab activo usa underline `2px solid t.accent` para coherencia.

### D4 — Mapa: Leaflet + OpenStreetMap en el prototipo

Mapbox requiere API key y token de acceso. Para un prototipo HTML estático de validación con el cliente, Leaflet + OSM es suficiente: funciona sin cuentas, sin credenciales, cargable desde CDN.

**Plan para producción:** reemplazar Leaflet por `mapbox-gl` en el componente `MapaSection` del sitio Next.js. Las coordenadas y la API del componente (array de proyectos con `{ name, lat, lng, slug }`) quedan iguales.

**Estilo del mapa en prototipo:** tiles estándar de OSM. En producción: estilo Mapbox oscuro/minimalista alineado a la paleta `ink`.

**Pines:** marcadores personalizados con color `t.accent` (#B59969). Tooltip con nombre del proyecto al hover. Click → navegación al slug del proyecto.

**Datos del mapa en el prototipo:** solo Zelada 6171 tiene coordenadas reales (lat -34.6568, lng -58.5041). Los otros proyectos usan coordenadas aproximadas en Mataderos para dar densidad visual al mapa.

### D5 — ContactoSection: formulario completo en fondo oscuro

La sección de contacto en la página Proyectos replica exactamente la `ContactoSection` del `index.html` (fondo `t.ink`, formulario con Nombre, Celular, Email, Proyecto de interés, Mensaje, botón con hover a `t.accent`). No se crea una variante nueva.

**Alternativa considerada:** CTA liviano (solo WhatsApp + email). Descartada por decisión del cliente — quiere el formulario completo en esta página también.

## Risks / Trade-offs

- **Duplicación de código** entre `index.html` y `proyectos.html` → Aceptable en prototipo estático. En el sitio Next.js los componentes serán shared y este trade-off desaparece.
- **Tiles de OSM en prototipo vs Mapbox en producción** → El cliente ve un mapa funcional pero el estilo visual final será diferente. Mitigación: anotar claramente en el HTML con un comentario.
- **Coordenadas aproximadas** para Cosquín y Larrazábal → Son ficticias para el prototipo. Mitigación: usar placeholder visual con pin correcto solo para Zelada; los otros con nota.

## Open Questions

- ¿El mapa va a pantalla completa (100% del ancho del contenedor) o con padding lateral igual al resto de la página (56px)?
- ¿Los proyectos "filler" (Murguiondo, Cafayate) se incluyen en la grilla del prototipo o solo los 3 reales?
