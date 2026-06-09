import HeroCarousel from '@/components/sections/home/HeroCarousel'
import ProyectosDestacados from '@/components/sections/home/ProyectosDestacados'
import NosotrosSnippet from '@/components/sections/home/NosotrosSnippet'
import PorQueSection from '@/components/sections/home/PorQueSection'
import ContactSectionHome from '@/components/sections/home/ContactSectionHome'
import { getHomePage } from '@/sanity/queries'

export const revalidate = 60

export default async function Home() {
  const home = await getHomePage()
  return (
    <>
      <HeroCarousel />
      <ProyectosDestacados />
      <NosotrosSnippet imagen={home?.imagenNosotros} />
      <PorQueSection />
      <ContactSectionHome />
    </>
  )
}
