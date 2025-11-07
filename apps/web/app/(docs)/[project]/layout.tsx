import { db } from '@docbolt/database';
import { notFound } from 'next/navigation';
import { DocsNav } from '@/components/docs/docs-nav';
import { DocsHeader } from '@/components/docs/docs-header';
import { buildNavigation } from '@/lib/docs/navigation';

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { project: string };
}) {
  const project = await db.project.findUnique({
    where: { slug: params.project },
    include: {
      versions: {
        where: {
          isPublished: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const defaultVersion = project.versions.find((v) => v.isDefault) || project.versions[0];

  if (!defaultVersion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No published versions</h1>
          <p className="text-muted-foreground">
            This documentation project doesn't have any published versions yet.
          </p>
        </div>
      </div>
    );
  }

  const navigation = await buildNavigation(project.id, defaultVersion.id);

  return (
    <div className="min-h-screen flex flex-col" style={{
      '--primary': project.primaryColor,
      '--secondary': project.secondaryColor,
      '--accent': project.accentColor,
    } as React.CSSProperties}>
      <DocsHeader project={project} versions={project.versions} defaultVersion={defaultVersion} />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <DocsNav navigation={navigation} projectSlug={params.project} />
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
