import { defineField, defineType } from 'sanity'

export const team = defineType({
  name: 'team',
  title: 'Equipo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      description: 'Ej: "Director", "Arquitecta", "Responsable de obra"',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Menor = aparece antes',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
