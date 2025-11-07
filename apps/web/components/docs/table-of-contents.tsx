'use client';

import { useEffect, useState } from 'react';
import { extractHeadings } from '@/lib/markdown';
import { cn } from '@/lib/utils';

interface Heading {
  level: number;
  text: string;
  id: string;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24">
      <div className="text-sm font-semibold mb-4">On This Page</div>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              'block text-sm hover:text-foreground transition-colors',
              activeId === heading.id
                ? 'text-foreground font-medium'
                : 'text-muted-foreground',
              heading.level === 2 && 'pl-0',
              heading.level === 3 && 'pl-4',
              heading.level === 4 && 'pl-8'
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
