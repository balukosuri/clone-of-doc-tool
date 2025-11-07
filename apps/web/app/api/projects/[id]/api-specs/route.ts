import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/database';
import { getDefaultUser } from '@/lib/default-user';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const specs = await db.apiSpec.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(specs);
  } catch (error) {
    console.error('Error fetching API specs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API specs' },
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
    const body = await request.json();
    const { title, version, spec, type = 'OPENAPI' } = body;

    if (!title || !spec) {
      return NextResponse.json(
        { error: 'Title and spec are required' },
        { status: 400 }
      );
    }

    // Validate spec is valid JSON
    let parsedSpec;
    try {
      parsedSpec = typeof spec === 'string' ? JSON.parse(spec) : spec;
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid OpenAPI specification JSON' },
        { status: 400 }
      );
    }

    const apiSpec = await db.apiSpec.create({
      data: {
        projectId: params.id,
        title,
        version: version || parsedSpec.info?.version || '1.0.0',
        spec: parsedSpec,
        type,
      },
    });

    return NextResponse.json(apiSpec, { status: 201 });
  } catch (error) {
    console.error('Error creating API spec:', error);
    return NextResponse.json(
      { error: 'Failed to create API spec' },
      { status: 500 }
    );
  }
}
