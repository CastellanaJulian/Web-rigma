## ADDED Requirements

### Requirement: Layout split 50/50 a pantalla completa
La página SHALL usar un layout de dos columnas `1fr 1fr` con `minHeight: calc(100vh - 64px)` (altura de ventana menos navbar). Las columnas SHALL estar alineadas verticalmente (`alignItems: stretch`). No SHALL haber padding entre las columnas — la imagen derecha sangra hasta el borde.

#### Scenario: Split visible al cargar
- **WHEN** el usuario navega a /contacto
- **THEN** ve dos columnas de igual ancho que ocupan toda la pantalla disponible

### Requirement: Columna izquierda con formulario y canales
La columna izquierda SHALL tener padding `48px 64px 48px 56px` y contener en orden: H1 "Hablemos." (66px/700), subtítulo (14px/300), formulario, y canales de contacto. El fondo SHALL ser `t.bg` (#FBFBFB).

#### Scenario: Contenido completo en columna izquierda
- **WHEN** se renderiza la página
- **THEN** se ven H1, subtítulo, todos los campos del formulario y los tres canales de contacto

### Requirement: Formulario con campos y validación visual
El formulario SHALL incluir en orden: Nombre completo + Celular (grid 1fr/1fr), Email, Proyecto de interés (select con opciones de proyectos reales), Mensaje (textarea), botón "ENVIAR CONSULTA →". Los campos SHALL tener `border: 1px solid t.line`, `background: transparent`, `color: t.ink`. El botón SHALL ser `background: t.ink, color: white` con hover a `t.accent`.

#### Scenario: Hover en botón de envío
- **WHEN** el usuario hace hover sobre "ENVIAR CONSULTA →"
- **THEN** el fondo del botón cambia a `t.accent` (#B59969)

#### Scenario: Select con proyectos disponibles
- **WHEN** el usuario abre el select de proyecto de interés
- **THEN** ve: Cosquín 1534, Av. Larrazábal 1255, Zelada 6171, Otro / No sé aún

### Requirement: Canales de contacto debajo del formulario
Los canales SHALL mostrarse en un grid de 3 columnas separados del formulario por `borderTop: 1px solid t.line`. Cada canal SHALL mostrar ícono SVG + label uppercase en `t.textTertiary` + valor en `t.ink`. Los tres canales son: WhatsApp (+54 11 6596 2401), Email (Rigmagrupo@gmail.com), Oficina (Guardia Nacional 739, PB · CABA).

#### Scenario: Tres canales visibles
- **WHEN** el usuario hace scroll hasta el final del formulario
- **THEN** ve los tres canales con ícono, label y valor correctos

### Requirement: Columna derecha con imagen a sangre
La columna derecha SHALL mostrar el componente `Img` con `object-fit: cover` cubriendo `width: 100%, height: 100%` sin padding. Si la imagen falla, SHALL mostrar `Placeholder` con label "foto · equipo / obra / empresa".

#### Scenario: Placeholder visible sin imagen
- **WHEN** el prototipo carga sin imagen real disponible
- **THEN** la columna derecha muestra el patrón rayado con la label descriptiva

### Requirement: NavBar con ítem activo "CONTACTO"
La NavBar SHALL marcar "CONTACTO" como activo con underline `1.5px solid t.accent` y color `t.ink`. Los demás ítems en `t.textSecondary`.

#### Scenario: Estado activo en navbar
- **WHEN** se renderiza la página Contacto
- **THEN** el ítem "CONTACTO" tiene underline accent y los demás no
