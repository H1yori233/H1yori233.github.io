import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Note: We're not using the Layout component to fully customize this page

// Export project metadata
export const metadata = {
  title: 'Task Management App',
  date: '2024-05-15',
  tags: ['React', 'Redux', 'Firebase', 'Full-stack'],
  description: 'A feature-rich task management application supporting multi-user collaboration and real-time updates',
  demoUrl: 'https://task-manager-demo.vercel.app',
  githubUrl: 'https://github.com/H1yori233/task-manager',
  image: '/images/projects/task-manager.png', // Example image path
};

// Custom button component with vibrant styling
interface VibrantButtonProps {
  children: React.ReactNode;
  href: string;
  isPrimary?: boolean;
}

const VibrantButton: React.FC<VibrantButtonProps> = ({ children, href, isPrimary = false }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`
      px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 transition-all
      transform hover:scale-105 hover:shadow-lg
      ${isPrimary 
        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500' 
        : 'bg-gradient-to-r from-blue-500 via-teal-400 to-green-400'}
    `}
  >
    {children}
    <ArrowUpRight className="h-4 w-4" />
  </a>
);

// Custom tag component
interface VibrantTagProps {
  children: React.ReactNode;
}

const VibrantTag: React.FC<VibrantTagProps> = ({ children }) => (
  <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-gray-900 shadow-sm">
    {children}
  </span>
);

// Default export for project content component with custom styling
export default function ProjectTwo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Custom header with animated gradient text */}
        <h1 className="text-5xl font-extrabold mb-8 animate-text bg-gradient-to-r from-yellow-400 via-green-300 to-cyan-400 bg-clip-text text-transparent">
          {metadata.title}
        </h1>
        
        {/* Vibrant info bar */}
        <div className="flex flex-wrap gap-2 mb-12 text-lg">
          <span className="text-cyan-300">{metadata.date}</span>
          <span className="text-pink-300">•</span>
          <span className="text-purple-300">Full-stack Application</span>
        </div>
        
        {/* Tags with custom styling */}
        <div className="flex flex-wrap gap-2 mb-12">
          {metadata.tags.map(tag => (
            <VibrantTag key={tag}>{tag}</VibrantTag>
          ))}
        </div>
        
        {/* Stylized project image placeholder */}
        <div className="mb-12 rounded-2xl overflow-hidden border-4 border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.4)]">
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
            <div className="text-center text-2xl font-bold text-cyan-300">
              Task Manager Screenshot
            </div>
          </div>
        </div>
        
        {/* Custom buttons with gradients */}
        <div className="flex flex-wrap gap-6 mb-12">
          <VibrantButton href={metadata.demoUrl} isPrimary>
            Live Demo
          </VibrantButton>
          <VibrantButton href={metadata.githubUrl}>
            GitHub Repo
          </VibrantButton>
        </div>
        
        {/* Content with custom styling */}
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4 text-green-300">Project Overview</h2>
            <p className="text-lg text-cyan-100 leading-relaxed">
              This is a feature-rich task management application that allows users to create, assign, and track tasks.
              The app supports multi-user collaboration, real-time updates, and notification systems.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Key Features</h2>
            <ul className="space-y-2 text-lg text-cyan-100">
              <li className="flex items-center gap-2">
                <span className="text-pink-400">✦</span> User authentication and authorization
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-400">✦</span> Task creation, editing, and deletion
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-400">✦</span> Task categorization and tagging
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-400">✦</span> Deadline reminders
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-400">✦</span> Team collaboration features
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-400">✦</span> Real-time updates and notifications
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-400">✦</span> Data statistics and reports
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4 text-pink-300">Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['React', 'Redux', 'Firebase', 'Material-UI', 'Jest', 'GitHub Actions'].map((tech) => (
                <div key={tech} className="p-4 rounded-lg bg-gradient-to-br from-purple-800/50 to-pink-800/50 backdrop-blur-sm border border-purple-500/30">
                  <div className="font-medium text-center text-cyan-300">{tech}</div>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4 text-cyan-300">Challenges & Solutions</h2>
            <p className="text-lg text-cyan-100 leading-relaxed">
              The main challenge was ensuring reliable and performant real-time data synchronization. By using Firebase's real-time 
              database and carefully designed state management patterns, we successfully implemented high-performance real-time 
              collaboration features while maintaining application responsiveness.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4 text-green-300">Learning Outcomes</h2>
            <p className="text-lg text-cyan-100 leading-relaxed">
              Through this project, I gained deep knowledge of Firebase's real-time database system, mastered complex state 
              management patterns, and improved my ability to design team collaboration features. This project significantly 
              enhanced my technical capabilities in handling real-time applications.
            </p>
          </section>
        </div>
        
        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t border-purple-500/30 text-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-100 transition-colors"
          >
            Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
} 