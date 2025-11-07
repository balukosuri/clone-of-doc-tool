import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@workspace/database';
import { CreateVersionDialog } from '@/components/versions/create-version-dialog';
import { VersionsList } from '@/components/versions/versions-list';

export default async function VersionsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Check if user has access to this project
  const projectMember = await db.projectMember.findFirst({
    where: {
      projectId: params.id,
      userId: session.user.id,
    },
    include: {
      project: true,
    },
  });

  if (!projectMember) {
    redirect('/dashboard/projects');
  }

  const versions = await db.version.findMany({
    where: {
      projectId: params.id,
    },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    include: {
      _count: {
        select: {
          pages: true,
        },
      },
    },
  });

  return (
    <div className="container max-w-5xl py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Versions</h1>
          <p className="text-muted-foreground">
            Manage different versions of your documentation for{' '}
            {projectMember.project.name}
          </p>
        </div>
        <CreateVersionDialog projectId={params.id} />
      </div>

      <VersionsList
        versions={versions.map((v) => ({
          ...v,
          createdAt: v.createdAt.toISOString(),
        }))}
        projectId={params.id}
      />
    </div>
  );
}
