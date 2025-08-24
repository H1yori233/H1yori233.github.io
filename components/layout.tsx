'use client'

import { ReactNode, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  fullWidth?: boolean
  showScrollToTop?: boolean
  customNav?: boolean
}

const navItems = [
  { path: '/', name: 'Home', label: '01' },
  { path: '/project', name: 'Project', label: '02' },
  { path: '/about', name: 'About', label: '03' }
]

// Modern Navigation Component
const Navigation = ({ pathname }: { pathname: string }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background',
          isScrolled
            ? 'backdrop-blur-sophisticated border-b'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="content-grid">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group relative"
            >
              <motion.span
                className="text-heading-3 font-medium tracking-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                KAICHIN
              </motion.span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-foreground origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'group relative py-2 transition-colors duration-200',
                    pathname === item.path
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="text-caption opacity-60 mr-2">
                    {item.label}
                  </span>
                  <span className="font-medium">
                    {item.name}
                  </span>
                  {pathname === item.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-foreground"
                      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden btn-ghost p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
            <motion.div
              className="relative flex flex-col justify-center min-h-screen content-grid"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              <nav className="space-y-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        'block text-heading-1 font-light tracking-tight transition-colors',
                        pathname === item.path
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-caption opacity-60 mr-4">
                        {item.label}
                      </span>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Scroll to Top Component
const ScrollToTop = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        className="fixed bottom-8 right-8 z-50 btn-primary p-3 rounded-full shadow-xl"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} />
      </motion.button>
    )}
  </AnimatePresence>
)

// Page Header Component
const PageHeader = ({ title, description }: { title?: string; description?: string }) => (
  <motion.header
    className="section-padding border-b border-border/50"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
  >
    <div className="content-grid">
      <div className="max-w-4xl space-y-6">
        {title && (
          <h1 className="text-display font-light tracking-tight">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-body-large text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  </motion.header>
)

// Main Layout Component
export function Layout({
  children,
  title,
  description,
  fullWidth = false,
  showScrollToTop = true,
  customNav = false
}: LayoutProps) {
  const pathname = usePathname()
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollTopVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      {!customNav && <Navigation pathname={pathname} />}

      {/* Main Content */}
      <main className={cn(
        'flex-grow',
        !customNav && 'pt-20',
        fullWidth ? 'w-full' : 'content-grid'
      )}>
        {/* Page Header */}
        {(title || description) && (
          <PageHeader title={title} description={description} />
        )}

        {/* Page Content */}
        <motion.div
          className={cn(
            'min-h-[50vh]',
            fullWidth ? 'w-full' : 'content-grid'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="border-t border-border/50 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="content-grid">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <span className="text-caption text-muted-foreground">
                © 2025 Kaichin Kong
              </span>
              <div className="w-px h-4 bg-border" />
              <span className="text-caption text-muted-foreground">
                Design × Technology
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="btn-ghost text-sm"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Scroll to Top */}
      {showScrollToTop && (
        <ScrollToTop isVisible={isScrollTopVisible} />
      )}
    </div>
  )
}