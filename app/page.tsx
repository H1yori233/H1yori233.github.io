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

// A running head / folio, the way a book numbers its sections.
function Folio({ n, title }: { n: string; title: string }) {
  return (
    <div className="label flex items-center gap-3 text-muted-foreground">
      <span>{n}</span>
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{title}</span>
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

function ProjectRow({ project }: { project: Project }) {
  const href = project.externalUrl || ''
  const linked = !!href

  const inner = (
    <>
      <h4 className="text-lg font-normal leading-snug tracking-tight md:whitespace-nowrap">
        {project.title}
      </h4>
      <p className="hidden flex-1 truncate text-sm text-muted-foreground md:block">
        {project.description}
      </p>
      <span className="label ml-auto flex-shrink-0 self-center text-muted-foreground/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-foreground">
        {linked ? '↗' : '·'}
      </span>
    </>
  )

  const base =
    'group flex items-baseline gap-5 border-b border-border py-4 first:border-t'

  return linked ? (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={base}>
      {inner}
    </Link>
  ) : (
    <div className={`${base} cursor-default`}>{inner}</div>
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
      {/*  HERO — the breathing page                                   */}
      {/* ============================================================ */}
      <section className="paper-grain relative flex min-h-[100svh] flex-col overflow-hidden">
        <RippleField />

        <div className="content-grid relative z-10 flex flex-1 flex-col">
          {/* top mark */}
          <div className="flex items-center gap-2 pt-8">
            <Seal />
            <span className="label text-muted-foreground">Kaiqin Kong</span>
          </div>

          {/* the statement, with the working shell beside it */}
          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-3">
              <motion.p
                className="label mb-6 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                CS @ UC San Diego &nbsp;·&nbsp; formerly industrial design
              </motion.p>

              <motion.h1
                className="display text-[clamp(2.5rem,6vw,5rem)]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                Making video
                <br />
                generation fast.
              </motion.h1>
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
            className="label flex items-center gap-3 pb-10 text-muted-foreground/70"
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
      {/*  THESIS — who, in his own voice                              */}
      {/* ============================================================ */}
      <section className="paper-grain relative content-grid py-[clamp(5rem,16vh,11rem)]">
        <div className="grid gap-12 md:grid-cols-[1fr_minmax(0,16rem)] md:gap-16">
          <div>
            <Reveal>
              <Folio n="01" title="About" />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="measure mt-10 space-y-7 text-[clamp(1.25rem,2.6vw,1.6rem)] leading-[1.65] text-foreground/90">
                <p>
                  Hi there! I&rsquo;m Kaiqin Kong, a master&rsquo;s student in
                  Computer Science at UC San Diego. Prior to this, I obtained a
                  Bachelor of Engineering in Industrial Design at Zhejiang
                  University.
                </p>
                <p>
                  I&rsquo;m interested in machine learning systems, currently
                  working on fast video generation.
                </p>
              </div>
            </Reveal>
          </div>

          {/* margin column — the author's photo, then the engineer's hand */}
          <Reveal delay={0.1} className="md:pt-16">
            <figure className="group mb-10">
              <div className="relative aspect-[4/5] w-full max-w-[15rem] overflow-hidden border border-border bg-muted">
                <Image
                  src="/images/avatar.png"
                  alt="Kaiqin Kong"
                  fill
                  sizes="240px"
                  className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
                />
              </div>
              <figcaption className="label mt-3 text-muted-foreground/70">
                Fig. 1 — The author
              </figcaption>
            </figure>
            <dl className="space-y-6">
              {[
                ['Now', 'M.S. Computer Science\nUC San Diego'],
                ['Before', 'B.Eng. Industrial Design\nZhejiang University'],
                ['Chasing', 'ML Systems\nVideo generation'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-muted-foreground/70">{k}</dt>
                  <dd className="mt-1 whitespace-pre-line font-mono text-sm leading-relaxed text-foreground/80">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FASTVIDEO — the screening room; lights down for the work    */}
      {/* ============================================================ */}
      <section className="nightfall relative content-grid py-[clamp(6rem,18vh,12rem)]">
        <Reveal>
          <Folio n="02" title="Screening room" />
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
              <FeaturedPlate
                src={fastvideo.image}
                href={fastvideo.externalUrl}
                title="FastVideo"
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROJECTS — the list                                         */}
      {/* ============================================================ */}
      <section className="paper-grain relative content-grid py-[clamp(5rem,16vh,11rem)]">
        <Reveal>
          <Folio n="03" title="Projects" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10">
            {rest.map((p) => (
              <ProjectRow key={p.slug} project={p} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/*  COLOPHON — contact, and the page's quiet sign-off           */}
      {/* ============================================================ */}
      <section className="paper-grain relative content-grid pb-12 pt-[clamp(4rem,12vh,8rem)]">
        <Reveal>
          <Folio n="04" title="Colophon" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
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
                className="label border-b border-foreground/30 pb-1 transition-colors hover:border-[hsl(var(--seal))] hover:text-[hsl(var(--seal))]"
              >
                {label}
                <span className="ml-1.5 opacity-60">↗</span>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* living detail: the visitor's own clock, ticking */}
        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
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
