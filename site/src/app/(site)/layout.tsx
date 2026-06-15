import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { getSiteSettings } from '@/sanity/queries'

const FALLBACK_WA = '+54 11 6596 2401'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const whatsapp = settings?.whatsapp ?? FALLBACK_WA

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton whatsapp={whatsapp} />
    </>
  )
}
