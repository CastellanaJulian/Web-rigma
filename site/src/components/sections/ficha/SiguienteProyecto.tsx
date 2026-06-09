'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import StatusPill from '@/components/shared/StatusPill'
import { RelatedProject } from '@/types/project'
import { useCanHover } from '@/hooks/useCanHover'

type Props = {
  project: RelatedProject
}

export default function SiguienteProyecto({ project }: Props) {
  const canHover = useCanHover()
  const [hovSection, setHovSection] = useState(false)
  const [hovLink, setHovLink] = useState(false)

  const location = project.neighborhood
    ? `${project.neighborhood}, Buenos Aires`
    : project.location

  return (
    <section
      style={{ position: 'relative', height: 320, overflow: 'hidden' }}
      onMouseEnter={() => canHover && setHovSection(true)}
      onMouseLeave={() => setHovSection(false)}
    >
      {/* Imagen de fondo con zoom */}
      {project.coverImage ? (
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            transform: hovSection ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.7s ease',
          }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: '#2A2A2A' }} />
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(30,30,30,0.82) 0%, rgba(30,30,30,0.35) 55%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Label superior — "Siguiente proyecto" */}
      <div style={{
        position: 'absolute', top: 28, left: 'clamp(20px, 5vw, 80px)',
        display: 'flex', alignItems: 'center', gap: 12,
        fontSize: 10, fontWeight: 600, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
        pointerEvents: 'none',
      }}>
        <span style={{ width: 20, height: 1, background: '#B59969', flexShrink: 0 }} />
        Siguiente proyecto
      </div>

      {/* Contenido inferior */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 clamp(20px, 5vw, 80px) 32px',
      }}>
        <div style={{ marginBottom: 14 }}>
          <StatusPill status={project.status} dark />
        </div>
        <h2 style={{
          marginBottom: 8, fontSize: 34, fontWeight: 700,
          letterSpacing: '0.01em', textTransform: 'uppercase',
          color: '#FFFFFF', lineHeight: 1,
        }}>
          {project.title}
        </h2>
        <p style={{
          fontSize: 11, fontWeight: 400, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
          marginBottom: 20,
        }}>
          {location}
        </p>
        <Link
          href={`/proyectos/${project.slug}`}
          onMouseEnter={() => canHover && setHovLink(true)}
          onMouseLeave={() => setHovLink(false)}
          style={{
            display: 'inline-flex', alignItems: 'center',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: hovLink ? '#B59969' : '#FFFFFF',
            borderBottom: `1px solid ${hovLink ? '#B59969' : 'rgba(255,255,255,0.35)'}`,
            paddingBottom: 2,
            transition: 'color 0.25s ease, border-color 0.25s ease',
          }}
        >
          VER PROYECTO →
        </Link>
      </div>
    </section>
  )
}
