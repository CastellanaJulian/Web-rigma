import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: '1',
    slug: 'zelada-6171',
    title: 'Zelada 6171',
    location: 'Zelada 6171',
    status: 'Terminado',
    coverImage: '/images/projects/zelada-6171/cover.jpg',
    images: [],
    description: 'Descripción pendiente de completar.',
    highlights: {
      totalSurface: '2.150 m²',
      delivery: '22/06/2025',
    },
    relatedProject: 'cosquin-1534',
  },
  {
    id: '2',
    slug: 'cosquin-1534',
    title: 'Cosquín 1534',
    location: 'Cosquín 1534',
    neighborhood: 'Mataderos',
    status: 'En Ejecución',
    progress: 60,
    coverImage: '/images/projects/cosquin-1534/cover.jpg',
    images: [],
    description: 'Edificio de 8 departamentos de 4 ambientes en el barrio de Mataderos. Unidades de alta calidad con amenities premium.',
    highlights: {
      totalSurface: '1.800 m²',
      totalUnits: 8,
      availableUnits: 4,
      startDate: 'Julio 2025',
      delivery: 'Diciembre 2026',
    },
    typologies: [
      '4 ambientes 112 m²',
      '4 ambientes 120 m²',
      '4 ambientes 113 m² + 9 m² terraza',
    ],
    amenities: [
      'Cocheras', 'Terrazas verdes', 'Puertas Pentágono', 'Puertas interiores exclusivas',
      'Grifería Peirano línea Wave', 'Pisos porcelanato importado', 'Portero eléctrico',
      'Mesadas de mármol', 'Interior de placar', 'Accesorios de baño', 'Bañera',
      'Piso radiante', 'Caldera dual individual por dpto', 'Anafe y caldera a gas',
      'Horno eléctrico', 'Lavadero', 'Cámaras de seguridad', 'Cerco eléctrico', 'Internet',
    ],
    relatedProject: 'larrazabal-1255',
  },
  {
    id: '3',
    slug: 'larrazabal-1255',
    title: 'Av. Larrazábal 1255',
    location: 'Av. Larrazábal 1255',
    neighborhood: 'Mataderos',
    status: 'En Ejecución',
    coverImage: '/images/projects/larrazabal-1255/cover.jpg',
    images: [],
    description: 'Edificio de 17 unidades funcionales con SUM, patio, subsuelo con cochera y 16 cocheras en planta baja.',
    highlights: {
      totalUnits: 17,
    },
    amenities: [
      'Puertas interiores exclusivas', 'Pisos porcelanato importado', 'Portero eléctrico',
      'Mesadas de mármol', 'Interior de placar', 'Accesorios de baño', 'Bañera',
      'Piso radiante', 'Caldera dual individual', 'Anafe y caldera a gas',
      'Horno eléctrico', 'Lavadero', 'Cámaras de seguridad', 'Cerco eléctrico', 'Internet',
    ],
    relatedProject: 'cosquin-1534',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.status === 'En Ejecución')
}
