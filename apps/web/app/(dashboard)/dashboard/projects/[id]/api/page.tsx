import { db } from '@workspace/database';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileCode, Upload } from 'lucide-react';

export default async function ApiSpecsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await db.project.findUnique({
    where: { id: params.id },
    include: {
      apiSpecs: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container max-w-5xl py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href={`/dashboard/projects/${params.id}`}
            className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block"
          >
            ← Back to Project
          </Link>
          <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
          <p className="text-muted-foreground">
            Manage OpenAPI/Swagger specifications for {project.name}
          </p>
        </div>
        <Link href={`/dashboard/projects/${params.id}/api/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add API Spec
          </Button>
        </Link>
      </div>

      {project.apiSpecs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileCode className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No API specifications yet</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
              Upload an OpenAPI/Swagger specification to automatically generate interactive API documentation
            </p>
            <Link href={`/dashboard/projects/${params.id}/api/new`}>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Specification
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {project.apiSpecs.map((spec) => (
            <Link key={spec.id} href={`/dashboard/projects/${params.id}/api/${spec.id}`}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{spec.title}</CardTitle>
                      <CardDescription className="mt-1">
                        Version {spec.version} • {spec.type}
                      </CardDescription>
                    </div>
                    <FileCode className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Created {new Date(spec.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
