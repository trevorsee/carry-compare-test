import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const plan = await prisma.plan.findUnique({
      where: {
        slug: params.slug,
        isActive: true,
      },
      include: {
        provider: true,
        sources: {
          orderBy: {
            capturedAt: 'desc',
          },
        },
        changeLogs: {
          orderBy: {
            changedAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plan' },
      { status: 500 }
    );
  }
}
