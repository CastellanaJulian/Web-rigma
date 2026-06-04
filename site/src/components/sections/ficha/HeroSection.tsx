'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Project } from '@/types/project'
import StatusPill from '@/components/shared/StatusPill'

type Props = { project: Project }

export default function HeroSection({ project }: Props) {
  const [hovCta, setHovCta] = useState(false)

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
          onMouseEnter={() => setHovCta(true)}
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
