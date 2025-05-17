import React from 'react';
import { Layout } from '@/components/layout';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Export project metadata
export const metadata = {
  title: 'Lajolla',
  date: '2025-05-05',
  description: 'UCSD CSE 272 renderert',
  demoUrl: 'https://github.com/H1yori233/Lajolla',
  githubUrl: 'https://github.com/H1yori233/Lajolla',
  image: '/images/projects/blog-website.png', // Example image path
};

// Default export for project content component
export default function Lajolla() {
  return (
    <Layout title={metadata.title}>
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{metadata.title}</h1>
        
        <div className="mb-8 aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Project Screenshot
          </div>
        </div>
      </article>
    </Layout>
  );
} 