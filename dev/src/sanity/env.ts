/**
 * Project ID y dataset son públicos (van en el bundle del browser),
 * por eso quedan hardcoded como fallback — esto permite que el build
 * standalone del Sanity Studio (`sanity deploy`) funcione sin depender
 * de variables NEXT_PUBLIC_* que su bundler no inyecta.
 *
 * En Next.js los `process.env.NEXT_PUBLIC_*` igual tienen precedencia
 * si están definidos en `.env.local`.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-23'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0q5stz3o'
