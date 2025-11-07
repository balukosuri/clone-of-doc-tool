import { db } from '@workspace/database';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Sparkles, Bug, Zap, AlertCircle } from 'lucide-react';

const typeIcons = {
  FEATURE: <Sparkles className="h-4 w-4" />,
  BUGFIX: <Bug className="h-4 w-4" />,
  IMPROVEMENT: <Zap className="h-4 w-4" />,
  BREAKING: <AlertCircle className="h-4 w-4" />,
};

const typeColors = {
  FEATURE: 'default',
  BUGFIX: 'destructive',
  IMPROVEMENT: 'secondary',
  BREAKING: 'outline',
} as const;

export default async function ChangelogPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await db.project.findUnique({
    where: { id: params.id },
    include: {
      changelogs: {
        orderBy: {
          publishedAt: 'desc',
        },
      },
    },
  });

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Changelog</h1>
          <p className="text-muted-foreground">
            Track updates and changes for {project.name}
          </p>
        </div>
        <Link href={`/dashboard/projects/${params.id}/changelog/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </div>

      {project.changelogs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No changelog entries yet</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
              Keep your users informed about new features, bug fixes, and improvements
            </p>
            <Link href={`/dashboard/projects/${params.id}/changelog/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create First Entry
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {project.changelogs.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{entry.title}</CardTitle>
                      <Badge variant={typeColors[entry.type]}>
                        {typeIcons[entry.type]}
                        <span className="ml-1">{entry.type}</span>
                      </Badge>
                    </div>
                    <CardDescription>
                      {entry.version && <span>Version {entry.version} • </span>}
                      {new Date(entry.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
