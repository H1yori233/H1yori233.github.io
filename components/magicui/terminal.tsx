"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";
import { getShell, Shell } from "@/lib/os/Shell";
import { getAllCommands } from "@/lib/os/commands";
import Link from "next/link";

// ============ Types ============

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'link' | 'hint';
  content: string;
  prompt?: string;
  href?: string;
  linkText?: string;
  isTyping?: boolean;
  isError?: boolean;
}

interface TerminalProps {
  className?: string;
  bootCommands?: string[];
  variant?: 'window' | 'plain';
}

// ============ Monochrome ink palette ============

const ansi = {
  user: "text-foreground font-medium",
  path: "text-muted-foreground",
  punct: "text-muted-foreground",
  error: "text-foreground",
  link: "text-foreground",
};

// Render clickable links inside plain text output. Supports both Markdown
// links — [label](url) — and bare http(s) URLs. For bare URLs, trailing
// sentence punctuation is kept out of the href.
const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;

const LinkSpan = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(ansi.link, "underline underline-offset-2 hover:opacity-80 transition-opacity")}
  >
    {label}
  </Link>
);

function linkify(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  LINK_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    const isMarkdown = match[2] !== undefined;
    if (isMarkdown) {
      nodes.push(<LinkSpan key={key++} href={match[2]} label={match[1]} />);
    } else {
      const raw = match[3];
      const trail = raw.match(/[.,;:!?]+$/)?.[0] ?? '';
      const href = trail ? raw.slice(0, -trail.length) : raw;
      nodes.push(
        <span key={key++}>
          <LinkSpan href={href} label={href} />
          {trail}
        </span>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return nodes;
}

// Prompt renderer shared by history lines and the live input row
const PromptSpan = ({ prompt }: { prompt: string }) => {
  const [user, rest] = prompt.split(':');
  return (
    <>
      <span className={ansi.user}>{user}</span>
      <span className={ansi.punct}>:</span>
      <span className={ansi.path}>{rest?.replace('$', '')}</span>
      <span className={ansi.punct}>$ </span>
    </>
  );
};

// ============ Tab completion ============

function longestCommonPrefix(items: string[]): string {
  if (items.length === 0) return '';
  let prefix = items[0];
  for (const item of items.slice(1)) {
    while (!item.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}

function completeInput(value: string, shell: Shell): string {
  // Only the last token is completed; tokens after a pipe start a new command
  const lastSpace = value.lastIndexOf(' ');
  const head = value.slice(0, lastSpace + 1);
  const token = value.slice(lastSpace + 1);
  if (!token) return value;

  const activeSegment = value.slice(value.lastIndexOf('|') + 1);
  const isCommandPosition = !activeSegment.trimStart().includes(' ');

  let candidates: string[];
  if (isCommandPosition) {
    candidates = getAllCommands()
      .map(c => c.name)
      .filter(name => name.startsWith(token))
      .map(name => name + ' ');
  } else {
    // Path completion: split a directory prefix off the token
    const slashIdx = token.lastIndexOf('/');
    const dirPrefix = slashIdx >= 0 ? token.slice(0, slashIdx + 1) : '';
    const base = slashIdx >= 0 ? token.slice(slashIdx + 1) : token;
    const entries = shell.fs.readdir(dirPrefix || undefined) || [];
    candidates = entries
      .filter(name => name.startsWith(base))
      .map(name => {
        const stat = shell.fs.stat(dirPrefix + name);
        return dirPrefix + name + (stat?.type === 'directory' ? '/' : ' ');
      });
  }

  if (candidates.length === 0) return value;
  if (candidates.length === 1) return head + candidates[0];
  return head + longestCommonPrefix(candidates);
}

// ============ Terminal Component ============

export const Terminal = ({
  className,
  bootCommands = ['whoami', 'cat about.md', 'cv'],
  variant = 'window'
}: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);

  const shellRef = useRef<Shell | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // History navigation: null = editing a fresh draft
  const historyIndexRef = useRef<number | null>(null);
  const draftRef = useRef('');

  // Initialize shell
  useEffect(() => {
    shellRef.current = getShell();
  }, []);

  // Add a line to terminal
  const addLine = useCallback((line: Omit<TerminalLine, 'id'>) => {
    setLines(prev => [...prev, { ...line, id: Date.now() + Math.random() }]);
  }, []);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // Boot sequence - run commands sequentially with typing effect
  const bootStartedRef = useRef(false);

  useEffect(() => {
    if (!shellRef.current || bootStartedRef.current) return;
    bootStartedRef.current = true;

    const runBootSequence = async () => {
      const shell = shellRef.current!;

      // Initialize file system (fetch manifest)
      await shell.init();

      for (const cmd of bootCommands) {
        const prompt = shell.prompt;

        // Add command line (will be typed)
        addLine({ type: 'command', content: cmd, prompt, isTyping: true });

        // Wait for "typing" animation
        await new Promise(r => setTimeout(r, 100 + cmd.length * 30));

        // Execute command
        const result = await shell.execute(cmd);

        // Add output
        if (result.isLink) {
          addLine({ type: 'link', content: '', href: result.isLink.href, linkText: result.isLink.text });
        } else if (result.output) {
          addLine({ type: 'output', content: result.output, isError: result.error });
        }

        // Delay between commands
        await new Promise(r => setTimeout(r, 400));
      }

      addLine({ type: 'hint', content: "Type 'help' for available commands." });
      setIsBooting(false);
    };

    runBootSequence();
  }, []); // Only run once on mount

  // Handle command submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shellRef.current || isBooting || !input.trim()) return;

    const shell = shellRef.current;
    const cmd = input.trim();
    const prompt = shell.prompt;

    // Clear input and reset history navigation
    setInput('');
    historyIndexRef.current = null;
    draftRef.current = '';

    // Add command to display
    addLine({ type: 'command', content: cmd, prompt });

    // Handle clear specially
    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    // Execute command
    const result = await shell.execute(cmd);

    // Add output
    if (result.isLink) {
      addLine({ type: 'link', content: '', href: result.isLink.href, linkText: result.isLink.text });
    } else if (result.output) {
      addLine({ type: 'output', content: result.output, isError: result.error });
    }
  };

  // History navigation and tab completion
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const shell = shellRef.current;
    if (!shell) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      setInput(prev => completeInput(prev, shell));
      return;
    }

    const history = shell.history;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      if (historyIndexRef.current === null) {
        draftRef.current = input;
        historyIndexRef.current = history.length - 1;
      } else if (historyIndexRef.current > 0) {
        historyIndexRef.current -= 1;
      }
      setInput(history[historyIndexRef.current]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndexRef.current === null) return;
      if (historyIndexRef.current < history.length - 1) {
        historyIndexRef.current += 1;
        setInput(history[historyIndexRef.current]);
      } else {
        historyIndexRef.current = null;
        setInput(draftRef.current);
      }
    }
  };

  // Focus input when clicking terminal
  const handleTerminalClick = () => {
    if (!isBooting) {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      data-cursor="native"
      className={cn(
        "z-0 w-full flex flex-col",
        variant === 'window' && "h-full overflow-hidden rounded-lg border border-border bg-card",
        variant === 'plain' && "bg-transparent",
        className
      )}
      onClick={handleTerminalClick}
    >
      {variant === 'window' && (
        /* Title bar */
        <div className="relative flex flex-shrink-0 items-center border-b border-border px-4 py-3">
          <div className="flex flex-row gap-x-2">
            <div className="h-2 w-2 rounded-full bg-muted-foreground/40"></div>
            <div className="h-2 w-2 rounded-full bg-muted-foreground/40"></div>
            <div className="h-2 w-2 rounded-full bg-muted-foreground/40"></div>
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 select-none font-mono text-xs text-muted-foreground">
            kaiqin@web — zsh
          </span>
        </div>
      )}

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className={cn(
          "flex-grow font-mono",
          variant === 'window' && "overflow-y-auto p-4 text-sm terminal-scrollbar",
          variant === 'plain' && "overflow-y-auto p-0 text-[0.8125rem] leading-5 [scrollbar-width:none] [&_*]:text-[0.8125rem] [&_*]:leading-5 [&::-webkit-scrollbar]:hidden"
        )}
      >
        {/* Rendered lines */}
        {lines.map((line) => (
          <TerminalLineComponent key={line.id} line={line} />
        ))}

        {/* Interactive prompt (shown after boot) */}
        {!isBooting && shellRef.current && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="whitespace-pre">
              <PromptSpan prompt={shellRef.current.prompt} />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent outline-none text-foreground caret-foreground"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </form>
        )}
      </div>
    </div>
  );
};

