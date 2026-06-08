'use client'

import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCanHover } from '@/hooks/useCanHover'

const slides = [
  { src: '/images/img-2.jpg', alt: 'Av. Larrazábal 1255' },
  { src: '/images/img-1.jpg', alt: 'Cosquín 1534' },
  { src: '/images/img-4.jpg', alt: 'Rigma — trayectoria' },
  { src: '/images/img-3.jpg', alt: 'Zelada 6171' },
]

function ArrowBtn({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  const canHover = useCanHover()
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => canHover && setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === 'left' ? 'Slide anterior' : 'Slide siguiente'}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [dir === 'left' ? 'left' : 'right']: 32,
        width: 48,
        height: 48,
        background: hov ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
        border: `1px solid rgba(255,255,255,${hov ? '0.45' : '0.25'})`,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === 'left' ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  )
}

export default function HeroCarousel() {
  const canHover = useCanHover()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const total = slides.length

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setActive(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => emblaApi.scrollNext(), 6000)
    return () => clearInterval(timer)
  }, [emblaApi])

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const goTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1s ease, transform 1s ease',
    transitionDelay: `${delay}ms`,
  })

  return (
    <section
      className="hero-section"
      style={{
        height: '100vh',
        minHeight: 640,
        position: 'relative',
        overflow: 'hidden',
        background: '#1E1E1E',
      }}
    >
      {/* Embla viewport */}
      <div ref={emblaRef} style={{ position: 'absolute', inset: 0 }}>
        <div style={{ display: 'flex', height: '100%' }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{ position: 'relative', flex: '0 0 100%', minWidth: 0, height: '100%' }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'linear-gradient(180deg, rgba(30,30,30,0.72) 0%, rgba(30,30,30,0.55) 40%, rgba(30,30,30,0.95) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Navigation arrows — solo desktop ancho (xl); en mobile/tablet se pisan con el texto, usan swipe */}
      <div className="hidden xl:block" style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'all' }}>
          <ArrowBtn dir="left" onClick={prev} />
          <ArrowBtn dir="right" onClick={next} />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 'clamp(24px, 7vw, 96px)',
          paddingLeft: 'clamp(24px, 7vw, 112px)',
          paddingRight: 'clamp(24px, 7vw, 112px)',
          zIndex: 5,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            lineHeight: 0.96,
            marginBottom: 28,
            maxWidth: 860,
            ...fadeUp(0),
          }}
        >
          Construimos{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#B59969' }}>espacios</em>
          {' '}que perduran
        </h1>

        <p
          style={{
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 500,
            marginBottom: 48,
            ...fadeUp(160),
          }}
        >
          Proyectos terminados y en ejecución en Buenos Aires con diseño funcional,
          materiales premium y tres generaciones de trayectoria que respaldan cada obra.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 24,
            ...fadeUp(300),
          }}
        >
          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="/proyectos"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '13px 28px',
                borderRadius: 2,
                background: '#FFFFFF',
                color: '#1E1E1E',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => { if (canHover) e.currentTarget.style.background = '#B59969' }}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
            >
              VER PROYECTOS
            </Link>
            <Link
              href="/contacto"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '13px 28px',
                borderRadius: 2,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.30)',
                color: '#FFFFFF',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => { if (canHover) e.currentTarget.style.background = 'rgba(255,255,255,0.10)' }}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              CONTACTANOS
            </Link>
          </div>

          {/* Slide indicators + counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                  style={{
                    width: i === active ? 28 : 6,
                    height: 2,
                    borderRadius: 1,
                    background: i === active ? '#B59969' : 'rgba(255,255,255,0.30)',
                    cursor: 'pointer',
                    border: 'none',
                    padding: 0,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.10em',
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              0{active + 1} / 0{total}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
