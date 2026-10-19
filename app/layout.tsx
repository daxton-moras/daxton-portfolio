import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { siteUrl } from '@/data/portfolio-content'

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const title = 'Daxton Moras — Cloud & AI Engineer'
const description =
  'AWS-certified Cloud & AI engineer in Dublin running GPU-accelerated edge inference in production, with four years of enterprise AWS and a focus on agentic AI.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  // Link previews when the site is shared on LinkedIn, Slack and similar.
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Daxton Moras',
    type: 'website',
    images: [{ url: '/profile.jpg', width: 800, height: 800, alt: 'Portrait of Daxton Moras' }],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/profile.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
