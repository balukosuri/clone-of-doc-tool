import { db } from '@docbolt/database';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PagesList } from '@/components/pages/pages-list';
import { Plus } from 'lucide-react';
import { getDefaultUser } from '@/lib/default-user';

export default async function PagesPage({ params }: { params: { id: string } }) {
  const user = getDefaultUser();

  const project = await db.project.findFirst({
    where: {
      id: params.id,
      members: {
        some: {
          userId: user.id,
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

  const pages = await db.page.findMany({
    where: {
      projectId: params.id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      version: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  const member = await db.projectMember.findFirst({
    where: {
      projectId: params.id,
      userId: user.id,
    },
  });

  const canEdit = member && ['OWNER', 'EDITOR'].includes(member.role);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/dashboard/projects/${params.id}`}
            className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block"
          >
            ← Back to Project
          </Link>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-muted-foreground mt-1">
            Manage your documentation pages
          </p>
        </div>
        {canEdit && (
          <Link href={`/dashboard/projects/${params.id}/pages/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Page
            </Button>
          </Link>
        )}
      </div>

      {/* Pages List */}
      {pages.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No pages yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first documentation page to get started
          </p>
          {canEdit && (
            <Link href={`/dashboard/projects/${params.id}/pages/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create First Page
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <PagesList pages={pages} projectId={params.id} canEdit={canEdit} />
      )}
    </div>
  );
}
