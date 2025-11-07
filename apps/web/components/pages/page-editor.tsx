'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Loader2, Save, Eye } from 'lucide-react';
import { MarkdownEditor } from '@/components/editor/markdown-editor';

interface Version {
  id: string;
  name: string;
  slug: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  versionId: string;
}

export function PageEditor({
  projectId,
  versions,
  defaultVersionId,
  initialPage,
}: {
  projectId: string;
  versions: Version[];
  defaultVersionId?: string;
  initialPage?: Page;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPage?.title || '');
  const [slug, setSlug] = useState(initialPage?.slug || '');
  const [content, setContent] = useState(initialPage?.content || '');
  const [versionId, setVersionId] = useState(initialPage?.versionId || defaultVersionId || '');
  const [status, setStatus] = useState(initialPage?.status || 'DRAFT');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!initialPage && title && !slug) {
      setSlug(title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'));
    }
  }, [title, slug, initialPage]);

  const handleSave = async (newStatus?: string) => {
    setIsLoading(true);
    setIsSaving(true);
    setError('');

    try {
      const saveStatus = newStatus || status;
      const url = initialPage
        ? `/api/projects/${projectId}/pages/${initialPage.id}`
        : `/api/projects/${projectId}/pages`;

      const method = initialPage ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          content,
          versionId,
          status: saveStatus,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save page');
      }

      const savedPage = await response.json();

      if (!initialPage) {
        // Navigate to edit page after creating
        router.push(`/dashboard/projects/${projectId}/pages/${savedPage.id}/edit`);
      } else {
        router.refresh();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSaving(false), 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <Card className="p-6">
        <div className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                placeholder="Getting Started"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                placeholder="getting-started"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="version">Version *</Label>
              <Select value={versionId} onValueChange={setVersionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      {version.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/projects/${projectId}/pages`)}
            >
              Cancel
            </Button>

            <div className="flex items-center space-x-2">
              {initialPage && (
                <Button
                  variant="outline"
                  onClick={() => window.open(`/docs/${projectId}/${slug}`, '_blank')}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              )}

              <Button onClick={() => handleSave('DRAFT')} disabled={isLoading || !title || !slug || !versionId}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </>
                )}
              </Button>

              <Button
                onClick={() => handleSave('PUBLISHED')}
                disabled={isLoading || !title || !slug || !versionId}
                variant="default"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  'Publish'
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Editor */}
      <MarkdownEditor
        value={content}
        onChange={setContent}
        placeholder="Write your documentation here in Markdown..."
      />
    </div>
  );
}
