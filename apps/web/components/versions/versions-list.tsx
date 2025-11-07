'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EditVersionDialog } from './edit-version-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Version {
  id: string;
  name: string;
  slug: string;
  isDefault: boolean;
  isStable: boolean;
  isDeprecated: boolean;
  createdAt: string;
  _count: {
    pages: number;
  };
}

export function VersionsList({
  versions,
  projectId,
}: {
  versions: Version[];
  projectId: string;
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (versionId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/projects/${projectId}/versions/${versionId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete version');
      }

      setDeletingId(null);
      router.refresh();
    } catch (error) {
      console.error('Error deleting version:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete version');
    } finally {
      setLoading(false);
    }
  };

  if (versions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No versions yet</p>
        <p className="text-sm text-muted-foreground">
          Create your first version to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {versions.map((version) => (
          <div
            key={version.id}
            className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{version.name}</h3>
                  {version.isDefault && (
                    <Badge variant="default" className="gap-1">
                      <Star className="h-3 w-3" />
                      Default
                    </Badge>
                  )}
                  {version.isStable && (
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Stable
                    </Badge>
                  )}
                  {version.isDeprecated && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Deprecated
                    </Badge>
                  )}
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium">Slug:</span> {version.slug}
                  </p>
                  <p>
                    <span className="font-medium">Pages:</span>{' '}
                    {version._count.pages}
                  </p>
                  <p>
                    <span className="font-medium">Created:</span>{' '}
                    {new Date(version.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <EditVersionDialog projectId={projectId} version={version} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeletingId(version.id)}
                  disabled={version.isDefault && versions.length > 1}
                  title={
                    version.isDefault && versions.length > 1
                      ? 'Cannot delete default version. Set another version as default first.'
                      : 'Delete version'
                  }
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Version</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this version? This will also
              delete all pages associated with this version. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              disabled={loading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
