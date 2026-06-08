import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsapp',
      title: 'Teléfono / WhatsApp',
      description: 'Número con código de país. Ej: +54 11 6596 2401',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      validation: (r) =>
        r.required().custom((value) => {
          if (!value) return true
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(value) ? true : 'Ingresá un email válido'
        }),
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección de la oficina',
      description: 'Aparece en el footer y en la página de Contacto.',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del sitio' }
    },
  },
})
