import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import NavLinks from '@/components/layout/NavLinks'
import MobileMenu from '@/components/layout/MobileMenu'

export default function Navbar() {
  return (
    <header
      className="sticky top-0"
      style={{
        zIndex: 1100,
        background: 'rgba(251,251,251,0.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid #E9E9E9',
      }}
    >
      <div
        className="max-w-[1440px] mx-auto flex items-center justify-between"
        style={{
          height: 64,
          paddingLeft: 'clamp(20px, 5vw, 56px)',
          paddingRight: 'clamp(20px, 5vw, 56px)',
        }}
      >
        <Link href="/" aria-label="Rigma — Inicio">
          <Logo size={40} />
        </Link>

        <NavLinks />
        <MobileMenu />
      </div>
    </header>
  )
}
