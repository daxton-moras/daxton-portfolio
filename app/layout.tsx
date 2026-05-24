import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daxton Moras | Portfolio',
  description:
    'Implementation Engineer building toward AI infrastructure, data systems, and intelligent automation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}