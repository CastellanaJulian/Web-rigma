'use client'

import { useState } from 'react'
import Image from 'next/image'

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  fontSize: 13,
  fontWeight: 400,
  color: '#1E1E1E',
  background: 'transparent',
  border: '1px solid #E9E9E9',
  borderRadius: 2,
  appearance: 'none',
  fontFamily: 'inherit',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(30,30,30,0.45)',
  marginBottom: 8,
}

const channels = [
  {
    label: 'WhatsApp',
    value: '+54 11 6596 2401',
    href: 'https://wa.me/541165962401',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 1.89.526 3.657 1.44 5.163L2 22l4.98-1.418A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1.45 5.5c-.18-.45-.37-.46-.54-.47-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.67 2.66 4.1 3.63.57.22 1.02.35 1.37.45.57.18 1.1.15 1.51.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.015-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78z"
          fill="rgba(30,30,30,0.65)"
        />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'Rigmagrupo@gmail.com',
    href: 'mailto:Rigmagrupo@gmail.com',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(30,30,30,0.65)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3,5 12,13 21,5" />
      </svg>
    ),
  },
  {
    label: 'Oficina',
    value: 'Guardia Nacional 739, PB · CABA',
    href: 'https://maps.google.com/?q=Guardia+Nacional+739+Buenos+Aires',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(30,30,30,0.65)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" />
        <circle cx="12" cy="8" r="2" />
      </svg>
    ),
  },
]

export default function ContactoPage() {
  const [hovSubmit, setHovSubmit] = useState(false)

  return (
    <section style={{ borderTop: '1px solid #E9E9E9' }}>
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        {/* ── Columna izquierda: formulario ── */}
        <div
          className="order-2 md:order-1 flex flex-col"
          style={{
            padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 64px) clamp(32px, 5vw, 48px) clamp(20px, 5vw, 56px)',
            background: '#FBFBFB',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(40px, 5vw, 66px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#1E1E1E',
              lineHeight: 1,
              marginBottom: 14,
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
            }}
          >
            Escribinos para consultar sobre proyectos, coordinar una visita o pedir información personalizada.
          </p>

          {/* Formulario */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Nombre completo</label>
                <input type="text" placeholder="Ej: María González" style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>Celular</label>
                <input type="text" placeholder="+54 11 ···· ····" style={fieldStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="nombre@email.com" style={fieldStyle} />
            </div>

            <div>
              <label style={labelStyle}>Proyecto de interés</label>
              <select style={{ ...fieldStyle, color: 'rgba(30,30,30,0.65)' }} defaultValue="">
                <option value="" disabled>Seleccioná un proyecto</option>
                <option value="cosquin">Cosquín 1534</option>
                <option value="larrazabal">Av. Larrazábal 1255</option>
                <option value="zelada">Zelada 6171</option>
                <option value="otro">Otro / No sé aún</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Mensaje</label>
              <textarea
                placeholder="Contanos qué información necesitás..."
                rows={4}
                style={{ ...fieldStyle, resize: 'none', overflow: 'hidden' }}
                onInput={(e) => {
                  const el = e.currentTarget
                  el.style.height = 'auto'
                  el.style.height = el.scrollHeight + 'px'
                }}
              />
            </div>

            <button
              onMouseEnter={() => setHovSubmit(true)}
              onMouseLeave={() => setHovSubmit(false)}
              style={{
                width: '100%',
                padding: '15px 24px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                background: hovSubmit ? '#B59969' : '#1E1E1E',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 2,
                fontFamily: 'inherit',
                transition: 'background 0.2s ease',
              }}
            >
              ENVIAR CONSULTA →
            </button>
          </div>

          {/* Canales de contacto */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: '1px solid #E9E9E9',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
          >
            {channels.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.label === 'WhatsApp' ? '_blank' : undefined}
                rel={ch.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, textDecoration: 'none' }}
              >
                <div style={{ flexShrink: 0, marginTop: 1 }}>{ch.icon}</div>
                <div>
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
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#1E1E1E', lineHeight: 1.5 }}>
                    {ch.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Columna derecha: imagen con margen ── */}
        <div
          className="order-1 md:order-2 h-[280px] md:h-full"
          style={{
            paddingTop: 'clamp(0px, 3.3vw, 48px)',
            paddingRight: 'clamp(0px, 3.9vw, 56px)',
            paddingBottom: 'clamp(0px, 3.3vw, 48px)',
            paddingLeft: 0,
          }}
        >
          <div className="relative overflow-hidden h-full">
            <Image
              src="/images/img-2.jpg"
              alt="Rigma — proyectos"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
