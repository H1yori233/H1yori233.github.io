'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, MotionConfig } from 'framer-motion'
import RippleField from '@/components/hero/RippleField'
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
/*  Living detail: the page knows what time it is for you             */
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

function greetingFor(hour: number): { hello: string; aside: string } {
  if (hour >= 5 && hour < 12) return { hello: 'Good morning.', aside: 'Early start.' }
  if (hour >= 12 && hour < 17) return { hello: 'Good afternoon.', aside: 'Hope the day is kind.' }
  if (hour >= 17 && hour < 22) return { hello: 'Good evening.', aside: 'Settling in.' }
  return { hello: "It's late.", aside: 'So am I, probably.' }
}

/* ------------------------------------------------------------------ */
/*  Catalogue grouping                                                 */
/* ------------------------------------------------------------------ */

const CATEGORY: Record<string, string> = {
  'llm-from-scratch': 'Systems & Graphics',
  'cuda-path-tracer': 'Systems & Graphics',
  'vulkan-grass': 'Systems & Graphics',
  'webgpu-rendering': 'Systems & Graphics',
  lajolla: 'Systems & Graphics',
  innoweaver: 'Design & Play',
  kidtalk: 'Design & Play',
  'popup-mid': 'Design & Play',
  'dice-throne': 'Design & Play',
  pastor: 'Design & Play',
  'the-silver-key': 'Design & Play',
}
const GROUP_ORDER = ['Systems & Graphics', 'Design & Play']

