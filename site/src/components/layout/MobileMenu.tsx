'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { links } from './NavLinks'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  // Ver NavLinks: en el prerender estático de la raíz usePathname() puede venir ''.
  const pathname = usePathname() || '/'

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span
          className="block h-px bg-ink transition-all duration-200 origin-center"
          style={{ transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
        />
        <span
          className="block h-px bg-ink transition-all duration-200"
          style={{ opacity: isOpen ? 0 : 1 }}
        />
        <span
          className="block h-px bg-ink transition-all duration-200 origin-center"
          style={{ transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FBFBFB',
            borderTop: '1px solid #E9E9E9',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            zIndex: 999,
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '24px 32px 36px' }}>
            {links.map(({ label, href }, i) => {
              const isActive = pathname === href
              const isLast = i === links.length - 1
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '18px 0',
                    borderBottom: isLast ? 'none' : '1px solid #E9E9E9',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: isActive ? '#1E1E1E' : 'rgba(30,30,30,0.65)',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
