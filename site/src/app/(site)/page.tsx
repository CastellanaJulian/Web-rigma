import HeroCarousel from '@/components/sections/home/HeroCarousel'
import ProyectosDestacados from '@/components/sections/home/ProyectosDestacados'
import NosotrosSnippet from '@/components/sections/home/NosotrosSnippet'
import PorQueSection from '@/components/sections/home/PorQueSection'
import ContactSectionHome from '@/components/sections/home/ContactSectionHome'
import { getNosotrosPage, getHeroSlides, getAllProjects } from '@/sanity/queries'

export const revalidate = 60

export default async function Home() {
  const [nosotros, heroSlides, projects] = await Promise.all([getNosotrosPage(), getHeroSlides(), getAllProjects()])
  const formProjects = projects.map((p) => ({ slug: p.slug, title: p.title }))
  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <ProyectosDestacados />
      <NosotrosSnippet imagen={nosotros?.imagenHistoria} />
      <PorQueSection />
      <ContactSectionHome projects={formProjects} />
    </>
  )
}
