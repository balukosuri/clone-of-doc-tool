import { db } from '@docbolt/database';
import { notFound, redirect } from 'next/navigation';

export default async function ProjectDocsHome({ params }: { params: { project: string } }) {
  const project = await db.project.findUnique({
    where: { slug: params.project },
    include: {
      versions: {
        where: {
          isPublished: true,
        },
      },
      landingPage: true,
    },
  });

  if (!project) {
    notFound();
  }

  const defaultVersion = project.versions.find((v) => v.isDefault) || project.versions[0];

  if (!defaultVersion) {
    return (
      <div className="prose dark:prose-invert">
        <h1>Welcome to {project.name}</h1>
        <p>Documentation is coming soon.</p>
      </div>
    );
  }

  // Find first published page
  const firstPage = await db.page.findFirst({
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

  if (firstPage) {
    redirect(`/${params.project}/${firstPage.slug}`);
  }

  // Show landing page or default welcome
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>{project.name}</h1>
      {project.description && <p className="lead">{project.description}</p>}
      <p>Welcome to the documentation. Use the sidebar to navigate.</p>
    </div>
  );
}
