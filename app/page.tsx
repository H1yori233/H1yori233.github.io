import Image from 'next/image'
import Link from 'next/link'
import { Terminal } from '@/components/magicui/terminal'

const socialLinks = [
  { href: 'https://github.com/H1yori233', label: 'GitHub', external: true },
  { href: 'https://www.linkedin.com/in/kaiqin-kong/', label: 'LinkedIn', external: true },
  { href: 'mailto:k1kong@ucsd.edu', label: 'Email', external: false },
]

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center bg-background px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-y-10 lg:max-w-[48rem] lg:grid-cols-[minmax(0,1.34fr)_minmax(15rem,1fr)] lg:grid-rows-[auto_auto_auto] lg:gap-x-[clamp(3rem,5vw,4.5rem)] lg:gap-y-7">
        <h1 className="row-start-1 self-start text-[clamp(2.75rem,3.5vw,3.25rem)] font-light leading-[0.92] tracking-[-0.035em] text-foreground lg:col-start-1">
          Kaiqin Kong
        </h1>

        <div className="row-start-3 min-w-0 lg:col-start-1 lg:row-start-2">
          <Terminal
            variant="plain"
            bootCommands={['cat about.md', 'cv']}
            className="h-[23rem] w-full sm:h-[22rem] lg:h-[21rem]"
          />
        </div>

        <nav
          aria-label="Social links"
          className="row-start-4 flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-sm lg:col-start-1 lg:row-start-3 lg:gap-x-10"
        >
          {socialLinks.map(({ href, label, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="text-foreground underline decoration-foreground/70 underline-offset-[0.45rem] transition-opacity duration-normal hover:opacity-60"
            >
              {label}
              {external && <span aria-hidden="true"> ↗</span>}
            </Link>
          ))}
        </nav>

        <figure className="relative row-start-2 aspect-[4/5] w-full overflow-hidden bg-muted lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:aspect-[5/7] lg:self-start">
          <Image
            src="/images/avatar.png"
            alt="Kaiqin Kong standing by the coast"
            fill
            sizes="(max-width: 1023px) 100vw, 44vw"
            className="object-cover object-center grayscale transition-[filter] duration-500 ease-out hover:grayscale-0 hover:saturate-[0.85]"
            priority
          />
        </figure>
      </section>
    </main>
  )
}
