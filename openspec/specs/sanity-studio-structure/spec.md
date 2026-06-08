## ADDED Requirements

### Requirement: Menú del Studio organizado por páginas del sitio
El `structure.ts` SHALL exponer el siguiente menú lateral, en orden: 🏠 Inicio (homePage singleton) / 🏗️ Proyectos (lista de documentos project) / divider / 👥 Nosotros (nosotrosPage singleton) / 📬 Contacto (contactoPage singleton) / divider / ⚙️ Configuración (siteSettings singleton). El ítem Equipo SHALL ser eliminado.

#### Scenario: Cliente ve menú por páginas
- **WHEN** el cliente abre el Studio
- **THEN** ve los ítems organizados por sección del sitio, sin nomenclatura técnica

### Requirement: Singletons sin lista de documentos
Los ítems Inicio, Nosotros, Contacto y Configuración SHALL abrir directamente el formulario de edición del documento único, sin mostrar una lista de documentos intermedia.

#### Scenario: Acceso directo al singleton
- **WHEN** el cliente hace clic en "⚙️ Configuración"
- **THEN** se abre directamente el formulario de siteSettings, no una lista
