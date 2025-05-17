import React from 'react';
import { Layout } from '@/components/layout';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Export project metadata
export const metadata = {
  title: 'Interactive CUDA Path Tracer',
  date: '2023-10-15',
  description: 'CIS5650 Project3 - A real-time interactive path tracer implemented with CUDA',
  demoUrl: 'https://github.com/yourusername/cuda-path-tracer',
  githubUrl: 'https://github.com/yourusername/cuda-path-tracer',
  image: '/images/projects/cuda-path-tracer.png',
};

// Default export for project content component
export default function CUDAPathTracer() {
  return (
    <Layout title={metadata.title}>
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{metadata.title}</h1>
        
        <div className="mb-8 aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Project Screenshot
          </div>
        </div>
        
        <div className="flex gap-4 mb-8">
          <Button asChild variant="outline">
            <a href={metadata.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </article>
    </Layout>
  );
} 