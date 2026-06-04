## ADDED Requirements

### Requirement: Footer con información de empresa y links

El sitio SHALL tener un footer presente en todas las páginas con fondo oscuro (`ink`), que contenga: logo de Rigma, slogan, links de navegación, información de contacto (dirección, teléfono, email) y copyright.

Especificaciones visuales:
- Fondo: `#1E1E1E` (ink)
- Texto principal: blanco (`#FFFFFF`)
- Texto secundario: `rgba(255,255,255,0.65)`
- Logo: versión blanca
- Padding: 64px vertical, 56px horizontal en desktop
- Layout desktop: columnas con logo+slogan a la izquierda, links al centro, contacto a la derecha
- Layout mobile: columnas apiladas verticalmente

Datos a mostrar:
- Logo + slogan "Viví diferente, viví RIGMA"
- Links: Inicio, Proyectos, Nosotros, Contacto
- Dirección: Guardia Nacional 739, PB
- Teléfono: +54 11 6596 2401
- Email: Rigmagrupo@gmail.com
- Copyright: "© {año} Rigma Group. Todos los derechos reservados."

#### Scenario: Footer visible en todas las páginas

- **WHEN** el usuario navega a cualquier ruta del sitio
- **THEN** el footer aparece al final del contenido de la página

#### Scenario: Links del footer navegan correctamente

- **WHEN** el usuario hace click en un link del footer
- **THEN** navega a la ruta correspondiente sin recargar la página (client-side navigation)

#### Scenario: Año de copyright dinámico

- **WHEN** el sitio se renderiza en cualquier año
- **THEN** el copyright muestra el año actual, no un valor hardcodeado
