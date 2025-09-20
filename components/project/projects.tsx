// app/project/projects.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState, memo } from 'react'
import { motion, cubicBezier, AnimatePresence } from 'framer-motion'

export interface Project {
  title: string
  description: string
  slug: string
  image?: string
  enable?: boolean
  externalUrl?: string
  featured: boolean
}

// Sophisticated animation variants
const customEase = cubicBezier(0.33, 1, 0.68, 1)

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: customEase } },
  hover: { y: -3, scale: 1.015, transition: { duration: 0.3, ease: customEase } }
}

const imageVariants = {
  initial: { scale: 1.1, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: customEase } },
  hover: { scale: 1.03, transition: { duration: 0.4, ease: customEase } }
}

const contentVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: customEase } }
}

const hoverIndicatorVariants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: customEase } }
}

export const ProjectCard = memo(function ProjectCard({
  project,
  viewMode = 'grid',
  priority = false
}: {
  project: Project;
  viewMode?: 'grid' | 'list';
  priority?: boolean
}) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const projectUrl = project.externalUrl ? project.externalUrl : `/project/${project.slug}`;
  const isExternal = !!project.externalUrl;

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className={cn(
          "overflow-hidden border border-border/60 transition-all duration-300",
          "shadow-sm hover:shadow-lg hover:border-border",
          "backdrop-blur-sophisticated",
          project.featured && "ring-1 ring-primary/10"
        )}>
          <CardContent className="p-0 flex flex-row items-stretch">
            {/* Refined image area - more compact */}
            <div className="w-72 h-44 relative flex-shrink-0 overflow-hidden">
              <motion.div variants={imageVariants} className="w-full h-full relative">
                {project.image && !imgError ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale contrast-125 brightness-110 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-300"
                    onError={() => setImgError(true)}
                    priority={priority}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-lg bg-foreground/10" />
                    </div>
                  </div>
                )}
              </motion.div>

              {project.featured && (
                <motion.div
                  className="absolute top-3 right-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Badge className="bg-foreground/90 text-background border-0 shadow-lg backdrop-blur-sm">
                    <Star className="w-3 h-3 mr-1.5 fill-current" />
                    <span className="text-xs font-medium tracking-wide">Featured</span>
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Content area with better spacing */}
            <motion.div
              variants={contentVariants}
              className="flex-1 p-6 flex flex-col justify-center"
            >
              <div className="space-y-4 max-w-lg">
                <div className="space-y-2">
                  <Link
                    href={projectUrl}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : ""}
                    className="group/link"
                  >
                    <motion.h3
                      className="text-xl font-normal tracking-tight text-foreground group-hover/link:text-foreground/80 transition-colors duration-300"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="flex items-start gap-2">
                        <span className="flex-1">{project.title}</span>
                        {isExternal && (
                          <ExternalLink className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 mt-0.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        )}
                      </span>
                    </motion.h3>
                  </Link>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      variants={hoverIndicatorVariants}
                      initial="initial"
                      animate="animate"
                      exit="initial"
                      className="flex items-center gap-2 text-xs text-foreground/60"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Grid View - More balanced proportions
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="group h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={cn(
        "overflow-hidden border border-border/60 transition-all duration-300 h-full flex flex-col",
        "shadow-sm hover:shadow-lg hover:border-border",
        "backdrop-blur-sophisticated",
        project.featured && "ring-1 ring-primary/10"
      )}>
        <CardContent className="p-0 flex flex-col h-full">
          {/* Compact image area */}
          <div className="relative h-44 overflow-hidden flex-shrink-0">
            <motion.div variants={imageVariants} className="w-full h-full relative">
              {project.image && !imgError ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale contrast-125 brightness-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-300"
                  onError={() => setImgError(true)}
                  priority={priority}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-foreground/10" />
                  </motion.div>
                </div>
              )}
            </motion.div>

            {project.featured && (
              <motion.div
                className="absolute top-3 right-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Badge className="bg-foreground/90 text-background border-0 shadow-lg backdrop-blur-sm">
                  <Star className="w-3 h-3 mr-1.5 fill-current" />
                  <span className="text-xs font-medium tracking-wide">Featured</span>
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Content area with refined spacing */}
          <motion.div
            variants={contentVariants}
            className="p-5 flex-1 flex flex-col justify-between"
          >
            <div className="space-y-3 flex-1">
              <Link
                href={projectUrl}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
                className="group/link block"
              >
                <motion.h3
                  className="text-lg font-normal tracking-tight text-foreground group-hover/link:text-foreground/80 transition-colors duration-300 leading-snug"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="flex items-start gap-2">
                    <span className="flex-1">{project.title}</span>
                    {isExternal && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 mt-0.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    )}
                  </span>
                </motion.h3>
              </Link>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Hover state indicator - reserved space to prevent layout shift */}
            <div className="mt-4 flex justify-between items-end h-4">
              <motion.div
                className="w-6 h-px bg-gradient-to-r from-foreground/15 to-transparent"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                variants={hoverIndicatorVariants}
                initial="initial"
                animate={isHovered ? "animate" : "initial"}
                className="flex items-center gap-1.5 text-xs text-foreground/60"
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
});
