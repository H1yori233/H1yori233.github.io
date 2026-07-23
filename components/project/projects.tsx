// app/project/projects.tsx
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState, memo } from 'react'

export interface Project {
  title: string
  description: string
  slug: string
  image?: string
  enable?: boolean
  externalUrl?: string
  featured: boolean
}

export const ProjectCard = memo(function ProjectCard({
  project,
  variant = 'featured',
  wide = false,
  priority = false
}: {
  project: Project;
  variant?: 'featured' | 'compact';
  /** Horizontal full-width layout for a lone featured project */
  wide?: boolean;
  priority?: boolean
}) {
  const [imgError, setImgError] = useState(false);

  const projectUrl = project.externalUrl ? project.externalUrl : `/project/${project.slug}`;
  const isExternal = !!project.externalUrl;

  if (variant === 'compact') {
    return (
      <Link
        href={projectUrl}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : ""}
        className="group flex items-baseline gap-4 py-4 px-2 -mx-2 rounded-lg hover:bg-muted transition-colors duration-normal"
      >
        <h4 className="text-base font-normal tracking-tight text-foreground md:whitespace-nowrap">
          {project.title}
        </h4>
        <p className="hidden md:block flex-1 text-sm text-muted-foreground truncate">
          {project.description}
        </p>
        <span className="ml-auto flex-shrink-0 self-center text-muted-foreground transition-colors duration-normal group-hover:text-foreground">
          {isExternal
            ? <ExternalLink className="w-4 h-4" />
            : <ArrowRight className="w-4 h-4" />}
        </span>
      </Link>
    )
  }

  // Featured card
  return (
    <div className="group h-full">
      <Card className="overflow-hidden border border-border hover:border-foreground/25 transition-colors duration-normal h-full flex flex-col">
        <CardContent className={cn(
          "p-0 flex flex-col h-full",
          wide && "md:flex-row md:items-stretch"
        )}>
          <div className={cn(
            "relative h-56 md:h-64 overflow-hidden flex-shrink-0",
            wide && "md:w-1/2 md:h-auto md:min-h-[18rem]"
          )}>
            {project.image && !imgError ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={cn(
                  "grayscale group-hover:grayscale-0 group-hover:saturate-[0.85] group-focus-within:grayscale-0 group-focus-within:saturate-[0.85] transition-[filter] duration-500 ease-out",
                  project.image.endsWith('.svg')
                    ? "object-contain p-8"
                    : "object-cover"
                )}
                onError={() => setImgError(true)}
                priority={priority}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="w-16 h-16 rounded-lg bg-foreground/5 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-foreground/10" />
                </div>
              </div>
            )}
          </div>

          <div className={cn(
            "p-6 flex-1 flex flex-col justify-between",
            wide && "md:p-8 md:justify-center md:gap-6"
          )}>
            <div className={cn("space-y-3", !wide && "flex-1")}>
              <Link
                href={projectUrl}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
                className="group/link block"
              >
                <h3 className={cn(
                  "text-lg font-normal tracking-tight text-foreground group-hover/link:text-muted-foreground transition-colors duration-normal leading-snug",
                  wide && "md:text-2xl"
                )}>
                  <span className="flex items-start gap-2">
                    <span className="flex-1">{project.title}</span>
                    {isExternal && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                  </span>
                </h3>
              </Link>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="mt-4 flex justify-end items-end h-4">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-normal group-hover:text-foreground">
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
});
