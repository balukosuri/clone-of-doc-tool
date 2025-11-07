import { db } from '@workspace/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Crown, Edit, Eye } from 'lucide-react';

const roleIcons = {
  OWNER: <Crown className="h-3 w-3" />,
  EDITOR: <Edit className="h-3 w-3" />,
  VIEWER: <Eye className="h-3 w-3" />,
};

const roleColors = {
  OWNER: 'default',
  EDITOR: 'secondary',
  VIEWER: 'outline',
} as const;

export default async function TeamPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await db.project.findUnique({
    where: { id: params.id },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: [
          { role: 'asc' },
          { createdAt: 'asc' },
        ],
      },
    },
  });

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Team</h1>
        <p className="text-muted-foreground">
          Manage team members and permissions for {project.name}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members ({project.members.length})</CardTitle>
          <CardDescription>
            People who have access to this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.user.image || undefined} />
                    <AvatarFallback>
                      {member.user.name?.[0]?.toUpperCase() ||
                       member.user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.user.name || member.user.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.user.email}
                    </div>
                  </div>
                </div>
                <Badge variant={roleColors[member.role]} className="gap-1">
                  {roleIcons[member.role]}
                  {member.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>What each role can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="default" className="mt-1">
                <Crown className="h-3 w-3 mr-1" />
                OWNER
              </Badge>
              <div className="text-sm text-muted-foreground">
                Full access to all features, including project deletion and team management
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">
                <Edit className="h-3 w-3 mr-1" />
                EDITOR
              </Badge>
              <div className="text-sm text-muted-foreground">
                Can create and edit pages, manage versions, and upload API specs
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">
                <Eye className="h-3 w-3 mr-1" />
                VIEWER
              </Badge>
              <div className="text-sm text-muted-foreground">
                Read-only access to the project and documentation
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
