import React, { ReactNode } from 'react';

interface ContentWrapperProps {
  children: ReactNode;
  type: 'project';
  slug: string;
}

export function ContentWrapper({ children, type, slug }: ContentWrapperProps) {
  return (
    <div className="content-wrapper">
      {children}
    </div>
  );
} 