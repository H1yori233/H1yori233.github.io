"use client";

import React from 'react';
import { Layout } from '@/components/layout';
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";

// Export blog metadata
export const metadata = {
  title: 'Useful Shell Commands',
  tags: ['Shell', 'Command Line', 'Windows', 'Linux', 'macOS'],
  description: 'A collection of useful shell commands for different operating systems',
};

export default function UsefulShellCommands() {
  // Commands to completely delete a directory
  const deleteDirectoryCommands = {
    "PowerShell": "Remove-Item -Path 'path/to/folder' -Recurse -Force",
    "CMD": "rmdir /s /q path\\to\\folder",
    "Bash": "rm -rf /path/to/folder",
    "macOS": "rm -rf /path/to/folder",
  };

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <article className="mx-auto px-4 py-8 max-w-4xl">
        <section className="mb-8">
          <div className="space-y-8">
            <div className="rounded-lg border p-6 bg-card/50">
              <h3 className="text-xl font-semibold mb-4">Delete Directory Commands</h3>
              <p className="mb-4 text-muted-foreground">
                Select your preferred shell to copy the appropriate command:
              </p>
              <ScriptCopyBtn
                showMultiplePackageOptions={true}
                codeLanguage="shell"
                lightTheme="nord"
                darkTheme="vitesse-dark"
                commandMap={deleteDirectoryCommands}
                className='max-w-3xl'
              />
            </div>
          </div>
        </section>

      </article>
    </Layout>
  );
} 