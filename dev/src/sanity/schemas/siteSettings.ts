import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  // Singleton — solo se permite un documento (se fuerza en structure)
  fields: [
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    }),
    defineField({
      name: 'contact',
      title: 'Contacto',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Teléfono', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp', type: 'string' },
        { name: 'address', title: 'Dirección', type: 'string' },
        { name: 'instagram', title: 'Instagram (handle)', type: 'string' },
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Métricas institucionales',
      type: 'object',
      fields: [
        { name: 'builtSurface', title: 'M² construidos', type: 'string', description: 'Ej: "+32.000"' },
        { name: 'units', title: 'Unidades funcionales', type: 'string', description: 'Ej: "+220"' },
        { name: 'trajectory', title: 'Trayectoria', type: 'string', description: 'Ej: "+3 generaciones"' },
      ],
    }),
    defineField({
      name: 'aboutCopy',
      title: 'Sobre Rigma (historia)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'philosophy',
      title: 'Filosofía',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del sitio' }
    },
  },
})
