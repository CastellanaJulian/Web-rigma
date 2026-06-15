import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { destacadoCategoriaOptions } from '../destacadoCategorias'
import { MultiImageUploadInput } from '../components/MultiImageUploadInput'

// El orden de los campos sigue el flujo de la ficha pública (/proyectos/[slug]):
// Hero → Info horizontal → Descripción → Datos (card) → Destacados → Galería →
// Planos → Ubicación → Siguiente proyecto.
// Los grupos se arman con `fieldsets` (agrupación visual): los campos quedan a
// nivel raíz del documento, sin anidar la data.
export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'infoHorizontal', title: 'Información horizontal', description: 'Tira de datos que se muestra debajo del hero.', options: { collapsible: true, collapsed: false } },
    { name: 'datos', title: 'Datos del proyecto (card)', description: 'Aparecen en la card lateral de la descripción.', options: { collapsible: true, collapsed: false } },
    { name: 'ubicacion', title: 'Ubicación', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // ── 1. Hero ───────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Nombre',
      description: 'Corresponde a la dirección del proyecto (ej: "Cosquín 1534"). Se muestra como título grande en el hero.',
      type: 'string',
      fieldset: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Se genera automático. No tocar.',
      type: 'slug',
      fieldset: 'hero',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      description: 'Fondo del hero. Recomendado: 16:9, mínimo 1200px de ancho. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      fieldset: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      description: 'Se muestra como etiqueta en el hero y en el mapa.',
      type: 'string',
      fieldset: 'hero',
      options: {
        list: [
          { title: 'En Ejecución', value: 'En Ejecución' },
          { title: 'Terminado', value: 'Terminado' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),

    // ── 2. Información horizontal (tira debajo del hero) ───────────────────────
    defineField({
      name: 'neighborhood',
      title: 'Ubicación',
      description: 'Barrio o zona. Se muestra en la tira de datos y como título de la sección del mapa. Ej: "Mataderos".',
      type: 'string',
      fieldset: 'infoHorizontal',
    }),
    defineField({
      name: 'delivery',
      title: 'Entrega',
      description: 'Ej: "Diciembre 2026". Se muestra en la tira de datos.',
      type: 'string',
      fieldset: 'infoHorizontal',
    }),
    defineField({
      name: 'availableUnits',
      title: 'Unidades disponibles',
      type: 'number',
      fieldset: 'infoHorizontal',
    }),
    defineField({
      name: 'progress',
      title: 'Avance de obra',
      description: 'Solo si el estado es "En Ejecución". Se muestra como barra de progreso en la tira de datos.',
      type: 'number',
      fieldset: 'infoHorizontal',
      validation: (r) => r.min(0).max(100),
      hidden: ({ document }) => document?.status !== 'En Ejecución',
    }),

    // ── 3. Descripción ──────────────────────────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Descripción',
      description: 'Texto principal de la ficha.',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // ── 4. Datos del proyecto (card lateral de la descripción) ─────────────────
    defineField({
      name: 'startDate',
      title: 'Inicio de obra',
      type: 'string',
      fieldset: 'datos',
    }),
    defineField({
      name: 'totalSurface',
      title: 'M² totales',
      type: 'string',
      fieldset: 'datos',
    }),
    defineField({
      name: 'totalUnits',
      title: 'Total unidades',
      type: 'number',
      fieldset: 'datos',
    }),
    defineField({
      name: 'typologies',
      title: 'Tipologías',
      description: 'Texto libre. Ej: "1, 2 y 3 ambientes".',
      type: 'string',
      fieldset: 'datos',
    }),

    // ── 5. Destacados del proyecto ──────────────────────────────────────────────
    defineField({
      name: 'destacados',
      title: 'Destacados del proyecto',
      description: 'Entre 3 y 6 destacados. Cada uno con título, descripción y una categoría que define el ícono.',
      type: 'array',
      validation: (r) => r.min(3).max(6),
      of: [
        {
          type: 'object',
          name: 'destacado',
          title: 'Destacado',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Título',
              description: 'Ej: "Terminaciones premium".',
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
            defineField({
              name: 'categoria',
              title: 'Categoría (ícono)',
              description: 'Define el ícono que se muestra en la web.',
              type: 'string',
              options: { list: destacadoCategoriaOptions, layout: 'dropdown' },
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'titulo', subtitle: 'categoria' },
          },
        },
      ],
    }),

    // ── 6. Galería ────────────────────────────────────────────────────────────
    defineField({
      name: 'images',
      title: 'Galería (renders y obra)',
      description: 'Mínimo 5 imágenes. Seleccioná varias a la vez desde el selector de archivos, o arrastralas juntas. Arrastrá para reordenar.',
      type: 'array',
      options: { layout: 'grid' },
      validation: (r) => r.min(5).warning('Se recomiendan al menos 5 imágenes en la galería.'),
      of: [{ type: 'image', options: { hotspot: true } }],
      components: { input: MultiImageUploadInput },
    }),

    // ── 7. Planos (organizados en secciones desplegables) ──────────────────────
    defineField({
      name: 'plans',
      title: 'Planos',
      description: 'Creá una sección por tipología (ej: "2 ambientes") y dentro cargá los planos que le corresponden. Cada sección es un desplegable en la web.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'planSection',
          title: 'Sección de planos',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Título de la sección',
              description: 'Ej: "2 ambientes", "Tipología A".',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'planos',
              title: 'Planos de la sección',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'plano',
                  title: 'Plano',
                  fields: [
                    defineField({
                      name: 'titulo',
                      title: 'Título del plano',
                      description: 'Ej: "Planta", "Corte".',
                      type: 'string',
                    }),
                    defineField({
                      name: 'descripcion',
                      title: 'Descripción',
                      description: 'Ej: 45m² totales.',
                      type: 'string',
                    }),
                    defineField({
                      name: 'imagen',
                      title: 'Imagen del plano',
                      type: 'image',
                      validation: (r) => r.required(),
                    }),
                  ],
                  preview: {
                    select: { title: 'titulo', media: 'imagen' },
                    prepare({ title, media }) {
                      return { title: title ?? 'Plano', media }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'titulo', planos: 'planos' },
            prepare({ title, planos }) {
              const n = Array.isArray(planos) ? planos.length : 0
              return { title: title ?? 'Sección', subtitle: `${n} plano${n !== 1 ? 's' : ''}` }
            },
          },
        },
      ],
    }),

    // ── 8. Ubicación y zona ───────────────────────────────────────────────────
    defineField({
      name: 'locationTitle',
      title: 'Título de ubicación',
      description: 'Encabezado que se muestra en la sección del mapa. Ej: Mataderos, CABA',
      type: 'string',
      fieldset: 'ubicacion',
    }),
    defineField({
      name: 'barrio',
      title: 'Barrio (polígono del mapa)',
      description: 'Nombre del barrio que delimita el área resaltada en el mapa. Debe coincidir con un barrio reconocido por OpenStreetMap. Ej: Mataderos. Si se deja vacío, no se dibuja el área.',
      type: 'string',
      fieldset: 'ubicacion',
    }),
    defineField({
      name: 'coordinates',
      title: 'Ubicación del proyecto',
      description: 'Alimenta el mapa de la ficha y también el mapa de la página /proyectos. Abrí Google Maps, click derecho sobre el edificio → copiá los dos números (ej: -34.6540, -58.5015).',
      type: 'object',
      fieldset: 'ubicacion',
      fields: [
        { name: 'lat', title: 'Latitud', type: 'number', description: 'Primer número. Ej: -34.6540', validation: (r) => r.min(-90).max(90).error('La latitud debe estar entre -90 y 90. Revisá que el punto decimal esté bien.') },
        { name: 'lng', title: 'Longitud', type: 'number', description: 'Segundo número. Ej: -58.5015', validation: (r) => r.min(-180).max(180).error('La longitud debe estar entre -180 y 180. Revisá que el punto decimal esté bien.') },
      ],
    }),
    defineField({
      name: 'locationDescription',
      title: 'Descripción de la zona',
      description: 'Texto que acompaña al mapa de la ficha.',
      type: 'text',
      fieldset: 'ubicacion',
      rows: 3,
    }),
    defineField({
      name: 'pointsOfInterest',
      title: 'Puntos de interés cercanos',
      description: 'Lugares destacados cerca del proyecto. Ej: transporte, salud, educación.',
      type: 'array',
      fieldset: 'ubicacion',
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
                  { title: 'Espacios verdes', value: 'Espacios verdes' },
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

    // ── 9. Siguiente proyecto ─────────────────────────────────────────────────
    defineField({
      name: 'relatedProject',
      title: 'Siguiente proyecto',
      description: 'Proyecto sugerido al pie de la ficha.',
      type: 'reference',
      to: [{ type: 'project' }],
    }),

    // ── Orden (drag & drop desde la lista) ─────────────────────────────────────
    // Campo oculto que gestiona el plugin @sanity/orderable-document-list.
    // El orden se cambia arrastrando los proyectos en la lista del Studio.
    orderRankField({ type: 'project' }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'coverImage',
    },
  },
})
