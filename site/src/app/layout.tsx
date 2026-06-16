import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rigma.com.ar'),
  title: {
    default: 'Rigma Group',
    template: '%s | Rigma Group',
  },
  description: 'Desarrolladora inmobiliaria familiar. Viví diferente, viví RIGMA.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  )
}
