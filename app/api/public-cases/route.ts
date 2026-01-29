import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || undefined;
    const source = searchParams.get('source') || undefined;
    const category = searchParams.get('category') || undefined;
    const court = searchParams.get('court') || undefined;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { content: { contains: query, mode: 'insensitive' } },
                { caseNumber: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {},
        source ? { source } : {},
        category ? { category } : {},
        court ? { court } : {},
        startDate ? { hearingDate: { gte: new Date(startDate) } } : {},
        endDate ? { hearingDate: { lte: new Date(endDate) } } : {},
      ],
    };

    const [cases, total] = await Promise.all([
      prisma.publicCase.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.publicCase.count({ where }),
    ]);

    return NextResponse.json({
      cases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Public cases list error:', error);
    return NextResponse.json({ error: 'Failed to fetch public cases' }, { status: 500 });
  }
}
