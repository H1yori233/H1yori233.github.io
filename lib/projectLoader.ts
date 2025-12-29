import { Project } from "@/components/project/projects";

const MANIFEST_URL = '/fs_manifest.json';

interface ManifestNode {
    name: string;
    type: 'file' | 'directory';
    size?: number;
    metadata?: Record<string, any>;
    children?: Record<string, ManifestNode>;
}

interface Manifest {
    root: ManifestNode;
}

let cachedProjects: Project[] | null = null;

export async function getAllProjects(): Promise<Project[]> {
    if (cachedProjects) return cachedProjects;

    try {
        const response = await fetch(MANIFEST_URL);
        if (!response.ok) throw new Error('Failed to fetch manifest');

        const manifest: Manifest = await response.json();

        // Navigate to projects directory: root -> children -> home -> kaichin -> projects
        const projectsDir = manifest.root?.children?.['home']?.children?.['kaichin']?.children?.['projects'];

        if (!projectsDir || !projectsDir.children) {
            console.warn('Projects directory not found in manifest');
            return [];
        }

        const projects: Project[] = [];

        for (const [key, node] of Object.entries(projectsDir.children)) {
            if (node.type === 'file' && node.name.endsWith('.md') && node.metadata) {
                const meta = node.metadata;

                // Map metadata to Project interface
                // Ensure required fields exist
                if (meta.title && meta.slug) {
                    projects.push({
                        title: meta.title,
                        description: meta.description || '',
                        slug: meta.slug,
                        image: meta.image,
                        externalUrl: meta.externalUrl,
                        featured: meta.featured === true || meta.featured === 'true'
                    });
                }
            }
        }

        // Sort: Featured first, then by title or other criteria if needed?
        // Existing order in projectData.ts was implied. 
        // We might want to add an 'order' field later, but for now let's just sort featured first.
        projects.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        });

        cachedProjects = projects;
        return projects;
    } catch (e) {
        console.error('Error loading projects:', e);
        return [];
    }
}
