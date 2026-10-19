/**
 * Tiles de CARTO (estilo Light) para los mapas Leaflet.
 *
 * CARTO exige API key: sin ella devuelve tiles con la marca de agua
 * "API KEY REQUIRED". La key es pública (viaja en cada request de tile),
 * por eso se lee de una variable NEXT_PUBLIC_*. Restringirla por dominio
 * desde dashboard.basemaps.carto.com.
 *
 * Los términos de CARTO exigen que la atribución quede visible en el mapa.
 */

const cartoKey = process.env.NEXT_PUBLIC_CARTO_API_KEY

if (!cartoKey && process.env.NODE_ENV !== 'production') {
  console.warn('NEXT_PUBLIC_CARTO_API_KEY no está definida: el mapa mostrará la marca de agua de CARTO.')
}

export const cartoTileUrl =
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' +
  (cartoKey ? `?key=${encodeURIComponent(cartoKey)}` : '')

export const cartoAttribution =
  '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attributions">CARTO</a>'
