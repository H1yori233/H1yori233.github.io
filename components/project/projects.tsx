// app/project/projects.tsx
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState, memo } from 'react'
import { motion, cubicBezier } from 'motion/react'

export interface Project {
  title: string
  description: string
  slug: string
  image?: string
  enable?: boolean
  externalUrl?: string
  featured: boolean
}

const customEase = cubicBezier(0.33, 1, 0.68, 1)

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: customEase } },
  hover: { y: -3, transition: { duration: 0.3, ease: customEase } }
}

const imageVariants = {
  initial: { scale: 1.04, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: customEase } },
  hover: { scale: 1.03, transition: { duration: 0.4, ease: customEase } }
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
        className="group flex items-baseline gap-4 py-4 px-2 -mx-2 rounded-md hover:bg-muted/40 transition-colors duration-300"
      >
        <h4 className="text-base font-normal tracking-tight text-foreground md:whitespace-nowrap">
          {project.title}
        </h4>
        <p className="hidden md:block flex-1 text-sm text-muted-foreground truncate">
          {project.description}
        </p>
        <span className="ml-auto flex-shrink-0 self-center text-muted-foreground/60 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5">
          {isExternal
            ? <ExternalLink className="w-4 h-4" />
            : <ArrowRight className="w-4 h-4" />}
        </span>
      </Link>
    )
  }

  // Featured card
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="group h-full"
    >
      <Card className={cn(
        "overflow-hidden border border-border/60 transition-all duration-300 h-full flex flex-col",
        "shadow-sm hover:shadow-lg hover:border-border"
      )}>
        <CardContent className={cn(
          "p-0 flex flex-col h-full",
          wide && "md:flex-row md:items-stretch"
        )}>
          <div className={cn(
            "relative h-56 md:h-64 overflow-hidden flex-shrink-0",
            wide && "md:w-1/2 md:h-auto md:min-h-[18rem]"
          )}>
            <motion.div variants={imageVariants} className="w-full h-full relative">
              {project.image && !imgError ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={cn(
                    "transition-all duration-300 grayscale contrast-125 brightness-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100",
                    project.image.endsWith('.svg')
                      ? "object-contain p-8"
                      : "object-cover"
                  )}
                  onError={() => setImgError(true)}
                  priority={priority}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-foreground/10" />
                  </div>
                </div>
              )}
            </motion.div>
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
                  "text-lg font-normal tracking-tight text-foreground group-hover/link:text-foreground/80 transition-colors duration-300 leading-snug",
                  wide && "md:text-2xl"
                )}>
                  <span className="flex items-start gap-2">
                    <span className="flex-1">{project.title}</span>
                    {isExternal && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 mt-0.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    )}
                  </span>
                </h3>
              </Link>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="mt-4 flex justify-end items-end h-4">
              <span className="flex items-center gap-1.5 text-xs text-foreground/60 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
});
