import { PortableText as BasePortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.8, color: 'rgba(30,30,30,0.65)', marginBottom: 20 }}>
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: 600, color: '#1E1E1E' }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(30,30,30,0.65)', marginBottom: 20, paddingLeft: 20, listStyle: 'disc' }}>
        {children}
      </ul>
    ),
  },
}

type Props = { value?: PortableTextBlock[] | null }

/**
 * Render de campos Portable Text de Sanity con los estilos del sitio.
 * Devuelve null si no hay contenido (empty state — la sección decide si se omite).
 */
export default function PortableText({ value }: Props) {
  if (!value || value.length === 0) return null
  return <BasePortableText value={value} components={components} />
}
