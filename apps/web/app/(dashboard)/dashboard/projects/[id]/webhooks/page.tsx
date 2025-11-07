import { db } from '@workspace/database';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Webhook, Check, X } from 'lucide-react';

export default async function WebhooksPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await db.project.findUnique({
    where: { id: params.id },
    include: {
      webhooks: {
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
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Webhooks</h1>
          <p className="text-muted-foreground">
            Configure webhooks to receive notifications about events in {project.name}
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Webhook
        </Button>
      </div>

      {project.webhooks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Webhook className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No webhooks configured</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
              Set up webhooks to get notified when pages are published, updated, or deleted
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Webhook
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {project.webhooks.map((webhook) => (
            <Card key={webhook.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg font-mono">{webhook.url}</CardTitle>
                      {webhook.isActive ? (
                        <Badge variant="default" className="gap-1">
                          <Check className="h-3 w-3" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <X className="h-3 w-3" />
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      Listens to: {webhook.events.join(', ')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Created {new Date(webhook.createdAt).toLocaleDateString()}
                  {webhook.lastTriggeredAt && (
                    <> • Last triggered {new Date(webhook.lastTriggeredAt).toLocaleDateString()}</>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Available Events</CardTitle>
          <CardDescription>Events you can subscribe to</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium text-sm mb-1">page.created</div>
              <div className="text-xs text-muted-foreground">When a new page is created</div>
            </div>
            <div>
              <div className="font-medium text-sm mb-1">page.updated</div>
              <div className="text-xs text-muted-foreground">When a page is updated</div>
            </div>
            <div>
              <div className="font-medium text-sm mb-1">page.deleted</div>
              <div className="text-xs text-muted-foreground">When a page is deleted</div>
            </div>
            <div>
              <div className="font-medium text-sm mb-1">page.published</div>
              <div className="text-xs text-muted-foreground">When a page is published</div>
            </div>
            <div>
              <div className="font-medium text-sm mb-1">version.created</div>
              <div className="text-xs text-muted-foreground">When a new version is created</div>
            </div>
            <div>
              <div className="font-medium text-sm mb-1">api_spec.uploaded</div>
              <div className="text-xs text-muted-foreground">When an API spec is uploaded</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
