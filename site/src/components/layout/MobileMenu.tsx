'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { links } from './NavLinks'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span
          className="block h-px bg-ink transition-all duration-200 origin-center"
          style={{ transform: isOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
        />
        <span
          className="block h-px bg-ink transition-all duration-200"
          style={{ opacity: isOpen ? 0 : 1 }}
        />
        <span
          className="block h-px bg-ink transition-all duration-200 origin-center"
          style={{ transform: isOpen ? 'translateY(-5px) rotate(-45deg)' : 'none' }}
        />
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg border-b border-line shadow-sm">
          <nav className="flex flex-col px-6 py-4">
            {links.map(({ label, href }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="py-4 border-b border-line last:border-0"
                  style={{
                    fontSize: 11,
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
