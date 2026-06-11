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
  coverImage?: SanityImage
  coordinates?: Coordinates
}

type RawPlanItem = {
  // schema nuevo: sección con título + planos[]
  titulo?: string
  planos?: { titulo?: string; imagen?: SanityImage }[]
  // schema viejo: plano suelto (imagen/descripcion) o image plano.
  imagen?: SanityImage
  descripcion?: string
  asset?: { _ref?: string }
}

type RawProject = RawListProject & {
  progress?: number
  images?: SanityImage[]
  plans?: RawPlanItem[]
  description?: PortableTextBlock[]
  locationDescription?: string
  delivery?: string
  availableUnits?: number
  startDate?: string
  totalSurface?: string
  totalUnits?: number
  typologies?: string
  destacados?: { titulo: string; descripcion: string; categoria: string }[]
  pointsOfInterest?: { name: string; category: string; detail?: string; coordinates?: Coordinates }[]
  relatedProject?: {
    slug: string
    title: string
    status: Project['status']
    coverImage?: SanityImage
    neighborhood?: string
  } | null
}

// ── Proyecciones GROQ ────────────────────────────────────────────────────────────

const listFields = `
  "id": _id,
  "slug": slug.current,
  title,
  status,
  neighborhood,
  coverImage,
  coordinates
`

const projectFields = `
  ${listFields},
  progress,
  images[]{ asset, _type },
  plans[]{ titulo, planos[]{ titulo, imagen }, imagen, descripcion, asset },
  description,
  locationDescription,
  delivery,
  availableUnits,
  startDate,
  totalSurface,
  totalUnits,
  typologies,
  destacados[]{ titulo, descripcion, categoria },
  pointsOfInterest[]{ name, category, detail, coordinates },
  relatedProject->{ "slug": slug.current, title, status, coverImage, neighborhood }
`

// ── Mapeo crudo → view-model ─────────────────────────────────────────────────────

function mapListProject(raw: RawListProject): Project {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    status: raw.status,
    neighborhood: raw.neighborhood,
    coverImage: img(raw.coverImage, 1600),
    coordinates:
      raw.coordinates?.lat != null && raw.coordinates?.lng != null
        ? { lat: raw.coordinates.lat, lng: raw.coordinates.lng }
        : undefined,
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
  }
}

function mapPlans(raw: RawPlanItem[] | undefined): Project['plans'] {
  const items = raw ?? []
  // Schema nuevo: cada item es una sección con `planos[]`.
  const sectioned = items.some((p) => Array.isArray(p.planos))
  if (sectioned) {
    return items
      .filter((s) => Array.isArray(s.planos))
      .map((s) => ({
        titulo: s.titulo ?? 'Planos',
        planos: (s.planos ?? [])
          .map((p) => ({ src: img(p.imagen, 1400), label: p.titulo }))
          .filter((p) => p.src),
      }))
      .filter((s) => s.planos.length > 0)
  }
  // Schema viejo: planos sueltos → una sola sección.
  const planos = items
    .map((p) => ({ src: img((p.imagen ?? p) as SanityImage, 1400), label: p.descripcion }))
    .filter((p) => p.src)
  return planos.length > 0 ? [{ titulo: 'Planos del proyecto', planos }] : []
}

function mapProject(raw: RawProject): Project {
  return {
    ...mapListProject(raw),
    progress: raw.progress,
    images: (raw.images ?? [])
      .map((i) => ({ src: img(i, 1600) }))
      .filter((i) => i.src),
    plans: mapPlans(raw.plans),
    description: raw.description,
    locationDescription: raw.locationDescription,
    highlights: {
      delivery: raw.delivery,
      availableUnits: raw.availableUnits,
      startDate: raw.startDate,
      totalSurface: raw.totalSurface,
      totalUnits: raw.totalUnits,
    },
    typologies: raw.typologies,
    destacados: raw.destacados,
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
    `*[_type == "project"] | order(orderRank) { ${listFields} }`
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

export async function getHeroSlides(): Promise<{ src: string; alt: string }[]> {
  // Carrusel del hero = portada de los 4 primeros proyectos según el orden drag & drop.
  const raw = await client.fetch<{ title: string; coverImage?: SanityImage }[]>(
    `*[_type == "project" && defined(coverImage)] | order(orderRank)[0...4]{ title, coverImage }`
  )
  return (raw ?? []).map((p) => ({ src: img(p.coverImage, 2000), alt: p.title }))
}

export async function getFeaturedProjects(): Promise<Project[]> {
  // Proyectos destacados = los 2 primeros según el orden drag & drop.
  const raw = await client.fetch<RawListProject[]>(
    `*[_type == "project"] | order(orderRank)[0...2] { ${listFields} }`
  )
  return (raw ?? []).map(mapListProject)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]{ whatsapp, email, direccion }`
  )
}

export async function getNosotrosPage(): Promise<{ imagenHistoria: string; imagenFilosofia: string; imagenMasSobreNosotros: string } | null> {
  const raw = await client.fetch<{ imagenHistoria?: SanityImage; imagenFilosofia?: SanityImage; imagenMasSobreNosotros?: SanityImage } | null>(
    `*[_type == "nosotrosPage"][0]{ imagenHistoria, imagenFilosofia, imagenMasSobreNosotros }`
  )
  if (!raw) return null
  return {
    imagenHistoria: img(raw.imagenHistoria, 1600),
    imagenFilosofia: img(raw.imagenFilosofia, 1000),
    imagenMasSobreNosotros: img(raw.imagenMasSobreNosotros, 1600),
  }
}

export async function getContactoPage(): Promise<{ imagen: string } | null> {
  const raw = await client.fetch<{ imagen?: SanityImage } | null>(
    `*[_type == "contactoPage"][0]{ imagen }`
  )
  if (!raw) return null
  return { imagen: img(raw.imagen, 1000) }
}
