import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol o relación',
      description: 'Ej: "Comprador Cosquín 1534"',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonio',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'projectRef',
      title: 'Proyecto relacionado',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
    },
  },
})
