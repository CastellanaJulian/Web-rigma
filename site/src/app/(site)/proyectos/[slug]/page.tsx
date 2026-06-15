import { getAllProjects, getProjectBySlug } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import type { Project } from '@/types/project'
import HeroSection from '@/components/sections/ficha/HeroSection'
import DescriptionSection from '@/components/sections/ficha/DescriptionSection'
import GaleriaSection from '@/components/sections/ficha/GaleriaSection'
import PlanosSection from '@/components/sections/ficha/PlanosSection'
import LocationSection from '@/components/sections/ficha/LocationSection'
import SiguienteProyecto from '@/components/sections/ficha/SiguienteProyecto'
import ContactSectionHome from '@/components/sections/home/ContactSectionHome'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

// ── KeyDataStrip ──────────────────────────────────────────────────────────────
function KeyDataStrip({ project }: { project: Project }) {
  const items = [
    project!.neighborhood && { label: 'Ubicación', value: project!.neighborhood },
    project!.highlights.delivery && { label: 'Entrega', value: project!.highlights.delivery },
    project!.highlights.availableUnits != null && { label: 'Unidades disponibles', value: String(project!.highlights.availableUnits) },
    project!.progress != null && { label: 'Avance de obra', value: `${project!.progress}%`, progress: project!.progress },
  ].filter(Boolean) as { label: string; value: string; progress?: number }[]

  if (items.length === 0) return null

  const n = items.length
  // border classes per item — 2-col en mobile/tablet, n-col en desktop (lg)
  const cellClass = (i: number) => {
    const classes: string[] = []
    // right border: en 2-col para celdas pares; en desktop para todas menos la última
    if (i % 2 === 0) classes.push('border-r', 'border-[#E9E9E9]')
    else if (i < n - 1) classes.push('lg:border-r', 'lg:border-[#E9E9E9]')
    // bottom border: solo en 2-col, primera fila cuando hay segunda fila
    if (n > 2 && i < 2) classes.push('border-b', 'border-[#E9E9E9]', 'lg:border-b-0')
    return classes.join(' ')
  }

  const lgCols = n <= 2 ? 'lg:grid-cols-2' : n === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'

  return (
    <div className={`grid grid-cols-2 ${lgCols}`} style={{ borderBottom: '1px solid #E9E9E9' }}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cellClass(i)}
          style={{ padding: '20px clamp(14px, 3vw, 40px)' }}
        >
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(30,30,30,0.45)', marginBottom: 6 }}>
            {item.label}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1E1E1E' }}>
            {item.value}
          </div>
          {item.progress != null && (
            <div style={{ marginTop: 8, height: 2, background: '#E9E9E9', borderRadius: 1 }}>
              <div style={{ height: '100%', width: `${item.progress}%`, background: '#B59969', borderRadius: 1, transition: 'width 0.6s ease' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function FichaProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getAllProjects()])

  if (!project) notFound()

  const formProjects = allProjects.map((p) => ({ slug: p.slug, title: p.title }))

  return (
    <>
      <HeroSection project={project} />
      <KeyDataStrip project={project} />
      <DescriptionSection project={project} />

      {project.images.length > 0 && (
        <GaleriaSection images={project.images} />
      )}

      {project.plans && project.plans.length > 0 && (
        <PlanosSection sections={project.plans} />
      )}

      {project.coordinates && (
        <LocationSection
          coordinates={project.coordinates}
          projectName={project.title}
          projectStatus={project.status}
          locationTitle={project.locationTitle ?? `${project.neighborhood ?? ''}, CABA`}
          locationDescription={project.locationDescription}
          pois={project.pointsOfInterest ?? []}
          barrio={project.barrio}
        />
      )}

      <div id="contacto">
        <ContactSectionHome projects={formProjects} />
      </div>

      {project.relatedProject && (
        <SiguienteProyecto project={project.relatedProject} />
      )}
    </>
  )
}
