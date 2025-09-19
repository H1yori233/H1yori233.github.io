# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Architecture

This is a modern portfolio website built with Next.js 14 and TypeScript, featuring:

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives with custom components
- **Animations**: Framer Motion
- **3D Graphics**: Three.js with React Three Fiber
- **Build**: Static export for GitHub Pages deployment

### Project Structure
```
app/                    # Next.js App Router pages
├── page.tsx           # Homepage with animated hero section
├── layout.tsx         # Root layout with fonts and metadata
├── globals.css        # Global CSS with design system variables
└── not-found.tsx      # 404 error page
components/
├── ui/                # Reusable UI components (buttons, cards, etc.)
├── magicui/          # Custom animated components (text-scramble, retro-grid, etc.)
├── project/          # Project-related components
├── tech-stack.tsx    # Technology stack display component
├── MapComponent.tsx  # Interactive map component
└── ContentWrapper.tsx # Content layout wrapper
lib/
├── utils.ts          # Utility functions (cn for class merging)
└── project/          # Project data and utilities
```

### Key Features
- **Static Export**: Configured for GitHub Pages with `output: 'export'`
- **SEO Optimized**: Comprehensive metadata and OpenGraph tags
- **Responsive Design**: Mobile-first with desktop navigation
- **Animations**: Smooth transitions using Framer Motion
- **Custom Components**: MagicUI components for text scrambling and effects
- **Project System**: Dynamic project pages with external links and local content

### Current Site Structure (based on git status)
- Home (/) - Animated hero section (app/page.tsx)
- Note: About and Project pages were recently removed from the codebase
- Components have been reorganized with new structure

### Styling System
- **Typography**: IBM Plex Sans/Mono/Serif font family
- **Color System**: CSS custom properties for theming
- **Layout**: Content grid system for consistent spacing
- **Components**: Consistent button styles (btn-primary, btn-ghost)

### Important Configuration
- Images are unoptimized for static export
- ESLint and TypeScript errors ignored during builds for deployment
- Custom webpack configuration with xxhash64 for compatibility
- Trailing slashes enabled for static hosting

When working on this project:
1. Use the existing component patterns in `components/ui/` and `components/magicui/`
2. Follow the established typography and spacing system
3. Maintain the consistent animation patterns using Framer Motion
4. Add new projects to `app/project/projectData.ts`
5. Use the `cn()` utility for conditional class merging
6. Test static export builds with `npm run build` before deployment