// Base de categorías de "Destacados del proyecto" con su ícono.
// Fuente ÚNICA: el dropdown del schema (`schemas/project.ts`) y el render de la
// web (`sections/ficha/DescriptionSection.tsx`) leen de acá. Para sumar una
// categoría, agregá una entrada con su path SVG (viewBox 0 0 24 24, sin fill).

export type DestacadoCategoria = {
  value: string
  title: string
  icon: string // contenido interno de un <svg viewBox="0 0 24 24">
}

export const destacadoCategorias: DestacadoCategoria[] = [
  {
    value: 'quality',
    title: 'Terminaciones',
    icon: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  },
  {
    value: 'comfort',
    title: 'Confort',
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  },
  {
    value: 'security',
    title: 'Seguridad',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  },
  {
    value: 'terrace',
    title: 'Espacios verdes',
    icon: '<path d="M12 2 Q8 5 8 10 Q8 16 12 20 Q16 16 16 10 Q16 5 12 2"/><line x1="11" y1="20" x2="13" y2="20"/><line x1="11" y1="20" x2="11" y2="22"/><line x1="13" y1="20" x2="13" y2="22"/>',
  },
  {
    value: 'parking',
    title: 'Cocheras',
    icon: '<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  },
  {
    value: 'equipment',
    title: 'Equipamiento',
    icon: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  },
  {
    value: 'location',
    title: 'Ubicación',
    icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  },
  {
    value: 'connectivity',
    title: 'Conectividad',
    icon: '<path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
  },
]

/** Mapa value → path SVG, para resolver el ícono en la web. */
export const destacadoIconByValue: Record<string, string> = Object.fromEntries(
  destacadoCategorias.map((c) => [c.value, c.icon])
)

/** Opciones listas para `options.list` de un campo string de Sanity. */
export const destacadoCategoriaOptions = destacadoCategorias.map((c) => ({
  title: c.title,
  value: c.value,
}))
