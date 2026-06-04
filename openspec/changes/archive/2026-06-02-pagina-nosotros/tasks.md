## 1. Assets

- [x] 1.1 Copiar `diseno-final/assets/img-plano.jpg` → `site/public/images/img-plano.jpg`

## 2. Estructura base

- [x] 2.1 Reemplazar `site/src/app/nosotros/page.tsx` con el componente `'use client'` e importaciones necesarias (`useInView`, `SectionLabel`, `Image`, `Link`, `useState`, `useEffect`, `useRef`)

## 3. PageHeader

- [x] 3.1 Implementar H1 "Tres generaciones.\nUna forma de construir." (56px, font-weight 700, letter-spacing -0.025em) + párrafo subtítulo

## 4. HistoriaSection

- [x] 4.1 Imagen `img-obra.jpg` a ancho completo con `aspectRatio: '16/6'`, `next/image` fill, `objectPosition: bottom`
- [x] 4.2 Grilla `grid-cols-1 md:grid-cols-2` gap-20: izquierda=2 párrafos historia, derecha=métricas
- [x] 4.3 Implementar CountUp local para +32.000 M² (formato con punto) y +220 UF, separados por `border-bottom`

## 5. PilaresSection

- [x] 5.1 Sección con `background: #E3E3E3`, grilla `grid-cols-1 md:grid-cols-2`
- [x] 5.2 Columna izquierda: `img-plano.jpg` con `fill`, `minHeight: 400px`
- [x] 5.3 Columna derecha: 3 pilares con `useInView` + animación staggered 0/220/440ms, separados por líneas

## 6. RedireccionSection

- [x] 6.1 Sección `position: relative`, `minHeight: 580px`, `img-4.jpg` con `fill` como fondo
- [x] 6.2 Gradiente overlay igual al hero
- [x] 6.3 Contenido `position: absolute; bottom: 0`: SectionLabel, título, subtítulo
- [x] 6.4 Botón "VER PROYECTOS" (blanco → accent en hover) + link "Contactarnos →" con `hover-accent-link-dark`

## 7. Verificación

- [x] 7.1 Correr `npm run build` y confirmar sin errores
- [x] 7.2 Verificar visualmente contra `diseno-final/nosotros.html`
- [x] 7.3 Verificar responsive en mobile (390px)
