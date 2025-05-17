import React from 'react';
import { Layout } from '@/components/layout';
import { ArrowUpRight, Server, Database, Github, ExternalLink, Cpu, LayoutDashboard, Users, ThumbsUp, Bookmark, History, Bot, Globe, Code2, Network, Rocket, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Export project metadata
export const metadata = {
  title: 'InnoWeaver',
  date: '2025-03-24',
  description: 'A full-stack web application research project at International Design Institute of Zhejiang University, featuring user management, document data management, and LLM-powered content generation',
  demoUrl: '#',
  githubUrl: '#',
  image: '/images/projects/innoweaver.png',
};

// Default export for project content component
export default function InnoWeaver() {
  return (
    <Layout title={metadata.title}>
      <article className="max-w-6xl mx-auto space-y-16">
        innoweaver
      </article>
    </Layout>
  );
} 