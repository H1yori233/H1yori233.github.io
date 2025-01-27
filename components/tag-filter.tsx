'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagClick: (tag: string) => void
}

export function TagFilter({ tags, selectedTags, onTagClick }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full",
            selectedTags.includes(tag) && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}

