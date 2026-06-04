export type POI = {
  lat: number
  lng: number
  category: string
  name: string
  detail: string
  iconType: 'transport' | 'health' | 'education' | 'commerce'
}

export type Project = {
  id: string
  slug: string
  title: string
  location: string
  neighborhood?: string
  status: 'En Ejecución' | 'Terminado'
  priority?: number
  progress?: number
  coverImage: string
  images: string[]
  plans?: string[]
  description: string
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
  relatedProject?: string
  pointsOfInterest?: POI[]
}
