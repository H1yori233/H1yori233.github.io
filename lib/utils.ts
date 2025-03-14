import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  content: React.ReactNode
  enable: boolean
} 