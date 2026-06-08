import { defineField, defineType, defineArrayMember } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Inicio',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredProjects',
      title: 'Proyectos destacados',
      description:
        'Grilla de proyectos que aparece en la página de Inicio. Arrastrá para reordenar.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'featuredSlot',
          title: 'Slot destacado',
          fields: [
            defineField({
              name: 'project',
              title: 'Proyecto',
              description: 'El proyecto al que va a redirigir el card. La imagen se toma del proyecto.',
              type: 'reference',
              to: [{ type: 'project' }],
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: {
              title: 'project.title',
              subtitle: 'project.status',
              media: 'project.coverImage',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title ?? '(Proyecto sin nombre)',
                subtitle: subtitle ?? 'Sin estado',
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'imagenNosotros',
      title: 'Imagen — Snippet Nosotros',
      description: 'Recomendado: 4:3, mínimo 1000px de ancho. Aparece en el snippet de Nosotros en el Inicio. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Página de Inicio' }
    },
  },
})
