'use client'

import { Project } from '@/types/project'
import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/shared/SectionLabel'
import PortableText from '@/components/shared/PortableText'
import { destacadoIconByValue } from '@/sanity/destacadoCategorias'

const datosCardSvgs = {
  inicio:     'M3 4h18v2H3zM3 10h18v2H3zM3 16h10v2H3z',
  superficie: 'M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3',
  unidades:   'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  tipologias: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
}

type Props = { project: Project }

export default function DescriptionSection({ project }: Props) {
  const [highlightsRef, visible] = useInView(0.3)

  const datosCard = [
    project.highlights.startDate && { svg: datosCardSvgs.inicio, label: 'Inicio de obra', value: project.highlights.startDate },
    project.highlights.totalSurface && { svg: datosCardSvgs.superficie, label: 'M² totales', value: project.highlights.totalSurface },
    project.highlights.totalUnits && { svg: datosCardSvgs.unidades, label: 'Total unidades', value: `${project.highlights.totalUnits} departamentos` },
    project.typologies && { svg: datosCardSvgs.tipologias, label: 'Tipologías', value: project.typologies },
  ].filter(Boolean) as { svg: string; label: string; value: string }[]

  const destacados = project.destacados ?? []

  return (
    <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 56px)', background: '#FBFBFB' }}>
      {/* Descripción + card datos */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px]"
        style={{ gap: 'clamp(32px, 5vw, 72px)', marginBottom: 'clamp(40px, 5vw, 64px)' }}
      >
        <div>
          <SectionLabel>Descripción</SectionLabel>
          <PortableText value={project.description} />
        </div>

        {datosCard.length > 0 && (
          <div style={{ background: '#E9E9E9', padding: '28px 28px 20px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1E1E1E', marginBottom: 24 }}>
              Datos del proyecto
            </div>
            {datosCard.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  paddingBottom: 16, marginBottom: i < datosCard.length - 1 ? 16 : 0,
                  borderBottom: i < datosCard.length - 1 ? '1px solid rgba(30,30,30,0.10)' : 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}>
                  <path d={d.svg} />
                </svg>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(30,30,30,0.45)', marginBottom: 4 }}>
                    {d.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1E1E1E' }}>{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Highlights grid — solo si hay destacados cargados en el CMS */}
      {destacados.length > 0 && (
      <div
        ref={highlightsRef as React.RefObject<HTMLDivElement>}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: 'clamp(28px, 4vw, 48px)', paddingTop: 'clamp(36px, 5vw, 56px)', borderTop: '1px solid #E9E9E9' }}
      >
        {destacados.map((h, i) => (
          <div
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
              transitionDelay: visible ? `${i * 90}ms` : '0ms',
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: destacadoIconByValue[h.categoria] ?? '' }}
              />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.01em', color: '#1E1E1E', marginBottom: 8 }}>{h.titulo}</div>
            <div style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.7, color: 'rgba(30,30,30,0.65)' }}>{h.descripcion}</div>
          </div>
        ))}
      </div>
      )}
    </section>
  )
}
