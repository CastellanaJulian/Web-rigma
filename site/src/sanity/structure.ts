import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido del sitio')
    .items([
      S.listItem()
        .title('🏠 Inicio')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Inicio')
        ),

      S.listItem()
        .title('🏗️  Proyectos')
        .schemaType('project')
        .child(
          S.documentTypeList('project').title('Todos los proyectos')
        ),

      S.divider(),

      S.listItem()
        .title('👥 Nosotros')
        .id('nosotrosPage')
        .child(
          S.document()
            .schemaType('nosotrosPage')
            .documentId('nosotrosPage')
            .title('Nosotros')
        ),

      S.listItem()
        .title('📬 Contacto')
        .id('contacto')
        .child(
          S.list()
            .title('Contacto')
            .items([
              S.listItem()
                .title('📇 Datos de contacto')
                .id('siteSettings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Datos de contacto')
                ),

              S.listItem()
                .title('🖼️  Imagen institucional')
                .id('contactoPage')
                .child(
                  S.document()
                    .schemaType('contactoPage')
                    .documentId('contactoPage')
                    .title('Imagen institucional')
                ),
            ])
        ),
    ])
