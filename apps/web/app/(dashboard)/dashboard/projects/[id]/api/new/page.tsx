'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileCode } from 'lucide-react';

export default function NewApiSpecPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    version: '',
    spec: '',
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    try {
      const json = JSON.parse(text);
      setFormData({
        title: json.info?.title || file.name.replace(/\.json$/, ''),
        version: json.info?.version || '1.0.0',
        spec: JSON.stringify(json, null, 2),
      });
    } catch (error) {
      alert('Invalid JSON file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/projects/${params.id}/api-specs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create API spec');
      }

      router.push(`/dashboard/projects/${params.id}/api`);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create API spec');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-8">
      <h1 className="text-3xl font-bold mb-8">Add API Specification</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload OpenAPI/Swagger Spec</CardTitle>
            <CardDescription>
              Upload a JSON file or paste your OpenAPI 3.0 or Swagger 2.0 specification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="file">Upload JSON File</Label>
              <Input
                id="file"
                type="file"
                accept=".json,.yaml,.yml"
                onChange={handleFileUpload}
                className="mt-2"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or enter manually
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="My API"
                required
              />
            </div>

            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="1.0.0"
              />
            </div>

            <div>
              <Label htmlFor="spec">OpenAPI Specification (JSON)</Label>
              <Textarea
                id="spec"
                value={formData.spec}
                onChange={(e) => setFormData({ ...formData, spec: e.target.value })}
                placeholder='{\n  "openapi": "3.0.0",\n  "info": {\n    "title": "My API",\n    "version": "1.0.0"\n  },\n  ...\n}'
                className="font-mono text-sm min-h-[300px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create API Spec'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
