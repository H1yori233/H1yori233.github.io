"use client";

import React from 'react';
import { Layout } from '@/components/layout';
import { CollapsibleCodeBlock } from '@/components/magicui/collapsible-code-block';

// Export blog metadata
export const metadata = {
  title: 'OpenGL Recap',
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

          <div className="mt-4 flex justify-center">
            <figure className="flex flex-col items-center">
              <img
                src="https://pica.zhimg.com/v2-10b0501e08f34ea61123e57c3ffa318c_1440w.jpg"
                alt="OpenGL Pipeline"
                className="rounded-lg border border-gray-700 shadow-lg max-w-full h-auto"
              />
              <figcaption className="text-sm text-gray-400 mt-2">
                OpenGL Pipeline
                <span className="ml-2">-</span>
                <a
                  href="https://zhuanlan.zhihu.com/p/56693625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  [1]
                </a>
              </figcaption>
            </figure>
          </div>

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

        <section className="mb-8">
          <div className="mt-4 flex justify-center">
            <figure className="flex flex-col items-center">
              <img
                src="https://geekdaxue.co/uploads/projects/Learn-OpenGL-CN/docs/img/01/04/vertex_array_objects.png"
                alt="VAO and VBO"
                className="rounded-lg border border-gray-700 shadow-lg max-w-full h-auto"
              />
              <figcaption className="text-sm text-gray-400 mt-2">
                VAO and VBO
              </figcaption>
            </figure>
          </div>

          <div className="mt-4 flex justify-center">
            <figure className="flex flex-col items-center">
              <img
                src="https://i-blog.csdnimg.cn/blog_migrate/41466bf5b446d6698d56ba995b3b574f.png"
                alt="VAO and VBO"
                className="rounded-lg border border-gray-700 shadow-lg max-w-full h-auto"
              />
              <figcaption className="text-sm text-gray-400 mt-2">
                VAO and VBO
                <span className="ml-2">-</span>
                <a
                  href="https://blog.csdn.net/danjuan123/article/details/79420585"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  [2]
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Reference</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-gray-400 mr-1">[1]</span>
              <a
                href="https://zhuanlan.zhihu.com/p/56693625"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                20分钟让你了解OpenGL——OpenGL全流程详细解读
              </a>
            </li>
          </ul>
        </section>
      </article>
    </Layout>
  );
} 