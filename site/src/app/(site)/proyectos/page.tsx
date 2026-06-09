import { getAllProjects } from '@/sanity/queries'
import ProyectosClient from './ProyectosClient'

export const revalidate = 60

export default async function ProyectosPage() {
  const projects = await getAllProjects()
  return <ProyectosClient projects={projects} />
}
