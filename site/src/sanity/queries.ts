import type { PortableTextBlock } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'
import { urlFor } from './image'
import type { Project, POI, RelatedProject, SiteSettings } from '@/types/project'

// ── Helpers de mapeo ────────────────────────────────────────────────────────────

type SanityImage = SanityImageSource & { asset?: { _ref?: string } }
type Coordinates = { lat?: number; lng?: number } | null | undefined

/** Resuelve una imagen de Sanity a URL string del ancho pedido. '' si no hay imagen. */
function img(source: SanityImage | undefined | null, width: number): string {
  if (!source?.asset?._ref) return ''
  return urlFor(source).width(width).url()
}

const iconTypeByCategory: Record<string, POI['iconType']> = {
  Transporte: 'transport',
  Salud: 'health',
  Educación: 'education',
  Comercio: 'commerce',
}

// ── Shapes crudos devueltos por GROQ ─────────────────────────────────────────────

type RawListProject = {
  id: string
  slug: string
  title: string
  status: Project['status']
  neighborhood?: string
  location?: string
  coverImage?: SanityImage
  coordinates?: Coordinates
  order?: number
}

type RawProject = RawListProject & {
  progress?: number
  images?: SanityImage[]
  // `imagen`/`descripcion` = schema nuevo; `asset` = planos cargados con el schema viejo (image plano).
  plans?: { imagen?: SanityImage; descripcion?: string; asset?: { _ref?: string } }[]
  description?: PortableTextBlock[]
  locationDescription?: string
  highlights?: Project['highlights']
  typologies?: string[]
  amenities?: string[]
  financing?: string
  pointsOfInterest?: { name: string; category: string; detail?: string; coordinates?: Coordinates }[]
  relatedProject?: {
    slug: string
    title: string
    status: Project['status']
    coverImage?: SanityImage
    neighborhood?: string
    location?: string
  } | null
}

// ── Proyecciones GROQ ────────────────────────────────────────────────────────────

const listFields = `
  "id": _id,
  "slug": slug.current,
  title,
  status,
  neighborhood,
  location,
  coverImage,
  coordinates,
  order
`

const projectFields = `
  ${listFields},
  progress,
  images,
  plans[]{ imagen, descripcion, asset },
  description,
  locationDescription,
  highlights,
  typologies,
  amenities,
  financing,
  pointsOfInterest[]{ name, category, detail, coordinates },
  relatedProject->{ "slug": slug.current, title, status, coverImage, neighborhood, location }
`

// ── Mapeo crudo → view-model ─────────────────────────────────────────────────────

function mapListProject(raw: RawListProject): Project {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    status: raw.status,
    neighborhood: raw.neighborhood,
    location: raw.location,
    coverImage: img(raw.coverImage, 1600),
    coordinates:
      raw.coordinates?.lat != null && raw.coordinates?.lng != null
        ? { lat: raw.coordinates.lat, lng: raw.coordinates.lng }
        : undefined,
    order: raw.order,
    images: [],
    highlights: {},
  }
}

function mapRelated(raw: RawProject['relatedProject']): RelatedProject | null {
  if (!raw) return null
  return {
    slug: raw.slug,
    title: raw.title,
    status: raw.status,
    coverImage: img(raw.coverImage, 1600),
    neighborhood: raw.neighborhood,
    location: raw.location,
  }
}

function mapProject(raw: RawProject): Project {
  return {
    ...mapListProject(raw),
    progress: raw.progress,
    images: (raw.images ?? []).map((i) => img(i, 1600)).filter(Boolean),
    plans: (raw.plans ?? [])
      // Soporta el schema nuevo ({ imagen, descripcion }) y planos viejos (image plano).
      .map((p) => ({ src: img((p.imagen ?? p) as SanityImage, 1400), description: p.descripcion }))
      .filter((p) => p.src),
    description: raw.description,
    locationDescription: raw.locationDescription,
    highlights: raw.highlights ?? {},
    typologies: raw.typologies,
    amenities: raw.amenities,
    financing: raw.financing,
    pointsOfInterest: (raw.pointsOfInterest ?? [])
      .filter((p) => p.coordinates?.lat != null && p.coordinates?.lng != null)
      .map((p) => ({
        lat: p.coordinates!.lat!,
        lng: p.coordinates!.lng!,
        category: p.category,
        name: p.name,
        detail: p.detail,
        iconType: iconTypeByCategory[p.category] ?? 'commerce',
      })),
    relatedProject: mapRelated(raw.relatedProject),
  }
}

// ── Queries públicas ─────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  const raw = await client.fetch<RawListProject[]>(
    `*[_type == "project"] | order(coalesce(order, 999) asc) { ${listFields} }`
  )
  return raw.map(mapListProject)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const raw = await client.fetch<RawProject | null>(
    `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`,
    { slug }
  )
  return raw ? mapProject(raw) : null
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const raw = await client.fetch<RawListProject[]>(
    `*[_type == "homePage"][0].featuredProjects[].project->{ ${listFields} }`
  )
  return (raw ?? []).map(mapListProject)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]{ whatsapp, email, direccion }`
  )
}

export async function getHomePage(): Promise<{ imagenNosotros: string } | null> {
  const raw = await client.fetch<{ imagenNosotros?: SanityImage } | null>(
    `*[_type == "homePage"][0]{ imagenNosotros }`
  )
  if (!raw) return null
  return { imagenNosotros: img(raw.imagenNosotros, 1200) }
}

export async function getNosotrosPage(): Promise<{ imagenHistoria: string; imagenFilosofia: string } | null> {
  const raw = await client.fetch<{ imagenHistoria?: SanityImage; imagenFilosofia?: SanityImage } | null>(
    `*[_type == "nosotrosPage"][0]{ imagenHistoria, imagenFilosofia }`
  )
  if (!raw) return null
  return {
    imagenHistoria: img(raw.imagenHistoria, 1600),
    imagenFilosofia: img(raw.imagenFilosofia, 1000),
  }
}

export async function getContactoPage(): Promise<{ imagen: string } | null> {
  const raw = await client.fetch<{ imagen?: SanityImage } | null>(
    `*[_type == "contactoPage"][0]{ imagen }`
  )
  if (!raw) return null
  return { imagen: img(raw.imagen, 1000) }
}
