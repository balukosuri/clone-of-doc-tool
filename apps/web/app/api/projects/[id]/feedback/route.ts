import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageId = searchParams.get('pageId');

    const feedback = await db.feedback.findMany({
      where: {
        projectId: params.id,
        ...(pageId && { pageId }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
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
    const { pageId, type, comment, rating, userAgent } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Feedback type is required' },
        { status: 400 }
      );
    }

    const feedback = await db.feedback.create({
      data: {
        projectId: params.id,
        pageId,
        type,
        comment: comment || null,
        rating: rating || null,
        userAgent: userAgent || null,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json(
      { error: 'Failed to create feedback' },
      { status: 500 }
    );
  }
}
