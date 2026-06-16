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
    icon: '<path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/>',
  },
  {
    value: 'parking',
    title: 'Cocheras',
    icon: '<path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/>',
  },
  {
    value: 'equipment',
    title: 'Equipamiento',
    icon: '<path d="M12 22V12"/><path d="m16 17 2 2 4-4"/><path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753"/><path d="M3.29 7 12 12l8.71-5"/><path d="m7.5 4.27 8.997 5.148"/>',
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
