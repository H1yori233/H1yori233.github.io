
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const FS_ROOT = path.join(PUBLIC_DIR, 'fs');
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'fs_manifest.json');

// Ensure fs root exists
if (!fs.existsSync(FS_ROOT)) {
    fs.mkdirSync(FS_ROOT, { recursive: true });
}

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const frontmatter = match[1];
    const metadata = {};

    frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        // Parse booleans
        if (value === 'true') value = true;
        if (value === 'false') value = false;

        metadata[key] = value;
    });

    return metadata;
}

function scanDirectory(dirPath) {
    const name = path.basename(dirPath);
    const stats = fs.statSync(dirPath);

    if (stats.isFile()) {
        const node = {
            name,
            type: 'file',
            size: stats.size
        };

        // Try to parse frontmatter for .md files
        if (name.endsWith('.md')) {
            try {
                const content = fs.readFileSync(dirPath, 'utf-8');
                const metadata = parseFrontmatter(content);
                if (metadata) {
                    node.metadata = metadata;
                }
            } catch (e) {
                console.warn(`Failed to parse frontmatter for ${name}`, e);
            }
        }

        return node;
    }

    if (stats.isDirectory()) {
        const children = {};
        const items = fs.readdirSync(dirPath);

        items.forEach(item => {
            // Ignore hidden files
            if (item.startsWith('.')) return;

            const itemPath = path.join(dirPath, item);
            const node = scanDirectory(itemPath);
            children[node.name] = node;
        });

        return {
            name,
            type: 'directory',
            children
        };
    }

    return null;
}

console.log('Scanning public/fs...');
const rootNode = scanDirectory(FS_ROOT);

// Wrap in a root object
const manifest = {
    root: rootNode || { name: 'fs', type: 'directory', children: {} }
};

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`Manifest generated at ${MANIFEST_PATH}`);
