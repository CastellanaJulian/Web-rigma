## ADDED Requirements

### Requirement: Layout split a pantalla completa

La página `/contacto` SHALL mostrar un layout de dos columnas iguales (`1fr 1fr`) que ocupa `calc(100vh - 64px)` — columna izquierda con formulario y canales, columna derecha con imagen institucional a sangre. En mobile (`< md`) el layout colapsa a una sola columna con la imagen arriba.

#### Scenario: Layout de dos columnas en desktop

- **WHEN** el viewport es mayor a `md` (768px)
- **THEN** la página muestra dos columnas de igual ancho ocupando el alto de la pantalla menos el navbar

#### Scenario: Colapso a una columna en mobile

- **WHEN** el viewport es menor a `md` (768px)
- **THEN** la imagen aparece arriba con altura fija de 280px y el formulario debajo ocupando el ancho completo

---

### Requirement: Formulario de contacto con campos completos

La columna izquierda SHALL contener: H1 "Hablemos.", subtítulo descriptivo, y un formulario con los campos: Nombre completo + Celular (en fila de 2), Email, Proyecto de interés (select con opciones de proyectos), Mensaje (textarea auto-resize), y botón "ENVIAR CONSULTA →" a ancho completo.

#### Scenario: Todos los campos presentes

- **WHEN** el usuario accede a `/contacto`
- **THEN** ve el formulario con los campos: Nombre completo, Celular, Email, Proyecto de interés, Mensaje y el botón de envío

#### Scenario: Textarea auto-resize

- **WHEN** el usuario escribe en el campo Mensaje
- **THEN** el textarea crece verticalmente para mostrar el contenido sin scrollbar interno

#### Scenario: Hover en botón submit

- **WHEN** el usuario hace hover sobre el botón "ENVIAR CONSULTA →"
- **THEN** el fondo cambia de ink (`#1E1E1E`) a accent (`#B59969`) con transición suave

---

### Requirement: Canales de contacto debajo del formulario

Debajo del formulario, separado por una línea divisoria, SHALL mostrarse una fila de 3 canales en formato icono + label + valor: WhatsApp (`+54 11 6596 2401`), Email (`Rigmagrupo@gmail.com`), Oficina (`Guardia Nacional 739, PB · CABA`).

#### Scenario: Los tres canales son visibles

- **WHEN** el usuario accede a `/contacto`
- **THEN** ve los tres canales con sus íconos SVG, labels en uppercase y valores de contacto

---

### Requirement: Imagen institucional a sangre en columna derecha

La columna derecha SHALL mostrar la imagen `img-2.jpg` a pantalla completa usando `next/image` con `fill`, sin padding en el borde exterior derecho.

#### Scenario: Imagen ocupa toda la columna derecha

- **WHEN** el viewport es mayor a `md`
- **THEN** la imagen ocupa el 100% del ancho y alto de la columna derecha sin espacios en los bordes exteriores
