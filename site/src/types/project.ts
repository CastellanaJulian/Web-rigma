import type { PortableTextBlock } from '@portabletext/react'

/**
 * View-models del sitio público. Las queries de Sanity (`src/sanity/queries.ts`)
 * mapean los documentos del CMS a estos tipos: las imágenes ya vienen resueltas
 * a URL string (vía `urlFor`) y las referencias ya están expandidas.
 */

export type Plano = {
  src: string
  label?: string
  descripcion?: string
}

export type PlanSection = {
  titulo: string
  planos: Plano[]
}

export type GalleryImage = {
  src: string
  caption?: string
}

export type Destacado = {
  titulo: string
  descripcion: string
  /** value de la categoría — resuelve el ícono vía `destacadoIconByValue`. */
  categoria: string
}

export type POI = {
  lat: number
  lng: number
  category: string
  name: string
  detail?: string
  iconType: 'transport' | 'health' | 'education' | 'commerce'
}

export type RelatedProject = {
  slug: string
  title: string
  status: 'En Ejecución' | 'Terminado'
  coverImage: string
  neighborhood?: string
}

export type Project = {
  id: string
  slug: string
  title: string
  neighborhood?: string
  status: 'En Ejecución' | 'Terminado'
  progress?: number
  coverImage: string
  images: GalleryImage[]
  plans?: PlanSection[]
  description?: PortableTextBlock[]
  highlights: {
    totalSurface?: string
    totalUnits?: number
    availableUnits?: number
    delivery?: string
    startDate?: string
  }
  typologies?: string
  destacados?: Destacado[]
  coordinates?: {
    lat: number
    lng: number
  }
  locationDescription?: string
  relatedProject?: RelatedProject | null
  pointsOfInterest?: POI[]
}

export type SiteSettings = {
  whatsapp: string
  email: string
  direccion: string
}
