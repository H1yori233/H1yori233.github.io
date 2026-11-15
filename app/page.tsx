import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Terminal } from '@/components/magicui/terminal'

const socialLinks = [
  { href: 'https://github.com/H1yori233', label: 'GitHub', Icon: Github, external: true },
  { href: 'https://www.linkedin.com/in/kaiqin-kong/', label: 'LinkedIn', Icon: Linkedin, external: true },
  { href: 'mailto:k1kong@ucsd.edu', label: 'Email', Icon: Mail, external: false },
]

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center bg-background px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 grid-rows-[auto_auto_auto] gap-y-10 lg:max-w-[48rem] lg:grid-cols-[minmax(0,1.34fr)_minmax(15rem,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-[clamp(3rem,5vw,4.5rem)] lg:gap-y-7">
        <h1 className="row-start-1 self-start text-[clamp(2.5rem,3.2vw,3rem)] font-light leading-[0.92] tracking-[-0.035em] text-foreground lg:col-start-1">
          Kaiqin Kong
        </h1>

        <div className="row-start-3 min-w-0 lg:col-start-1 lg:row-start-2">
          <Terminal
            variant="plain"
            bootCommands={['cat about.md', 'cv']}
            className="h-[23rem] w-full sm:h-[22rem] lg:h-[21rem]"
          />
        </div>

        <div className="row-start-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start">
          <figure className="relative aspect-[4/5] w-full overflow-hidden bg-muted lg:aspect-[5/7]">
            <Image
              src="/images/avatar.png"
              alt="Kaiqin Kong standing by the coast"
              fill
              sizes="(max-width: 1023px) 100vw, 44vw"
              className="object-cover object-center"
              priority
            />
          </figure>

          {/* Hairline icons sit under the photo like a caption, aligned to its edge */}
          <nav aria-label="Social links" className="mt-4 flex items-center justify-end gap-5">
            {socialLinks.map(({ href, label, Icon, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={label}
                title={label}
                className="social-icon"
              >
                <Icon aria-hidden="true" strokeWidth={1.25} className="size-[1.125rem]" />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  )
}
