import Image from 'next/image';

interface ViewCounterProps {
  pageId: string;
  label?: string;
  type?: 'total' | 'daily' | 'unique';
  leftColor?: string;
  rightColor?: string;
  style?: 'upper' | 'lower' | 'none';
  className?: string;
}

export function ViewCounter({
  pageId,
  label = 'Views',
  type = 'total',
  leftColor = '000',
  rightColor = '00F',
  style = 'none',
  className = '',
}: ViewCounterProps) {
  // Encode pageId for URL
  const encodedPageId = encodeURIComponent(pageId);
  
  // Build URL
  const url = `https://views-counter.vercel.app/badge?pageId=${encodedPageId}&label=${label}&type=${type}&leftColor=${leftColor}&rightColor=${rightColor}&style=${style}`;
  
  return (
    <div className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 hover:scale-105 ${className}`}>
      <div className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <Image 
          src={url}
          alt={`${label} counter`}
          width={120}
          height={30}
          unoptimized={true}
          className="rounded-md"
        />
      </div>
    </div>
  );
} 