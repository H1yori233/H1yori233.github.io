'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { ChevronUp, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
  fullWidth?: boolean
  showScrollToTop?: boolean
  customNav?: boolean
  customTheme?: {
    background: string
    text: string
    muted: string
    card: string
    border: string
  }
}

const navItems = [
  { path: '/', name: 'Home' },
  { path: '/blog', name: 'Blog' },
  { path: '/project', name: 'Project' },
  { path: '/about', name: 'About' }
]

export function Layout({
  children,
  title,
  description,
  className,
  fullWidth = false,
  showScrollToTop = false,
  customNav = false,
  customTheme
}: LayoutProps) {
  // const { theme } = useTheme()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const themeStyles = customTheme ? {
    backgroundColor: customTheme.background,
    color: customTheme.text,
    '--theme-muted': customTheme.muted,
    '--theme-card': customTheme.card,
    '--theme-border': customTheme.border,
  } as React.CSSProperties : undefined

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={themeStyles}
    >
      {!customNav && (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b bg-background/80">
          <div className="flex justify-center">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link href="/" className="text-lg font-semibold">
                  KAICHIN
                </Link>
                <div className="flex gap-8 md:gap-12">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`relative transition-colors hover:text-foreground/80 ${
                        pathname === item.path ? 'text-foreground' : 'text-foreground/60'
                      }`}
                    >
                      {pathname === item.path && (
                        <motion.span
                          layoutId="underline"
                          className="absolute left-0 top-full block h-px w-full bg-foreground"
                        />
                      )}
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className={`flex-grow ${!customNav && (title || description) ? "pt-16" : ""}`}>
        {(title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8 text-center space-y-4"
          >
            {title && (
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-4">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}

        <div className={`flex-grow ${!fullWidth ? "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" : ""}`}>
          {children}
        </div>
      </main>

      {showScrollToTop && (
        <Button
          variant="outline"
          size="icon"
          className={`fixed bottom-20 right-4 z-50 transition-all duration-200 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={scrollToTop}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

