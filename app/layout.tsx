import { Inter } from 'next/font/google'
// import { ThemeProvider, ThemeToggle } from '@/lib/theme'
import { cn } from '@/lib/utils'
import './globals.css'
// import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Kaichin's Website",
  description: 'Showcasing my projects and academic work',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const cookieStore = await cookies()
  // const theme = cookieStore.get('theme')

  return (
    // <html lang="en" suppressHydrationWarning className={theme?.value === 'dark' ? 'dark' : ''}>
    <html lang="en" suppressHydrationWarning>
    <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        {children}
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
          <ThemeToggle />
        </ThemeProvider> */}
      </body>
    </html>
  )
}

