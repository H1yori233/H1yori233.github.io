import { FileSystem, getFileSystem } from './FileSystem';
import { getCommand, CommandResult } from './commands';

export interface ShellOutput {
    command: string;
    output: string;
    error?: boolean;
    isLink?: { href: string; text: string };
}

export class Shell {
    public fs: FileSystem;
    private _history: string[] = [];

    constructor(fs?: FileSystem) {
        this.fs = fs || getFileSystem();
    }

    async init(): Promise<void> {
        await this.fs.init();
    }

    get history(): string[] {
        return [...this._history];
    }

    get prompt(): string {
        // Shorten path for display
        const cwd = this.fs.cwd;
        const home = this.fs.homePath;
        const displayPath = cwd.startsWith(home)
            ? cwd.replace(home, '~')
            : cwd;
        return `kaichin:${displayPath}$`;
    }

    // Parse a command line into pipeline segments
    private parsePipeline(input: string): string[][] {
        const segments = input.split('|').map(s => s.trim());
        return segments.map(seg => this.parseCommand(seg));
    }

    // Parse a single command into args
    private parseCommand(input: string): string[] {
        // Simple tokenizer: split by spaces, handle quotes
        const tokens: string[] = [];
        let current = '';
        let inQuote = false;
        let quoteChar = '';

        for (const char of input) {
            if ((char === '"' || char === "'") && !inQuote) {
                inQuote = true;
                quoteChar = char;
            } else if (char === quoteChar && inQuote) {
                inQuote = false;
                quoteChar = '';
            } else if (char === ' ' && !inQuote) {
                if (current) {
                    tokens.push(current);
                    current = '';
                }
            } else {
                current += char;
            }
        }
        if (current) tokens.push(current);
        return tokens;
    }

    // Execute a command line (may include pipes)
    async execute(input: string): Promise<ShellOutput> {
        const trimmed = input.trim();
        if (!trimmed) {
            return { command: '', output: '' };
        }

        this._history.push(trimmed);

        const pipeline = this.parsePipeline(trimmed);
        let stdin: string | undefined = undefined;
        let lastResult: CommandResult = { output: '' };

        for (const args of pipeline) {
            if (args.length === 0) continue;

            const cmdName = args[0];
            const cmdArgs = args.slice(1);

            const cmd = getCommand(cmdName);
            if (!cmd) {
                return {
                    command: trimmed,
                    output: `${cmdName}: command not found. Type 'help' for available commands.`,
                    error: true
                };
            }

            lastResult = await cmd.execute(cmdArgs, stdin, this);
            stdin = lastResult.output; // Pass output as stdin to next command
        }

        // Parse special markers
        const output = lastResult.output;

        // Check for link marker
        const linkMatch = output.match(/\x1b\[LINK\](.+?)\|(.+?)\x1b\[\/LINK\]/);
        if (linkMatch) {
            return {
                command: trimmed,
                output: '',
                isLink: { href: linkMatch[1], text: linkMatch[2] }
            };
        }

        return {
            command: trimmed,
            output: lastResult.output,
            error: lastResult.error
        };
    }
}

// Singleton
let shellInstance: Shell | null = null;

export function getShell(): Shell {
    if (!shellInstance) {
        shellInstance = new Shell();
    }
    return shellInstance;
}
