import HeroCarousel from '@/components/sections/home/HeroCarousel'
import ProyectosDestacados from '@/components/sections/home/ProyectosDestacados'
import NosotrosSnippet from '@/components/sections/home/NosotrosSnippet'
import PorQueSection from '@/components/sections/home/PorQueSection'
import ContactSectionHome from '@/components/sections/home/ContactSectionHome'
import type { Metadata } from 'next'
import { getNosotrosPage, getHeroSlides, getAllProjects, getHomePage } from '@/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  description:
    'Rigma es una desarrolladora inmobiliaria familiar con tres generaciones de trayectoria. Construimos espacios multifuncionales en CABA. Viví diferente, viví RIGMA.',
}

export default async function Home() {
  const [nosotros, heroSlides, projects, homePage] = await Promise.all([
    getNosotrosPage(),
    getHeroSlides(),
    getAllProjects(),
    getHomePage(),
  ])
  const formProjects = projects.map((p) => ({ slug: p.slug, title: p.title }))
  return (
    <>
      <HeroCarousel
        slides={heroSlides}
        heroTitulo={homePage?.heroTitulo}
        heroSubtitulo={homePage?.heroSubtitulo}
      />
      <ProyectosDestacados />
      <NosotrosSnippet
        imagen={nosotros?.imagenHistoria}
        snippetTitulo={nosotros?.snippetTitulo}
        snippetTexto={nosotros?.snippetTexto}
        metricaM2={nosotros?.metricaM2}
        metricaUnidades={nosotros?.metricaUnidades}
      />
      <PorQueSection pilares={homePage?.pilares} />
      <ContactSectionHome projects={formProjects} />
    </>
  )
}
