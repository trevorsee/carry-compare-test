import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { FilterState, SortOption } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sort = (searchParams.get('sort') || 'score-high-low') as SortOption;
    const paymentStyle = searchParams.get('paymentStyle')?.split(',');
    const attorneyChoice = searchParams.get('attorneyChoice')?.split(',');
    const coverageType = searchParams.get('coverageType')?.split(',');
    const familyCoverage = searchParams.get('familyCoverage')?.split(',');
    const priceMin = searchParams.get('priceMin') ? parseFloat(searchParams.get('priceMin')!) : undefined;
    const priceMax = searchParams.get('priceMax') ? parseFloat(searchParams.get('priceMax')!) : undefined;

    const where: any = {
      isActive: true,
      provider: {
        isActive: true,
      },
    };

    if (paymentStyle && paymentStyle.length > 0) {
      where.paymentStyle = { in: paymentStyle };
    }
    if (attorneyChoice && attorneyChoice.length > 0) {
      where.attorneyChoice = { in: attorneyChoice };
    }
    if (coverageType && coverageType.length > 0) {
      where.coverageType = { in: coverageType };
    }
    if (familyCoverage && familyCoverage.length > 0) {
      where.familyCoverage = { in: familyCoverage };
    }
    if (priceMin !== undefined || priceMax !== undefined) {
      where.OR = [
        ...(priceMin !== undefined || priceMax !== undefined ? [{
          priceMonthly: {
            ...(priceMin !== undefined ? { gte: priceMin } : {}),
            ...(priceMax !== undefined ? { lte: priceMax } : {}),
          },
        }] : []),
        ...(priceMin !== undefined || priceMax !== undefined ? [{
          priceAnnual: {
            ...(priceMin !== undefined ? { gte: priceMin / 12 } : {}),
            ...(priceMax !== undefined ? { lte: priceMax / 12 } : {}),
          },
        }] : []),
      ];
    }

    const orderBy: any = {};
    switch (sort) {
      case 'price-low-high':
        orderBy.priceMonthly = 'asc';
        break;
      case 'price-high-low':
        orderBy.priceMonthly = 'desc';
        break;
      case 'score-high-low':
        orderBy.overallScore = 'desc';
        break;
      case 'name-asc':
        orderBy.name = 'asc';
        break;
      case 'name-desc':
        orderBy.name = 'desc';
        break;
      default:
        orderBy.overallScore = 'desc';
    }

    const plans = await prisma.plan.findMany({
      where,
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
          },
        },
        _count: {
          select: {
            sources: true,
          },
        },
      },
      orderBy,
    });

    return NextResponse.json({ plans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}
