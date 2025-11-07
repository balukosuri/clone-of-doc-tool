'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileText, Users, GitBranch, MoreVertical, Settings, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  updatedAt: Date;
  members: { role: string }[];
  _count: {
    pages: number;
    versions: number;
    members: number;
  };
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      alert('Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const role = project.members[0]?.role || 'VIEWER';

        return (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-2">
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="hover:underline"
                    >
                      {project.name}
                    </Link>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {project.description || 'No description'}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/projects/${project.id}/settings`}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {role === 'OWNER' && (
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <Badge variant="outline">{role}</Badge>
                <span>Updated {formatDate(new Date(project.updatedAt))}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{project._count.pages}</div>
                  <div className="text-xs text-muted-foreground">Pages</div>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{project._count.versions}</div>
                  <div className="text-xs text-muted-foreground">Versions</div>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold">{project._count.members}</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Link href={`/dashboard/projects/${project.id}`}>
                  <Button className="w-full" variant="outline">
                    Open Project
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
