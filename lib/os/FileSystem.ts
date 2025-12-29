export type InodeType = 'file' | 'directory';

export interface Inode {
    name: string;
    type: InodeType;
    parent: Directory | null;
}


export interface File extends Inode {
    type: 'file';
    content: string | null; // Null means not loaded yet
    size?: number;
}

export interface Directory extends Inode {
    type: 'directory';
    children: Map<string, Inode>;
}

// Helper to create file nodes
function createFile(name: string, size: number = 0, parent: Directory | null = null): File {
    return { name, type: 'file', content: null, size, parent };
}

// Helper to create directory nodes
function createDirectory(name: string, parent: Directory | null = null): Directory {
    return { name, type: 'directory', children: new Map(), parent };
}

export class FileSystem {
    private root: Directory;
    private _cwd: Directory;
    private initialized: boolean = false;

    constructor() {
        // Initialize bare root
        this.root = createDirectory('/');
        this.root.parent = this.root;
        this._cwd = this.root;
    }

    // Initialize from manifest
    async init(): Promise<void> {
        if (this.initialized) return;

        try {
            const response = await fetch('/fs_manifest.json');
            const manifest = await response.json();

            // Rebuild tree from manifest
            // Manifest structure: { root: { name: 'fs', type: 'directory', children: { ... } } }
            // The manifest root corresponds to /fs/, inside it we expect 'home'

            // We map manifest nodes to our Inode structure
            // The manifest root actually represents the "fs" folder in public, 
            // but for the OS, we want 'home' to be at root level '/home'

            // Let's inspect what we got.
            const fsRoot = manifest.root; // This corresponds to public/fs

            if (fsRoot && fsRoot.children) {
                this.buildTree(fsRoot.children, this.root);
            }

            // Set CWD to user home if exists, else root
            const home = this.resolvePath('/home/kaichin');
            if (home && home.type === 'directory') {
                this._cwd = home as Directory;
            } else {
                this._cwd = this.root;
            }

            this.initialized = true;
        } catch (error) {
            console.error('Failed to load FS manifest:', error);
            // Fallback to empty root, maybe adding a warning file
            this.root.children.set('error.txt', createFile('error.txt', 0, this.root));
            (this.root.children.get('error.txt') as File).content = "Failed to load file system.";
        }
    }

    // Recursively build tree
    private buildTree(nodes: any, parent: Directory) {
        for (const key in nodes) {
            const node = nodes[key];
            if (node.type === 'file') {
                parent.children.set(node.name, createFile(node.name, node.size, parent));
            } else if (node.type === 'directory') {
                const dir = createDirectory(node.name, parent);
                parent.children.set(node.name, dir);
                if (node.children) {
                    this.buildTree(node.children, dir);
                }
            }
        }
    }

    get cwd(): string {
        return this.getPath(this._cwd);
    }

    get cwdNode(): Directory {
        return this._cwd;
    }

    // Get the full path of a node
    private getPath(node: Inode): string {
        const parts: string[] = [];
        let current: Inode | null = node;
        while (current && current !== this.root) {
            parts.unshift(current.name);
            current = current.parent;
        }
        return '/' + parts.join('/');
    }

    // Resolve a path string to an Inode
    resolvePath(pathStr: string): Inode | null {
        if (!pathStr) return this._cwd;

        const isAbsolute = pathStr.startsWith('/');
        let current: Directory = isAbsolute ? this.root : this._cwd;

        const parts = pathStr.split('/').filter(p => p && p !== '.');

        for (const part of parts) {
            if (part === '..') {
                current = (current.parent as Directory) || current;
            } else {
                const child = current.children.get(part);
                if (!child) return null;
                if (child.type === 'directory') {
                    current = child as Directory;
                } else {
                    // If it's a file, it must be the last part
                    if (parts.indexOf(part) === parts.length - 1) {
                        return child;
                    }
                    return null; // Can't traverse through a file
                }
            }
        }
        return current;
    }

    // Read directory contents
    readdir(pathStr?: string): string[] | null {
        const target = pathStr ? this.resolvePath(pathStr) : this._cwd;
        if (!target || target.type !== 'directory') return null;
        return Array.from((target as Directory).children.keys());
    }

    // Read file content (ASYNC NOW)
    async readFile(pathStr: string): Promise<string | null> {
        const target = this.resolvePath(pathStr);
        if (!target || target.type !== 'file') return null;

        const file = target as File;

        // Return cached content if available
        if (file.content !== null) {
            return file.content;
        }

        // Fetch content from public/fs
        // URL path: /fs/path/to/file
        // We need to construct the relative path from root
        const fullPath = this.getPath(file);
        const url = `/fs${fullPath}`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Network response was not ok');
            const text = await res.text();
            file.content = text; // Cache it
            return text;
        } catch (e) {
            console.error(`Failed to fetch file ${url}:`, e);
            return null;
        }
    }

    // Check if path exists and get type
    stat(pathStr: string): { type: InodeType } | null {
        const target = this.resolvePath(pathStr);
        if (!target) return null;
        return { type: target.type };
    }

    // Change current working directory
    cd(pathStr: string): boolean {
        const target = this.resolvePath(pathStr);
        if (!target || target.type !== 'directory') return false;
        this._cwd = target as Directory;
        return true;
    }

    // Add a file to the filesystem (used to populate projects)
    addFile(dirPath: string, name: string, content: string): boolean {
        const dir = this.resolvePath(dirPath);
        if (!dir || dir.type !== 'directory') return false;
        (dir as Directory).children.set(name, createFile(name, content, dir as Directory));
        return true;
    }

    // Shorthand for home directory
    get homePath(): string {
        return '/home/kaichin';
    }
}

// Singleton instance
let fsInstance: FileSystem | null = null;

export function getFileSystem(): FileSystem {
    if (!fsInstance) {
        fsInstance = new FileSystem();
    }
    return fsInstance;
}
