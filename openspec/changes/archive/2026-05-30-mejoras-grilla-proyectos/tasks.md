## 1. Datos mock

- [x] 1.1 Agregar campo `featured: boolean` a cada proyecto en `ALL_PROJECTS` — marcar `featured: true` en Cosquín 1534 y Av. Larrazábal 1255, `featured: false` en Zelada y Murguiondo

## 2. Animación stagger

- [x] 2.1 Reemplazar `@keyframes gridFadeIn` en el `<style>` por `@keyframes cardEnter` (opacity 0→1, translateY 10px→0, 0.35s ease-out)
- [x] 2.2 Eliminar la clase CSS `.grid-fade-in` y el `className="grid-fade-in"` del `<section>` en `App`
- [x] 2.3 En `ProjectCard`, agregar prop `index` y aplicar `animationDelay: \`${index * 60}ms\`` + `animation: 'cardEnter 0.35s ease-out both'` al div raíz de la card

## 3. Tipografía unificada

- [x] 3.1 En `ProjectCard`, reemplazar `fontSize: isLg ? 48 : 18` y `fontWeight: isLg ? 700 : 600` por `fontSize: 22, fontWeight: 700` en el título del proyecto
- [x] 3.2 En `ProjectCard`, unificar `letterSpacing` del título a `'-0.01em'` para ambos tamaños
- [x] 3.3 En `ProjectCard`, unificar `fontSize` de la ubicación a `11` y `marginBottom` a `18` para ambos tamaños

## 4. Lógica featured en ProyectosGrid

- [x] 4.1 En `ProyectosGrid`, cuando `filter === 'todos'`: separar proyectos en `featured` (los que tienen `featured: true`) y `resto` (los demás). Asignar span 3 fijo a featured, `getResponsiveSpan(resto.length)` a resto
- [x] 4.2 En `ProyectosGrid`, cuando `filter !== 'todos'`: mantener comportamiento actual — todos reciben `getResponsiveSpan(projects.length)` sin distinción de featured
- [x] 4.3 Pasar `index` global (posición en el array final de cards) a cada `ProjectCard` para el stagger

## 5. Verificación

- [x] 5.1 Verificar que al filtro "Todos" los 2 featured aparecen primero en fila completa
- [x] 5.2 Verificar que al filtro "En ejecución" no hay distinción de featured
- [x] 5.3 Verificar stagger: las cards entran escalonadas al cambiar filtro
- [x] 5.4 Verificar tipografía: mismo tamaño de título en cards grandes y chicas
