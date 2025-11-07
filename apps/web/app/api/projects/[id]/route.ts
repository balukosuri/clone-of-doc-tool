import { NextResponse } from 'next/server';
import { db } from '@docbolt/database';
import { getDefaultUser } from '@/lib/default-user';

// GET /api/projects/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getDefaultUser();

    const project = await db.project.findFirst({
      where: {
        id: params.id,
        members: {
          some: {
            userId: user.id,
          },
        },
      },
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
        },
        versions: true,
        _count: {
          select: {
            pages: true,
            changelogs: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/:id
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getDefaultUser();

    // Check if user has access
    const member = await db.projectMember.findFirst({
      where: {
        projectId: params.id,
        userId: user.id,
        role: { in: ['OWNER', 'EDITOR'] },
      },
    });

    if (!member) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, logo, primaryColor, secondaryColor, darkMode } = body;

    const project = await db.project.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(logo !== undefined && { logo }),
        ...(primaryColor && { primaryColor }),
        ...(secondaryColor && { secondaryColor }),
        ...(darkMode !== undefined && { darkMode }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getDefaultUser();

    // Check if user is owner
    const member = await db.projectMember.findFirst({
      where: {
        projectId: params.id,
        userId: user.id,
        role: 'OWNER',
      },
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Only project owners can delete projects' },
        { status: 403 }
      );
    }

    await db.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
