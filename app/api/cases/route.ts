import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { caseSchema } from '@/lib/validations';

// GET /api/cases - List all cases with pagination and filtering
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    const where: any = { firmId: session.user.firmId };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { caseNumber: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { courtReference: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [cases, total] = await Promise.all([
      prisma.case.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          assignedLawyer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.case.count({ where }),
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
    console.error('Cases list error:', error);
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}

// POST /api/cases - Create a new case
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = caseSchema.parse(body);

    // Generate case number in format HCA-YYYY-NNN
    const year = new Date().getFullYear();
    const lastCase = await prisma.case.findFirst({
      where: {
        firmId: session.user.firmId,
        caseNumber: {
          startsWith: `HCA-${year}-`,
        },
      },
      orderBy: { caseNumber: 'desc' },
    });

    let nextNumber = 1;
    if (lastCase) {
      const match = lastCase.caseNumber.match(/HCA-\d{4}-(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    const caseNumber = `HCA-${year}-${nextNumber.toString().padStart(3, '0')}`;

    // Convert decimal strings to Decimal type
    const caseData: any = {
      caseNumber,
      title: validatedData.title,
      description: validatedData.description,
      category: validatedData.category,
      status: validatedData.status,
      courtReference: validatedData.courtReference,
      notes: validatedData.notes,
      firmId: session.user.firmId,
      clientId: validatedData.clientId,
      assignedLawyerId: validatedData.assignedLawyerId,
    };

    if (validatedData.filingDate) {
      caseData.filingDate = new Date(validatedData.filingDate);
    }

    if (validatedData.closingDate) {
      caseData.closingDate = new Date(validatedData.closingDate);
    }

    if (validatedData.estimatedBudget) {
      caseData.estimatedBudget = parseFloat(validatedData.estimatedBudget);
    }

    if (validatedData.actualCost) {
      caseData.actualCost = parseFloat(validatedData.actualCost);
    }

    const newCase = await prisma.case.create({
      data: caseData,
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        assignedLawyer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(newCase, { status: 201 });
  } catch (error: any) {
    console.error('Case creation error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }
}
