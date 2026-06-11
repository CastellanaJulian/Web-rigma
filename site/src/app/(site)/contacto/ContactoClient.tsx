'use client'

import { useState } from 'react'
import Image from 'next/image'
import ContactForm from '@/components/shared/ContactForm'
import { useInView } from '@/hooks/useInView'
import type { SiteSettings } from '@/types/project'

// Valores institucionales por defecto si el singleton de Sanity aún no se cargó.
const DEFAULTS: SiteSettings = {
  whatsapp: '+54 11 6596 2401',
  email: 'Rigmagrupo@gmail.com',
  direccion: 'Guardia Nacional 739, PB · CABA',
}

const whatsappIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.526 3.657 1.44 5.163L2 22l4.98-1.418A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1.45 5.5c-.18-.45-.37-.46-.54-.47-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.67 2.66 4.1 3.63.57.22 1.02.35 1.37.45.57.18 1.1.15 1.51.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.015-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78z"
      fill="rgba(30,30,30,0.65)"
    />
  </svg>
)

const emailIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(30,30,30,0.65)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3,5 12,13 21,5" />
  </svg>
)

const officeIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(30,30,30,0.65)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" />
    <circle cx="12" cy="8" r="2" />
  </svg>
)

function buildChannels(settings: SiteSettings) {
  const waDigits = settings.whatsapp.replace(/[^\d]/g, '')
  return [
    { label: 'WhatsApp', value: settings.whatsapp, href: `https://wa.me/${waDigits}`, icon: whatsappIcon },
    { label: 'Email', value: settings.email, href: `mailto:${settings.email}`, icon: emailIcon },
    { label: 'Oficina', value: settings.direccion, href: `https://maps.google.com/?q=${encodeURIComponent(settings.direccion)}`, icon: officeIcon },
  ]
}

const columnPadding = 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 64px) clamp(32px, 5vw, 48px) clamp(20px, 5vw, 56px)'

type Props = {
  settings: SiteSettings | null
  imagen?: string
  projects?: { slug: string; title: string }[]
}

export default function ContactoClient({ settings, imagen, projects = [] }: Props) {
  const channels = buildChannels(settings ?? DEFAULTS)
  const [success, setSuccess] = useState(false)
  const [leftRef, leftVisible]   = useInView(0.05)
  const [rightRef, rightVisible] = useInView(0.05)

  const fadeUp = (visible: boolean, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(22px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
    transitionDelay: visible ? `${delay}ms` : '0ms',
  })

  return (
    <section style={{ borderTop: '1px solid #E9E9E9' }}>
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        {/* ── Columna izquierda ── */}
        <div
          ref={leftRef as React.RefObject<HTMLDivElement>}
          data-contact-scroll
          className="order-2 lg:order-1 flex flex-col"
          style={{ padding: columnPadding, background: '#FBFBFB' }}
        >
          {success ? (
            /* ── Estado de éxito ── */
            <div className="flex flex-col justify-center" style={{ flex: 1, gap: 16 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#B59969',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polyline
                    points="4,12 9,17 20,7"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#1E1E1E',
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                ¡Mensaje enviado!
              </h2>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(30,30,30,0.65)',
                  maxWidth: 400,
                }}
              >
                Recibimos tu consulta. Te respondemos a la brevedad.
              </p>
            </div>
          ) : (
            <>
              <h1
                style={{
                  fontSize: 'clamp(40px, 5vw, 66px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#1E1E1E',
                  lineHeight: 1,
                  marginBottom: 14,
                  ...fadeUp(leftVisible, 0),
                }}
              >
                Hablemos.
              </h1>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(30,30,30,0.65)',
                  marginBottom: 40,
                  maxWidth: 460,
                  ...fadeUp(leftVisible, 100),
                }}
              >
                Escribinos para consultar sobre proyectos, coordinar una visita o pedir información personalizada.
              </p>

              <div style={fadeUp(leftVisible, 180)}>
                <ContactForm theme="light" onSuccess={() => setSuccess(true)} projects={projects} />
              </div>
            </>
          )}

          {/* Canales de contacto — 3-col solo cuando hay ancho real:
              full-width en tablet vertical (md) y desktop ancho (xl).
              En el rango lg el split comprime la columna, así que van apilados. */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: '1px solid #E9E9E9',
              gap: 24,
            }}
          >
            {channels.map((ch, i) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.label === 'WhatsApp' ? '_blank' : undefined}
                rel={ch.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10, textDecoration: 'none',
                  ...fadeUp(leftVisible, 280 + i * 80),
                }}
              >
                <div style={{ flexShrink: 0, marginTop: 1 }}>{ch.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'rgba(30,30,30,0.45)',
                      marginBottom: 5,
                    }}
                  >
                    {ch.label}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#1E1E1E', lineHeight: 1.5, overflowWrap: 'anywhere' }}>
                    {ch.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Columna derecha: imagen ── */}
        <div
          ref={rightRef as React.RefObject<HTMLDivElement>}
          className="order-1 lg:order-2 h-[280px] lg:h-full contacto-img-col"
          style={{
            paddingTop: 'clamp(0px, 3.3vw, 48px)',
            paddingRight: 'clamp(0px, 3.9vw, 56px)',
            paddingBottom: 'clamp(0px, 3.3vw, 48px)',
            paddingLeft: 0,
            opacity: rightVisible ? 1 : 0,
            transition: 'opacity 1s ease',
            transitionDelay: rightVisible ? '150ms' : '0ms',
          }}
        >
          <div className="relative overflow-hidden h-full" style={{ background: '#E3E3E3' }}>
            {imagen && (
              <Image
                src={imagen}
                alt="Rigma — proyectos"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
