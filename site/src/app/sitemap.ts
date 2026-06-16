import type { MetadataRoute } from 'next'
import { getAllProjects } from '@/sanity/queries'

const BASE_URL = 'https://www.rigma.com.ar'

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/proyectos`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/nosotros`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/contacto`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/terminos`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/privacidad`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/proyectos/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
