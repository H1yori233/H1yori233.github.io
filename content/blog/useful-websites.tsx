"use client";

import React from 'react';
import { Layout } from '@/components/layout';
import { Button } from "@/components/ui/button";
import { Check, Copy, ExternalLink } from "lucide-react";
import { motion } from 'framer-motion';
import { ScriptCopyBtn } from '@/components/magicui/script-copy-btn';

// Simplified website data structure - just URL strings
type Website = string;

// Websites organized by category
interface WebsiteCategory {
    name: string;
    color: string;
    websites: Website[];
}

// Export blog metadata
export const metadata = {
    title: 'Useful Websites Collection',
    tags: ['Design', 'Development Tools', 'Inspiration'],
    description: 'A collection of useful websites for development and design',
};

// Website Copy Button Component
function WebsiteCopyButton({ url }: { url: string }) {
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 100);
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-md border border-border/60 bg-background hover:bg-muted"
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy URL"}
        >
            <span className="sr-only">{copied ? "Copied" : "Copy URL"}</span>
            <Copy
                className={`h-3.5 w-3.5 transition-all duration-100 ${copied ? "scale-0" : "scale-100"
                    }`}
            />
            <Check
                className={`absolute inset-0 m-auto h-3.5 w-3.5 transition-all duration-100 ${copied ? "scale-100" : "scale-0"
                    }`}
            />
        </Button>
    );
}

// Helper function to get display name from URL
function getDisplayName(url: string): string {
    try {
        // Remove protocol and www.
        const hostname = new URL(url).hostname.replace('www.', '');
        // Extract domain name without TLD
        const domain = hostname.split('.')[0];
        // Return capitalized domain name
        return domain.charAt(0).toUpperCase() + domain.slice(1);
    } catch {
        return url;
    }
}

const customCommandMap = {
    default: "default"
};

// Categorized website data
const websiteCategories: WebsiteCategory[] = [
    {
        name: 'Frontend Development',
        color: 'bg-blue-500',
        websites: [
            'https://magicui.design/docs/components/marquee',
            'https://codepen.io/',
        ]
    },
    {
        name: 'Design Inspiration',
        color: 'bg-purple-500',
        websites: [
            'https://www.awwwards.com/',
            'https://www.behance.net/'
        ]
    },
];

// Default export for blog content component
export default function UsefulWebsites() {
    return (
        <Layout title={metadata.title} description='A collection of useful development and design resources.'>
            <article className="mx-auto max-w-5xl px-4 py-8">
                <div className="space-y-16 mb-8">
                    {websiteCategories.map((category) => (
                        <motion.section
                            key={category.name}
                            className="space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`h-5 w-5 rounded-full ${category.color}`}></div>
                                <h2 className="text-2xl font-bold">{category.name}</h2>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                {category.websites.map((url) => (
                                    <div
                                        key={url}
                                        className="group flex items-center justify-between p-5 gap-4
                                                rounded-lg border border-border/40 bg-card/30 
                                                hover:bg-card/80 hover:border-border/60 transition-all duration-200
                                                hover:shadow-sm"
                                    >
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-lg font-medium truncate mb-1">{getDisplayName(url)}</p>
                                            <p className="text-sm text-muted-foreground truncate">{url}</p>
                                        </div>
                                        <div className="flex items-center gap-3 ml-2">
                                            <WebsiteCopyButton url={url} />
                                            <a 
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="h-8 w-8 rounded-md border border-border/60 bg-background hover:bg-muted inline-flex items-center justify-center"
                                                aria-label="Open website"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                <span className="sr-only">Open website</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </article>
        </Layout>
    );
} 