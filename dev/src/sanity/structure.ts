import type { StructureResolver } from 'sanity/structure'

/**
 * Menú lateral del Studio organizado por PÁGINAS del sitio público,
 * no por tipos de contenido.
 *
 * Las páginas que no tienen contenido dinámico (Nosotros, Contacto)
 * no aparecen acá — su copy vive en el código.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido del sitio')
    .items([
      // ─────── 🏠 INICIO ───────
      S.listItem()
        .title('🏠 Inicio')
        .child(
          S.documentList()
            .title('Inicio · Proyectos destacados')
            .schemaType('project')
            .filter('_type == "project" && featured == true')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ─────── 🏗️ PROYECTOS ───────
      S.listItem()
        .title('🏗️  Proyectos')
        .child(
          S.list()
            .title('Proyectos')
            .items([
              S.listItem()
                .title('Todos los proyectos')
                .schemaType('project')
                .child(
                  S.documentTypeList('project').title('Todos los proyectos')
                ),

              S.divider(),

              S.listItem()
                .title('⚡ En Ejecución')
                .schemaType('project')
                .child(
                  S.documentList()
                    .title('En Ejecución')
                    .schemaType('project')
                    .filter('_type == "project" && status == "En Ejecución"')
                ),

              S.listItem()
                .title('✅ Terminados')
                .schemaType('project')
                .child(
                  S.documentList()
                    .title('Terminados')
                    .schemaType('project')
                    .filter('_type == "project" && status == "Terminado"')
                ),

              S.listItem()
                .title('★ Destacados (aparecen en Inicio)')
                .schemaType('project')
                .child(
                  S.documentList()
                    .title('Destacados')
                    .schemaType('project')
                    .filter('_type == "project" && featured == true')
                ),
            ])
        ),
    ])
