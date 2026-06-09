import { getSiteSettings, getContactoPage } from '@/sanity/queries'
import ContactoClient from './ContactoClient'

export const revalidate = 60

export default async function ContactoPage() {
  const [settings, contacto] = await Promise.all([getSiteSettings(), getContactoPage()])
  return <ContactoClient settings={settings} imagen={contacto?.imagen} />
}
