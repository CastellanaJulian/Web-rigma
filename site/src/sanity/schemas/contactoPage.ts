import { defineField, defineType } from 'sanity'

export const contactoPage = defineType({
  name: 'contactoPage',
  title: 'Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'imagen',
      title: 'Imagen institucional',
      description: 'Recomendado: vertical 3:4, mínimo 800px de ancho. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Página Contacto' }
    },
  },
})
