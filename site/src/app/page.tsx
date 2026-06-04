import HeroCarousel from '@/components/sections/home/HeroCarousel'
import ProyectosDestacados from '@/components/sections/home/ProyectosDestacados'
import NosotrosSnippet from '@/components/sections/home/NosotrosSnippet'
import PorQueSection from '@/components/sections/home/PorQueSection'
import ContactSectionHome from '@/components/sections/home/ContactSectionHome'

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <ProyectosDestacados />
      <NosotrosSnippet />
      <PorQueSection />
      <ContactSectionHome />
    </>
  )
}
