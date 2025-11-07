import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@docbolt/database';
import Link from 'next/link';
import { PageEditor } from '@/components/pages/page-editor';

export default async function EditPagePage({
  params,
}: {
  params: { id: string; pageId: string };
}) {
  const session = await auth();
  if (!session) {
    redirect('/auth/signin');
  }

  const project = await db.project.findFirst({
    where: {
      id: params.id,
      members: {
        some: {
          userId: session.user.id,
          role: { in: ['OWNER', 'EDITOR'] },
        },
      },
    },
    include: {
      versions: true,
    },
  });

  if (!project) {
    redirect('/dashboard/projects');
  }

  const page = await db.page.findFirst({
    where: {
      id: params.pageId,
      projectId: params.id,
    },
  });

  if (!page) {
    redirect(`/dashboard/projects/${params.id}/pages`);
  }

  return (
    <div className="space-y-4">
      <Link
        href={`/dashboard/projects/${params.id}/pages`}
        className="text-sm text-muted-foreground hover:text-foreground inline-block"
      >
        ← Back to Pages
      </Link>

      <div>
        <h1 className="text-3xl font-bold">Edit Page</h1>
        <p className="text-muted-foreground mt-1">
          Update your documentation content
        </p>
      </div>

      <PageEditor
        projectId={params.id}
        versions={project.versions}
        defaultVersionId={page.versionId}
        initialPage={page}
      />
    </div>
  );
}
