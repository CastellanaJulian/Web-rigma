import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

/**
 * Construye una URL de imagen de Sanity respetando el punto focal (hotspot).
 * Encadenar `.width(n)`, `.height(n)`, `.url()`, etc.
 *
 * Ej: urlFor(project.coverImage).width(1200).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
