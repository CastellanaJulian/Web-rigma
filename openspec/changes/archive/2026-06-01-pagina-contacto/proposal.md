## Why

La página `/contacto` es el destino principal de todos los CTAs del sitio. Sin ella, los leads no tienen dónde llegar. Es la única página con un formulario real y canales de contacto directos.

## What Changes

- Implementar `site/src/app/contacto/page.tsx` con el layout split de pantalla completa definido en el diseño
- Crear `ContactoPage` como Client Component con formulario funcional (validación y envío vía Google Apps Script en Etapa 3 — por ahora estructura y estilos)
- Layout: dos columnas `1fr 1fr` que ocupan `calc(100vh - 64px)` — columna izquierda con formulario, columna derecha con imagen a sangre
- Columna izquierda: H1 "Hablemos.", subtítulo, formulario completo, canales de contacto en fila
- Columna derecha: `next/image` fill con `img-2.jpg`
- Auto-resize del textarea al tipear
- Hover accent en el botón de submit (fondo ink → accent)

## Capabilities

### New Capabilities

- `pagina-contacto`: Página de contacto con layout split, formulario y canales de contacto

### Modified Capabilities

<!-- ninguna -->

## Impact

- `site/src/app/contacto/page.tsx` — reemplaza scaffold vacío
- Usa imágenes ya existentes en `site/public/images/`
- Sin nuevas dependencias
- Formulario sin backend en esta etapa (Etapa 3: integración Google Apps Script)
