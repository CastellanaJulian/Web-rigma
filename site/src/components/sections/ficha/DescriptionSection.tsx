'use client'

import { Project } from '@/types/project'
import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/shared/SectionLabel'
import PortableText from '@/components/shared/PortableText'

const poiSvgs = {
  quality: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  comfort: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  security: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  terrace: '<path d="M12 22V12"/><path d="M20.3 8.7c1.6 2 2.1 4.4 1.4 6.7-.7 2.3-2.6 4.1-4.9 4.8-2.3.7-4.7.2-6.7-1.4L20.3 8.7z"/><path d="M2 22l9-9"/>',
  parking: '<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  equipment: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
}

const HIGHLIGHTS = [
  { key: 'quality',   titulo: 'Terminaciones premium',  texto: 'Porcelanato importado, mesadas de mármol y grifería de primer nivel en cada unidad.' },
  { key: 'comfort',   titulo: 'Confort integral',        texto: 'Piso radiante, caldera dual individual, cocina integrada y lavadero propio.' },
  { key: 'security',  titulo: 'Seguridad total',         texto: 'Cámaras, cerco eléctrico y portero eléctrico con acceso controlado.' },
  { key: 'terrace',   titulo: 'Terrazas verdes',         texto: 'Espacios al aire libre disponibles como complemento de algunas unidades.' },
  { key: 'parking',   titulo: 'Cocheras',                texto: 'Cocheras cubiertas disponibles por separado para cada unidad.' },
  { key: 'equipment', titulo: 'Equipamiento completo',   texto: 'Anafe y horno a gas, lavadero propio y placares embutidos en dormitorios.' },
]

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
    project.typologies && project.typologies.length > 0 && { svg: datosCardSvgs.tipologias, label: 'Tipologías', value: project.typologies.join(' · ') },
  ].filter(Boolean) as { svg: string; label: string; value: string }[]

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
          {project.financing && (
            <p style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.8, color: 'rgba(30,30,30,0.65)' }}>
              {project.financing}
            </p>
          )}
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

      {/* Highlights grid */}
      <div
        ref={highlightsRef as React.RefObject<HTMLDivElement>}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: 'clamp(28px, 4vw, 48px)', paddingTop: 'clamp(36px, 5vw, 56px)', borderTop: '1px solid #E9E9E9' }}
      >
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={h.key}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
              transitionDelay: visible ? `${i * 90}ms` : '0ms',
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: poiSvgs[h.key as keyof typeof poiSvgs] }}
              />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.01em', color: '#1E1E1E', marginBottom: 8 }}>{h.titulo}</div>
            <div style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.7, color: 'rgba(30,30,30,0.65)' }}>{h.texto}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
