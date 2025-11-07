import { NextResponse } from 'next/server';
import { db } from '@docbolt/database';
import { getDefaultUser } from '@/lib/default-user';

// GET /api/projects/:id/pages/:pageId
export async function GET(
  request: Request,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    const user = getDefaultUser();

    const page = await db.page.findFirst({
      where: {
        id: params.pageId,
        projectId: params.id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        version: true,
        children: true,
      },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/:id/pages/:pageId
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    const user = getDefaultUser();

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
    const { title, slug, content, status, parentId, order } = body;

    const page = await db.page.update({
      where: {
        id: params.pageId,
      },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content !== undefined && { content }),
        ...(status && { status }),
        ...(parentId !== undefined && { parentId }),
        ...(order !== undefined && { order }),
        ...(status === 'PUBLISHED' && !page.publishedAt && { publishedAt: new Date() }),
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        version: true,
      },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/:id/pages/:pageId
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    const user = getDefaultUser();

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

    await db.page.delete({
      where: {
        id: params.pageId,
      },
    });

    return NextResponse.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
