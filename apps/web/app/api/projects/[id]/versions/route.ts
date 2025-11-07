import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/database';
import slugify from 'slugify';
import { getDefaultUser } from '@/lib/default-user';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getDefaultUser();

    // Check if user has access to this project
    const projectMember = await db.projectMember.findFirst({
      where: {
        projectId: params.id,
        userId: user.id,
      },
    });

    if (!projectMember) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const versions = await db.version.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' },
      ],
      include: {
        _count: {
          select: {
            pages: true,
          },
        },
      },
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.error('Error fetching versions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getDefaultUser();

    // Check if user has owner or editor role
    const projectMember = await db.projectMember.findFirst({
      where: {
        projectId: params.id,
        userId: user.id,
        role: {
          in: ['OWNER', 'EDITOR'],
        },
      },
    });

    if (!projectMember) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, slug, isDefault, isStable, isDeprecated } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Version name is required' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const versionSlug = slug || slugify(name, { lower: true, strict: true });

    // Check if slug already exists for this project
    const existingVersion = await db.version.findFirst({
      where: {
        projectId: params.id,
        slug: versionSlug,
      },
    });

    if (existingVersion) {
      return NextResponse.json(
        { error: 'Version with this slug already exists' },
        { status: 409 }
      );
    }

    // If this is set as default, unset all other defaults
    if (isDefault) {
      await db.version.updateMany({
        where: {
          projectId: params.id,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const version = await db.version.create({
      data: {
        projectId: params.id,
        name,
        slug: versionSlug,
        isDefault: isDefault || false,
        isStable: isStable || false,
        isDeprecated: isDeprecated || false,
      },
      include: {
        _count: {
          select: {
            pages: true,
          },
        },
      },
    });

    return NextResponse.json(version, { status: 201 });
  } catch (error) {
    console.error('Error creating version:', error);
    return NextResponse.json(
      { error: 'Failed to create version' },
      { status: 500 }
    );
  }
}
