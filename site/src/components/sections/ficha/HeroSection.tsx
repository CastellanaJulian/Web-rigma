'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'
import StatusPill from '@/components/shared/StatusPill'
import { useCanHover } from '@/hooks/useCanHover'

type Props = { project: Project }

export default function HeroSection({ project }: Props) {
  const canHover = useCanHover()
  const [hovCta, setHovCta] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section style={{ position: 'relative', height: '86vh', minHeight: 580, overflow: 'hidden' }}>
      <Image
        src={project.coverImage}
        alt={project.title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(30,30,30,0.88) 0%, rgba(30,30,30,0.22) 55%, transparent 100%)',
        }}
      />

      {/* Botón volver — solo mobile/tablet */}
      <div className="block lg:hidden" style={{ position: 'absolute', top: 'clamp(16px, 4vw, 24px)', left: 'clamp(20px, 5vw, 56px)' }}>
        <Link
          href="/proyectos"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.35)',
            paddingBottom: 2,
          }}
        >
          ← Volver a proyectos
        </Link>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px, 5vw, 56px) clamp(20px, 5vw, 56px) clamp(32px, 5vw, 56px)' }}>
        <StatusPill status={project.status} dark />
        <h1
          style={{
            marginTop: 18, marginBottom: 32,
            fontSize: 'clamp(36px, 5vw, 58px)',
            fontWeight: 700, letterSpacing: '0.01em',
            textTransform: 'uppercase', color: '#FFFFFF', lineHeight: 1,
          }}
        >
          {project.title}
        </h1>
        <a
          href="#contacto"
          onMouseEnter={() => canHover && setHovCta(true)}
          onMouseLeave={() => setHovCta(false)}
          style={{
            display: 'inline-block',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            background: hovCta ? '#B59969' : '#FFFFFF',
            color: '#1E1E1E',
            padding: '11px 22px', borderRadius: 2,
            textDecoration: 'none', cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
        >
          CONTACTANOS
        </a>
      </div>
    </section>
  )
}
