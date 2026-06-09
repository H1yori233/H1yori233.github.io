'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Terminal } from '@/components/magicui/terminal'
import { ProjectCard, Project } from '@/components/project/projects'
import { getAllProjects } from '@/lib/projectLoader'
import { cn } from '@/lib/utils'

// Top Bar Component (logo only)
const TopBar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'backdrop-blur-sophisticated border-b' : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="content-grid">
        <div className="flex h-20 items-center">
          <Link href="/" className="group relative">
            <motion.span
              className="text-heading-3 font-medium tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              KAIQIN
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-foreground origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const } }
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])

  // Load projects from Real FS
  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  const featuredProjects = projects.filter(p => p.featured)
  const regularProjects = projects.filter(p => !p.featured)

  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <main className="flex-grow pt-20 w-full">
        <div className="pt-[var(--section-padding)] pb-8">
          <div className="content-grid space-y-16">

            {/* Profile and Terminal Section */}
            <motion.section
              className="relative"
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center py-20">
                {/* Left Column: Profile Image and Social Links */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center h-full min-h-[400px] space-y-8">
                  {/* Profile Image */}
                  <motion.div className="relative group" variants={heroItemVariants}>
                    <div className="w-64 h-64 rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-br from-muted/30 to-muted/10">
                      <Image
                        src="/images/avatar.png"
                        alt="Kaiqin Kong"
                        width={256}
                        height={256}
                        className="w-full h-full object-cover grayscale contrast-125 brightness-110 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-300"
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* Name */}
                  <motion.h1
                    className="text-heading-2 font-light text-foreground tracking-tight text-center"
                    variants={heroItemVariants}
                  >
                    Kaiqin Kong
                  </motion.h1>

                  {/* Social Links */}
                  <motion.div
                    className="flex flex-wrap justify-center gap-3 max-w-xs mx-auto"
                    variants={heroItemVariants}
                  >
                    {[
                      { href: "https://github.com/H1yori233", icon: FaGithub, label: "GitHub", color: "group-hover:text-gray-900 dark:group-hover:text-white" },
                      { href: "https://www.linkedin.com/in/kaiqin-kong/", icon: FaLinkedin, label: "LinkedIn", color: "group-hover:text-blue-600" },
                      { href: "mailto:k1kong@ucsd.edu", icon: MdEmail, label: "Email", color: "group-hover:text-red-500" },
                      { href: "https://www.behance.net/kaiqinkong", icon: FaBehance, label: "Behance", color: "group-hover:text-blue-500" }
                    ].map(({ href, icon: Icon, label, color }) => (
                      <Link
                        key={label}
                        href={href}
                        target={href.startsWith('mailto:') ? undefined : "_blank"}
                        rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                        className="group relative flex items-center justify-center p-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border/50 hover:border-border transition-all duration-300 hover:scale-105 hover:shadow-md flex-shrink-0"
                        aria-label={label}
                      >
                        <Icon className={`w-6 h-6 text-muted-foreground transition-colors duration-300 flex-shrink-0 ${color}`} />
                      </Link>
                    ))}
                  </motion.div>
                </div>

                {/* Right Column: Interactive Terminal */}
                <motion.div className="lg:col-span-3 w-full" variants={heroItemVariants}>
                  <Terminal className="w-full shadow-xl h-[400px]" />
                </motion.div>
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div className="border-t border-border pt-8">
                <h2 className="text-heading-3 font-light text-foreground">Featured Projects</h2>
              </div>

              {/* Featured Projects */}
              {featuredProjects.length > 0 && (
                <div className={cn(
                  "grid gap-8",
                  featuredProjects.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                )}>
                  {featuredProjects.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      variant="featured"
                      wide={featuredProjects.length === 1}
                    />
                  ))}
                </div>
              )}

              {/* Other Projects */}
              {regularProjects.length > 0 && (
                <>
                  <h3 className="text-lg font-light text-foreground/80 mt-12 mb-2">Other Projects</h3>
                  <div className="flex flex-col divide-y divide-border/60">
                    {regularProjects.map((project) => (
                      <ProjectCard key={project.slug} project={project} variant="compact" />
                    ))}
                  </div>
                </>
              )}
            </motion.section>

            {/* Footer / Last Updated */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="py-6 border-t border-border/40 text-center"
            >
              <p className="text-xs text-muted-foreground/60 font-mono">
                Last updated: January 2026
              </p>
            </motion.footer>

          </div>
        </div>
      </main>
    </div>
  )
}
