import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Genzopia – Play 100+ Free Online Games | Arcade, Racing, Puzzle',
  description: 'Genzopia is a free online gaming platform like Poki where you can play 100+ WebGL games instantly — Arcade, Racing, Puzzle, Multiplayer and more. No download needed.',
  keywords: ['free online games', 'play games online', 'poki alternative', 'webgl games', 'arcade games', 'racing games', 'puzzle games', 'multiplayer games', 'genzopia', 'browser games'],
  metadataBase: new URL('https://www.genzopia.com'),
  openGraph: {
    title: 'Genzopia – Play 100+ Free Online Games',
    description: 'The free gaming platform where developers publish WebGL games and players enjoy unlimited fun. Play Arcade, Racing, Puzzle, Multiplayer — no download.',
    url: 'https://www.genzopia.com',
    siteName: 'Genzopia',
    images: [{ url: '/genzopia-banner.png', width: 1200, height: 630, alt: 'Genzopia Gaming Platform' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genzopia – Play 100+ Free Online Games',
    description: 'Free gaming platform – Arcade, Racing, Puzzle, Multiplayer. No download needed.',
    images: ['/genzopia-banner.png'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/logo.png', apple: '/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        />
        <link rel="preconnect" href="https://checkout.razorpay.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
