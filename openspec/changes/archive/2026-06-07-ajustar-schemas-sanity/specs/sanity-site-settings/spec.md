## ADDED Requirements

### Requirement: Singleton siteSettings con datos de contacto
El schema `siteSettings` SHALL ser un documento singleton con tres campos requeridos: `whatsapp` (string), `email` (string con validación de formato email), `direccion` (string). Todos con `validation: r.required()`.

#### Scenario: Validación de email
- **WHEN** el cliente ingresa un valor sin formato de email en el campo `email`
- **THEN** Sanity muestra error de validación y bloquea la publicación

#### Scenario: Datos centralizados
- **WHEN** el cliente actualiza el número de WhatsApp en siteSettings
- **THEN** el frontend puede usar ese valor tanto en el footer como en la página Contacto, sin duplicación
