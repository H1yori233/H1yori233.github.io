import { Project } from '@/components/projects'

// 项目数据配置
export const projectList: Project[] = [
  {
    title: "InnoWeaver",
    description: "A full-stack web application research project at International Design Institute of Zhejiang University, featuring user management, document data management, and LLM-powered content generation",
    slug: "innoweaver",
    image: "/images/projects/innoweaver.png"
  },
  {
    title: "Lajolla",
    description: "UCSD CSE 272 renderer",
    slug: "lajolla",
    image: "/images/projects/lajolla.png"
  },
  {
    title: "Interactive CUDA Path Tracer",
    description: "CIS5650 Project3 - A real-time interactive path tracer implemented with CUDA",
    slug: "cuda-path-tracer",
    externalUrl: "https://github.com/H1yori233/Gart",
    image: "/images/projects/cuda-path-tracer.png"
  },
  {
    title: "WebGPU Forward+ & Clustered Deferred Rendering",
    description: "CIS5650 Project4 - Implementation of Forward+ and Clustered Deferred rendering techniques using WebGPU",
    slug: "webgpu-rendering",
    externalUrl: "https://github.com/H1yori233/FLUX",
    image: "/images/projects/webgpu-rendering.png"
  },
  {
    title: "Vulkan Grass Rendering",
    description: "CIS5650 Project5 - Real-time grass rendering system implemented with Vulkan",
    slug: "vulkan-grass",
    externalUrl: "https://github.com/H1yori233/CIS-5650-Project5-Vulkan-Grass-Rendering",
    image: "/images/projects/vulkan-grass.png"
  },
  {
    title: "Dice Throne",
    description: "A digital version of the classical board game Dice Throne, developed with Unity",
    slug: "dice-throne",
    image: "/images/projects/dice-throne.png"
  }
]; 