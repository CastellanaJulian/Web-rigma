import { projects, getProjectBySlug } from '@/data/projects'
import { notFound } from 'next/navigation'
import HeroSection from '@/components/sections/ficha/HeroSection'
import DescriptionSection from '@/components/sections/ficha/DescriptionSection'
import GaleriaSection from '@/components/sections/ficha/GaleriaSection'
import PlanosSection from '@/components/sections/ficha/PlanosSection'
import LocationSection from '@/components/sections/ficha/LocationSection'
import ProjectCard from '@/components/shared/ProjectCard'
import ContactSectionHome from '@/components/sections/home/ContactSectionHome'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

// ── KeyDataStrip ──────────────────────────────────────────────────────────────
function KeyDataStrip({ project }: { project: ReturnType<typeof getProjectBySlug> & {} }) {
  const items = [
    project!.location && { label: 'Ubicación', value: project!.neighborhood ?? project!.location },
    project!.highlights.delivery && { label: 'Entrega', value: project!.highlights.delivery },
    project!.highlights.availableUnits != null && { label: 'Unidades disponibles', value: String(project!.highlights.availableUnits) },
    project!.progress != null && { label: 'Avance de obra', value: `${project!.progress}%`, progress: project!.progress },
  ].filter(Boolean) as { label: string; value: string; progress?: number }[]

  if (items.length === 0) return null

  return (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid #E9E9E9',
    }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: '20px clamp(16px, 3vw, 40px)',
            borderRight: i < items.length - 1 ? '1px solid #E9E9E9' : undefined,
          }}
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

// ── ProyectoRelacionado ───────────────────────────────────────────────────────
function ProyectoRelacionado({ slug }: { slug: string }) {
  const related = getProjectBySlug(slug)
  if (!related) return null

  return (
    <section style={{ padding: '80px clamp(20px, 5vw, 56px)', borderTop: '1px solid #E9E9E9' }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(30,30,30,0.45)', marginBottom: 24 }}>
        También te puede interesar
      </div>
      <div style={{ height: 460 }}>
        <ProjectCard project={related} size="lg" className="h-full" />
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function FichaProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <>
      <HeroSection project={project} />
      <KeyDataStrip project={project} />
      <DescriptionSection project={project} />

      {project.images.length > 0 && (
        <GaleriaSection images={project.images} />
      )}

      {project.plans && project.plans.length > 0 && (
        <PlanosSection plans={project.plans} typologies={project.typologies} />
      )}

      {project.coordinates && (
        <LocationSection
          coordinates={project.coordinates}
          projectName={project.title}
          projectStatus={project.status}
          pois={project.pointsOfInterest ?? []}
        />
      )}

      {project.relatedProject && (
        <ProyectoRelacionado slug={project.relatedProject} />
      )}

      <div id="contacto">
        <ContactSectionHome />
      </div>
    </>
  )
}
