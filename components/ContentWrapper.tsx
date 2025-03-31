import React, { ReactNode } from 'react';
import { ViewCounter } from './ViewCounter';

interface ContentWrapperProps {
  children: ReactNode;
  type: 'blog' | 'project';
  slug: string;
}

export function ContentWrapper({ children, type, slug }: ContentWrapperProps) {
  // Create unique page ID
  const pageId = `${type}-${slug}`;
  
  // Set label text based on type
  const label = type === 'blog' ? 'Article Views' : 'Project Views';
  
  return (
    <div className="content-wrapper">
      {children}
      
      <div className="mt-10 flex justify-end pr-4">
        <ViewCounter 
          pageId={pageId} 
          label={label} 
          rightColor="4f46e5" 
          className="bg-muted/30 rounded-xl hover:bg-muted/50"
        />
      </div>
    </div>
  );
} 