'use client';

import { formatDate } from '@/lib/utils';

export function DocsContent({
  title,
  content,
  updatedAt,
  author,
}: {
  title: string;
  content: string;
  updatedAt: Date;
  author: {
    name: string | null;
    image: string | null;
  };
}) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{title}</h1>

      <div dangerouslySetInnerHTML={{ __html: content }} />

      <div className="mt-12 pt-6 border-t not-prose">
        <div className="text-sm text-muted-foreground">
          Last updated on {formatDate(updatedAt)}
          {author.name && ` by ${author.name}`}
        </div>
      </div>
    </article>
  );
}
