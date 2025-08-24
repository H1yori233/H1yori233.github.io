import React from 'react';
import { Layout } from '@/components/layout';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Dice Throne',
  date: '2023-08-10',
  description: 'A digital version of the classical board game Dice Throne, developed with Unity',
  demoUrl: 'https://yourusername.itch.io/dice-throne',
  githubUrl: 'https://github.com/yourusername/dice-throne',
  image: '/images/projects/dice-throne.png',
};

export default function DiceThrone() {
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
          <Button asChild variant="default">
            <a href={metadata.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              Play Game <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
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