## 1. Dependencias

- [x] 1.1 Instalar `leaflet-gesture-handling` en `site/`

## 2. Global — MobileMenu

- [x] 2.1 Cambiar contenedor del menú de `absolute top-full` a `fixed top-[64px] left-0 right-0 bottom-0` con `overflow-y-auto`
- [x] 2.2 Aumentar padding interno del nav a `py-8 px-6` y padding de cada link a `py-5`
- [x] 2.3 Corregir `translateY` de la animación de la X: cambiar `5px`/`-5px` a `6px`/`-6px` para alinear con el `gap-1.5`
- [x] 2.4 Agregar `bg-white` o `bg-bg` al contenedor fixed para que tape el contenido de fondo

## 3. Inicio — HeroCarousel

- [x] 3.1 Envolver cada `<ArrowBtn>` en `<div className="hidden md:block">` para ocultarlos en mobile
- [x] 3.2 Aplicar `height: min(85svh, 100vh)` en mobile mediante clase arbitraria de Tailwind o media query en `globals.css`

## 4. Inicio — ProyectosDestacados

- [x] 4.1 Agregar una segunda instancia del link "Ver todos →" debajo del grid con `block md:hidden`
- [x] 4.2 Ocultar el link original del header en mobile con `hidden md:block`

## 5. Inicio — NosotrosSnippet

- [x] 5.1 Mover la imagen al interior del div de texto, entre el título y el primer párrafo, envuelta en `<div className="block md:hidden w-full" style={{ aspectRatio: '1/1', position: 'relative' }}>`
- [x] 5.2 Agregar `className="hidden md:block"` al div de imagen del grid (columna derecha) para que solo aparezca en desktop

## 6. Proyectos — ProjectCard

- [x] 6.1 Eliminar el `useState(hovered)` y los handlers `onMouseEnter`/`onMouseLeave` del `transform`
- [x] 6.2 Agregar clase `project-card` al Link raíz
- [x] 6.3 Agregar en `globals.css`: `@media (hover: hover) { .project-card:hover { transform: scale(1.015); transition: transform 0.5s ease; } }`
- [x] 6.4 Mantener el cambio de color del texto "VER PROYECTO →" con hover — moverlo también a CSS `@media (hover: hover)`

## 7. Proyectos — MapaSection

- [x] 7.1 Importar `leaflet-gesture-handling` y su CSS en `MapaSection.tsx`
- [x] 7.2 Inicializar el plugin en el mapa después de `L.map()`

## 8. Nosotros — Página

- [x] 8.1 Localizar la imagen de la sección Historia en `nosotros/page.tsx`
- [x] 8.2 Aumentar su `minHeight` o `height` en mobile para que sea visible y esté posicionada debajo del título

## 9. Contacto — Página

- [x] 9.1 Cambiar `gridTemplateColumns: 'repeat(3, 1fr)'` de los canales por clase Tailwind `grid grid-cols-1 md:grid-cols-3 gap-6`
- [x] 9.2 Agregar padding izquierdo en mobile a la columna de imagen: reemplazar `paddingLeft: 0` fijo por `pl-4 md:pl-0` (Tailwind) o media query equivalente