// ============ Line Renderer ============

const TerminalLineComponent = ({ line }: { line: TerminalLine }) => {
  const [displayedText, setDisplayedText] = useState(line.isTyping ? '' : line.content);

  // Typing effect for commands during boot
  useEffect(() => {
    if (!line.isTyping) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < line.content.length) {
        setDisplayedText(line.content.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [line.isTyping, line.content]);

  if (line.type === 'command') {
    return (
      <div className="flex items-start whitespace-pre-wrap break-words mb-1">
        <span className="whitespace-pre">
          <PromptSpan prompt={line.prompt || 'kaiqin:~$'} />
        </span>
        <span className="text-foreground">{displayedText}</span>
      </div>
    );
  }

  if (line.type === 'link') {
    return (
      <div className="mb-1">
        <Link
          href={line.href || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(ansi.link, "underline underline-offset-2 hover:opacity-80 transition-opacity")}
        >
          {line.linkText}
        </Link>
      </div>
    );
  }

  if (line.type === 'hint') {
    return (
      <div className="whitespace-pre-wrap break-words text-muted-foreground mb-1">
        {line.content}
      </div>
    );
  }

  // Output
  return (
    <div
      className={cn(
        "whitespace-pre-wrap break-words mb-1",
        line.isError ? ansi.error : "text-foreground"
      )}
    >
      {linkify(line.content)}
    </div>
  );
};
