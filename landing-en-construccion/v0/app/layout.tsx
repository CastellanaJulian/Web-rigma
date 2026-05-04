import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-roboto" });

export const metadata: Metadata = {
  title: 'Rigma Group',
  description: 'Desarrollo inmobiliario. Próximamente.',
  icons: {
    icon: '/logo-rigma.png',
    apple: '/logo-rigma.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={roboto.variable}>
      <body className="font-sans antialiased bg-[rgb(20,20,20)] text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
