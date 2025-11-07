'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavigationItem {
  id: string;
  title: string;
  slug: string;
  order: number;
  children: NavigationItem[];
}

export function DocsNav({
  navigation,
  projectSlug,
}: {
  navigation: NavigationItem[];
  projectSlug: string;
}) {
  return (
    <aside className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto">
      <nav className="space-y-1">
        {navigation.map((item) => (
          <NavItem key={item.id} item={item} projectSlug={projectSlug} />
        ))}
      </nav>
    </aside>
  );
}

function NavItem({
  item,
  projectSlug,
  level = 0,
}: {
  item: NavigationItem;
  projectSlug: string;
  level?: number;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const isActive = pathname === `/${projectSlug}/${item.slug}`;
  const hasChildren = item.children.length > 0;

  return (
    <div>
      <div className="flex items-center">
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-accent rounded"
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'transform rotate-90'
              )}
            />
          </button>
        )}

        <Link
          href={`/${projectSlug}/${item.slug}`}
          className={cn(
            'flex-1 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors',
            isActive && 'bg-accent font-medium text-accent-foreground',
            !hasChildren && 'ml-5'
          )}
          style={{ paddingLeft: `${level * 1 + 0.75}rem` }}
        >
          {item.title}
        </Link>
      </div>

      {hasChildren && isOpen && (
        <div className="ml-2">
          {item.children.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              projectSlug={projectSlug}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
