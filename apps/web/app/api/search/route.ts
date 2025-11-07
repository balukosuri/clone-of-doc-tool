import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/database';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');
  const projectId = searchParams.get('projectId');

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Search pages
    const pages = await db.page.findMany({
      where: {
        ...(projectId && { projectId }),
        status: 'PUBLISHED',
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: {
        project: {
          select: {
            name: true,
            slug: true,
          },
        },
        version: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      take: 20,
    });

    const results = pages.map((page) => ({
      id: page.id,
      title: page.title,
      content: page.content.substring(0, 200) + '...',
      url: `/${page.project.slug}/${page.slug}`,
      project: page.project.name,
      version: page.version.name,
      type: 'page',
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
