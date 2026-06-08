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
      description: 'Se genera automático. No tocar.',
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
      description: 'Recomendado: 16:9, mínimo 1200px de ancho. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Galería (renders y obra)',
      description: 'Arrastrá varias imágenes a la vez para subirlas juntas. Arrastrá para reordenar.',
      type: 'array',
      options: { layout: 'grid' },
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'plans',
      title: 'Planos',
      description: 'Arrastrá varios archivos a la vez para subirlos juntos. Se muestran en sección separada de la ficha del proyecto.',
      type: 'array',
      options: { layout: 'grid' },
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'locationDescription',
      title: 'Descripción de la zona',
      type: 'text',
      rows: 3,
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
      title: 'Ubicación en el mapa',
      description: 'Abrí Google Maps, click derecho sobre el edificio → copiá los dos números que aparecen (ej: -34.6540, -58.5015).',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitud', type: 'number', description: 'Primer número. Ej: -34.6540' },
        { name: 'lng', title: 'Longitud', type: 'number', description: 'Segundo número. Ej: -58.5015' },
      ],
    }),
    defineField({
      name: 'pointsOfInterest',
      title: 'Puntos de interés cercanos',
      description: 'Lugares destacados cerca del proyecto. Ej: transporte, salud, educación.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'poi',
          title: 'Punto de interés',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre',
              description: 'Ej: "Estación Mataderos", "Hospital Santojanni"',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'category',
              title: 'Categoría',
              type: 'string',
              options: {
                list: [
                  { title: 'Transporte', value: 'Transporte' },
                  { title: 'Salud', value: 'Salud' },
                  { title: 'Educación', value: 'Educación' },
                  { title: 'Comercio', value: 'Comercio' },
                ],
                layout: 'radio',
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'detail',
              title: 'Detalle',
              description: 'Ej: "5 min a pie", "10 min en auto"',
              type: 'string',
            }),
            defineField({
              name: 'coordinates',
              title: 'Ubicación',
              description: 'Abrí Google Maps, click derecho sobre el lugar → copiá los dos números (ej: -34.6522, -58.4983).',
              type: 'object',
              fields: [
                { name: 'lat', title: 'Latitud', type: 'number', description: 'Primer número. Ej: -34.6522' },
                { name: 'lng', title: 'Longitud', type: 'number', description: 'Segundo número. Ej: -58.4983' },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'category',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'relatedProject',
      title: 'Proyecto relacionado',
      description: 'Proyecto sugerido al pie de la ficha.',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'order',
      title: 'Orden manual',
      description: '1 aparece primero, 2 segundo, etc.',
      type: 'number',
      validation: (r) => r.min(1),
    }),
  ],
  orderings: [
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
      subtitle: 'status',
      media: 'coverImage',
    },
  },
})
