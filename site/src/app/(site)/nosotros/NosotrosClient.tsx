'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { useCanHover } from '@/hooks/useCanHover'
import SectionLabel from '@/components/shared/SectionLabel'

// ── CountUp ──────────────────────────────────────────────────────────────────
function formatMiles(n: number): string {
  if (n >= 1000) return `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, '0')}`
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

  return (
    <span ref={ref}>
      {prefix}
      {format ? format(value) : value}
    </span>
  )
}

// ── Pilares ───────────────────────────────────────────────────────────────────
const pilares = [
  {
    title: 'Calidad en cada etapa',
    desc: 'Cuidamos los detalles constructivos desde el diseño hasta la ejecución. La calidad no es un resultado: es el proceso que lo garantiza.',
  },
  {
    title: 'Compromiso con el cliente',
    desc: 'Trabajamos en cercanía con quienes confían en nosotros. Entendemos cada proyecto como único y lo tratamos como tal.',
  },
  {
    title: 'Espacios que agregan valor',
    desc: 'Desarrollamos espacios multifuncionales pensados para optimizar el uso, la flexibilidad y el confort de cada habitante.',
  },
]

// ── NosotrosClient ─────────────────────────────────────────────────────────────
type Props = {
  imagenHistoria?: string
  imagenFilosofia?: string
  imagenMasSobreNosotros?: string
  metricaM2?: number
  metricaUnidades?: number
}

