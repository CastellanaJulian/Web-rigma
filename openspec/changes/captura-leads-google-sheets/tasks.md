## 1. Google Sheet + Apps Script (lo hace el dueño de la hoja — vos)

- [x] 1.1 En la hoja: `Extensiones → Apps Script`, pegar el `doPost()` de `design.md`, guardar
- [x] 1.2 `Implementar → Aplicación web` con `Ejecutar como: yo` y `Quién accede: Cualquiera`
- [x] 1.3 Copiar la URL `.../exec` del deploy
- [x] 1.4 (Al editar el script luego) usar `Gestionar implementaciones → editar → Nueva versión` para conservar la misma URL
- [x] 1.5 Verificado con POST de prueba: `{"ok":true}` HTTP 200, deploy `Ejecutar como: Yo` + `Acceso: Cualquier persona`

## 2. API route `/api/contact` (código)

- [x] 2.1 Crear `site/src/app/api/contact/route.ts` con handler `POST`
- [x] 2.2 Parsear y validar el body server-side (nombre, email, celular 8–15 dígitos, proyecto, mensaje)
- [x] 2.3 Honeypot: si `website` no está vacío → responder `{ ok: true }` sin escribir
- [x] 2.4 Mapear código de proyecto → etiqueta legible (fallback al valor crudo)
- [x] 2.5 `fetch(process.env.APPS_SCRIPT_URL)` con el payload; si la var falta → 502
- [x] 2.6 Responder 200/400/502 según el contrato de `design.md`

## 3. Formulario (código)

- [x] 3.1 En `ContactForm.tsx`, agregar el campo honeypot oculto `website`
- [x] 3.2 Reemplazar el `setTimeout` fake del `onSubmit` por `fetch('/api/contact', { method:'POST', body: JSON.stringify(data) })`
- [x] 3.3 Conservar `isLoading`, `submitError`, `onSuccess` y el scroll-to-anchor existentes; setear `submitError` si la respuesta no es `ok`

## 4. Variables de entorno

- [ ] 4.1 Vercel → proyecto `site/` → Settings → Environment Variables → `APPS_SCRIPT_URL` (Production + Preview + Development)
- [ ] 4.2 `Deployments → Redeploy` (la var no aplica a deploys existentes)
- [ ] 4.3 (Opcional, si se prueba en local) `site/.env.local` con `APPS_SCRIPT_URL=...` — verificar que `.env*` esté gitignored

## 5. Verificación end-to-end

- [ ] 5.1 En `rigma.com.ar/contacto`, enviar una consulta de prueba
- [ ] 5.2 Confirmar que aparece una fila en la hoja con fecha/hora, los 5 campos y el proyecto con nombre legible
- [ ] 5.3 Probar el honeypot: forzar `website` con valor → confirmar que NO se escribe fila
- [ ] 5.4 Probar validación: enviar sin email/celular inválido → 400 y sin fila
- [ ] 5.5 Confirmar que el deploy del Apps Script es accesible (acceso "Cualquiera"), no devuelve login

## 6. Handoff al cliente (al entregar)

- [ ] 6.1 El cliente crea/posee su hoja definitiva y deploya su propio `doPost()`
- [ ] 6.2 Reemplazar `APPS_SCRIPT_URL` en Vercel por la URL del cliente y redeployar
- [ ] 6.3 Envío de prueba final contra la hoja del cliente
