import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/database';
import { getDefaultUser } from '@/lib/default-user';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const changelogs = await db.changelog.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return NextResponse.json(changelogs);
  } catch (error) {
    console.error('Error fetching changelogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch changelogs' },
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
    const { title, content, version, type = 'FEATURE', publishedAt } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const changelog = await db.changelog.create({
      data: {
        projectId: params.id,
        title,
        content,
        version,
        type,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });

    return NextResponse.json(changelog, { status: 201 });
  } catch (error) {
    console.error('Error creating changelog:', error);
    return NextResponse.json(
      { error: 'Failed to create changelog' },
      { status: 500 }
    );
  }
}
