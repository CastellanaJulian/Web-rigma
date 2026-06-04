## Why

La página `/nosotros` presenta la identidad institucional de Rigma. Es la página que genera confianza en compradores potenciales al mostrar la historia, los números y la filosofía de la empresa. Sin ella el sitio carece de la capa emocional que diferencia a Rigma de la competencia.

## What Changes

- Implementar `site/src/app/nosotros/page.tsx` con 4 secciones según el diseño
- **PageHeader**: H1 "Tres generaciones. Una forma de construir." + subtítulo institucional
- **HistoriaSection**: imagen panorámica a ancho completo (16:6) + grilla 2 cols con copy de historia y métricas animadas (CountUp reutilizando la lógica ya implementada)
- **PilaresSection**: fondo cálido, grilla 2 cols — imagen izquierda + 3 pilares de filosofía con animación staggered al entrar en viewport
- **RedireccionSection**: sección oscura con imagen de fondo, gradiente overlay, CTA "VER PROYECTOS" + link "Contactarnos →"
- Copiar `img-plano.jpg` a `site/public/images/` (única imagen faltante)

## Capabilities

### New Capabilities

- `pagina-nosotros`: Página institucional con historia, métricas animadas, filosofía y CTA de redirección

### Modified Capabilities

<!-- ninguna -->

## Impact

- `site/src/app/nosotros/page.tsx` — reemplaza scaffold vacío
- Reutiliza `useInView`, `SectionLabel` existentes
- Nueva imagen: `site/public/images/img-plano.jpg`
- Sin nuevas dependencias de paquetes
