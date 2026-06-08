'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { projects } from '@/data/projects'
import { Project } from '@/types/project'
import ProjectCard from '@/components/shared/ProjectCard'
import MapaSection from '@/components/sections/proyectos/MapaSection'
import ContactSectionHome from '@/components/sections/home/ContactSectionHome'

// ── Helpers ───────────────────────────────────────────────────────────────────
type Filter = 'todos' | 'en-ejecucion' | 'terminados'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todos',        label: 'Todos' },
  { id: 'en-ejecucion', label: 'En ejecución' },
  { id: 'terminados',   label: 'Terminados' },
]

function filterProjects(list: Project[], filter: Filter): Project[] {
  if (filter === 'en-ejecucion') return list.filter((p) => p.status === 'En Ejecución')
  if (filter === 'terminados')   return list.filter((p) => p.status === 'Terminado')
  return list
}

function sortAndSplit(list: Project[]): { featured: Project[]; resto: Project[] } {
  const sorted = [...list].sort((a, b) => {
    if (a.priority && b.priority) return a.priority - b.priority
    if (a.priority) return -1
    if (b.priority) return 1
    return 0
  })
  return {
    featured: sorted.filter((p) => p.priority && p.priority <= 2),
    resto:    sorted.filter((p) => !p.priority || p.priority > 2),
  }
}

function getResponsiveSpan(count: number): number {
  if (count === 1) return 6
  if (count % 3 === 0) return 2
  return 3
}

// ── EmptyState ────────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div
      style={{
        padding: '96px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: '1px solid #E9E9E9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="rgba(30,30,30,0.65)" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#1E1E1E', letterSpacing: '0.01em' }}>
        Pronto sumaremos nuevos proyectos en esta categoría.
      </p>
      <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(30,30,30,0.65)', maxWidth: 320, lineHeight: 1.7 }}>
        Mientras tanto podés escribirnos y contarnos qué estás buscando.
      </p>
      <a
        href="https://wa.me/541165962401"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 8,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#1E1E1E',
          borderBottom: '1px solid #1E1E1E',
          paddingBottom: 2,
          textDecoration: 'none',
        }}
      >
        ESCRIBIR POR WHATSAPP
      </a>
    </div>
  )
}

// ── ProyectosGrid ─────────────────────────────────────────────────────────────
function ProyectosGrid({ list, filter }: { list: Project[]; filter: Filter }) {
  if (list.length === 0) return <EmptyState />

  type CardItem = { project: Project; size: 'lg' | 'md'; span: number }
  let cards: CardItem[]

  if (filter === 'todos') {
    const { featured, resto } = sortAndSplit(list)
    const mdSpan = getResponsiveSpan(resto.length)
    cards = [
      ...featured.map((p) => ({ project: p, size: 'lg' as const, span: 3 })),
      ...resto.map((p)    => ({ project: p, size: 'md' as const, span: mdSpan })),
    ]
  } else {
    const sorted = [...list].sort((a, b) => {
      if (a.priority && b.priority) return a.priority - b.priority
      if (a.priority) return -1
      if (b.priority) return 1
      return 0
    })
    const size: 'lg' | 'md' = filter === 'en-ejecucion' ? 'lg' : 'md'
    const span = getResponsiveSpan(sorted.length)
    cards = sorted.map((p) => ({ project: p, size, span }))
  }

  return (
    <div
      key={filter}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 16,
      }}
    >
      {cards.map(({ project, size, span }, index) => (
        <div
          key={project.id}
          style={{
            gridColumn: `span ${span}`,
            height: 460,
            animation: 'cardSlideUp 0.5s ease-out both',
            animationDelay: `${index * 40}ms`,
          }}
          className="max-md:!col-span-6"
        >
          <ProjectCard project={project} size={size} className="h-full" />
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProyectosPage() {
  const [filter, setFilter] = useState<Filter>('todos')
  const filtered = filterProjects(projects, filter)
  const [headerRef, headerVisible] = useInView(0.05)

  const fadeUp = (delay = 0) => ({
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0)' : 'translateY(22px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
    transitionDelay: headerVisible ? `${delay}ms` : '0ms',
  })

  return (
    <>
      {/* 01 · PAGE HEADER */}
      <section
        ref={headerRef as React.RefObject<HTMLElement>}
        style={{ padding: '80px clamp(20px, 5vw, 56px) 64px' }}
      >
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#1E1E1E',
            lineHeight: 1,
            marginBottom: 20,
            ...fadeUp(0),
          }}
        >
          Nuestros proyectos
        </h1>
        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(30,30,30,0.65)',
            maxWidth: 520,
            ...fadeUp(120),
          }}
        >
          Lo que estamos construyendo y lo que ya entregamos.
          Cada proyecto, un estándar de calidad y cumplimiento.
        </p>
      </section>

      {/* 02 · FILTER TABS */}
      <div
        style={{
          padding: '0 clamp(20px, 5vw, 56px)',
          borderBottom: '1px solid #E9E9E9',
          ...fadeUp(200),
        }}
      >
        <div style={{ display: 'flex', gap: 40 }}>
          {FILTERS.map((f) => {
            const isActive = f.id === filter
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 0 16px',
                  fontSize: 11,
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive ? '#1E1E1E' : 'rgba(30,30,30,0.65)',
                  borderBottom: isActive ? '2px solid #B59969' : '2px solid transparent',
                  marginBottom: -1,
                  fontFamily: 'inherit',
                  transition: 'color 0.15s ease',
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 03 · GRID */}
      <section style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 56px)' }}>
        <ProyectosGrid list={filtered} filter={filter} />
      </section>

      {/* 04 · MAPA */}
      <MapaSection projects={projects} />

      {/* 05 · CONTACTO */}
      <ContactSectionHome />
    </>
  )
}
