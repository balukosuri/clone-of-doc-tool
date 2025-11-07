import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/database';
import { getDefaultUser } from '@/lib/default-user';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; specId: string } }
) {
  try {
    const spec = await db.apiSpec.findUnique({
      where: {
        id: params.specId,
        projectId: params.id,
      },
    });

    if (!spec) {
      return NextResponse.json({ error: 'API spec not found' }, { status: 404 });
    }

    return NextResponse.json(spec);
  } catch (error) {
    console.error('Error fetching API spec:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API spec' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; specId: string } }
) {
  try {
    const body = await request.json();
    const { title, version, spec } = body;

    let parsedSpec = spec;
    if (spec && typeof spec === 'string') {
      try {
        parsedSpec = JSON.parse(spec);
      } catch (e) {
        return NextResponse.json(
          { error: 'Invalid OpenAPI specification JSON' },
          { status: 400 }
        );
      }
    }

    const updated = await db.apiSpec.update({
      where: {
        id: params.specId,
      },
      data: {
        ...(title && { title }),
        ...(version && { version }),
        ...(parsedSpec && { spec: parsedSpec }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating API spec:', error);
    return NextResponse.json(
      { error: 'Failed to update API spec' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; specId: string } }
) {
  try {
    await db.apiSpec.delete({
      where: {
        id: params.specId,
      },
    });

    return NextResponse.json({ message: 'API spec deleted successfully' });
  } catch (error) {
    console.error('Error deleting API spec:', error);
    return NextResponse.json(
      { error: 'Failed to delete API spec' },
      { status: 500 }
    );
  }
}