function CatalogueRow({ project }: { project: Project }) {
  const href = project.externalUrl || ''
  const linked = !!href

  const inner = (
    <>
      <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden bg-muted">
        {project.image && (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="96px"
            className="object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-lg font-normal leading-snug tracking-tight">
          {project.title}
        </h4>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>
      <span className="label flex-shrink-0 self-center text-muted-foreground/70 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5">
        {linked ? '↗' : '·'}
      </span>
    </>
  )

  const base =
    'group flex items-center gap-5 py-5 border-b border-border first:border-t'

  return linked ? (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={base}>
      {inner}
    </Link>
  ) : (
    <div className={`${base} cursor-default`}>{inner}</div>
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

  const grouped = useMemo(() => {
    const map = new Map<string, Project[]>()
    for (const p of rest) {
      const g = CATEGORY[p.slug] || 'Other'
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(p)
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({ group: g, items: map.get(g)! }))
  }, [rest])

  const greeting = now ? greetingFor(now.getHours()) : null
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

          {/* the statement */}
          <div className="flex flex-1 flex-col justify-center py-20">
            <motion.p
              className="label mb-6 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              CS @ UC San Diego &nbsp;·&nbsp; formerly industrial design
            </motion.p>

            <motion.h1
              className="display text-[clamp(2.75rem,9vw,7rem)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              Making video
              <br />
              generation fast.
            </motion.h1>

            <motion.p
              className="measure mt-8 text-[clamp(1.05rem,2.2vw,1.4rem)] leading-relaxed text-foreground/80"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            >
              An industrial designer who wandered into systems engineering
              and stayed for the milliseconds.
            </motion.p>
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
              <Folio n="01" title="On the work" />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="measure mt-10 space-y-7 text-[clamp(1.25rem,2.6vw,1.6rem)] leading-[1.65] text-foreground/90">
                <p>
                  I started in industrial design — drawing objects you could pick
                  up, weigh, turn over in your hands. These days I write systems
                  software, and the thing I turn over is latency.
                </p>
                <p>
                  The craft didn&rsquo;t change, only the material. A good tool
                  still disappears the moment it works; my job is to keep chasing
                  that vanishing — now measured in milliseconds, on the way to
                  video that generates as fast as you can picture it.
                </p>
                <p className="italic text-muted-foreground">
                  (I do still miss the foam models. A little.)
                </p>
              </div>
            </Reveal>
          </div>

          {/* margin notes — the engineer's hand */}
          <Reveal delay={0.1} className="md:pt-16">
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
      {/*  FASTVIDEO — the headline; let the outcome speak             */}
      {/* ============================================================ */}
      <section className="paper-grain relative content-grid py-[clamp(5rem,16vh,11rem)]">
        <Reveal>
          <Folio n="02" title="The headline" />
        </Reveal>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
          <div>
            <Reveal>
              <h2 className="display text-[clamp(3rem,8vw,5.5rem)]">FastVideo</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="measure mt-6 text-[clamp(1.15rem,2.4vw,1.5rem)] leading-relaxed text-foreground/85">
                A unified framework for accelerated video generation —
                post-training and inference under one roof.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="measure mt-8 text-[clamp(1.4rem,3vw,2rem)] leading-snug">
                The goal is plain:&nbsp;
                <span className="italic">
                  video that took minutes, returned in seconds.
                </span>
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

          {fastvideo?.image && (
            <Reveal delay={0.1}>
              <Link
                href={fastvideo.externalUrl || '#'}
                target={fastvideo.externalUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group relative block aspect-[4/3] w-full overflow-hidden border border-border bg-muted"
              >
                <Image
                  src={fastvideo.image}
                  alt="FastVideo"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-contain p-12 grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100"
                />
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SELECTED WORK — the catalogue                               */}
      {/* ============================================================ */}
      <section className="paper-grain relative content-grid py-[clamp(5rem,16vh,11rem)]">
        <Reveal>
          <Folio n="03" title="Selected work" />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="measure mt-10 text-[clamp(1.15rem,2.4vw,1.45rem)] leading-relaxed text-foreground/80">
            A few other things I&rsquo;ve made — renderers, a language model
            built from scratch, some games, and a pop-up book that plays music.
          </p>
        </Reveal>

        <div className="mt-14 space-y-16">
          {grouped.map(({ group, items }) => (
            <Reveal key={group}>
              <h3 className="label mb-3 text-muted-foreground">{group}</h3>
              <div>
                {items.map((p) => (
                  <CatalogueRow key={p.slug} project={p} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  NIGHTFALL — the one inversion, the most personal            */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'hsl(var(--night))',
          color: 'hsl(var(--night-foreground))',
        }}
      >
        <div className="content-grid py-[clamp(6rem,20vh,12rem)]">
          <Reveal>
            <p
              className="label"
              style={{ color: 'hsl(var(--night-muted))' }}
            >
              04 — After hours
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display mt-8 text-[clamp(2.5rem,7vw,5rem)]">
              {greeting ? greeting.hello : 'Hello.'}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="measure mt-8 space-y-6 text-[clamp(1.2rem,2.6vw,1.55rem)] leading-relaxed">
              <p style={{ color: 'hsl(var(--night-foreground) / 0.88)' }}>
                You&rsquo;ve reached the bottom of the page. Most people
                don&rsquo;t — so, genuinely, thank you for reading.
                {greeting && (
                  <span style={{ color: 'hsl(var(--night-muted))' }}>
                    {' '}
                    {greeting.aside}
                  </span>
                )}
              </p>
              <p style={{ color: 'hsl(var(--night-foreground) / 0.88)' }}>
                I&rsquo;m in San Diego, usually up later than I should be,
                usually building something. If any of this resonated, I&rsquo;d
                like to hear from you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
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
                  className="label border-b pb-1 transition-colors"
                  style={{ borderColor: 'hsl(var(--night-border))' }}
                >
                  {label}
                  <span className="ml-1.5 opacity-60">↗</span>
                </Link>
              ))}
            </div>
          </Reveal>

          {/* living detail: the visitor's own clock, ticking */}
          <Reveal delay={0.2}>
            <div
              className="mt-20 flex items-end justify-between border-t pt-6"
              style={{ borderColor: 'hsl(var(--night-border))' }}
            >
              <div className="flex items-center gap-2">
                <Seal />
                <span className="label" style={{ color: 'hsl(var(--night-muted))' }}>
                  Kaiqin Kong · Updated June 2026
                </span>
              </div>
              <div className="text-right">
                <div className="label" style={{ color: 'hsl(var(--night-muted))' }}>
                  Your local time
                </div>
                <div
                  className="mt-1 font-mono text-lg tabular-nums"
                  style={{ color: 'hsl(var(--night-foreground) / 0.9)' }}
                  suppressHydrationWarning
                >
                  {clock}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
    </MotionConfig>
  )
}
