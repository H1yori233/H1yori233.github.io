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
  tags: ['FastAPI', 'MongoDB', 'Redis', 'NextJS', 'TypeScript', 'Tailwind CSS', 'MeiliSearch', 'LLM'],
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
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            <h1 className="text-5xl font-bold tracking-tight">InnoWeaver Research Platform</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A full-stack AI-powered research platform developed at Zhejiang University International Design Institute, 
            integrating intelligent content generation with advanced document management systems.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              View Source
            </Button>
          </div>
        </section>

        {/* Project Highlights */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl bg-card/50 hover:bg-card transition-colors">
            <Users className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multi-tier User System</h3>
            <p className="text-muted-foreground">
              Role-based access control with JWT authentication, supporting researchers, 
              reviewers, and administrators through granular permissions.
            </p>
          </div>
          
          <div className="p-6 border rounded-xl bg-card/50 hover:bg-card transition-colors">
            <Network className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Document Intelligence</h3>
            <p className="text-muted-foreground">
              Semantic search powered by MeiliSearch, with document interaction analytics 
              tracking engagement metrics and research patterns.
            </p>
          </div>

          <div className="p-6 border rounded-xl bg-card/50 hover:bg-card transition-colors">
            <Rocket className="h-8 w-8 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">LLM Orchestration</h3>
            <p className="text-muted-foreground">
              Custom RAG pipeline with model switching capabilities, supporting 
              multiple LLM providers through unified API abstraction.
            </p>
          </div>
        </section>

        {/* Tech Stack Visualization */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold border-b pb-2">Architecture Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border rounded-xl bg-muted/10">
              <div className="flex items-center gap-3 mb-6">
                <Server className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold">Backend Services</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <Code2 className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">FastAPI Core</h4>
                    <p className="text-sm text-muted-foreground">
                      Async REST API with OAuth2 security, rate limiting, 
                      and automated OpenAPI documentation
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <Database className="h-5 w-5 text-amber-500" />
                  <div>
                    <h4 className="font-medium">Data Layer</h4>
                    <p className="text-sm text-muted-foreground">
                      MongoDB (ACID transactions) + Redis (caching layer) + 
                      MeiliSearch (vector search)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-xl bg-muted/10 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="h-6 w-6 text-purple-500" />
                <h3 className="text-xl font-semibold">Frontend Ecosystem</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <Globe className="h-5 w-5 text-red-500" />
                  <div>
                    <h4 className="font-medium">Next.js 14</h4>
                    <p className="text-sm text-muted-foreground">
                      App router with RSC, hybrid static & server rendering, 
                      and edge runtime optimizations
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <div>
                    <h4 className="font-medium">Monitoring Suite</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time dashboard with performance metrics, 
                      error tracking, and API analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
} 