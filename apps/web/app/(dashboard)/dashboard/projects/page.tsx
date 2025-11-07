import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@docbolt/database';
import { ProjectsList } from '@/components/dashboard/projects-list';
import { CreateProjectDialog } from '@/components/dashboard/create-project-dialog';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function ProjectsPage() {
  const session = await auth();
  if (!session) {
    redirect('/auth/signin');
  }

  const projects = await db.project.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      members: {
        where: { userId: session.user.id },
        select: { role: true },
      },
      _count: {
        select: {
          pages: true,
          versions: true,
          members: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your documentation projects
          </p>
        </div>
        <CreateProjectDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </CreateProjectDialog>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-6">
            Get started by creating your first documentation project
          </p>
          <CreateProjectDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Project
            </Button>
          </CreateProjectDialog>
        </div>
      ) : (
        <ProjectsList projects={projects} />
      )}
    </div>
  );
}
