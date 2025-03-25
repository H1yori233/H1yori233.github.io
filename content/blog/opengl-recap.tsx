"use client";

import React from 'react';
import { Layout } from '@/components/layout';
import { CollapsibleCodeBlock } from '@/components/magicui/collapsible-code-block';

// Export blog metadata
export const metadata = {
  title: 'OpenGL Recap',
  date: '2025-03-25',
  tags: ['OpenGL', 'C++', 'Graphics'],
  description: 'A basic recap of OpenGL',
};

// Default export for blog content component
export default function OpenGLRecap() {
  const openglCode = `#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <iostream>

// Vertex shader source code
const char* vertexShaderSource = "#version 330 core\\n"
"layout (location = 0) in vec3 aPos;\\n"
"void main()\\n"
"{\\n"
"   gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\\n"
"}\\0";

// Fragment shader source code
const char* fragmentShaderSource = "#version 330 core\\n"
"out vec4 FragColor;\\n"
"void main()\\n"
"{\\n"
"   FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);\\n"
"}\\0";

int main()
{
    // Initialize GLFW
    if (!glfwInit())
    {
        std::cerr << "Failed to initialize GLFW" << std::endl;
        return -1;
    }

    // Configure GLFW
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    // Create window
    GLFWwindow* window = glfwCreateWindow(800, 600, "OpenGL Triangle", NULL, NULL);
    if (!window)
    {
        std::cerr << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return -1;
    }
    glfwMakeContextCurrent(window);

    // Initialize GLAD
    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
    {
        std::cerr << "Failed to initialize GLAD" << std::endl;
        return -1;
    }

    // Set viewport
    glViewport(0, 0, 800, 600);

    // Create and compile shaders
    // Vertex shader
    unsigned int vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);
    glCompileShader(vertexShader);

    // Fragment shader
    unsigned int fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL);
    glCompileShader(fragmentShader);

    // Shader program
    unsigned int shaderProgram = glCreateProgram();
    glAttachShader(shaderProgram, vertexShader);
    glAttachShader(shaderProgram, fragmentShader);
    glLinkProgram(shaderProgram);

    // Cleanup
    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);

    // Set vertex data
    float vertices[] = {
        -0.5f, -0.5f, 0.0f, // bottom left
         0.5f, -0.5f, 0.0f, // bottom right
         0.0f,  0.5f, 0.0f  // top center
    };

    // Create vertex buffer object and vertex array object
    unsigned int VBO, VAO;
    glGenVertexArrays(1, &VAO);
    glGenBuffers(1, &VBO);
    
    // Bind VAO
    glBindVertexArray(VAO);

    // Bind and fill VBO
    glBindBuffer(GL_ARRAY_BUFFER, VBO);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

    // Set vertex attribute pointers
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
    glEnableVertexAttribArray(0);

    // Unbind
    glBindBuffer(GL_ARRAY_BUFFER, 0);
    glBindVertexArray(0);

    // Render loop
    while (!glfwWindowShouldClose(window))
    {
        // Clear color buffer
        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        // Draw triangle
        glUseProgram(shaderProgram);
        glBindVertexArray(VAO);
        glDrawArrays(GL_TRIANGLES, 0, 3);

        // Swap buffers and poll events
        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    // Cleanup resources
    glDeleteVertexArrays(1, &VAO);
    glDeleteBuffers(1, &VBO);
    glDeleteProgram(shaderProgram);

    // Terminate GLFW
    glfwTerminate();
    return 0;
}`;

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <article className="mx-auto px-4 py-8 max-w-4xl">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Basic Triangle Example</h2>
          <p className="mb-4">This is a sample code demonstrating how to draw a basic triangle using OpenGL. It includes the complete process of initialization, shader setup, buffer management, and rendering loop.</p>
          
          <div className="rounded-xl p-2 bg-gradient-to-b from-gray-900 to-black shadow-lg">
            <CollapsibleCodeBlock 
              code={openglCode} 
              language="cpp" 
              title="OpenGL Basic Triangle Example"
              defaultCollapsed={true}
              className="border-gray-700 bg-transparent"
              darkTheme="one-dark-pro"
              lightTheme="one-dark-pro"
            />
          </div>
        </section>
      </article>
    </Layout>
  );
} 