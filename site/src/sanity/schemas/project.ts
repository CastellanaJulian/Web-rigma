import { defineField, defineType } from 'sanity'

// El orden de los campos sigue el flujo de la ficha pública (/proyectos/[slug]):
// Hero → Datos clave → Descripción + card → Galería → Planos → Ubicación → Siguiente proyecto.
export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    // ── 1. Hero ───────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Nombre',
      description: 'Corresponde a la dirección del proyecto (ej: "Cosquín 1534"). Se muestra como título grande en el hero.',
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
      description: 'Se muestra como etiqueta en el hero y en el mapa.',
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
      name: 'coverImage',
      title: 'Imagen de portada',
      description: 'Fondo del hero. Recomendado: 16:9, mínimo 1200px de ancho. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),

    // ── 2. Datos clave (tira debajo del hero) ─────────────────────────────────
    defineField({
      name: 'neighborhood',
      title: 'Ubicación',
      description: 'Barrio o zona. Se muestra en la tira de datos y como título de la sección del mapa. Ej: "Mataderos".',
      type: 'string',
    }),
    defineField({
      name: 'progress',
      title: 'Avance de obra',
      description: 'Solo si el estado es "En Ejecución". Se muestra como barra de progreso en la tira de datos.',
      type: 'number',
      validation: (r) => r.min(0).max(100),
      hidden: ({ document }) => document?.status !== 'En Ejecución',
    }),

    // ── 3. Descripción + card "Datos del proyecto" ────────────────────────────
    defineField({
      name: 'highlights',
      title: 'Datos del proyecto',
      description: 'Entrega y unidades disponibles salen en la tira de datos; el resto, en la card lateral de la descripción. Dejá vacío lo que no aplique.',
      type: 'object',
      options: { collapsible: false },
      fields: [
        { name: 'delivery', title: 'Entrega', type: 'string', description: 'Ej: "Diciembre 2026"' },
        { name: 'availableUnits', title: 'Unidades disponibles', type: 'number' },
        { name: 'startDate', title: 'Inicio de obra', type: 'string' },
        { name: 'totalSurface', title: 'M² totales', type: 'string' },
        { name: 'totalUnits', title: 'Total unidades', type: 'number' },
      ],
    }),
    defineField({
      name: 'typologies',
      title: 'Tipologías',
      description: 'Se listan en la card de datos. Ej: "4 ambientes 112 m²".',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      description: 'Texto principal de la ficha.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    // ── 4. Galería ────────────────────────────────────────────────────────────
    defineField({
      name: 'images',
      title: 'Galería (renders y obra)',
      description: 'Arrastrá varias imágenes a la vez para subirlas juntas. Arrastrá para reordenar.',
      type: 'array',
      options: { layout: 'grid' },
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // ── 5. Planos ─────────────────────────────────────────────────────────────
    defineField({
      name: 'plans',
      title: 'Planos',
      description: 'Se muestran en sección separada de la ficha. Cada plano puede llevar una leyenda de tipología (ej: "4 ambientes 112 m²").',
      type: 'array',
      options: { layout: 'grid' },
      of: [
        {
          type: 'object',
          name: 'plan',
          title: 'Plano',
          fields: [
            defineField({
              name: 'imagen',
              title: 'Imagen del plano',
              type: 'image',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'descripcion',
              title: 'Descripción / tipología',
              description: 'Ej: "4 ambientes 112 m²"',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'descripcion',
              media: 'imagen',
            },
            prepare({ title, media }) {
              return { title: title ?? 'Plano sin descripción', media }
            },
          },
        },
      ],
    }),

    // ── 6. Ubicación y zona ───────────────────────────────────────────────────
    defineField({
      name: 'coordinates',
      title: 'Ubicación en el mapa',
      description: 'Abrí Google Maps, click derecho sobre el edificio → copiá los dos números que aparecen (ej: -34.6540, -58.5015).',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitud', type: 'number', description: 'Primer número. Ej: -34.6540', validation: (r) => r.min(-90).max(90).error('La latitud debe estar entre -90 y 90. Revisá que el punto decimal esté bien.') },
        { name: 'lng', title: 'Longitud', type: 'number', description: 'Segundo número. Ej: -58.5015', validation: (r) => r.min(-180).max(180).error('La longitud debe estar entre -180 y 180. Revisá que el punto decimal esté bien.') },
      ],
    }),
    defineField({
      name: 'locationDescription',
      title: 'Descripción de la zona',
      description: 'Texto que acompaña al mapa.',
      type: 'text',
      rows: 3,
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
                { name: 'lat', title: 'Latitud', type: 'number', description: 'Primer número. Ej: -34.6522', validation: (r) => r.min(-90).max(90).error('La latitud debe estar entre -90 y 90. Revisá que el punto decimal esté bien.') },
                { name: 'lng', title: 'Longitud', type: 'number', description: 'Segundo número. Ej: -58.4983', validation: (r) => r.min(-180).max(180).error('La longitud debe estar entre -180 y 180. Revisá que el punto decimal esté bien.') },
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

    // ── 7. Siguiente proyecto ─────────────────────────────────────────────────
    defineField({
      name: 'relatedProject',
      title: 'Siguiente proyecto',
      description: 'Proyecto sugerido al pie de la ficha.',
      type: 'reference',
      to: [{ type: 'project' }],
    }),

    // ── Configuración ─────────────────────────────────────────────────────────
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
