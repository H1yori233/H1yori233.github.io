// Forward declaration for Shell to avoid circular imports
// The actual Shell instance is passed at runtime
export interface ShellInterface {
    fs: {
        readdir: (path?: string) => string[] | null;
        readFile: (path: string) => Promise<string | null>;
        stat: (path: string) => { type: 'file' | 'directory' } | null;
        cd: (path: string) => boolean;
        cwd: string;
        homePath: string;
        init: () => Promise<void>;
    };
}

export interface CommandResult {
    output: string;
    error?: boolean;
}

export interface Command {
    name: string;
    description: string;
    execute: (args: string[], stdin: string | undefined, shell: ShellInterface) => Promise<CommandResult>;
}

// Command Registry
const commands = new Map<string, Command>();

export function registerCommand(cmd: Command): void {
    commands.set(cmd.name, cmd);
}

export function getCommand(name: string): Command | undefined {
    return commands.get(name);
}

export function getAllCommands(): Command[] {
    return Array.from(commands.values());
}

// ============ Built-in Commands ============

// ls - list directory
registerCommand({
    name: 'ls',
    description: 'List directory contents',
    execute: async (args, _stdin, shell) => {
        const path = args[0] || '.';
        const entries = shell.fs.readdir(path);
        if (entries === null) {
            return { output: `ls: cannot access '${path}': No such file or directory`, error: true };
        }
        // Format output with color hints (directories in blue)
        const formatted = entries.map((name: string) => {
            const stat = shell.fs.stat(path === '.' ? name : `${path}/${name}`);
            return stat?.type === 'directory' ? `${name}/` : name;
        });
        return { output: formatted.join('  ') };
    }
});

// cd - change directory
registerCommand({
    name: 'cd',
    description: 'Change directory',
    execute: async (args, _stdin, shell) => {
        const path = args[0] || shell.fs.homePath;
        const success = shell.fs.cd(path);
        if (!success) {
            return { output: `cd: no such file or directory: ${path}`, error: true };
        }
        return { output: '' };
    }
});

// pwd - print working directory
registerCommand({
    name: 'pwd',
    description: 'Print working directory',
    execute: async (_args, _stdin, shell) => {
        return { output: shell.fs.cwd };
    }
});

// cat - read file
registerCommand({
    name: 'cat',
    description: 'Display file contents',
    execute: async (args, stdin, shell) => {
        // If no args but stdin exists, just echo stdin
        if (args.length === 0 && stdin) {
            return { output: stdin };
        }
        if (args.length === 0) {
            return { output: 'cat: missing file operand', error: true };
        }
        const content = await shell.fs.readFile(args[0]);
        if (content === null) {
            return { output: `cat: ${args[0]}: No such file or directory`, error: true };
        }
        return { output: content };
    }
});

// echo - print text
registerCommand({
    name: 'echo',
    description: 'Display a line of text',
    execute: async (args, _stdin, _shell) => {
        return { output: args.join(' ') };
    }
});

// grep - filter lines
registerCommand({
    name: 'grep',
    description: 'Search for patterns',
    execute: async (args, stdin, _shell) => {
        if (args.length === 0) {
            return { output: 'grep: missing pattern', error: true };
        }
        const pattern = args[0];
        const input = stdin || '';
        const lines = input.split('\n').filter(line => line.includes(pattern));
        return { output: lines.join('\n') };
    }
});

// whoami - print user name
registerCommand({
    name: 'whoami',
    description: 'Print the current user',
    execute: async (_args, _stdin, _shell) => {
        return { output: 'kaichin' };
    }
});

// clear - handled specially by terminal, but we register it
registerCommand({
    name: 'clear',
    description: 'Clear the terminal screen',
    execute: async (_args, _stdin, _shell) => {
        return { output: '\x1b[CLEAR]' }; // Special marker for terminal to handle
    }
});

// help - list commands
registerCommand({
    name: 'help',
    description: 'List available commands',
    execute: async (_args, _stdin, _shell) => {
        const cmds = getAllCommands();
        const lines = cmds.map(c => `  ${c.name.padEnd(10)} - ${c.description}`);
        return { output: 'Available commands:\n' + lines.join('\n') };
    }
});

// cv - special command to show CV link
registerCommand({
    name: 'cv',
    description: 'Open my CV',
    execute: async (_args, _stdin, _shell) => {
        return { output: '\x1b[LINK]/pdfs/cv.pdf|Kaichin\'s CV\x1b[/LINK]' };
    }
});
