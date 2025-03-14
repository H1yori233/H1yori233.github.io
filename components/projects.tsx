import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export interface Project {
  title: string
  description: string
  slug: string
  tags: string[]
  enable?: boolean
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Button asChild className="w-full">
            <Link href={`/project/${project.slug}`}>
              Learn More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 