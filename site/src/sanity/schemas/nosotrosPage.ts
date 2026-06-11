import { defineField, defineType } from 'sanity'

export const nosotrosPage = defineType({
  name: 'nosotrosPage',
  title: 'Nosotros',
  type: 'document',
  fields: [
    defineField({
      name: 'imagenHistoria',
      title: 'Imagen — Historia',
      description: 'Recomendado: 16:9, mínimo 1200px de ancho. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imagenFilosofia',
      title: 'Imagen — Filosofía',
      description: 'Recomendado: 1:1, mínimo 800px. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imagenMasSobreNosotros',
      title: 'Imagen — Más sobre nosotros',
      description: 'Recomendado: 16:9 o más ancho, mínimo 1400px. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Página Nosotros' }
    },
  },
})