export default function NosotrosClient({
  imagenHistoria,
  imagenFilosofia,
  imagenMasSobreNosotros,
  metricaM2,
  metricaUnidades,
}: Props) {
  const [pilaresRef, pilaresVisible]         = useInView(0.3)
  const [headerRef, headerVisible]           = useInView(0.05)
  const [historiaRef, historiaVisible]       = useInView(0.15)
  const [filosofiaImgRef, filosofiaImgVisible] = useInView(0.2)
  const [ctaRef, ctaVisible]                 = useInView(0.15)
  const canHover = useCanHover()
  const [hovBtn, setHovBtn]   = useState(false)
  const [hovSection, setHovSection] = useState(false)

  const fadeUp = (visible: boolean, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
    transitionDelay: visible ? `${delay}ms` : '0ms',
  })

  return (
    <>
      {/* 01 · PAGE HEADER */}
      <section
        ref={headerRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'clamp(48px, 7vw, 80px) clamp(20px, 5vw, 56px) clamp(24px, 3vw, 40px)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#1E1E1E',
            maxWidth: 680,
            marginBottom: 24,
            ...fadeUp(headerVisible, 0),
          }}
        >
          Tres generaciones.
          <br />
          Una forma de construir.
        </h1>
        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'rgba(30,30,30,0.65)',
            maxWidth: 540,
            ...fadeUp(headerVisible, 120),
          }}
        >
          Empresa constructora familiar fundada en 2016, con trayectoria de tres
          generaciones en el rubro. Responsabilidad, compromiso y mejora continua
          en cada proyecto.
        </p>
      </section>

      {/* 02 · HISTORIA */}
      <section
        ref={historiaRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'clamp(24px, 3vw, 40px) clamp(20px, 5vw, 56px) clamp(48px, 8vw, 80px)',
          borderBottom: '1px solid #E9E9E9',
        }}
      >
        {/* Imagen panorámica */}
        <div
          className="relative overflow-hidden w-full historia-img"
          style={{ aspectRatio: '21/6', marginBottom: 36, background: '#E3E3E3', ...fadeUp(historiaVisible, 0) }}
        >
          {imagenHistoria && (
            <Image
              src={imagenHistoria}
              alt="Rigma — obra"
              fill
              className="object-cover object-bottom"
              sizes="100vw"
              priority
            />
          )}
        </div>

        {/* Copy + métricas */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: 'clamp(36px, 5vw, 80px)', alignItems: 'start' }}
        >
          <div style={fadeUp(historiaVisible, 100)}>
            <SectionLabel>Historia</SectionLabel>
            <p
              style={{
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.75,
                color: 'rgba(30,30,30,0.65)',
                marginBottom: 24,
              }}
            >
              Somos una empresa constructora familiar con una sólida trayectoria
              que se remonta a tres generaciones dentro del rubro. A lo largo del
              tiempo, hemos consolidado una forma de trabajo basada en la
              responsabilidad, el compromiso y la mejora continua. Este recorrido
              nos permite combinar la tradición constructiva con una mirada actual,
              adaptada a las nuevas necesidades del mercado.
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.75,
                color: 'rgba(30,30,30,0.65)',
              }}
            >
              Nos especializamos en el desarrollo de espacios multifuncionales,
              pensados para optimizar el uso, la flexibilidad y el confort en cada
              proyecto. Entendemos cada proyecto como único, y trabajamos con
              cercanía con el cliente para lograr resultados que combinen
              funcionalidad, estética y durabilidad.
            </p>
          </div>

          <div style={fadeUp(historiaVisible, 200)}>
            <div style={{ paddingBottom: 48, borderBottom: '1px solid #E9E9E9' }}>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: '#B59969',
                  marginBottom: 12,
                }}
              >
                <CountUp target={metricaM2 ?? 32000} prefix="+" format={formatMiles} />
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'rgba(30,30,30,0.65)',
                }}
              >
                M² construidos
              </div>
            </div>
            <div style={{ paddingTop: 48 }}>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: '#B59969',
                  marginBottom: 12,
                }}
              >
                <CountUp target={metricaUnidades ?? 220} prefix="+" />
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'rgba(30,30,30,0.65)',
                }}
              >
                Unidades funcionales
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 · FILOSOFÍA */}
      <section
        style={{
          background: '#E3E3E3',
          padding: 'clamp(48px, 9vw, 120px) clamp(20px, 5vw, 56px)',
        }}
      >
        <SectionLabel>Filosofía de trabajo</SectionLabel>

        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: 'clamp(32px, 5vw, 80px)', alignItems: 'stretch', marginTop: 20 }}
        >
          {/* Imagen */}
          <div
            ref={filosofiaImgRef as React.RefObject<HTMLDivElement>}
            className="relative overflow-hidden order-1"
            style={{ minHeight: 400, background: '#D6D6D6', ...fadeUp(filosofiaImgVisible, 0) }}
          >
            {imagenFilosofia && (
              <Image
                src={imagenFilosofia}
                alt="Rigma — planificación"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          {/* Pilares */}
          <div
            ref={pilaresRef as React.RefObject<HTMLDivElement>}
            className="order-2 flex flex-col justify-center"
          >
            {pilares.map((p, i) => (
              <div
                key={i}
                style={{
                  paddingTop: i === 0 ? 0 : 36,
                  paddingBottom: i < pilares.length - 1 ? 36 : 0,
                  borderBottom:
                    i < pilares.length - 1
                      ? '1px solid rgba(30,30,30,0.15)'
                      : 'none',
                  opacity: pilaresVisible ? 1 : 0,
                  transform: pilaresVisible ? 'translateY(0)' : 'translateY(28px)',
                  transition: 'opacity 1s ease, transform 1s ease',
                  transitionDelay: pilaresVisible ? `${i * 220}ms` : '0ms',
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#1E1E1E',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    marginBottom: 10,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: 'rgba(30,30,30,0.65)',
                  }}
                >
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · REDIRECCIÓN */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: 580, background: '#1E1E1E' }}
        onMouseEnter={() => canHover && setHovSection(true)}
        onMouseLeave={() => setHovSection(false)}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: hovSection ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.8s ease',
          }}
        >
          {imagenMasSobreNosotros ? (
            <Image
              src={imagenMasSobreNosotros}
              alt="Rigma — más sobre nosotros"
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div style={{ background: '#D6D6D6' }} />
          )}
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(30,30,30,0.55) 0%, rgba(30,30,30,0.50) 40%, rgba(30,30,30,0.92) 100%)',
          }}
        />
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className="absolute bottom-0 left-0 right-0"
          style={{
            padding: '0 clamp(20px, 5vw, 56px) clamp(40px, 6vw, 80px)',
            zIndex: 2,
          }}
        >
          <div style={fadeUp(ctaVisible, 0)}>
            <SectionLabel dark>Más sobre nosotros</SectionLabel>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: 20,
              maxWidth: 620,
              ...fadeUp(ctaVisible, 100),
            }}
          >
            Conocé nuestros proyectos o escribinos directamente.
          </h2>
          <p
            style={{
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
              marginBottom: 40,
              maxWidth: 520,
              ...fadeUp(ctaVisible, 180),
            }}
          >
            Cada obra tiene su historia. Visitá el portfolio para ver
            disponibilidad y detalle de cada proyecto, o escribinos para
            consultas personalizadas.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 32,
              alignItems: 'center',
              flexWrap: 'wrap',
              ...fadeUp(ctaVisible, 260),
            }}
          >
            <Link
              href="/proyectos"
              onMouseEnter={() => canHover && setHovBtn(true)}
              onMouseLeave={() => setHovBtn(false)}
              style={{
                padding: '14px 28px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: hovBtn ? '#B59969' : '#FFFFFF',
                color: '#1E1E1E',
                textDecoration: 'none',
                borderRadius: 2,
                display: 'inline-block',
                transition: 'background 0.2s ease',
              }}
            >
              VER PROYECTOS
            </Link>
            <Link
              href="/contacto"
              className="hover-accent-link-dark"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.04em' }}
            >
              Contactarnos →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
