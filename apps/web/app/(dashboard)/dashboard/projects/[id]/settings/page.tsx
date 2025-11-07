import { db } from '@workspace/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Palette, Globe, Shield, Trash2 } from 'lucide-react';

export default async function SettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await db.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure settings and branding for {project.name}
        </p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic project information and configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" defaultValue={project.name} />
            </div>
            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input id="slug" defaultValue={project.slug} />
              <p className="text-sm text-muted-foreground mt-1">
                Your docs will be available at: /{project.slug}
              </p>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue={project.description || ''}
                placeholder="A brief description of your project"
              />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Branding & Theming
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                placeholder="https://example.com/logo.png"
                defaultValue={project.logoUrl || ''}
              />
            </div>
            <div>
              <Label htmlFor="favicon">Favicon URL</Label>
              <Input
                id="favicon"
                placeholder="https://example.com/favicon.ico"
                defaultValue={project.faviconUrl || ''}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    defaultValue={project.primaryColor || '#0ea5e9'}
                    className="w-20"
                  />
                  <Input
                    defaultValue={project.primaryColor || '#0ea5e9'}
                    placeholder="#0ea5e9"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="accentColor"
                    type="color"
                    defaultValue={project.accentColor || '#06b6d4'}
                    className="w-20"
                  />
                  <Input
                    defaultValue={project.accentColor || '#06b6d4'}
                    placeholder="#06b6d4"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="customCss">Custom CSS</Label>
              <Textarea
                id="customCss"
                defaultValue={project.customCss || ''}
                placeholder=".custom-class { color: blue; }"
                className="font-mono text-sm"
              />
            </div>
            <Button>Save Branding</Button>
          </CardContent>
        </Card>

        {/* Domain */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Domain</CardTitle>
            <CardDescription>
              Use your own domain for documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="domain">Custom Domain</Label>
              <Input
                id="domain"
                placeholder="docs.example.com"
                defaultValue={project.customDomain || ''}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Point your domain's CNAME record to docs.docbolt.io
              </p>
            </div>
            <Button>Save Domain</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Access
            </CardTitle>
            <CardDescription>
              Control who can access your documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Public Access</div>
                <div className="text-sm text-muted-foreground">
                  Allow anyone to view your documentation
                </div>
              </div>
              <Button variant="outline">Enabled</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Password Protection</div>
                <div className="text-sm text-muted-foreground">
                  Require a password to view docs
                </div>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-destructive rounded-lg">
              <div>
                <div className="font-medium">Delete Project</div>
                <div className="text-sm text-muted-foreground">
                  Permanently delete this project and all its data
                </div>
              </div>
              <Button variant="destructive">Delete Project</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
