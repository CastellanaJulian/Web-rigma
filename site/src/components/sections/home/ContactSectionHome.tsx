'use client'

import { useState } from 'react'
import SectionLabel from '@/components/shared/SectionLabel'
import ContactForm from '@/components/shared/ContactForm'

export default function ContactSectionHome({ projects = [] }: { projects?: { slug: string; title: string }[] }) {
  const [success, setSuccess] = useState(false)

  return (
    <section style={{ background: '#1E1E1E', padding: 'clamp(48px, 9vw, 120px) clamp(20px, 5vw, 56px)' }}>
      <div data-contact-scroll style={{ maxWidth: 640, margin: '0 auto' }}>
        <SectionLabel dark>Contacto</SectionLabel>

        {success ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
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
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                lineHeight: 1.05,
              }}
            >
              ¡Mensaje enviado!
            </h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
              Recibimos tu consulta. Te respondemos a la brevedad.
            </p>
          </div>
        ) : (
          <>
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

            <ContactForm theme="dark" onSuccess={() => setSuccess(true)} projects={projects} />
          </>
        )}
      </div>
    </section>
  )
}
