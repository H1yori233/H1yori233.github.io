
const fs = require('fs');
const path = require('path');

const projectList = [
    {
        title: "LLM from Scratch",
        description: "Stanford CS336 work",
        slug: "llm-from-scratch",
        externalUrl: "https://github.com/H1yori233/CS336",
        image: "/images/projects/llm-from-scratch.png",
        featured: true
    },
    {
        title: "Lajolla",
        description: "UCSD CSE 272 renderer",
        slug: "lajolla",
        image: "/images/projects/lajolla.png",
        featured: false
    },
    {
        title: "Vulkan Grass Rendering",
        description: "Real-time grass rendering system implemented with Vulkan",
        slug: "vulkan-grass",
        externalUrl: "https://github.com/H1yori233/CIS-5650-Project5-Vulkan-Grass-Rendering",
        image: "https://raw.githubusercontent.com/H1yori233/CIS-5650-Project5-Vulkan-Grass-Rendering/main/img/grass_rendering.gif",
        featured: true
    },
    {
        title: "WebGPU Forward+ & Clustered Deferred Rendering",
        description: "Implementation of Forward+ and Clustered Deferred rendering techniques using WebGPU",
        slug: "webgpu-rendering",
        externalUrl: "https://github.com/H1yori233/WebGPU-Forward-Plus-and-Clustered-Deferred",
        image: "https://raw.githubusercontent.com/H1yori233/WebGPU-Forward-Plus-and-Clustered-Deferred/main/img/demo.gif",
        featured: true
    },
    {
        title: "CUDA Path Tracer",
        description: "A real-time interactive path tracer implemented with CUDA",
        slug: "cuda-path-tracer",
        externalUrl: "https://github.com/H1yori233/Gart",
        image: "/images/projects/cuda-path-tracer.png",
        featured: true
    },
    {
        title: "InnoWeaver",
        description: "AI-powered innovation platform that bridges HCI research and practical design using LLMs and paper database",
        slug: "innoweaver",
        image: "/images/projects/innoweaver.png",
        featured: true
    },
    {
        title: "Pastor",
        description: "Unity-based indoor escape simulation game with social force model",
        slug: "pastor",
        externalUrl: "https://www.behance.net/gallery/209969337/Pastor",
        image: "/images/projects/pastor.png",
        featured: false
    },
    {
        title: "KidTalk",
        description: "A digital human-assisted app designed to help children in two-child families with learning and personal growth",
        slug: "kidtalk",
        externalUrl: "https://www.behance.net/gallery/213724567/KidTalk",
        image: "/images/projects/kidtalk.png",
        featured: false
    },
    {
        title: "POP UP MID",
        description: "An interactive, low-cost music pop-up book that uses Kirigami structures to provide rich tactile feedback.",
        slug: "popup-mid",
        externalUrl: "https://www.behance.net/gallery/209971075/POP-UP-MID",
        image: "/images/projects/popup-mid.png",
        featured: false
    },
    {
        title: "Dice Throne",
        description: "A digital version of the classical board game Dice Throne, developed with Unity",
        slug: "dice-throne",
        externalUrl: "https://www.behance.net/gallery/209969955/Dice-Throne-Digital-Edition",
        image: "/images/projects/dice-throne.png",
        featured: false
    },
    {
        title: "The Silver Key",
        description: "A Cthulhu-themed roguelike card game with all art assets generated using AIGC tech",
        slug: "the-silver-key",
        externalUrl: "https://www.behance.net/gallery/209983629/The-Silver-Key",
        image: "/images/projects/the-silver-key.png",
        featured: false
    }
];

const PROJECTS_DIR = path.join(process.cwd(), 'public/fs/home/kaichin/projects');

if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
}

projectList.forEach(project => {
    // Simple frontmatter generation
    const frontmatter = `---
title: "${project.title}"
description: "${project.description.replace(/"/g, '\\"')}"
slug: "${project.slug}"
image: "${project.image}"
externalUrl: "${project.externalUrl || ''}"
featured: ${project.featured || false}
---`;

    const content = `${frontmatter}
`;

    fs.writeFileSync(path.join(PROJECTS_DIR, `${project.slug}.md`), content);
    console.log(`Created ${project.slug}.md with frontmatter`);
});
