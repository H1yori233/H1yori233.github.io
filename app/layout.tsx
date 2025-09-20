import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Serif } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Metadata } from 'next'

const ibmPlexSans = IBM_Plex_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

const ibmPlexSerif = IBM_Plex_Serif({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Kaichin's Website",
    template: "%s | Kaichin's Website"
  },
  description: "Kaichin's Website",
  keywords: ["Kaichin", "Kaiqin Kong", "Portfolio", "Computer Science", "Industrial Design", "UC San Diego", "UCSD"],
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
    title: "Kaichin's Website",
    description: "Kaichin's Website",
    siteName: "Kaichin's Website",
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: "Kaichin's Website",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kaichin's Website",
    description: "Kaichin's Website",
    images: ['/images/twitter-image.png'],
    creator: '@kaichin',
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
          "min-h-screen font-sans antialiased",
          ibmPlexSans.variable,
          ibmPlexMono.variable,
          ibmPlexSerif.variable,
          ibmPlexSans.className
        )}>
        {children}
      </body>
    </html>
  )
}

