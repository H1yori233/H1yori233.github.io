import { Project } from '@/components/projects'

export const projectList: Project[] = [
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
    title: "Interactive CUDA Path Tracer",
    description: "A real-time interactive path tracer implemented with CUDA",
    slug: "cuda-path-tracer",
    externalUrl: "https://github.com/H1yori233/Gart",
    image: "/images/projects/cuda-path-tracer.png",
    featured: true
  },
  {
    title: "InnoWeaver",
    description: "An LLM-powered innovation tool featuring an intelligent paper database for human-computer interaction research, designed to generate innovative design solutions and bridge the gap between academic research and industrial applications",
    slug: "innoweaver",
    image: "/images/projects/innoweaver.png",
    featured: true
  },
  {
    title: "Pastor",
    description: "A serious game for indoor escape simulation developed in Unity, based on the social force model. Features pathfinding with NavMesh, a map editor for level design, and rich visual effects.",
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
    externalUrl: "/pdfs/the-silver-key.pdf",
    image: "/images/projects/the-silver-key.png",
    featured: false
  }
]; 