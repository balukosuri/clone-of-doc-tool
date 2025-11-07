'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Page {
  id: string;
  title: string;
  slug: string;
}

export function PageNavigation({
  previousPage,
  nextPage,
  projectSlug,
}: {
  previousPage: Page | null;
  nextPage: Page | null;
  projectSlug: string;
}) {
  if (!previousPage && !nextPage) return null;

  return (
    <div className="mt-12 pt-8 border-t grid grid-cols-2 gap-4">
      {previousPage ? (
        <Link href={`/${projectSlug}/${previousPage.slug}`}>
          <Button variant="outline" className="w-full justify-start">
            <ChevronLeft className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="font-medium">{previousPage.title}</div>
            </div>
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {nextPage && (
        <Link href={`/${projectSlug}/${nextPage.slug}`}>
          <Button variant="outline" className="w-full justify-end">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="font-medium">{nextPage.title}</div>
            </div>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}
