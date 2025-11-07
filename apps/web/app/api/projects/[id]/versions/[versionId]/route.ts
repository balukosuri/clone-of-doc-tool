import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/database';
import slugify from 'slugify';
import { getDefaultUser } from '@/lib/default-user';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; versionId: string } }
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

    const version = await db.version.findUnique({
      where: {
        id: params.versionId,
        projectId: params.id,
      },
      include: {
        _count: {
          select: {
            pages: true,
          },
        },
      },
    });

    if (!version) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    }

    return NextResponse.json(version);
  } catch (error) {
    console.error('Error fetching version:', error);
    return NextResponse.json(
      { error: 'Failed to fetch version' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; versionId: string } }
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

    // Check if version exists
    const existingVersion = await db.version.findUnique({
      where: {
        id: params.versionId,
        projectId: params.id,
      },
    });

    if (!existingVersion) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    }

    // If slug is being changed, check if new slug already exists
    if (slug && slug !== existingVersion.slug) {
      const slugExists = await db.version.findFirst({
        where: {
          projectId: params.id,
          slug,
          NOT: {
            id: params.versionId,
          },
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Version with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // If this is being set as default, unset all other defaults
    if (isDefault && !existingVersion.isDefault) {
      await db.version.updateMany({
        where: {
          projectId: params.id,
          NOT: {
            id: params.versionId,
          },
        },
        data: {
          isDefault: false,
        },
      });
    }

    const version = await db.version.update({
      where: {
        id: params.versionId,
      },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(typeof isDefault === 'boolean' && { isDefault }),
        ...(typeof isStable === 'boolean' && { isStable }),
        ...(typeof isDeprecated === 'boolean' && { isDeprecated }),
      },
      include: {
        _count: {
          select: {
            pages: true,
          },
        },
      },
    });

    return NextResponse.json(version);
  } catch (error) {
    console.error('Error updating version:', error);
    return NextResponse.json(
      { error: 'Failed to update version' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; versionId: string } }
) {
  try {
    const user = getDefaultUser();

    // Check if user has owner role
    const projectMember = await db.projectMember.findFirst({
      where: {
        projectId: params.id,
        userId: user.id,
        role: 'OWNER',
      },
    });

    if (!projectMember) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check if version exists
    const version = await db.version.findUnique({
      where: {
        id: params.versionId,
        projectId: params.id,
      },
      include: {
        _count: {
          select: {
            pages: true,
          },
        },
      },
    });

    if (!version) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    }

    // Prevent deleting the default version if there are other versions
    if (version.isDefault) {
      const versionCount = await db.version.count({
        where: {
          projectId: params.id,
        },
      });

      if (versionCount > 1) {
        return NextResponse.json(
          { error: 'Cannot delete the default version. Please set another version as default first.' },
          { status: 400 }
        );
      }
    }

    // Delete the version (pages will be cascade deleted based on schema)
    await db.version.delete({
      where: {
        id: params.versionId,
      },
    });

    return NextResponse.json({ message: 'Version deleted successfully' });
  } catch (error) {
    console.error('Error deleting version:', error);
    return NextResponse.json(
      { error: 'Failed to delete version' },
      { status: 500 }
    );
  }
}
