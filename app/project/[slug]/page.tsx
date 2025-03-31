import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import dynamic from 'next/dynamic';
import { ContentWrapper } from '@/components/ContentWrapper';

// 获取所有项目路径
export async function generateStaticParams() {
  const projectDirectory = path.join(process.cwd(), 'content/project');
  
  // 确保目录存在
  if (!fs.existsSync(projectDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(projectDirectory);
  
  // 过滤出tsx文件并创建路径
  return filenames
    .filter(filename => filename.endsWith('.tsx'))
    .map(filename => ({
      slug: filename.replace(/\.tsx$/, ''),
    }));
}

// 动态导入内容组件
const ProjectContent = ({ slug }: { slug: string }) => {
  const ProjectComponent = dynamic(
    () => import(`@/content/project/${slug}`).catch(() => {
      // 找不到组件时，返回404
      notFound();
    }),
    {
      loading: () => <div className="text-center py-10">Loading project content...</div>,
      ssr: true, // 服务器端渲染
    }
  );

  return (
    <ContentWrapper type="project" slug={slug}>
      <ProjectComponent />
    </ContentWrapper>
  );
};

// 项目详情页面
export default function ProjectPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // 验证项目文件是否存在
  const projectFilePath = path.join(process.cwd(), `content/project/${slug}.tsx`);
  if (!fs.existsSync(projectFilePath)) {
    notFound();
  }
  
  return <ProjectContent slug={slug} />;
} 