import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@docbolt/database';
import { slugify } from '@/lib/utils';

// GET /api/projects - List all projects for the current user
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await db.project.findMany({
      where: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        members: {
          where: { userId: session.user.id },
          select: { role: true },
        },
        _count: {
          select: {
            pages: true,
            versions: true,
            members: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    // Check if slug already exists
    const existing = await db.project.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A project with this name already exists' },
        { status: 400 }
      );
    }

    // Create project with default version and owner membership
    const project = await db.project.create({
      data: {
        name,
        slug,
        description: description || null,
        members: {
          create: {
            userId: session.user.id,
            role: 'OWNER',
          },
        },
        versions: {
          create: {
            name: 'v1.0',
            slug: 'v1',
            isDefault: true,
            isPublished: true,
          },
        },
      },
      include: {
        members: true,
        versions: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
