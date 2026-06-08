'use client'

import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/shared/SectionLabel'

const pilares = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1E1E1E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    titulo: 'Calidad en cada detalle',
    desc: 'Materiales premium, puertas exclusivas y terminaciones de primer nivel que cuidan el valor de cada propiedad en el tiempo.',
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1E1E1E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
    titulo: 'Plazos que se cumplen',
    desc: 'Obras con avance documentado y fechas de entrega comprometidas desde el primer día.',
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1E1E1E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    titulo: 'Trayectoria comprobada',
    desc: 'Más de 32.000 m² construidos y tres generaciones en el rubro respaldan cada proyecto que firmamos.',
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1E1E1E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    titulo: 'Espacios multifuncionales',
    desc: 'Proyectos pensados para optimizar el uso, el confort y la calidad de vida en cada metro cuadrado.',
  },
]

export default function PorQueSection() {
  const [sectionRef, visible] = useInView(0.4)

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        padding: 'clamp(48px, 9vw, 120px) clamp(20px, 5vw, 56px)',
        background: '#E3E3E3',
      }}
    >
      <SectionLabel>Por qué elegirnos</SectionLabel>
      <h2
        style={{
          fontSize: 'clamp(36px, 4vw, 56px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#1E1E1E',
          lineHeight: 1,
          marginBottom: 'clamp(32px, 5vw, 80px)',
          maxWidth: 440,
        }}
      >
        Nuestra forma de construir
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        style={{
          borderTop: '1px solid rgba(30,30,30,0.15)',
          paddingTop: 56,
        }}
      >
        {pilares.map((p, i) => (
          <div
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 1s ease, transform 1s ease',
              transitionDelay: visible ? `${i * 220}ms` : '0ms',
            }}
          >
            <div style={{ marginBottom: 28 }}>{p.icon}</div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '-0.005em',
                color: '#1E1E1E',
                lineHeight: 1.2,
                marginBottom: 14,
              }}
            >
              {p.titulo}
            </h3>
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.65,
                color: 'rgba(30,30,30,0.65)',
              }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
