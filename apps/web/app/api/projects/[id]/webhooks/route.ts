import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/database';
import { getDefaultUser } from '@/lib/default-user';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const webhooks = await db.webhook.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(webhooks);
  } catch (error) {
    console.error('Error fetching webhooks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch webhooks' },
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
    const { url, events, isActive = true, secret } = body;

    if (!url || !events || events.length === 0) {
      return NextResponse.json(
        { error: 'URL and events are required' },
        { status: 400 }
      );
    }

    const webhook = await db.webhook.create({
      data: {
        projectId: params.id,
        url,
        events,
        isActive,
        secret,
      },
    });

    return NextResponse.json(webhook, { status: 201 });
  } catch (error) {
    console.error('Error creating webhook:', error);
    return NextResponse.json(
      { error: 'Failed to create webhook' },
      { status: 500 }
    );
  }
}
