import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 获取查询参数
  const url = new URL(request.url);
  const width = parseInt(url.searchParams.get('width') || '800', 10);
  const height = parseInt(url.searchParams.get('height') || '600', 10);
  
  // 创建SVG占位符
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0" />
      <rect x="5%" y="5%" width="90%" height="90%" rx="10" fill="#e0e0e0" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" fill="#a0a0a0">
        ${width} × ${height}
      </text>
    </svg>
  `;
  
  // 返回SVG响应
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
} 