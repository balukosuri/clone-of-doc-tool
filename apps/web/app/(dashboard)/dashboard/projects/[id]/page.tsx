import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@docbolt/database';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, GitBranch, Users, Settings } from 'lucide-react';

export default async function ProjectPage({ params }: { params: { id: string } }) {
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
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      versions: true,
      _count: {
        select: {
          pages: true,
          changelogs: true,
        },
      },
    },
  });

  if (!project) {
    redirect('/dashboard/projects');
  }

  const userMember = project.members.find((m) => m.user.id === session.user.id);
  const role = userMember?.role || 'VIEWER';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/projects"
            className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          {project.description && (
            <p className="text-muted-foreground mt-1">{project.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Link href={`/dashboard/projects/${project.id}/settings`}>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project._count.pages}</div>
            <p className="text-xs text-muted-foreground">
              Across all versions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Versions</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.versions.length}</div>
            <p className="text-xs text-muted-foreground">
              Published and draft
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.members.length}</div>
            <p className="text-xs text-muted-foreground">
              Active collaborators
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href={`/dashboard/projects/${project.id}/pages`}>
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle className="text-lg">Pages</CardTitle>
              <CardDescription>
                Create and manage documentation pages
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/dashboard/projects/${project.id}/versions`}>
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <GitBranch className="h-8 w-8 mb-2 text-primary" />
              <CardTitle className="text-lg">Versions</CardTitle>
              <CardDescription>
                Manage documentation versions
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/dashboard/projects/${project.id}/team`}>
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-primary" />
              <CardTitle className="text-lg">Team</CardTitle>
              <CardDescription>
                Manage team members and permissions
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/dashboard/projects/${project.id}/settings`}>
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <Settings className="h-8 w-8 mb-2 text-primary" />
              <CardTitle className="text-lg">Settings</CardTitle>
              <CardDescription>
                Configure project settings
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Quick steps to set up your documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium">Create your first page</p>
              <p className="text-sm text-muted-foreground">
                Start documenting your product or API
              </p>
            </div>
            <Link href={`/dashboard/projects/${project.id}/pages/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Page
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              2
            </div>
            <div className="flex-1">
              <p className="font-medium">Customize your theme</p>
              <p className="text-sm text-muted-foreground">
                Match your brand colors and style
              </p>
            </div>
            <Link href={`/dashboard/projects/${project.id}/settings`}>
              <Button variant="outline">Customize</Button>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              3
            </div>
            <div className="flex-1">
              <p className="font-medium">Publish your documentation</p>
              <p className="text-sm text-muted-foreground">
                Make your docs available to users
              </p>
            </div>
            <Link href={`/docs/${project.slug}`} target="_blank">
              <Button variant="outline">View Docs</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
