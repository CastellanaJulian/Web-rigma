import type { PortableTextBlock } from '@portabletext/react'

/**
 * View-models del sitio público. Las queries de Sanity (`src/sanity/queries.ts`)
 * mapean los documentos del CMS a estos tipos: las imágenes ya vienen resueltas
 * a URL string (vía `urlFor`) y las referencias ya están expandidas.
 */

export type Plan = {
  src: string
  description?: string
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
  location?: string
}

export type Project = {
  id: string
  slug: string
  title: string
  location?: string
  neighborhood?: string
  status: 'En Ejecución' | 'Terminado'
  order?: number
  progress?: number
  coverImage: string
  images: string[]
  plans?: Plan[]
  description?: PortableTextBlock[]
  highlights: {
    totalSurface?: string
    unitSurface?: string
    totalUnits?: number
    availableUnits?: number
    floors?: number
    delivery?: string
    startDate?: string
  }
  typologies?: string[]
  amenities?: string[]
  financing?: string
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
