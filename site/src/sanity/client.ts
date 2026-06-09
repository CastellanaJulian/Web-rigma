import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

/**
 * Cliente único de lectura para el sitio público.
 * El dataset `production` es público, no requiere token.
 * `useCdn: true` sirve desde el CDN de Sanity (más barato/rápido) y
 * es compatible con la revalidación ISR de las pages server.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
