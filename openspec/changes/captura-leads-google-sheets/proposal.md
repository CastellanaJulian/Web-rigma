## Why

El formulario de contacto ([ContactForm.tsx](../../../site/src/components/shared/ContactForm.tsx)) hoy **simula** el envío: el `onSubmit` espera 1.5s y muestra éxito sin persistir nada (`// Simula envío — reemplazar con llamada real a API en Etapa 3`). Los leads se pierden.

El cliente necesita una herramienta simple para ver y gestionar las consultas que llegan. Una **Google Sheet** es ideal: la conoce, la puede ordenar/filtrar/exportar, y puede ser dueño de su propia data sin depender de un panel custom. El plan original (email vía Resend) queda para más adelante; la API route que se construye acá es el punto de extensión natural para sumarlo sin reescribir nada.

Decisión de arquitectura (tomada en explore): **Apps Script (Web App)** en vez de Service Account + Sheets API. Razón: cero setup de GCP, sin credenciales que custodiar (solo una URL), suficiente para el volumen de un form institucional. El nudo de transferencia de propiedad de Apps Script se evita haciendo que el deploy nazca del lado correcto (el cliente deploya y pasa su URL, o se desarrolla contra una hoja propia y se migra cambiando una env var).

## What Changes

- **Apps Script `doPost()`** en la Google Sheet del cliente: recibe el JSON del lead y hace `appendRow()` con 6 columnas. Deploy como Web App (`Ejecutar como: dueño`, `Quién accede: Cualquiera`). Provisto listo para copiar en `design.md`.
- **Nueva API route `POST /api/contact`** (server-side): valida los campos, chequea el honeypot, mapea el código de proyecto a su etiqueta legible, hace `fetch` a la URL del Apps Script y responde `{ ok }`. Actúa de proxy → mata CORS, oculta la URL y es el punto donde se filtra spam.
- **Honeypot anti-spam** en `ContactForm.tsx`: campo oculto (`website`) que los humanos dejan vacío y los bots completan. Si viene con contenido, la API descarta el envío silenciosamente.
- **Conectar el `onSubmit` real** del form: reemplazar el `setTimeout` fake por un `fetch('/api/contact')`, conservando los estados `isLoading` / `submitError` / `onSuccess` ya existentes.
- **Env var `APPS_SCRIPT_URL`** (sin `NEXT_PUBLIC_`): la URL `/exec` del deploy. Se configura en Vercel (Production + Preview + Dev).

**Fuera de alcance:** email vía Resend (etapa posterior), time-trap y rate-limit (se suman solo si aparece spam real), columnas extra "Origen" / "Estado" (se eligió hoja de 6 columnas).

## Capabilities

### Added Capabilities

- `captura-leads`: El formulario de contacto persiste cada consulta como una fila en una Google Sheet vía Apps Script, con validación server-side y protección anti-spam por honeypot.

## Impact

- `site/src/app/api/contact/route.ts` — **nuevo** (API route server-side)
- `site/src/components/shared/ContactForm.tsx` — honeypot + `onSubmit` real
- `site/.env.local` (gitignored) y **Vercel env vars** — `APPS_SCRIPT_URL`
- Google Sheet del cliente — script `doPost()` + deploy como Web App (acción manual del dueño)
- Sin dependencias npm nuevas
