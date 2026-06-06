import { Project, POI, Plan } from '@/types/project'

export const projects: Project[] = [
  {
    id: '1',
    slug: 'zelada-6171',
    title: 'Zelada 6171',
    location: 'Zelada 6171',
    status: 'Terminado',
    coverImage: '/images/img-3.jpg',
    coordinates: { lat: -34.6568, lng: -58.5041 },
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
    priority: 1,
    progress: 60,
    coverImage: '/images/img-1.jpg',
    coordinates: { lat: -34.6540, lng: -58.5015 },
    images: [
      '/images/img-1.jpg',
      '/images/img-2.jpg',
      '/images/img-3.jpg',
      '/images/img-4.jpg',
      '/images/img-5.jpg',
    ],
    locationDescription: 'Cosquín 1534 se ubica en uno de los barrios con mayor tradición de la Ciudad, con excelente conectividad y todos los servicios al alcance.',
    plans: [
      { src: '/images/img-plano.jpg', description: '4 ambientes 112 m²' },
      { src: '/images/img-plano.jpg', description: '4 ambientes 120 m²' },
      { src: '/images/img-plano.jpg', description: '4 ambientes 113 m² + 9 m² terraza' },
    ] satisfies Plan[],
    pointsOfInterest: [
      { lat: -34.6522, lng: -58.4983, category: 'Transporte', name: 'Estación Mataderos', detail: '5 min a pie · FF.CC. Belgrano Sur', iconType: 'transport' },
      { lat: -34.6468, lng: -58.4952, category: 'Salud', name: 'Hospital Santojanni', detail: '10 min en auto', iconType: 'health' },
      { lat: -34.6538, lng: -58.5042, category: 'Educación', name: 'Escuelas e institutos', detail: 'En radio de 3 cuadras', iconType: 'education' },
      { lat: -34.6555, lng: -58.5005, category: 'Comercio', name: 'Comercios y supermercados', detail: 'A pocas cuadras', iconType: 'commerce' },
    ] satisfies POI[],
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
    priority: 2,
    coverImage: '/images/img-2.jpg',
    coordinates: { lat: -34.6595, lng: -58.5065 },
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
