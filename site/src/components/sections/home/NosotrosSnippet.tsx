'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { useCanHover } from '@/hooks/useCanHover'
import SectionLabel from '@/components/shared/SectionLabel'

function formatNumber(n: number): string {
  if (n >= 1000) {
    const thousands = Math.floor(n / 1000)
    const remainder = String(n % 1000).padStart(3, '0')
    return `${thousands}.${remainder}`
  }
  return String(n)
}

function CountUp({
  target,
  prefix = '',
  format,
}: {
  target: number
  prefix?: string
  format?: (n: number) => string
}) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const duration = 2000
        const startTime = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  const display = format ? format(value) : String(value)
  const finalDisplay = format ? format(target) : String(target)
  return (
    <span
      ref={ref}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Fantasma: reserva el ancho del valor final para que el layout no salte
          mientras el contador anima. Invisible pero ocupa espacio. */}
      <span aria-hidden="true" style={{ visibility: 'hidden' }}>
        {prefix}{finalDisplay}
      </span>
      {/* Valor animado, superpuesto y alineado a la izquierda */}
      <span style={{ position: 'absolute', left: 0, top: 0 }}>
        {prefix}{display}
      </span>
    </span>
  )
}

const stats = [
  {
    target: 32000,
    prefix: '+',
    label: 'M² Construidos',
    format: formatNumber,
  },
  {
    target: 220,
    prefix: '+',
    label: 'Unidades Funcionales',
    format: undefined,
  },
]

export default function NosotrosSnippet({ imagen }: { imagen?: string }) {
  const canHover = useCanHover()
  const imgSrc = imagen || '/images/img-4.jpg'
  const [sectionRef, inView] = useInView(0.3)

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="nosotros-snippet"
      style={{ padding: 'clamp(48px, 9vw, 120px) clamp(20px, 5vw, 56px)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left: text column — apilado en mobile/tablet, 2 columnas en desktop */}
        <div className="order-2 lg:order-1">
          <SectionLabel>Nosotros</SectionLabel>
          <h2
            style={{
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              color: '#1E1E1E',
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            Tres generaciones construyendo en Buenos Aires
          </h2>

          {/* Imagen mobile/tablet: aparece entre título y texto, oculta en desktop */}
          <div className="block lg:hidden relative w-full" style={{ aspectRatio: '1/1', marginBottom: 40 }}>
            <Image
              src={imgSrc}
              alt="Rigma — equipo y obra"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <p
            style={{
              fontSize: 15,
              fontWeight: 400,
              lineHeight: 1.8,
              color: 'rgba(30,30,30,0.65)',
              marginBottom: 20,
            }}
          >
            Somos una empresa constructora familiar con una sólida trayectoria que se remonta a
            tres generaciones dentro del rubro. A lo largo del tiempo, hemos consolidado una forma
            de trabajo basada en la responsabilidad, el compromiso y la mejora continua.
          </p>
          <p
            style={{
              fontSize: 15,
              fontWeight: 400,
              lineHeight: 1.8,
              color: 'rgba(30,30,30,0.65)',
              marginBottom: 56,
            }}
          >
            Nos especializamos en el desarrollo de espacios multifuncionales pensados para
            optimizar el uso, la flexibilidad y el confort. Cada proyecto es una oportunidad de
            inversión respaldada por décadas de experiencia constructiva.
          </p>

          {/* Stats */}
          <div className="snippet-stats" style={{ display: 'flex', gap: 48, marginBottom: 48, flexWrap: 'wrap' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 'clamp(52px, 4vw, 56px)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#B59969',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <CountUp target={s.target} prefix={s.prefix} format={s.format} />
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'rgba(30,30,30,0.65)',
                    marginTop: 10,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/nosotros"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: '#1E1E1E',
              textDecoration: 'none',
              borderBottom: '1px solid #1E1E1E',
              paddingBottom: 2,
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!canHover) return
              e.currentTarget.style.color = '#B59969'
              e.currentTarget.style.borderBottomColor = '#B59969'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#1E1E1E'
              e.currentTarget.style.borderBottomColor = '#1E1E1E'
            }}
          >
            Conocer más sobre Rigma →
          </Link>
        </div>

        {/* Right: image — solo visible en desktop */}
        <div className="hidden lg:block order-1 lg:order-2 relative" style={{ aspectRatio: '4/5', minHeight: 320 }}>
          <Image
            src={imgSrc}
            alt="Rigma — equipo y obra"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
