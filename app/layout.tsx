import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Genzopia',
  description: 'Genzopia Gaming Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
