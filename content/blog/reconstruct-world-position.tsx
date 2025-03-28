"use client";

import React from 'react';
import { Layout } from '@/components/layout';
import { CollapsibleCodeBlock } from '@/components/magicui/collapsible-code-block';

// Export blog metadata
export const metadata = {
  title: 'Reconstructing World Position from Depth Texture',
  tags: ['OpenGL', 'GLSL', 'Graphics', 'Depth', 'Reconstruction'],
  description: 'How to accurately reconstruct world-space positions from depth textures in real-time rendering',
};

// Default export for blog content component
export default function ReconstructWorldPosition() {
  const alternativeReconstructionCode = `// Alternative reconstruction approach using inverse MVP matrix
#version 330 core
in vec2 TexCoords;
out vec4 FragColor;

uniform sampler2D depthMap;
uniform mat4 inverseViewProjection; // Precomputed on CPU

vec3 reconstructPositionFast(float depth, vec2 texCoords) {
    // Convert to NDC
    vec4 ndcPos = vec4(texCoords * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
    
    // Transform directly to world space using the inverse view-projection matrix
    vec4 worldPos = inverseViewProjection * ndcPos;
    worldPos /= worldPos.w;
    
    return worldPos.xyz;
}

void main() {
    float depth = texture(depthMap, TexCoords).r;
    
    // Early depth test - don't process if this is the far plane
    if(depth >= 1.0) {
        discard;
    }
    
    vec3 worldPos = reconstructPositionFast(depth, TexCoords);
    
    // Use world position for further calculations
    // For example, calculate distance from a point
    float distFromOrigin = length(worldPos);
    
    // Visualize distance as color
    FragColor = vec4(vec3(distFromOrigin / 50.0), 1.0);
}`;

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <article className="mx-auto px-4 py-8 max-w-4xl">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            Reconstructing world-space positions from depth textures is a fundamental technique in modern rendering pipelines. 
            This process is essential for various post-processing effects, deferred shading, screen-space reflections, 
            and many other advanced rendering techniques.
          </p>
          <p className="mb-4">
            In this article, we'll explore how to accurately convert a pixel's depth value back into its corresponding 
            world-space position using GLSL shaders.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">The Math Behind Position Reconstruction</h2>
          <p className="mb-4">
            When we render a scene, the graphics pipeline transforms vertices from world space to 
            clip space through a series of transformations: world → view → projection → clip. 
            The depth buffer stores the non-linear depth values after perspective division.
          </p>
          <figure className="flex flex-col items-center">
              <img
                src="https://keasigmadelta.com/wp-content/uploads/2025/01/3D-Projection.png.webp"
                alt="MVP Transformation"
                className="rounded-lg border border-gray-700 shadow-lg max-w-full h-auto"
              />
              <figcaption className="text-sm text-gray-400 mt-2">
                Illustration of position reconstruction from depth
                <span className="ml-2">-</span>
                <a
                  href="https://learnopengl.com/Advanced-Lighting/SSAO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Learn OpenGL
                </a>
              </figcaption>
            </figure>

          <p className="mb-4">
            To reconstruct the original position, we need to reverse this process:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Convert the texture coordinates and depth to normalized device coordinates (NDC)</li>
            <li>Create a position vector in clip space</li>
            <li>Transform back to view space using the inverse projection matrix</li>
            <li>Transform to world space using the inverse view matrix</li>
          </ol>

          <div className="mt-6 flex justify-center">
            <figure className="flex flex-col items-center">
              <img
                src="https://learnopengl.com/img/advanced/ssao_reconstruction.png"
                alt="Position Reconstruction from Depth"
                className="rounded-lg border border-gray-700 shadow-lg max-w-full h-auto"
              />
              <figcaption className="text-sm text-gray-400 mt-2">
                Illustration of position reconstruction from depth
                <span className="ml-2">-</span>
                <a
                  href="https://learnopengl.com/Advanced-Lighting/SSAO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Learn OpenGL
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">GLSL Implementation</h2>
          <p className="mb-4">
            Here's a fragment shader implementation that reconstructs world position from a depth texture:
          </p>
          <p className="mt-4 mb-4">
            This approach requires passing the projection and view matrices as uniforms. Alternatively, 
            you can precompute the inverse view-projection matrix on the CPU and pass it directly to the shader:
          </p>

          <div className="rounded-xl p-2 bg-gradient-to-b from-gray-900 to-black shadow-lg">
            <CollapsibleCodeBlock
              code={alternativeReconstructionCode}
              language="glsl"
              title="Optimized World Position Reconstruction"
              defaultCollapsed={true}
              className="border-gray-700 bg-transparent"
              darkTheme="one-dark-pro"
              lightTheme="one-dark-pro"
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">References</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-gray-400 mr-1">[1]</span>
              <a
                href="https://learnopengl.com/Advanced-Lighting/SSAO"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Learn OpenGL: Screen Space Ambient Occlusion
              </a>
            </li>
            <li>
              <span className="text-gray-400 mr-1">[2]</span>
              <a
                href="https://www.khronos.org/opengl/wiki/Compute_eye_space_from_window_space"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Khronos Wiki: Computing Eye Space from Window Space
              </a>
            </li>
            <li>
              <span className="text-gray-400 mr-1">[3]</span>
              <a
                href="https://aras-p.info/blog/2009/07/30/reconstructing-position-from-depth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Aras Pranckevičius: Reconstructing Position From Depth
              </a>
            </li>
          </ul>
        </section>
      </article>
    </Layout>
  );
} 