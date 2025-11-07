import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {
      projectId: params.id,
    };

    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = new Date(startDate);
      if (endDate) where.timestamp.lte = new Date(endDate);
    }

    const analytics = await db.analytics.findMany({
      where,
      orderBy: {
        timestamp: 'desc',
      },
      take: 1000,
    });

    // Aggregate data
    const pageViews = analytics.filter((a) => a.event === 'page_view').length;
    const searches = analytics.filter((a) => a.event === 'search').length;
    const uniqueVisitors = new Set(analytics.map((a) => a.visitorId)).size;

    // Group by date
    const viewsByDate: Record<string, number> = {};
    analytics.filter((a) => a.event === 'page_view').forEach((a) => {
      const date = a.timestamp.toISOString().split('T')[0];
      viewsByDate[date] = (viewsByDate[date] || 0) + 1;
    });

    // Top pages
    const pageViewCounts: Record<string, number> = {};
    analytics.filter((a) => a.event === 'page_view').forEach((a) => {
      const path = a.metadata?.path || 'unknown';
      pageViewCounts[path] = (pageViewCounts[path] || 0) + 1;
    });

    const topPages = Object.entries(pageViewCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, views]) => ({ path, views }));

    return NextResponse.json({
      summary: {
        pageViews,
        searches,
        uniqueVisitors,
      },
      viewsByDate: Object.entries(viewsByDate).map(([date, views]) => ({
        date,
        views,
      })),
      topPages,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { event, pageId, visitorId, metadata } = body;

    const analytics = await db.analytics.create({
      data: {
        projectId: params.id,
        pageId,
        event,
        visitorId,
        metadata: metadata || {},
        timestamp: new Date(),
      },
    });

    return NextResponse.json(analytics, { status: 201 });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json(
      { error: 'Failed to track analytics' },
      { status: 500 }
    );
  }
}
