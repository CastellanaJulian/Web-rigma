import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Contenido del sitio')
    .items([
      // Lista ordenable por drag & drop: el orden se guarda en `orderRank`
      // y define /proyectos, los destacados del home (top 2) y el hero (top 4).
      orderableDocumentListDeskItem({
        type: 'project',
        title: '🏗️  Proyectos',
        S,
        context,
      }),

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
