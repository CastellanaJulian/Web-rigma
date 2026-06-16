import type { Metadata } from 'next'
import { getSiteSettings, getContactoPage, getAllProjects } from '@/sanity/queries'
import ContactoClient from './ContactoClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Hablemos. Consultá por nuestros proyectos y unidades disponibles. Escribinos por WhatsApp, email o acercate a nuestra oficina en CABA.',
}

export default async function ContactoPage() {
  const [settings, contacto, projects] = await Promise.all([getSiteSettings(), getContactoPage(), getAllProjects()])
  const formProjects = projects.map((p) => ({ slug: p.slug, title: p.title }))
  return <ContactoClient settings={settings} imagen={contacto?.imagen} projects={formProjects} />
}
