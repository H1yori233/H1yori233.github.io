import React from 'react';
import { Layout } from '@/components/layout';

// Export blog metadata
export const metadata = {
  title: 'Advanced Features of Static Blogs',
  date: '2024-06-21',
  authors: 'H1yori233',
  tags: ['Next.js', 'SSG', 'Performance Optimization'],
  description: 'Exploring advanced features and best practices for building static blogs with Next.js',
};

// Default export for blog content component
export default function SecondPost() {
  return (
    <Layout title={metadata.title}>
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1>{metadata.title}</h1>
        <div className="flex gap-2 text-sm text-muted-foreground mb-8">
          <time>{metadata.date}</time>
          <span>·</span>
          <span>{metadata.authors}</span>
        </div>
        
        <div className="space-y-4">
          <p>
            In this article, we'll explore some advanced features and best practices for building static blogs with Next.js.
          </p>
          
          <h2>1. Image Optimization</h2>
          <p>
            Next.js provides built-in image optimization that automatically compresses, resizes, and converts images to the most efficient formats.
            This is crucial for improving page load speed and user experience.
          </p>
          
          <h2>2. Code Splitting</h2>
          <p>
            Next.js automatically splits your code and only loads the JavaScript needed for the current page.
            This significantly improves first-load performance, especially for large applications.
          </p>
          
          <h2>3. Static Site Generation (SSG)</h2>
          <p>
            Using Next.js's SSG feature, you can pre-render all pages at build time, generating pure HTML files.
            This way, users can immediately access content when visiting your site, without waiting for server responses or client-side rendering.
          </p>
          
          <h2>4. Incremental Static Regeneration (ISR)</h2>
          <p>
            While ISR cannot be used for completely static deployments (like GitHub Pages), it's a powerful Next.js feature.
            In supported environments, ISR allows you to periodically regenerate pages to keep content fresh while maintaining the advantages of static sites.
          </p>
          
          <p>
            By leveraging these features, you can build fast and flexible static blogs while maintaining a convenient development experience.
          </p>
        </div>
      </article>
    </Layout>
  );
} 