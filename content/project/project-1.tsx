import React from 'react';
import { Layout } from '@/components/layout';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Export project metadata
export const metadata = {
  title: 'Personal Blog Website',
  date: '2024-06-20',
  tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  description: 'A personal static blog website built with Next.js and TypeScript',
  demoUrl: 'https://h1yori233.github.io',
  githubUrl: 'https://github.com/H1yori233/H1yori233.github.io',
  image: '/images/projects/blog-website.png', // Example image path
};

// Default export for project content component
export default function ProjectOne() {
  return (
    <Layout title={metadata.title}>
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{metadata.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {metadata.tags.map(tag => (
            <span 
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mb-8 aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Project Screenshot
          </div>
        </div>
        
        <div className="flex gap-4 mb-8">
          <Button asChild variant="default">
            <a href={metadata.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              View Demo <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={metadata.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="prose prose-lg dark:prose-invert">
          <h2>Project Overview</h2>
          <p>
            This is a personal static blog website built with Next.js and TypeScript. The site uses Static Site Generation (SSG) technology,
            providing extremely fast loading speeds and excellent SEO performance.
          </p>
          
          <h2>Key Features</h2>
          <ul>
            <li>Responsive design that displays well on various devices</li>
            <li>Component-based blog content system using TSX files instead of Markdown</li>
            <li>Dark/light mode toggle</li>
            <li>Project showcase page</li>
            <li>Tag-based content filtering</li>
          </ul>
          
          <h2>Tech Stack</h2>
          <ul>
            <li>Next.js - React framework</li>
            <li>TypeScript - Type safety</li>
            <li>Tailwind CSS - Styling system</li>
            <li>Framer Motion - Animation effects</li>
            <li>GitHub Pages - Deployment platform</li>
          </ul>
          
          <h2>Challenges & Solutions</h2>
          <p>
            The biggest challenge was implementing dynamic content management in a static deployment environment. By using Next.js's static site 
            generation capabilities and a custom TSX content system, I successfully achieved flexible content management while maintaining 
            the advantages of static deployment.
          </p>
        </div>
      </article>
    </Layout>
  );
} 