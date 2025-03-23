import React from 'react';
import { Layout } from '@/components/layout';

// Export blog metadata
export const metadata = {
  title: 'My First Blog Post',
  date: '2024-06-20',
  authors: 'H1yori233',
  tags: ['Next.js', 'React', 'Frontend Development'],
  description: 'An introduction to building static blogs with Next.js',
};

// Default export for blog content component
export default function FirstPost() {
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
            This is my first blog post. Here, I can use React components to customize the style and structure of the blog content,
            not just limited to Markdown syntax and functionality.
          </p>
          
          <h2>Why Use TSX for Blog Content</h2>
          <p>
            Using TSX files for blog content has the following advantages:
          </p>
          <ul>
            <li>Fully customizable UI/UX</li>
            <li>Ability to embed any React component</li>
            <li>Type safety and editor support</li>
            <li>Can use any styling system</li>
          </ul>
          
          <h2>Example Code</h2>
          <pre className="bg-muted p-4 rounded-md">
            <code>{`
// A simple React component
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
            `}</code>
          </pre>
          
          <p>
            This blog post demonstrates the basic usage of TSX files as blog content. You can add more content and custom components as needed.
          </p>
        </div>
      </article>
    </Layout>
  );
} 