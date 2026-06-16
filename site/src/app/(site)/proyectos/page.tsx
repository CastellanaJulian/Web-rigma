import type { Metadata } from 'next'
import { getAllProjects } from '@/sanity/queries'
import ProyectosClient from './ProyectosClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Conocé los proyectos de Rigma en CABA: edificios en ejecución y obras terminadas, con unidades funcionales pensadas para vivir diferente.',
}

export default async function ProyectosPage() {
  const projects = await getAllProjects()
  return <ProyectosClient projects={projects} />
}
