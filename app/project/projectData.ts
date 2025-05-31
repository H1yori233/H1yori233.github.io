import { Project } from '@/components/projects'

// 项目数据配置
export const projectList: Project[] = [
  {
    title: "Lajolla",
    description: "UCSD CSE 272 renderer",
    slug: "lajolla",
    image: "/images/projects/lajolla.png",
    featured: true
  },
  {
    title: "Vulkan Grass Rendering",
    description: "Upenn CIS5650 Project5 - Real-time grass rendering system implemented with Vulkan",
    slug: "vulkan-grass",
    externalUrl: "https://github.com/H1yori233/CIS-5650-Project5-Vulkan-Grass-Rendering",
    image: "/images/projects/vulkan-grass.png",
    featured: false
  },
  {
    title: "WebGPU Forward+ & Clustered Deferred Rendering",
    description: "Upenn CIS5650 Project4 - Implementation of Forward+ and Clustered Deferred rendering techniques using WebGPU",
    slug: "webgpu-rendering",
    externalUrl: "https://github.com/H1yori233/FLUX",
    image: "/images/projects/webgpu-rendering.png",
    featured: true
  },
  {
    title: "Interactive CUDA Path Tracer",
    description: "Upenn CIS5650 Project3 - A real-time interactive path tracer implemented with CUDA",
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