'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'INICIO', href: '/' },
  { label: 'PROYECTOS', href: '/proyectos' },
  { label: 'NOSOTROS', href: '/nosotros' },
  { label: 'CONTACTO', href: '/contacto' },
]

export { links }

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-10">
      {links.map(({ label, href }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textDecoration: 'none',
              color: isActive ? '#1E1E1E' : 'rgba(30,30,30,0.65)',
              borderBottom: isActive ? '1.5px solid #B59969' : '1.5px solid transparent',
              paddingBottom: 3,
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
