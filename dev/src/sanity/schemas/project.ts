import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'En Ejecución', value: 'En Ejecución' },
          { title: 'Terminado', value: 'Terminado' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'progress',
      title: 'Avance de obra (%)',
      description: 'Solo si el estado es "En Ejecución"',
      type: 'number',
      validation: (r) => r.min(0).max(100),
      hidden: ({ document }) => document?.status !== 'En Ejecución',
    }),
    defineField({
      name: 'location',
      title: 'Dirección',
      type: 'string',
    }),
    defineField({
      name: 'neighborhood',
      title: 'Barrio',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Galería (renders y obra)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'plans',
      title: 'Planos',
      description: 'Plantas del edificio y por unidad',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'highlights',
      title: 'Datos destacados',
      type: 'object',
      fields: [
        { name: 'totalSurface', title: 'M² totales', type: 'string' },
        { name: 'unitSurface', title: 'M² por unidad', type: 'string' },
        { name: 'totalUnits', title: 'Total de unidades', type: 'number' },
        { name: 'availableUnits', title: 'Unidades disponibles', type: 'number' },
        { name: 'floors', title: 'Pisos', type: 'number' },
        { name: 'delivery', title: 'Entrega', type: 'string', description: 'Ej: "Diciembre 2026"' },
        { name: 'startDate', title: 'Inicio de obra', type: 'string' },
      ],
    }),
    defineField({
      name: 'typologies',
      title: 'Tipologías',
      description: 'Ej: "4 ambientes 112 m²"',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities y terminaciones',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'financing',
      title: 'Financiación',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordenadas',
      type: 'geopoint',
    }),
    defineField({
      name: 'nearbyPoints',
      title: 'Puntos cercanos',
      description: 'Lugares de interés cerca del proyecto. Ej: "Subte línea A a 200m", "Plaza de los Mataderos a 3 cuadras"',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relatedProject',
      title: 'Proyecto relacionado',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'order',
      title: 'Orden manual',
      description: 'Menor = aparece antes en la grilla',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en Inicio',
      description: 'Si está activo, este proyecto aparece en el carrusel y en la sección de destacados de la home.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Destacados primero',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Estado (En Ejecución primero)',
      name: 'statusDesc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      featured: 'featured',
      media: 'coverImage',
    },
    prepare({ title, status, featured, media }) {
      return {
        title,
        subtitle: `${status ?? '—'}${featured ? ' · ★ Destacado' : ''}`,
        media,
      }
    },
  },
})
