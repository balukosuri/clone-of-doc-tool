'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileText, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: string;
  updatedAt: Date;
  author: {
    name: string | null;
    email: string | null;
  };
  version: {
    name: string;
    slug: string;
  };
}

export function PagesList({
  pages,
  projectId,
  canEdit,
}: {
  pages: Page[];
  projectId: string;
  canEdit: boolean;
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) {
      return;
    }

    setDeletingId(pageId);
    try {
      const response = await fetch(`/api/projects/${projectId}/pages/${pageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete page');
      }
    } catch (error) {
      alert('Failed to delete page');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {pages.map((page) => (
        <Card key={page.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">{page.title}</h3>
                    <Badge variant={page.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                      {page.status}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>/{page.slug}</span>
                    <span>•</span>
                    <span>{page.version.name}</span>
                    <span>•</span>
                    <span>By {page.author.name || 'Unknown'}</span>
                    <span>•</span>
                    <span>Updated {formatDate(new Date(page.updatedAt))}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link href={`/docs/${projectId}/${page.slug}`} target="_blank">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </Link>

                {canEdit && (
                  <>
                    <Link href={`/dashboard/projects/${projectId}/pages/${page.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/projects/${projectId}/pages/${page.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(page.id)}
                          disabled={deletingId === page.id}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
