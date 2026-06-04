## 1. Página de contacto

- [x] 1.1 Reemplazar `site/src/app/contacto/page.tsx` con `ContactoPage` como Client Component (`'use client'`)
- [x] 1.2 Implementar layout split: `grid grid-cols-1 md:grid-cols-2`, `min-height: calc(100vh - 64px)`, con `border-top: 1px solid #E9E9E9`

## 2. Columna izquierda — formulario

- [x] 2.1 Agregar H1 "Hablemos." (66px, font-weight 700, letter-spacing -0.02em) y subtítulo
- [x] 2.2 Implementar campos: Nombre completo + Celular (2 cols), Email, Proyecto de interés (select), Mensaje (textarea)
- [x] 2.3 Aplicar estilo claro a los campos: `background: transparent`, `border: 1px solid #E9E9E9`, `color: #1E1E1E`
- [x] 2.4 Implementar auto-resize del textarea con `onInput`
- [x] 2.5 Agregar botón "ENVIAR CONSULTA →": fondo ink, hover → accent, ancho completo

## 3. Canales de contacto

- [x] 3.1 Agregar sección de canales debajo del formulario, separada con `border-top: 1px solid #E9E9E9`
- [x] 3.2 Implementar los 3 canales con íconos SVG inline: WhatsApp, Email, Oficina — grid de 3 columnas

## 4. Columna derecha — imagen

- [x] 4.1 Implementar columna derecha con `next/image` fill usando `img-2.jpg`, `position: relative`, `overflow: hidden`, sin padding en borde derecho
- [x] 4.2 En mobile: imagen con `height: 280px` y `order: -1` (aparece arriba del formulario)

## 5. Verificación

- [x] 5.1 Correr `npm run build` y confirmar sin errores
- [x] 5.2 Verificar visualmente contra `diseno-final/contacto.html`
- [x] 5.3 Verificar responsive en mobile (390px)
