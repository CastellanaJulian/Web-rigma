'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Project } from '@/types/project'
import StatusPill from './StatusPill'

type Props = {
  project: Project
  size?: 'lg' | 'md'
  className?: string
}

export default function ProjectCard({ project, size = 'lg', className = '' }: Props) {
  const [hovered, setHovered] = useState(false)
  const isLg = size === 'lg'

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block overflow-hidden ${className}`}
      style={{
        transform: hovered ? 'scale(1.015)' : 'scale(1)',
        transition: 'transform 0.5s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={project.coverImage}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(30,30,30,0.90) 0%, rgba(30,30,30,0.20) 55%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ padding: isLg ? '0 40px 36px' : '0 20px 20px' }}
      >
        <div style={{ marginBottom: isLg ? 14 : 10 }}>
          <StatusPill status={project.status} dark />
        </div>
        <h3
          style={{
            fontSize: isLg ? 36 : 22,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            lineHeight: isLg ? 1 : 1.1,
            marginBottom: isLg ? 6 : 8,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: isLg ? 15 : 11,
            fontWeight: isLg ? 500 : 400,
            letterSpacing: isLg ? '0.06em' : '0.08em',
            textTransform: isLg ? undefined : 'uppercase',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: isLg ? 22 : 18,
          }}
        >
          {project.neighborhood ?? project.location}
        </p>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: hovered ? '#B59969' : '#FFFFFF',
            borderBottom: `1px solid ${hovered ? '#B59969' : 'rgba(255,255,255,0.35)'}`,
            paddingBottom: 2,
            transition: 'color 0.3s ease, border-color 0.3s ease',
          }}
        >
          VER PROYECTO →
        </span>
      </div>
    </Link>
  )
}
