import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import dynamic from 'next/dynamic';
import { ContentWrapper } from '@/components/ContentWrapper';

// 获取所有博客路径
export async function generateStaticParams() {
  const blogDirectory = path.join(process.cwd(), 'content/blog');
  
  // 确保目录存在
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(blogDirectory);
  
  // 过滤出tsx文件并创建路径
  return filenames
    .filter(filename => filename.endsWith('.tsx'))
    .map(filename => ({
      slug: filename.replace(/\.tsx$/, ''),
    }));
}

// 动态导入内容组件
const BlogContent = ({ slug }: { slug: string }) => {
  const BlogComponent = dynamic(
    () => import(`@/content/blog/${slug}`).catch(() => {
      // 找不到组件时，返回404
      notFound();
    }),
    {
      loading: () => <div className="text-center py-10">Loading blog content...</div>,
      ssr: true, // 服务器端渲染
    }
  );

  return (
    <ContentWrapper type="blog" slug={slug}>
      <BlogComponent />
    </ContentWrapper>
  );
};

// 博客文章页面
export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // 验证博客文件是否存在
  const blogFilePath = path.join(process.cwd(), `content/blog/${slug}.tsx`);
  if (!fs.existsSync(blogFilePath)) {
    notFound();
  }
  
  return <BlogContent slug={slug} />;
} 