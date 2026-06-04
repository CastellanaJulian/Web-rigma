'use client'

import { useState } from 'react'
import SectionLabel from '@/components/shared/SectionLabel'

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  fontSize: 13,
  fontWeight: 400,
  color: '#FFFFFF',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.15)',
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
  color: 'rgba(255,255,255,0.45)',
  marginBottom: 8,
}

export default function ContactSectionHome() {
  const [hovSubmit, setHovSubmit] = useState(false)

  return (
    <section style={{ background: '#1E1E1E', padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 56px)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <SectionLabel dark>Contacto</SectionLabel>
        <h2
          style={{
            fontSize: 'clamp(40px, 5vw, 66px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            lineHeight: 1.05,
            marginBottom: 52,
          }}
        >
          Encontrá tu
          <br />
          próxima{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#B59969' }}>inversión</em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
            <select
              style={{ ...fieldStyle, color: 'rgba(255,255,255,0.65)' }}
              defaultValue=""
            >
              <option value="" disabled style={{ background: '#353631' }}>
                Seleccioná un proyecto
              </option>
              <option value="cosquin" style={{ background: '#353631' }}>Cosquín 1534</option>
              <option value="larrazabal" style={{ background: '#353631' }}>Av. Larrazábal 1255</option>
              <option value="zelada" style={{ background: '#353631' }}>Zelada 6171</option>
              <option value="otro" style={{ background: '#353631' }}>Otro / No sé aún</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Mensaje</label>
            <textarea
              placeholder="Contanos qué información necesitás..."
              rows={3}
              style={{ ...fieldStyle, resize: 'none' }}
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
              background: hovSubmit ? '#B59969' : '#FFFFFF',
              color: '#1E1E1E',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 2,
              marginTop: 4,
              fontFamily: 'inherit',
              transition: 'background 0.2s ease',
            }}
          >
            ENVIAR CONSULTA
          </button>
        </div>
      </div>
    </section>
  )
}
