import { projects } from '@/data/projects'
import ContactCTA from '@/components/shared/ContactCTA'

export default function ProyectosPage() {
  return (
    <>
      {/* Header */}
      <section>{/* Header — diseño pendiente */}</section>

      {/* Filtros */}
      <section>{/* Filtros: Todos / En Ejecución / Terminados — diseño pendiente */}</section>

      {/* Grilla de proyectos */}
      <section>
        {projects.map((project) => (
          <div key={project.slug}>
            {/* ProjectCard — diseño pendiente */}
            <p>{project.title} — {project.status}</p>
          </div>
        ))}
      </section>

      <ContactCTA />
    </>
  )
}
