## ADDED Requirements

### Requirement: Sección ContactCTA reutilizable al final de las páginas

El sitio SHALL tener un componente `ContactCTA` que se usa al final de Inicio, Proyectos, Ficha de proyecto y Nosotros. Muestra un llamado a la acción para ir a la página de Contacto.

Especificaciones visuales:
- Fondo oscuro (`ink`)
- Título grande: "¿Tenés alguna consulta?" (o similar)
- Subtítulo: texto secundario breve
- Botón primario que navega a `/contacto`
- Padding generoso: 80px vertical en desktop, 64px en mobile
- Ancho completo (sin contenedor limitado)

#### Scenario: Botón navega a contacto

- **WHEN** el usuario hace click en el botón del ContactCTA
- **THEN** navega a `/contacto` sin recargar la página

#### Scenario: Componente es reutilizable sin props

- **WHEN** cualquier página importa `<ContactCTA />`
- **THEN** se renderiza correctamente sin necesidad de pasar props — el contenido es fijo
