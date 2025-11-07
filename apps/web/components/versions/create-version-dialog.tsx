'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function CreateVersionDialog({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    isDefault: false,
    isStable: false,
    isDeprecated: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/projects/${projectId}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create version');
      }

      setOpen(false);
      setFormData({
        name: '',
        slug: '',
        isDefault: false,
        isStable: false,
        isDeprecated: false,
      });
      router.refresh();
    } catch (error) {
      console.error('Error creating version:', error);
      alert(error instanceof Error ? error.message : 'Failed to create version');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Version
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Version</DialogTitle>
            <DialogDescription>
              Add a new version to your project. You can create versions for
              different releases of your API or documentation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Version Name</Label>
              <Input
                id="name"
                placeholder="e.g., v2.0, 1.0.0, Latest"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">
                URL Slug{' '}
                <span className="text-xs text-muted-foreground">
                  (optional - auto-generated if empty)
                </span>
              </Label>
              <Input
                id="slug"
                placeholder="e.g., v2, 1-0-0"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
              />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isDefault">Default Version</Label>
                  <p className="text-xs text-muted-foreground">
                    Show this version by default to visitors
                  </p>
                </div>
                <Switch
                  id="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDefault: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isStable">Stable</Label>
                  <p className="text-xs text-muted-foreground">
                    Mark this version as stable/production-ready
                  </p>
                </div>
                <Switch
                  id="isStable"
                  checked={formData.isStable}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isStable: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isDeprecated">Deprecated</Label>
                  <p className="text-xs text-muted-foreground">
                    Mark this version as deprecated
                  </p>
                </div>
                <Switch
                  id="isDeprecated"
                  checked={formData.isDeprecated}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDeprecated: checked })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Version'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
