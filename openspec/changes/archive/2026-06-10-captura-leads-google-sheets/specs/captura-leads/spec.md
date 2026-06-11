## ADDED Requirements

### Requirement: Persistencia de leads en Google Sheet

El formulario de contacto SHALL persistir cada consulta enviada como una fila en una Google Sheet, a través de una API route server-side (`POST /api/contact`) que reenvía los datos a un Web App de Apps Script. La fila SHALL contener 6 columnas en orden: Fecha/Hora, Nombre, Celular, Email, Proyecto, Mensaje. La columna Fecha/Hora SHALL generarse en el servidor (no provista por el usuario). El navegador NO SHALL comunicarse directamente con Google: solo con `/api/contact`.

#### Scenario: Envío válido se registra
- **WHEN** un visitante completa los campos requeridos y envía el formulario
- **THEN** `/api/contact` valida, reenvía al Apps Script, se agrega una fila con la fecha/hora del servidor y los 5 campos, y el formulario muestra el estado de éxito

#### Scenario: La URL del Apps Script no es pública en el cliente
- **WHEN** se inspecciona el bundle del navegador o la pestaña de red
- **THEN** la URL `/exec` del Apps Script no aparece (vive solo en `process.env.APPS_SCRIPT_URL`, server-side)

### Requirement: Etiqueta legible del proyecto

La API route SHALL convertir el código del proyecto del `<select>` (`cosquin`, `larrazabal`, `zelada`, `otro`) a su etiqueta legible (`Cosquín 1534`, `Av. Larrazábal 1255`, `Zelada 6171`, `Otro / No sé aún`) antes de escribir en la hoja. Si el código no está en el mapa, SHALL escribir el valor crudo recibido.

#### Scenario: Proyecto guardado con nombre legible
- **WHEN** el visitante selecciona "Cosquín 1534" (value `cosquin`) y envía
- **THEN** la columna Proyecto de la hoja muestra "Cosquín 1534", no "cosquin"

### Requirement: Validación server-side

La API route SHALL validar los campos en el servidor con las mismas reglas que el formulario: `nombre`, `email` (formato válido), `celular` (8 a 15 dígitos), `proyecto` y `mensaje` requeridos. Ante validación fallida SHALL responder 400 sin escribir en la hoja.

#### Scenario: Envío sin campos requeridos se rechaza
- **WHEN** llega un POST a `/api/contact` sin `email` o con un celular inválido
- **THEN** responde 400 `{ ok: false }` y no se agrega ninguna fila

### Requirement: Protección anti-spam por honeypot

El formulario SHALL incluir un campo honeypot oculto (`website`) que no es visible para usuarios humanos. La API route SHALL descartar silenciosamente cualquier envío con el honeypot completo: responde `{ ok: true }` (para no señalar la detección al bot) pero NO SHALL escribir la fila.

#### Scenario: Bot completa el honeypot
- **WHEN** llega un POST con el campo `website` no vacío
- **THEN** la respuesta es `{ ok: true }` pero no se agrega ninguna fila a la hoja

#### Scenario: Humano deja el honeypot vacío
- **WHEN** un usuario real envía el formulario (el campo `website` queda vacío)
- **THEN** el envío se procesa normalmente y se registra la fila

### Requirement: Configuración por variable de entorno

La URL del Web App de Apps Script SHALL leerse de `APPS_SCRIPT_URL` (sin prefijo `NEXT_PUBLIC_`). Si la variable está ausente, la API route SHALL responder 502 `{ ok: false }` en lugar de fallar silenciosamente, para facilitar el diagnóstico.

#### Scenario: Variable de entorno ausente
- **WHEN** `/api/contact` recibe un envío válido pero `APPS_SCRIPT_URL` no está configurada
- **THEN** responde 502 `{ ok: false }` y el formulario muestra el estado de error
