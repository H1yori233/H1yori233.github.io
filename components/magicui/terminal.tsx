"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { getShell, Shell, ShellOutput } from "@/lib/os/Shell";
import Link from "next/link";

// ============ Types ============

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'link';
  content: string;
  prompt?: string;
  href?: string;
  linkText?: string;
  isTyping?: boolean;
}

interface TerminalProps {
  className?: string;
  bootCommands?: string[];
}

// ============ Terminal Component ============

export const Terminal = ({
  className,
  bootCommands = ['whoami', 'cat about.md', 'cv']
}: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [lineIdCounter, setLineIdCounter] = useState(0);

  const shellRef = useRef<Shell | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Initialize shell
  useEffect(() => {
    shellRef.current = getShell();
  }, []);

  // Get next line ID
  const getNextId = useCallback(() => {
    setLineIdCounter(prev => prev + 1);
    return lineIdCounter;
  }, [lineIdCounter]);

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

  // Boot sequence - run commands sequentially with typing effect
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
          addLine({ type: 'output', content: result.output });
        }

        // Delay between commands
        await new Promise(r => setTimeout(r, 400));
      }

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

    // Clear input
    setInput('');

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
      addLine({ type: 'output', content: result.output });
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
      className={cn(
        "z-0 h-full w-full rounded-xl border border-border bg-background overflow-hidden flex flex-col",
        className
      )}
      onClick={handleTerminalClick}
    >
      {/* Title bar */}
      <div className="flex flex-col gap-y-2 border-b border-border p-4 flex-shrink-0">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="p-4 overflow-y-auto flex-grow font-mono text-sm"
      >
        {/* Rendered lines */}
        {lines.map((line) => (
          <TerminalLineComponent key={line.id} line={line} />
        ))}

        {/* Interactive prompt (shown after boot) */}
        {!isBooting && shellRef.current && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-500">{shellRef.current.prompt.split(':')[0]}</span>
            <span className="text-white">:</span>
            <span className="text-blue-500">{shellRef.current.prompt.split(':')[1]?.replace('$', '')}</span>
            <span className="text-white">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent outline-none text-foreground caret-green-500"
              autoFocus
              autoComplete="off"
              spellCheck={false}
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
    const promptParts = line.prompt?.split(':') || ['kaichin', '~$'];
    return (
      <div className="flex items-start whitespace-pre-wrap break-words mb-1">
        <span className="text-green-500">{promptParts[0]}</span>
        <span className="text-white">:</span>
        <span className="text-blue-500">{promptParts[1]?.replace('$', '')}</span>
        <span className="text-white">$ </span>
        <span className="text-foreground">{displayedText}</span>
      </div>
    );
  }

  if (line.type === 'link') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-1"
      >
        <Link
          href={line.href || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300 transition-colors"
        >
          {line.linkText}
        </Link>
      </motion.div>
    );
  }

  // Output
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="whitespace-pre-wrap break-words text-foreground mb-1"
    >
      {line.content}
    </motion.div>
  );
};

// ============ Legacy Exports (for compatibility) ============

interface AnimatedSpanProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
}: AnimatedSpanProps) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: delay / 1000 }}
    className={cn("grid text-sm font-normal tracking-tight", className)}
  >
    {children}
  </motion.div>
);

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  const MotionComponent = motion.create(Component as any, {
    forwardMotionProps: true,
  });

  return (
    <MotionComponent
      className={cn("text-sm font-normal tracking-tight", className)}
    >
      {displayedText}
    </MotionComponent>
  );
};
