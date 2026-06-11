import type { CSSProperties } from 'react'

export type LegalSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

const wrapStyle: CSSProperties = {
  background: '#FBFBFB',
  padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 56px) clamp(64px, 9vw, 120px)',
}

const innerStyle: CSSProperties = {
  maxWidth: 760,
  margin: '0 auto',
}

const labelStyle: CSSProperties = {
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#B59969',
  marginBottom: 18,
}

const titleStyle: CSSProperties = {
  fontSize: 'clamp(30px, 5vw, 44px)',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: '#1E1E1E',
  marginBottom: 14,
}

const updatedStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  color: 'rgba(30,30,30,0.45)',
  marginBottom: 48,
}

const headingStyle: CSSProperties = {
  fontSize: 'clamp(16px, 2.4vw, 19px)',
  fontWeight: 600,
  color: '#1E1E1E',
  marginTop: 40,
  marginBottom: 14,
}

const paragraphStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 300,
  lineHeight: 1.85,
  color: 'rgba(30,30,30,0.78)',
  marginBottom: 14,
}

const bulletStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 300,
  lineHeight: 1.75,
  color: 'rgba(30,30,30,0.78)',
  marginBottom: 8,
  paddingLeft: 18,
  position: 'relative',
}

export default function LegalDoc({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro?: string
  sections: LegalSection[]
}) {
  return (
    <div style={wrapStyle}>
      <article style={innerStyle}>
        <p style={labelStyle}>Información legal</p>
        <h1 style={titleStyle}>{title}</h1>
        <p style={updatedStyle}>Última actualización: {updated}</p>

        {intro && <p style={paragraphStyle}>{intro}</p>}

        {sections.map((section, i) => (
          <section key={i}>
            <h2 style={headingStyle}>
              {i + 1}. {section.heading}
            </h2>
            {section.paragraphs?.map((p, j) => (
              <p key={j} style={paragraphStyle}>
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul style={{ listStyle: 'none', marginBottom: 14 }}>
                {section.bullets.map((b, j) => (
                  <li key={j} style={bulletStyle}>
                    <span style={{ position: 'absolute', left: 0, color: '#B59969' }}>·</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </div>
  )
}
