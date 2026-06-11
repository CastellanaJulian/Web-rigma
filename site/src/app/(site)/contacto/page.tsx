import { getSiteSettings, getContactoPage, getAllProjects } from '@/sanity/queries'
import ContactoClient from './ContactoClient'

export const revalidate = 60

export default async function ContactoPage() {
  const [settings, contacto, projects] = await Promise.all([getSiteSettings(), getContactoPage(), getAllProjects()])
  const formProjects = projects.map((p) => ({ slug: p.slug, title: p.title }))
  return <ContactoClient settings={settings} imagen={contacto?.imagen} projects={formProjects} />
}
