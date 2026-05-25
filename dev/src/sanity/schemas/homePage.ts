import { defineField, defineType, defineArrayMember } from 'sanity'

/**
 * Singleton: documento único que representa la configuración
 * de la página de Inicio. Solo se permite UN documento de este tipo
 * (se fuerza vía structure.ts con documentId fijo).
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Inicio',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredProjects',
      title: 'Proyectos destacados',
      description:
        'Grilla de proyectos que aparece en la página de Inicio. Arrastrá para reordenar. Cada slot tiene su propia imagen de portada (puede ser distinta de la imagen del proyecto).',
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
              description: 'El proyecto al que va a redirigir el card.',
              type: 'reference',
              to: [{ type: 'project' }],
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'coverImage',
              title: 'Imagen de portada',
              description:
                'Imagen que se muestra en la grilla del Inicio. Puede ser distinta de la imagen principal del proyecto.',
              type: 'image',
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: {
              title: 'project.title',
              subtitle: 'project.status',
              media: 'coverImage',
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
  ],
  preview: {
    prepare() {
      return { title: 'Página de Inicio' }
    },
  },
})
