import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { VisualEditsMessenger } from 'orchids-visual-edits'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'IRATHA Auto | Performance. Precision. Power.',
  description:
    'IRATHA Auto - Next generation luxury automotive. Experience performance, precision, and power redefined for the modern era.',
  keywords: ['luxury cars', 'automotive', 'performance vehicles', 'IRATHA Auto'],
  alternates: {
    canonical: 'https://iratha.com'
  }
}

/* ✅ THIS WAS MISSING — FIXES MOBILE VIEW */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased overflow-x-hidden`}>
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  )
}
