## Flujo de punta a punta

```
  Visitante completa el form (ContactForm.tsx)
        │  POST JSON { nombre, celular, email, proyecto, mensaje, website }
        ▼
  /api/contact   (server, en Vercel — nunca el browser le pega a Google)
        │  1. valida campos requeridos
        │  2. honeypot: si `website` != "" → ok:true SIN escribir (descarta bot)
        │  3. mapea proyecto: "cosquin" → "Cosquín 1534"
        │  4. fetch(APPS_SCRIPT_URL, POST JSON)
        ▼
  Apps Script doPost()  →  appendRow()
        ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │ Fecha/Hora │ Nombre │ Celular │ Email │ Proyecto │ Mensaje        │
  └──────────────────────────────────────────────────────────────────┘
```

Por qué la API route en el medio (y no browser → Apps Script directo):

- **CORS:** los Web Apps de Apps Script no devuelven bien los headers CORS para `fetch` desde el browser. Server → server no tiene CORS.
- **Oculta la URL:** sin `NEXT_PUBLIC_`, la URL `/exec` nunca llega al cliente.
- **Anti-spam:** es el lugar natural para chequear el honeypot antes de escribir.

## El script `doPost()` (para pegar en la Sheet)

`Extensiones → Apps Script` en la hoja, pegar esto, guardar, y `Implementar → Aplicación web` (`Ejecutar como: yo`, `Quién accede: Cualquiera`):

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Apunta SIEMPRE a la pestaña "Leads", esté donde esté (robusto al
    // reordenar pestañas). Si no existe, la crea. El cliente puede agregar
    // otras pestañas y columnas (de la G en adelante) sin romper nada.
    var sheet = ss.getSheetByName('Leads');
    if (!sheet) {
      sheet = ss.insertSheet('Leads');
    }

    // Encabezados la primera vez (si la pestaña está vacía)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Fecha/Hora', 'Nombre', 'Celular', 'Email', 'Proyecto', 'Mensaje']);
    }

    sheet.appendRow([
      new Date(),
      data.nombre || '',
      data.celular || '',
      data.email || '',
      data.proyecto || '',
      data.mensaje || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

> El `proyecto` llega ya convertido a etiqueta legible desde la API route; el script no mapea nada.

## Contrato de `/api/contact`

```
  POST /api/contact
  Content-Type: application/json
  Body: { nombre, celular, email, proyecto, mensaje, website }

  → 200 { ok: true }    envío válido escrito (o honeypot descartado silenciosamente)
  → 400 { ok: false }   validación fallida (campos faltantes/ inválidos)
  → 502 { ok: false }   Apps Script no respondió ok / APPS_SCRIPT_URL ausente
```

Mapeo de proyecto (código del `<select>` → etiqueta para la hoja):

```ts
const PROYECTOS: Record<string, string> = {
  cosquin: 'Cosquín 1534',
  larrazabal: 'Av. Larrazábal 1255',
  zelada: 'Zelada 6171',
  otro: 'Otro / No sé aún',
}
// fallback: si el código no está en el map, se guarda el valor crudo
```

Notas de implementación:
- **Reintento:** Apps Script tira un `500` transitorio cada tanto ("JavaScript runtime ended unexpectedly") — observado en las pruebas. La route reintenta **una vez** (espera 400ms) antes de devolver 502, para no perder leads reales por un hipo de Google.
- La key de Apps Script va en `process.env.APPS_SCRIPT_URL`. Si falta → 502 (no 500 silencioso) para diagnosticar rápido.
- Al hacer `fetch` al Apps Script, mandar `Content-Type: text/plain` (o sin header de tipo) suele evitar el redirect de Google a una página de confirmación; `e.postData.contents` igual recibe el body. Validar en la prueba e2e.
- Validación server-side espejo de la del form: `nombre`, `celular` (8–15 dígitos), `email` (regex), `proyecto`, `mensaje` requeridos.

## Honeypot

Campo extra en el form, oculto con CSS (no `type=hidden`, que algunos bots saltean; un input visualmente oculto pero "real" atrapa mejor):

```
  <input name="website" tabIndex={-1} autoComplete="off"
         style={{ position:'absolute', left:'-9999px', opacity:0, height:0 }} />
```

- Humano: no lo ve → lo deja vacío.
- Bot: completa todos los campos → lo llena.
- API: si `website` tiene algo → responde `ok:true` (para no avisarle al bot) pero **no escribe** la fila.

## Decisión: Apps Script vs Service Account

| | Apps Script (elegido) | Service Account |
|---|---|---|
| Setup | ~15 min, sin GCP | ~40 min, GCP + API + key |
| Credenciales | una URL | private key JSON en env |
| Transferir hoja al cliente | frágil si se transfiere DESPUÉS de deployar | desacoplado |
| Volumen form institucional | sobra | sobra |

Se eligió Apps Script por simplicidad. El riesgo de transferencia se neutraliza con el flujo de handoff (ver abajo), no deployando-y-transfiriendo.

## Handoff de propiedad

```
  Desarrollo:  hoja propia → deploy propio → URL propia → env var
  Entrega:     el cliente crea/posee su hoja → deploya su script
               → te pasa SU url /exec → cambiás la env var en Vercel
```

Como el código solo conoce *una URL*, migrar de la hoja de prueba a la del cliente es cambiar `APPS_SCRIPT_URL` y redeployar. Cero cambios de código.

## Alternativas consideradas

- **Browser → Apps Script directo (sin API route):** rechazado por CORS, exposición de la URL y falta de punto anti-spam.
- **Service Account + Sheets API:** rechazado por overhead de GCP/credenciales para un beneficio (desacople de propiedad) que el flujo de handoff ya cubre.
- **CAPTCHA:** rechazado por ahora; mete fricción al lead real. El honeypot cubre el 95% de los bots. Se escala a time-trap/rate-limit solo si aparece spam.
