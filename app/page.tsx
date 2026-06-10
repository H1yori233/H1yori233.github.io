'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, MotionConfig } from 'framer-motion'
import RippleField from '@/components/hero/RippleField'
import { Terminal } from '@/components/magicui/terminal'
import { getAllProjects } from '@/lib/projectLoader'
import type { Project } from '@/components/project/projects'

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

// The one personal mark — a cinnabar chop, like a seal pressed into a page.
function Seal({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[0.5em] w-[0.5em] rounded-[2px] bg-[hsl(var(--seal))] align-baseline ${className}`}
      style={{ transform: 'rotate(45deg)' }}
    />
  )
}

// A quiet fade-and-rise. Nothing flashy — the page just turns.
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// A section rule, the way a technical document opens its chapters:
// a firm line, an index, a running head.
function Folio({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline justify-between border-t-2 border-foreground/80 pt-3">
      <div className="label flex items-baseline gap-4">
        <span className="text-foreground">{n}</span>
        <span className="text-muted-foreground">{title}</span>
      </div>
      <span className="label hidden text-muted-foreground/60 sm:block">
        K. Kong · 2026
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Living detail: the visitor's own clock                             */
/* ------------------------------------------------------------------ */

function useLocalTime() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

/* ------------------------------------------------------------------ */
/*  Project list                                                       */
/* ------------------------------------------------------------------ */

// A catalogue plate: the work in grayscale until you look at it.
function ProjectPlate({ project, index }: { project: Project; index: number }) {
  const href = project.externalUrl || ''
  const linked = !!href
  const [err, setErr] = useState(false)

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border border-border bg-muted">
        {project.image && !err ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setErr(true)}
            className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="display text-xl text-foreground/50">{project.title}</span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="label flex-shrink-0 text-muted-foreground/50">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h4 className="truncate text-base leading-snug tracking-tight">
          {project.title}
        </h4>
        {linked && (
          <span className="label ml-auto flex-shrink-0 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground">
            ↗
          </span>
        )}
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
    </>
  )

  return linked ? (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {inner}
    </Link>
  ) : (
    <div className="group block cursor-default">{inner}</div>
  )
}

// The featured project's plate — shows the logo, falls back to a wordmark
// if the remote asset can't be reached.
function FeaturedPlate({
  src,
  href,
  title,
}: {
  src?: string
  href?: string
  title: string
}) {
  const [err, setErr] = useState(false)
  const isSvg = !!src && src.endsWith('.svg')

  const body =
    src && !err ? (
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        onError={() => setErr(true)}
        className={
          isSvg
            ? 'object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-[1.03] md:p-14'
            : 'object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]'
        }
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center">
        <span className="display text-3xl text-foreground/60 md:text-4xl">{title}</span>
      </div>
    )

  const cls =
    'group relative block aspect-[16/10] w-full overflow-hidden border border-border bg-muted'

  return href ? (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const now = useLocalTime()

  useEffect(() => {
    getAllProjects().then(setProjects)
  }, [])

  const fastvideo = projects.find((p) => p.slug === 'fastvideo')
  const rest = projects.filter((p) => p.slug !== 'fastvideo')

  const clock = now
    ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--'

  return (
    <MotionConfig reducedMotion="user">
    <main className="bg-background text-foreground">
      {/* ============================================================ */}
      {/*  HERO — the title page: name, title block, working shell     */}
      {/* ============================================================ */}
      <section className="paper-grain relative flex min-h-[100svh] flex-col overflow-hidden">
        <RippleField />

        <div className="content-grid relative z-10 flex flex-1 flex-col">
          {/* document head */}
          <div className="flex items-center justify-between border-b-2 border-foreground/80 pb-3 pt-8">
            <div className="flex items-center gap-2">
              <Seal />
              <span className="label">Kaiqin Kong</span>
            </div>
            <span className="label text-muted-foreground/70">
              Portfolio · Rev. 10
            </span>
          </div>

          {/* title + title block, with the working shell beside them */}
          <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-3">
              <motion.h1
                className="display text-[clamp(3rem,7vw,5.5rem)]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Kaiqin Kong
              </motion.h1>

              <motion.p
                className="mt-5 text-[clamp(1.25rem,2.4vw,1.6rem)] leading-snug text-foreground/85"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              >
                Making video generation fast.
              </motion.p>

              {/* title block — a drawing's record card: photo cell + facts */}
              <motion.div
                className="mt-10 flex max-w-2xl border border-foreground/40 bg-background/70"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              >
                <div className="group relative w-24 flex-shrink-0 border-r border-border bg-muted sm:w-32">
                  <Image
                    src="/images/avatar.png"
                    alt="Kaiqin Kong"
                    fill
                    sizes="128px"
                    className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
                    priority
                  />
                </div>
                <dl className="min-w-0 flex-1 divide-y divide-border">
                  {[
                    ['Now', 'M.S. Computer Science — UC San Diego'],
                    ['Before', 'B.Eng. Industrial Design — Zhejiang University'],
                    ['Focus', 'ML systems · fast video generation'],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 px-4 py-2.5 sm:grid-cols-[5.5rem_1fr] sm:gap-4"
                    >
                      <dt className="label text-muted-foreground/70">{k}</dt>
                      <dd className="font-mono text-[0.8rem] leading-relaxed text-foreground/85">
                        {v}
                      </dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 px-4 py-2.5 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
                    <dt className="label text-muted-foreground/70">Contact</dt>
                    <dd className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.8rem] leading-relaxed">
                      {[
                        ['GitHub', 'https://github.com/H1yori233'],
                        ['LinkedIn', 'https://www.linkedin.com/in/kaiqin-kong/'],
                        ['Email', 'mailto:k1kong@ucsd.edu'],
                        ['Behance', 'https://www.behance.net/kaiqinkong'],
                      ].map(([label, href]) => (
                        <Link
                          key={label}
                          href={href}
                          target={href.startsWith('mailto:') ? undefined : '_blank'}
                          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                          className="text-foreground/85 underline decoration-border underline-offset-4 transition-colors hover:text-[hsl(var(--seal))] hover:decoration-[hsl(var(--seal))]"
                        >
                          {label}
                        </Link>
                      ))}
                    </dd>
                  </div>
                </dl>
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            >
              <Terminal
                className="h-[340px] shadow-sm lg:h-[420px]"
                bootCommands={['whoami', 'cv']}
              />
            </motion.div>
          </div>

          {/* scroll cue */}
          <motion.div
            className="label flex items-center gap-3 pb-8 text-muted-foreground/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <span>Scroll</span>
            <span className="h-px w-10 bg-current opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FASTVIDEO — the featured work                               */}
      {/* ============================================================ */}
      <section className="paper-grain relative content-grid py-[clamp(4rem,10vh,7rem)]">
        <Reveal>
          <Folio n="01" title="Featured" />
        </Reveal>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
          <div>
            <Reveal>
              <h2 className="display text-[clamp(3rem,8vw,5.5rem)]">FastVideo</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="measure mt-6 text-[clamp(1.15rem,2.4vw,1.5rem)] leading-relaxed text-foreground/85">
                A unified post-training and inference framework for
                accelerated video generation.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="label text-muted-foreground">
                  Open source · with hao-ai-lab
                </span>
                {fastvideo?.externalUrl && (
                  <Link
                    href={fastvideo.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 transition-colors hover:border-[hsl(var(--seal))] hover:text-[hsl(var(--seal))]"
                  >
                    Read it on GitHub
                    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </Link>
                )}
              </div>
            </Reveal>
          </div>

          {fastvideo && (
            <Reveal delay={0.1}>
              <figure>
                <FeaturedPlate
                  src={fastvideo.image}
                  href={fastvideo.externalUrl}
                  title="FastVideo"
                />
                <figcaption className="label mt-3 text-muted-foreground/70">
                  Fig. 1 — FastVideo
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROJECTS — the list                                         */}
      {/* ============================================================ */}
      <section className="paper-grain relative content-grid py-[clamp(4rem,10vh,7rem)]">
        <Reveal>
          <Folio n="02" title="Projects" />
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <ProjectPlate project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  COLOPHON — contact, and the page's quiet sign-off           */}
      {/* ============================================================ */}
      <section className="paper-grain relative content-grid pb-10 pt-[clamp(3rem,8vh,5rem)]">
        <Reveal>
          <Folio n="03" title="Colophon" />
        </Reveal>

        {/* living detail: the visitor's own clock, ticking */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <Seal />
                <span className="label text-muted-foreground">
                  Kaiqin Kong · Updated June 2026
                </span>
              </div>
              <p className="label mt-2 text-muted-foreground/60">
                Set in Newsreader &amp; IBM Plex Mono · Typed, not tracked
              </p>
            </div>
            <div className="text-right">
              <div className="label text-muted-foreground/70">Your local time</div>
              <div
                className="mt-1 font-mono text-lg tabular-nums text-foreground/85"
                suppressHydrationWarning
              >
                {clock}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
    </MotionConfig>
  )
}
