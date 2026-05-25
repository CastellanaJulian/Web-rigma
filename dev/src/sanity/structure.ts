import type { StructureResolver } from 'sanity/structure'

/**
 * Menú lateral del Studio organizado por PÁGINAS del sitio público.
 *
 * Las páginas sin contenido dinámico (Nosotros, Contacto) no aparecen acá —
 * su copy vive en el código.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido del sitio')
    .items([
      // ─────── 🏠 INICIO (singleton) ───────
      S.listItem()
        .title('🏠 Inicio')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Inicio')
        ),

      S.divider(),

      // ─────── 🏗️ PROYECTOS ───────
      S.listItem()
        .title('🏗️  Proyectos')
        .schemaType('project')
        .child(
          S.documentTypeList('project').title('Todos los proyectos')
        ),
    ])
