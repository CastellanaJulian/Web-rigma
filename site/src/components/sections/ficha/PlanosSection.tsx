'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SectionLabel from '@/components/shared/SectionLabel'
import { PlanSection } from '@/types/project'

type Props = {
  sections: PlanSection[]
}

type ModalData = { src: string; label: string; description?: string } | null

export default function PlanosSection({ sections }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>('grupo-0')
  const [modal, setModal] = useState<ModalData>(null)

  useEffect(() => {
    if (!modal) return
    const sb = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${sb}px`
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [modal])

  // Cada sección del CMS es un desplegable; sus planos van adentro.
  const grupos = sections.map((sec, i) => ({
    id: `grupo-${i}`,
    titulo: sec.titulo,
    sublabel: `${sec.planos.length} plano${sec.planos.length !== 1 ? 's' : ''}`,
    planos: sec.planos.map((p, j) => ({ src: p.src, label: p.label || `Plano ${j + 1}`, description: sec.titulo })),
  }))

  return (
    <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 56px)', borderTop: '1px solid #E9E9E9', background: '#FBFBFB' }}>
      <SectionLabel>Planos</SectionLabel>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {grupos.map((g, gi) => {
          const isOpen = openGroup === g.id
          return (
            <div key={g.id} style={{ borderTop: gi === 0 ? '1px solid #E9E9E9' : 'none' }}>
              <div
                onClick={() => setOpenGroup(isOpen ? null : g.id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '22px 0', borderBottom: '1px solid #E9E9E9', cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1E1E1E' }}>{g.titulo}</span>
                  {g.sublabel && <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(30,30,30,0.45)' }}>{g.sublabel}</span>}
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                  <path d="M3 6l5 5 5-5" stroke="rgba(30,30,30,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {isOpen && (
                <div style={{ display: 'flex', gap: 16, padding: '28px 0 32px', flexWrap: 'wrap', animation: 'accordionDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  {g.planos.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => setModal({ src: p.src, label: p.label, description: p.description })}
                      style={{ width: 200, cursor: 'zoom-in' }}
                    >
                      <div style={{ position: 'relative', width: 200, height: 140, marginBottom: 10, border: '1px solid #E9E9E9' }}>
                        <Image src={p.src} alt={`plano · ${p.label}`} fill className="object-contain" sizes="200px" />
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#1E1E1E', marginBottom: 2 }}>{p.label}</div>
                      <div style={{ fontSize: 11, fontWeight: 400, color: 'rgba(30,30,30,0.45)' }}>{p.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(30,30,30,0.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FBFBFB',
              padding: 'clamp(20px, 5vw, 48px)',
              maxWidth: 680, width: '95%',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setModal(null)}
              style={{
                position: 'absolute', top: 12, right: 12,
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: '1px solid #E9E9E9', cursor: 'pointer',
                color: 'rgba(30,30,30,0.45)', borderRadius: 2,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(30,30,30,0.45)', marginBottom: 16, paddingRight: 40 }}>
              PLANO DETALLADO
            </div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', marginBottom: 16 }}>
              <Image src={modal.src} alt={modal.label} fill className="object-contain" sizes="(max-width: 768px) 95vw, 680px" />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1E1E1E', marginBottom: 4 }}>{modal.label}</div>
            <div style={{ fontSize: 12, fontWeight: 400, color: 'rgba(30,30,30,0.45)' }}>{modal.description}</div>
          </div>
        </div>
      )}
    </section>
  )
}
