import { db } from '@docbolt/database';
import { notFound } from 'next/navigation';
import { markdownToHtml } from '@/lib/markdown';
import { DocsContent } from '@/components/docs/docs-content';
import { TableOfContents } from '@/components/docs/table-of-contents';
import { PageNavigation } from '@/components/docs/page-navigation';
import { FeedbackWidget } from '@/components/docs/feedback-widget';

export default async function DocPage({
  params,
}: {
  params: { project: string; slug: string[] };
}) {
  const project = await db.project.findUnique({
    where: { slug: params.project },
    include: {
      versions: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const defaultVersion = project.versions.find((v) => v.isDefault) || project.versions[0];
  const pageSlug = params.slug[params.slug.length - 1];

  const page = await db.page.findFirst({
    where: {
      projectId: project.id,
      versionId: defaultVersion.id,
      slug: pageSlug,
      status: 'PUBLISHED',
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!page) {
    notFound();
  }

  const htmlContent = await markdownToHtml(page.content);

  // Get previous and next pages
  const allPages = await db.page.findMany({
    where: {
      projectId: project.id,
      versionId: defaultVersion.id,
      status: 'PUBLISHED',
      isHidden: false,
    },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'asc' },
    ],
  });

  const currentIndex = allPages.findIndex((p) => p.id === page.id);
  const previousPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">
      <div className="min-w-0">
        <DocsContent
          title={page.title}
          content={htmlContent}
          updatedAt={page.updatedAt}
          author={page.author}
        />

        <FeedbackWidget projectId={project.id} pageId={page.id} />

        <PageNavigation
          previousPage={previousPage}
          nextPage={nextPage}
          projectSlug={params.project}
        />
      </div>

      <aside className="hidden lg:block">
        <TableOfContents content={page.content} />
      </aside>
    </div>
  );
}
