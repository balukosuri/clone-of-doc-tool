import { db } from '@docbolt/database';
import Link from 'next/link';
import { PageEditor } from '@/components/pages/page-editor';
import { getDefaultUser } from '@/lib/default-user';

export default async function NewPagePage({ params }: { params: { id: string } }) {
  const user = getDefaultUser();

  const project = await db.project.findFirst({
    where: {
      id: params.id,
      members: {
        some: {
          userId: user.id,
          role: { in: ['OWNER', 'EDITOR'] },
        },
      },
    },
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
    redirect('/dashboard/projects');
  }

  const defaultVersion = project.versions.find((v) => v.isDefault) || project.versions[0];

  return (
    <div className="space-y-4">
      <Link
        href={`/dashboard/projects/${params.id}/pages`}
        className="text-sm text-muted-foreground hover:text-foreground inline-block"
      >
        ← Back to Pages
      </Link>

      <div>
        <h1 className="text-3xl font-bold">Create New Page</h1>
        <p className="text-muted-foreground mt-1">
          Write documentation in Markdown with live preview
        </p>
      </div>

      <PageEditor
        projectId={params.id}
        versions={project.versions}
        defaultVersionId={defaultVersion?.id}
      />
    </div>
  );
}
