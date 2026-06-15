import { defineField, defineType } from 'sanity'

export const nosotrosPage = defineType({
  name: 'nosotrosPage',
  title: 'Nosotros',
  type: 'document',
  fieldsets: [
    {
      name: 'snippet',
      title: 'Snippet — Inicio',
      description: 'Contenido que se muestra en la sección Nosotros de la página de inicio.',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ── Snippet (home) ────────────────────────────────────────────────────────
    defineField({
      name: 'snippetTitulo',
      title: 'Título del snippet',
      description: 'Ej: Tres generaciones construyendo en Buenos Aires',
      type: 'string',
      fieldset: 'snippet',
    }),
    defineField({
      name: 'snippetTexto',
      title: 'Texto del snippet',
      description: 'Párrafo que se muestra bajo el título en la home.',
      type: 'text',
      rows: 4,
      fieldset: 'snippet',
    }),
    defineField({
      name: 'metricaM2',
      title: 'M² construidos',
      description: 'Solo el número. Ej: 32000 → se muestra como +32.000 M² Construidos',
      type: 'number',
      fieldset: 'snippet',
    }),
    defineField({
      name: 'metricaUnidades',
      title: 'Unidades funcionales',
      description: 'Solo el número. Ej: 220 → se muestra como +220 Unidades Funcionales',
      type: 'number',
      fieldset: 'snippet',
    }),

    // ── Imágenes ──────────────────────────────────────────────────────────────
    defineField({
      name: 'imagenHistoria',
      title: 'Imagen — Historia',
      description: 'Recomendado: 16:9, mínimo 1200px de ancho. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imagenFilosofia',
      title: 'Imagen — Filosofía',
      description: 'Recomendado: 1:1, mínimo 800px. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imagenMasSobreNosotros',
      title: 'Imagen — Más sobre nosotros',
      description: 'Recomendado: 16:9 o más ancho, mínimo 1400px. Usá el punto focal para ajustar el recorte.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Página Nosotros' }
    },
  },
})
