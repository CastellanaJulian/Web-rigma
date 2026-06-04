## 1. Globals y ProjectCard

- [x] 1.1 Agregar `@keyframes cardSlideUp` en `site/src/app/globals.css`
- [x] 1.0 Agregar coordenadas a los 3 proyectos en `site/src/data/projects.ts` (Zelada: `-34.6568, -58.5041`; Cosquín: `-34.6540, -58.5015`; Larrazábal: `-34.6595, -58.5065`)
- [x] 1.2 Agregar prop `size?: 'lg' | 'md'` a `ProjectCard` — título 36px en lg, 22px en md; padding `0 40px 36px` en lg, `0 20px 20px` en md

## 2. PageHeader

- [x] 2.1 Implementar PageHeader: H1 "Nuestros proyectos" (56px, font-weight 700) + párrafo subtítulo, padding `80px 56px 64px`

## 3. FilterTabs

- [x] 3.1 Implementar FilterTabs como parte del Client Component — 3 tabs con `useState` para filtro activo
- [x] 3.2 Tab activo: texto ink, `borderBottom: 2px solid accent`, `marginBottom: -1px`; inactivo: textSecondary, borde transparente
- [x] 3.3 Contenedor de tabs tiene `borderBottom: 1px solid #E9E9E9` y `padding: 0 56px`

## 4. ProyectosGrid

- [x] 4.1 Agregar `priority?: number` al tipo `Project` en `site/src/types/project.ts` y asignar `priority: 1` a Cosquín y `priority: 2` a Larrazábal en `projects.ts`
- [x] 4.2 Implementar `sortAndSplit(projects)` — ordena por priority asc (undefined al final), separa featured (priority ≤ 2) de resto
- [x] 4.3 Implementar `filterProjects(projects, filter)` y `getResponsiveSpan(count)`
- [x] 4.4 Lógica de cards: en "todos" → featured=span3/lg + resto=spanVariable/md; en "en-ejecucion" → todas span3/lg con sort; en "terminados" → todas spanVariable/md con sort
- [x] 4.4 Grilla: `display: grid; gridTemplateColumns: repeat(6, 1fr); gap: 16px` con `key={filter}` para re-triggerear animación
- [x] 4.5 Implementar EmptyState — ícono search, texto, link WhatsApp

## 5. MapaSection

- [x] 5.1 Crear `site/src/components/sections/proyectos/MapaSection.tsx` como Client Component — recibe `projects: Project[]` y filtra por `p.coordinates !== undefined`
- [x] 5.2 Importar Leaflet dinámicamente en `useEffect` — evita SSR crash
- [x] 5.3 Inicializar mapa: CartoDB Light tiles, view `[-34.657, -58.504]`, zoom 15, `scrollWheelZoom: false`
- [x] 5.4 Implementar marker con ícono accent (div 36x36 con svg de edificio)
- [x] 5.5 Popup HTML con imagen, StatusPill, nombre, ubicación y link "VER PROYECTO →" a `/proyectos/[slug]`
- [x] 5.6 Agregar CSS de Leaflet: importar `leaflet/dist/leaflet.css` dinámicamente en el mismo useEffect

## 6. Composición de la página

- [x] 6.1 Reemplazar `site/src/app/proyectos/page.tsx` con composición: PageHeader + FilterTabs + ProyectosGrid + MapaSection + ContactSectionHome

## 7. Verificación

- [x] 7.1 Correr `npm run build` y confirmar sin errores
- [x] 7.2 Verificar filtros, grilla y mapa en browser vs `diseno-final/proyectos.html`
- [x] 7.3 Confirmar que el mapa no genera errores SSR en build
