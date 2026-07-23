'use client'

import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Terminal } from '@/components/magicui/terminal'
import { ProjectCard, Project } from '@/components/project/projects'
import { getAllProjects } from '@/lib/projectLoader'
import { cn } from '@/lib/utils'

// Kept for later use; set to true to show the compact project list again.
const SHOW_OTHER_PROJECTS = false

// Top Bar Component (logo only)
const TopBar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sophisticated border-b">
    <div className="content-grid">
      <div className="flex h-20 items-center">
        <Link
          href="/"
          className="text-heading-3 font-medium tracking-tight hover:text-muted-foreground transition-colors duration-normal"
        >
          KAIQIN
        </Link>
      </div>
    </div>
  </nav>
)

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
            <section className="relative animate-fade-in">
              <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center py-20">
                {/* Left Column: Profile Image and Social Links */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center h-full min-h-[400px] space-y-8">
                  {/* Profile Image */}
                  <div className="w-64 h-64 rounded-lg overflow-hidden border border-border">
                    <Image
                      src="/images/avatar.png"
                      alt="Kaiqin Kong"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 hover:saturate-[0.85] transition-[filter] duration-500 ease-out"
                      priority
                    />
                  </div>

                  {/* Name */}
                  <h1 className="text-heading-2 font-light text-foreground tracking-tight text-center">
                    Kaiqin Kong
                  </h1>

                  {/* Social Links */}
                  <div className="flex flex-wrap justify-center gap-3 max-w-xs mx-auto">
                    {[
                      { href: "https://github.com/H1yori233", icon: FaGithub, label: "GitHub" },
                      { href: "https://www.linkedin.com/in/kaiqin-kong/", icon: FaLinkedin, label: "LinkedIn" },
                      { href: "mailto:k1kong@ucsd.edu", icon: MdEmail, label: "Email" },
                      { href: "https://www.behance.net/kaiqinkong", icon: FaBehance, label: "Behance" }
                    ].map(({ href, icon: Icon, label }) => (
                      <Link
                        key={label}
                        href={href}
                        target={href.startsWith('mailto:') ? undefined : "_blank"}
                        rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                        className="flex items-center justify-center p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/25 transition-colors duration-normal flex-shrink-0"
                        aria-label={label}
                      >
                        <Icon className="w-6 h-6 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right Column: Interactive Terminal */}
                <div className="lg:col-span-3 w-full">
                  <Terminal className="w-full h-[400px]" />
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section className="space-y-8">
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

              {/* Other Projects (hidden for now) */}
              {SHOW_OTHER_PROJECTS && regularProjects.length > 0 && (
                <>
                  <h3 className="text-lg font-light text-foreground/80 mt-12 mb-2">Other Projects</h3>
                  <div className="flex flex-col divide-y divide-border">
                    {regularProjects.map((project) => (
                      <ProjectCard key={project.slug} project={project} variant="compact" />
                    ))}
                  </div>
                </>
              )}
            </section>

            {/* Footer / Last Updated */}
            <footer className="py-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground/60 font-mono">
                Last updated: June 2026
              </p>
            </footer>

          </div>
        </div>
      </main>
    </div>
  )
}
