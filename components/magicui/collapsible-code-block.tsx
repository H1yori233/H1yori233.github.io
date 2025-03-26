"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

interface CollapsibleCodeBlockProps {
  code: string;
  language: string;
  title?: string;
  lightTheme?: string;
  darkTheme?: string;
  defaultCollapsed?: boolean;
  showLanguageBadge?: boolean;
  className?: string;
}

export function CollapsibleCodeBlock({
  code,
  language,
  title,
  lightTheme = "github-light",
  darkTheme = "github-dark",
  defaultCollapsed = true,
  showLanguageBadge = true,
  className,
}: CollapsibleCodeBlockProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const highlighted = await codeToHtml(code, {
          lang: language,
          themes: {
            light: lightTheme,
            dark: darkTheme,
          },
          defaultColor: theme === "dark" ? "dark" : "light",
        });
        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedCode(`<pre>${code}</pre>`);
      }
    }

    loadHighlightedCode();
  }, [code, language, lightTheme, darkTheme, theme]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={cn("my-4 rounded-lg border border-border max-w-4xl", className)}>
      <div className="flex items-center justify-between rounded-t-lg border-b border-border bg-muted/50 p-2 px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand code" : "Collapse code"}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
          <span className="font-medium">
            {title || `Code example${language ? `: ${language}` : ""}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {showLanguageBadge && language && (
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {language}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-6 w-6 rounded-md"
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            <Copy
              className={`h-4 w-4 transition-all duration-300 ${
                copied ? "scale-0" : "scale-100"
              }`}
            />
            <Check
              className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
                copied ? "scale-100" : "scale-0"
              }`}
            />
          </Button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative">
              {highlightedCode ? (
                <div
                  className={`[&>pre]:overflow-x-auto [&>pre]:rounded-b-lg [&>pre]:p-4 [&>pre]:font-mono ${
                    theme === "dark" ? "dark" : "light"
                  }`}
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              ) : (
                <pre className={`overflow-x-auto rounded-b-lg p-4 font-mono ${theme === "dark" ? "bg-background dark" : "bg-background light"}`}>
                  {code}
                </pre>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 