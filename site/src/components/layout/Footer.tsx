import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import { getAllProjects, getSiteSettings } from '@/sanity/queries'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Contacto', href: '/contacto' },
]

const DEFAULTS = {
  whatsapp: '+54 11 6596 2401',
  email: 'Rigmagrupo@gmail.com',
  direccion: 'Guardia Nacional 739, PB',
}

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const colHeading: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
  marginBottom: 24,
}

export default async function Footer() {
  const year = new Date().getFullYear()
  const [projects, settings] = await Promise.all([getAllProjects(), getSiteSettings()])

  const whatsapp = settings?.whatsapp ?? DEFAULTS.whatsapp
  const email = settings?.email ?? DEFAULTS.email
  const direccion = settings?.direccion ?? DEFAULTS.direccion
  const telHref = `tel:+${whatsapp.replace(/[^\d]/g, '')}`

  return (
    <footer style={{ background: '#1E1E1E', padding: 'clamp(28px, 5vw, 64px) clamp(20px, 5vw, 56px) clamp(24px, 3vw, 40px)', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
      {/* Main grid: 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 md:gap-12" style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>

        {/* Col 1: Logo + Ubicación */}
        <div>
          <div style={{ marginBottom: 28 }}>
            <Logo size={44} color="rgba(255,255,255,0.85)" />
          </div>
          <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)' }}>
            {direccion}
            <br />
            Ciudad de Buenos Aires
          </p>
        </div>

        {/* Col 2: Proyectos */}
        <div>
          <p style={colHeading}>Proyectos</p>
          {projects.map((p) => (
            <div key={p.slug} style={{ marginBottom: 12 }}>
              <Link href={`/proyectos/${p.slug}`} className="hover-accent-link-dark" style={{ fontSize: 13, fontWeight: 400, display: 'inline-block' }}>
                {p.title}
              </Link>
            </div>
          ))}
        </div>

        {/* Col 3: Empresa */}
        <div>
          <p style={colHeading}>Empresa</p>
          {navLinks.map(({ label, href }) => (
            <div key={href} style={{ marginBottom: 12 }}>
              <Link href={href} className="hover-accent-link-dark" style={{ fontSize: 13, fontWeight: 400, display: 'inline-block' }}>
                {label}
              </Link>
            </div>
          ))}
        </div>

        {/* Col 4: Contacto */}
        <div>
          <p style={colHeading}>Contacto</p>
          <a href={telHref} style={{ fontSize: 13, fontWeight: 400, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
            <PhoneIcon />
            <span className="hover-accent-link-dark">{whatsapp}</span>
          </a>
          <a href={`mailto:${email}`} style={{ fontSize: 13, fontWeight: 400, display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
            <EmailIcon />
            <span className="hover-accent-link-dark" style={{ wordBreak: 'break-all' }}>{email}</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px 14px' }}>
          <span style={{ fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
            © {year} Rigma Group · Todos los derechos reservados
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }} aria-hidden>·</span>
          <Link href="/terminos" className="hover-accent-link-dark" style={{ fontSize: 10, letterSpacing: '0.06em' }}>
            Términos y Condiciones
          </Link>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }} aria-hidden>·</span>
          <Link href="/privacidad" className="hover-accent-link-dark" style={{ fontSize: 10, letterSpacing: '0.06em' }}>
            Política de Privacidad
          </Link>
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B59969' }}>
          Viví diferente, viví RIGMA
        </span>
      </div>
    </footer>
  )
}
