import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import { getAllProjects, getSiteSettings } from '@/sanity/queries'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Contacto', href: '/contacto' },
]

const linkStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  color: 'rgba(255,255,255,0.65)',
  textDecoration: 'none',
  marginBottom: 12,
  display: 'block',
}

const headingStyle: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
  marginBottom: 22,
}

// Valores institucionales por defecto — se usan si el singleton de Sanity aún no se cargó.
const DEFAULTS = {
  whatsapp: '+54 11 6596 2401',
  email: 'Rigmagrupo@gmail.com',
  direccion: 'Guardia Nacional 739, PB',
}

export default async function Footer() {
  const year = new Date().getFullYear()
  const [projects, settings] = await Promise.all([getAllProjects(), getSiteSettings()])

  const whatsapp = settings?.whatsapp ?? DEFAULTS.whatsapp
  const email = settings?.email ?? DEFAULTS.email
  const direccion = settings?.direccion ?? DEFAULTS.direccion
  const telHref = `tel:+${whatsapp.replace(/[^\d]/g, '')}`

  return (
    <footer
      style={{
        background: '#1E1E1E',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        padding: 'clamp(40px, 6vw, 60px) clamp(20px, 5vw, 56px) clamp(24px, 4vw, 40px)',
      }}
    >
      {/* Main grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-12 mb-14"
      >
        {/* Col 1: Logo + contact info */}
        <div>
          <div style={{ marginBottom: 24 }}>
            <Logo size={44} color="rgba(255,255,255,0.85)" />
          </div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 300,
              lineHeight: 2,
              color: 'rgba(255,255,255,0.65)',
              marginBottom: 16,
            }}
          >
            {direccion}
            <br />
            Ciudad de Buenos Aires
          </p>
          <p style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)' }}>
            <a
              href={`mailto:${email}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {email}
            </a>
            <br />
            <a href={telHref} style={{ color: 'inherit', textDecoration: 'none' }}>
              {whatsapp}
            </a>
          </p>
        </div>

        {/* Col 2: Proyectos */}
        <div>
          <p style={headingStyle}>Proyectos</p>
          {projects.map((p) => (
            <Link key={p.slug} href={`/proyectos/${p.slug}`} style={linkStyle} className="hover:text-white transition-colors duration-200">
              {p.title}
            </Link>
          ))}
        </div>

        {/* Col 3: Empresa */}
        <div>
          <p style={headingStyle}>Empresa</p>
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} style={linkStyle} className="hover:text-white transition-colors duration-200">
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>
          © {year} Rigma Group · Todos los derechos reservados
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#B59969',
          }}
        >
          Viví diferente, viví RIGMA
        </span>
      </div>
    </footer>
  )
}
