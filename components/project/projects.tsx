// app/project/projects.tsx
import Link from 'next/link'
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
  const mark = isExternal ? '↗' : '→';

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
        <span
          aria-hidden="true"
          className="ml-auto flex-shrink-0 self-center text-muted-foreground transition-colors duration-normal group-hover:text-foreground"
        >
          {mark}
        </span>
      </Link>
    )
  }

  // Featured entry: frameless image with a quiet caption
  return (
    <Link
      href={projectUrl}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : ""}
      className={cn(
        "group block",
        wide && "grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12"
      )}
    >
      {/* Image: sits on the media column, mirroring the hero terminal */}
      <div className={cn(
        "relative overflow-hidden rounded-lg bg-muted h-56 md:h-72",
        wide && "lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-96"
      )}>
        {project.image && !imgError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className={cn(
              "grayscale group-hover:grayscale-0 group-hover:saturate-[0.85] group-focus-within:grayscale-0 group-focus-within:saturate-[0.85] transition-[filter] duration-500 ease-out",
              project.image.endsWith('.svg')
                ? "object-contain p-10 lg:p-16"
                : "object-cover"
            )}
            onError={() => setImgError(true)}
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-lg bg-foreground/5 flex items-center justify-center">
              <div className="w-8 h-8 rounded-lg bg-foreground/10" />
            </div>
          </div>
        )}
      </div>

      {/* Caption: on the text column, aligned to the image's bottom edge when wide */}
      <div className={cn(
        "mt-4 space-y-1.5",
        wide && "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:self-end"
      )}>
        <h3 className="text-base font-normal tracking-tight text-foreground">
          {project.title}
          <span
            aria-hidden="true"
            className="ml-2 text-muted-foreground transition-colors duration-normal group-hover:text-foreground"
          >
            {mark}
          </span>
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>
    </Link>
  )
});
