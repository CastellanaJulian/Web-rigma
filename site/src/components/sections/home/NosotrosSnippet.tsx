'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
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
  return (
    <span ref={ref}>
      {prefix}
      {display}
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

export default function NosotrosSnippet() {
  const [sectionRef, inView] = useInView(0.3)

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{ padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 56px)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
        {/* Left: text column — order 2 on mobile, 1 on desktop */}
        <div className="order-2 md:order-1">
          <SectionLabel>Nosotros</SectionLabel>
          <h2
            style={{
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              color: '#1E1E1E',
              lineHeight: 1.2,
              marginBottom: 32,
            }}
          >
            Tres generaciones construyendo en Buenos Aires
          </h2>
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
          <div style={{ display: 'flex', gap: 48, marginBottom: 48, flexWrap: 'wrap' }}>
            {stats.map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: 'clamp(40px, 4vw, 56px)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#B59969',
                    lineHeight: 1,
                  }}
                >
                  <CountUp target={s.target} prefix={s.prefix} format={s.format} />
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(30,30,30,0.45)',
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

        {/* Right: image — order 1 on mobile (top), 2 on desktop */}
        <div className="order-1 md:order-2 relative" style={{ aspectRatio: '4/5', minHeight: 320 }}>
          <Image
            src="/images/img-4.jpg"
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
