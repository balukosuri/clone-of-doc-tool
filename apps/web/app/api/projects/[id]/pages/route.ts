import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@docbolt/database';

// GET /api/projects/:id/pages - List all pages for a project
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to this project
    const member = await db.projectMember.findFirst({
      where: {
        projectId: params.id,
        userId: session.user.id,
      },
    });

    if (!member) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const pages = await db.page.findMany({
      where: {
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
        version: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

// POST /api/projects/:id/pages - Create a new page
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to edit
    const member = await db.projectMember.findFirst({
      where: {
        projectId: params.id,
        userId: session.user.id,
        role: { in: ['OWNER', 'EDITOR'] },
      },
    });

    if (!member) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { title, slug, content, versionId, parentId, status } = body;

    if (!title || !versionId) {
      return NextResponse.json(
        { error: 'Title and version are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists in this version
    if (slug) {
      const existing = await db.page.findFirst({
        where: {
          projectId: params.id,
          versionId,
          slug,
        },
      });

      if (existing) {
        return NextResponse.json(
          { error: 'A page with this slug already exists in this version' },
          { status: 400 }
        );
      }
    }

    const page = await db.page.create({
      data: {
        projectId: params.id,
        versionId,
        title,
        slug: slug || title.toLowerCase().replace(/[^\w]+/g, '-'),
        content: content || '',
        authorId: session.user.id,
        parentId: parentId || null,
        status: status || 'DRAFT',
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        version: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}
