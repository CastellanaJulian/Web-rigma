import Link from 'next/link'
import { getFeaturedProjects } from '@/sanity/queries'
import SectionLabel from '@/components/shared/SectionLabel'
import ProjectCard from '@/components/shared/ProjectCard'

export default async function ProyectosDestacados() {
  const featured = await getFeaturedProjects()

  if (featured.length === 0) return null

  return (
    <section style={{ padding: 'clamp(48px, 9vw, 120px) clamp(20px, 5vw, 56px)' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 24,
          marginBottom: 52,
        }}
      >
        <div>
          <SectionLabel>Proyectos destacados</SectionLabel>
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#1E1E1E',
              lineHeight: 1,
            }}
          >
            Nuestros desarrollos
          </h2>
        </div>
        <Link
          href="/proyectos"
          className="hover-accent-link hidden md:block"
          style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}
        >
          Ver todos los proyectos
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} className="h-[460px]" />
        ))}
      </div>

      <div className="block md:hidden" style={{ marginTop: 48 }}>
        <Link
          href="/proyectos"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '14px 24px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#1E1E1E',
            border: '1px solid #1E1E1E',
            borderRadius: 2,
            textDecoration: 'none',
          }}
        >
          Ver todos los proyectos
        </Link>
      </div>
    </section>
  )
}
