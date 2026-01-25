import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { caseSchema } from '@/lib/validations';

// GET /api/cases/[id] - Get a single case
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const caseData = await prisma.case.findUnique({
      where: { id: params.id },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        assignedLawyer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        timeEntries: {
          select: {
            id: true,
            date: true,
            hours: true,
            description: true,
            totalAmount: true,
          },
          orderBy: { date: 'desc' },
          take: 5,
        },
        documents: {
          select: {
            id: true,
            title: true,
            fileName: true,
            documentType: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // Check if case belongs to user's firm
    if (caseData.firmId !== session.user.firmId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(caseData);
  } catch (error) {
    console.error('Case fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch case' }, { status: 500 });
  }
}

// PUT /api/cases/[id] - Update a case
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if case exists and belongs to user's firm
    const existingCase = await prisma.case.findUnique({
      where: { id: params.id },
    });

    if (!existingCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    if (existingCase.firmId !== session.user.firmId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = caseSchema.parse(body);

    const updateData: any = {
      title: validatedData.title,
      description: validatedData.description,
      category: validatedData.category,
      status: validatedData.status,
      courtReference: validatedData.courtReference,
      notes: validatedData.notes,
      clientId: validatedData.clientId,
      assignedLawyerId: validatedData.assignedLawyerId,
    };

    if (validatedData.filingDate) {
      updateData.filingDate = new Date(validatedData.filingDate);
    }

    if (validatedData.closingDate) {
      updateData.closingDate = new Date(validatedData.closingDate);
    }

    if (validatedData.estimatedBudget) {
      updateData.estimatedBudget = parseFloat(validatedData.estimatedBudget);
    }

    if (validatedData.actualCost) {
      updateData.actualCost = parseFloat(validatedData.actualCost);
    }

    const updatedCase = await prisma.case.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json(updatedCase);
  } catch (error: any) {
    console.error('Case update error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 });
  }
}

// DELETE /api/cases/[id] - Delete a case
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if case exists and belongs to user's firm
    const existingCase = await prisma.case.findUnique({
      where: { id: params.id },
    });

    if (!existingCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    if (existingCase.firmId !== session.user.firmId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.case.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Case deleted successfully' });
  } catch (error) {
    console.error('Case deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete case' }, { status: 500 });
  }
}
