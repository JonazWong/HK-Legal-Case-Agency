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

    const firmId = session.user.firmId;

    const [totalCases, activeCases, totalClients, pendingInvoices] = await Promise.all([
      prisma.case.count({ where: { firmId } }),
      prisma.case.count({ where: { firmId, status: 'ACTIVE' } }),
      prisma.client.count({ where: { firmId } }),
      prisma.invoice.count({ 
        where: { 
          firmId,
          status: { in: ['DRAFT', 'SENT'] }
        } 
      }),
    ]);

    return NextResponse.json({
      totalCases,
      activeCases,
      totalClients,
      pendingInvoices,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
