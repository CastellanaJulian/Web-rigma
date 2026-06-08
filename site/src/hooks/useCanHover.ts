'use client'

import { useEffect, useState } from 'react'

/**
 * Devuelve `true` solo en dispositivos con hover real (mouse/trackpad).
 * En touch (mobile/tablet) devuelve `false`, evitando que los estilos hover
 * queden "pegados" al tocar — ya que `onMouseEnter` se emula en el primer tap.
 *
 * Arranca en `false` para ser seguro en SSR; se resuelve en el cliente.
 */
export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setCanHover(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return canHover
}
