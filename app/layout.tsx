import { Newsreader, IBM_Plex_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Metadata } from 'next'

// The human voice — an editorial serif with optical sizing and a beautiful italic.
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

// The engineer's hand — used for labels, years, numbers, the clock.
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Kaiqin Kong",
    template: "%s — Kaiqin Kong"
  },
  description: "Kaiqin Kong — an industrial designer turned systems engineer, making video generation fast.",
  keywords: ["Kaiqin", "Kaiqin Kong", "Portfolio", "Computer Science", "Industrial Design", "UC San Diego", "UCSD"],
  authors: [{ name: "Kaiqin Kong" }],
  creator: "Kaiqin Kong",
  publisher: "Kaiqin Kong",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://h1yori233.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://h1yori233.github.io',
    title: "Kaiqin's Website",
    description: "Kaiqin's Website",
    siteName: "Kaiqin's Website",
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: "Kaiqin's Website",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kaiqin's Website",
    description: "Kaiqin's Website",
    images: ['/images/twitter-image.png'],
    creator: '@kaiqin',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen antialiased",
          newsreader.variable,
          ibmPlexMono.variable,
        )}>
        {children}
      </body>
    </html>
  )
}

