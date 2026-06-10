'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="paper-grain relative flex min-h-[100svh] items-center bg-background text-foreground">
      <div className="content-grid w-full">
        <div className="measure">
          <p className="label text-muted-foreground">Error 404</p>

          <h1 className="display mt-8 text-[clamp(2.5rem,8vw,5rem)]">
            This page
            <br />
            wandered off.
          </h1>

          <p className="mt-8 text-[clamp(1.1rem,2.4vw,1.4rem)] leading-relaxed text-foreground/80">
            There&rsquo;s nothing at this address — a broken link, a typo, or a
            page that has since moved on. It happens to the best of us.
          </p>

          <Link
            href="/"
            className="label mt-10 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 transition-colors hover:border-[hsl(var(--seal))] hover:text-[hsl(var(--seal))]"
          >
            <span>←</span>
            Back to the beginning
          </Link>
        </div>
      </div>
    </main>
  )
}
