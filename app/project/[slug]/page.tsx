import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import dynamic from 'next/dynamic';
import { ContentWrapper } from '@/components/ContentWrapper';

// Get all project paths
export async function generateStaticParams() {
  const projectDirectory = path.join(process.cwd(), 'content/project');

  // Ensure directory exists
  if (!fs.existsSync(projectDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(projectDirectory);

  // Filter tsx files and create paths
  return filenames
    .filter(filename => filename.endsWith('.tsx'))
    .map(filename => ({
      slug: filename.replace(/\.tsx$/, ''),
    }));
}

// Dynamically import content component
const ProjectContent = ({ slug }: { slug: string }) => {
  const ProjectComponent = dynamic(
    () => import(`@/content/project/${slug}`).catch(() => {
      // Return 404 if component not found
      notFound();
    }),
    {
      loading: () => <div className="text-center py-10">Loading project content...</div>,
      ssr: true, // Server-side rendering
    }
  );

  return (
    <ContentWrapper type="project" slug={slug}>
      <ProjectComponent />
    </ContentWrapper>
  );
};

// Project detail page
export default function ProjectPost({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Verify project file exists
  const projectFilePath = path.join(process.cwd(), `content/project/${slug}.tsx`);
  if (!fs.existsSync(projectFilePath)) {
    notFound();
  }
  
  return <ProjectContent slug={slug} />;
} 