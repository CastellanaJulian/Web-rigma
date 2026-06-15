import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Inicio',
  type: 'document',
  fields: [
    // ── Hero ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroTitulo',
      title: 'Título del hero',
      description: 'Título grande que se muestra sobre las imágenes del carrusel. Ej: Construimos espacios que perduran',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitulo',
      title: 'Subtítulo del hero',
      description: 'Texto secundario debajo del título. Ej: Proyectos terminados y en ejecución en Buenos Aires con diseño funcional...',
      type: 'text',
      rows: 3,
    }),

    // ── Por qué elegirnos ─────────────────────────────────────────────────────
    defineField({
      name: 'pilares',
      title: 'Por qué elegirnos — 4 pilares',
      description: 'Exactamente 4 pilares. Los íconos se asignan automáticamente por posición.',
      type: 'array',
      validation: (r) => r.min(4).max(4),
      of: [
        {
          type: 'object',
          name: 'pilar',
          title: 'Pilar',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Título',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'descripcion',
              title: 'Descripción',
              type: 'text',
              rows: 2,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'titulo', subtitle: 'descripcion' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Inicio' }
    },
  },
})
