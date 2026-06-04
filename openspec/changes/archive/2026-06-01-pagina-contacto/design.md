## Context

`site/src/app/contacto/page.tsx` existe como scaffold vacío. El diseño de referencia (`diseno-final/contacto.html`) tiene la página completa implementada como React CDN con estilos inline. Hay que trasladar eso a Next.js con Tailwind v4 y `next/image`. La imagen de la columna derecha ya está en `site/public/images/img-2.jpg`.

## Goals / Non-Goals

**Goals:**
- Página `/contacto` completa con layout split a pantalla completa
- Formulario con todos los campos del diseño y auto-resize en textarea
- Canales de contacto (WhatsApp, Email, Oficina) debajo del formulario
- Imagen a sangre en columna derecha

**Non-Goals:**
- Backend del formulario (Google Apps Script — Etapa 3)
- Validación con react-hook-form + zod (Etapa 3)
- Animaciones de entrada (no están en el diseño de referencia)

## Decisions

### D1: Client Component único para toda la página

La página requiere estado para el hover del botón submit. Se implementa como un solo `'use client'` component en `page.tsx` directamente — no hay secciones reutilizables que justifiquen componentes separados en esta página.

### D2: Layout split con CSS Grid

```
<section style="border-top: 1px solid #E9E9E9">
  <div style="display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 64px)">
    <div>  ← columna izquierda: formulario  </div>
    <div>  ← columna derecha: imagen fill   </div>
  </div>
</section>
```

En mobile colapsa a `grid-cols-1` — imagen arriba, formulario abajo.

### D3: Campos con estilo claro (distinto a la home)

Los campos del formulario en `/contacto` tienen fondo claro (diferente al formulario oscuro de la home):
- `background: transparent`
- `border: 1px solid #E9E9E9`
- `color: #1E1E1E`

El botón submit es ink (`#1E1E1E`) con hover → accent (`#B59969`), al revés que en la home.

### D4: Auto-resize del textarea

El textarea se expande automáticamente al escribir usando `onInput`:
```tsx
onInput={(e) => {
  const el = e.currentTarget
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}}
```

### D5: Responsive — colapso en mobile

En mobile (`< md`):
- Grid pasa de `1fr 1fr` a `1fr`
- La imagen (columna derecha) se mueve arriba con `order: -1` y altura fija de `280px`
- La columna izquierda ocupa el ancho completo con padding reducido

### D6: Imagen a sangre en columna derecha

La columna derecha tiene la imagen sin padding en el borde exterior — `padding: '48px 56px 48px 0'` en el diseño. La imagen tiene `position: relative; overflow: hidden; height: 100%` con `next/image fill`.

## Risks / Trade-offs

- **Sin validación**: El formulario acepta cualquier input sin feedback de error — se acepta en esta etapa; en Etapa 3 se agrega react-hook-form + zod
- **Sin envío real**: El botón no hace nada al hacer click — en Etapa 3 se conecta con Resend: Server Action que envía FROM `noreply@rigma.com.ar` TO `Rigmagrupo@gmail.com`. Requiere verificar dominio `rigma.com.ar` en DNS (registros TXT + CNAME que provee Resend) y API key en variables de entorno de Vercel
- **Altura 100vh en mobile**: El layout de pantalla completa puede quedar incómodo en mobile muy chico; se mitiga con `min-height` en lugar de `height` fijo
