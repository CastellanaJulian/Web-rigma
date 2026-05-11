import { projects, getProjectBySlug } from '@/data/projects'
import { notFound } from 'next/navigation'
import ContactCTA from '@/components/shared/ContactCTA'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function FichaProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <>
      {/* Hero */}
      <section>{/* Hero: {project.title} — diseño pendiente */}</section>

      {/* Información clave */}
      <section>{/* Ubicación, estado, tipologías, entrega — diseño pendiente */}</section>

      {/* Descripción */}
      <section>{/* Descripción + highlights — diseño pendiente */}</section>

      {/* Galería */}
      <section>{/* Galería de renders — diseño pendiente */}</section>

      {/* Planos */}
      <section>{/* Planos — diseño pendiente */}</section>

      {/* Ubicación */}
      <section>{/* Google Maps embed — diseño pendiente */}</section>

      {/* Proyecto relacionado */}
      <section>{/* Siguiente proyecto — diseño pendiente */}</section>

      <ContactCTA />
    </>
  )
}
