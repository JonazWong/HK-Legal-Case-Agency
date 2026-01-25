import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { clientSchema } from '@/lib/validations';

// GET /api/clients/[id] - Get a single client with case history
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        cases: {
          select: {
            id: true,
            caseNumber: true,
            title: true,
            category: true,
            status: true,
            filingDate: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { cases: true },
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Check if client belongs to user's firm
    if (client.firmId !== session.user.firmId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error('Client fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 });
  }
}

// PUT /api/clients/[id] - Update a client
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if client exists and belongs to user's firm
    const existingClient = await prisma.client.findUnique({
      where: { id: params.id },
    });

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    if (existingClient.firmId !== session.user.firmId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = clientSchema.parse(body);

    // Check if email already exists in this firm (excluding current client)
    if (validatedData.email && validatedData.email !== '') {
      const duplicateClient = await prisma.client.findFirst({
        where: {
          firmId: session.user.firmId,
          email: validatedData.email,
          id: { not: params.id },
        },
      });

      if (duplicateClient) {
        return NextResponse.json(
          { error: 'A client with this email already exists' },
          { status: 400 }
        );
      }
    }

    const updateData: any = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email || null,
      phone: validatedData.phone || null,
      alternatePhone: validatedData.alternatePhone || null,
      address: validatedData.address || null,
      idNumber: validatedData.idNumber || null,
      occupation: validatedData.occupation || null,
      company: validatedData.company || null,
      notes: validatedData.notes || null,
    };

    if (validatedData.dateOfBirth) {
      updateData.dateOfBirth = new Date(validatedData.dateOfBirth);
    } else {
      updateData.dateOfBirth = null;
    }

    const updatedClient = await prisma.client.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        alternatePhone: true,
        address: true,
        idNumber: true,
        dateOfBirth: true,
        occupation: true,
        company: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedClient);
  } catch (error: any) {
    console.error('Client update error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

// DELETE /api/clients/[id] - Delete a client (only if no cases)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if client exists and belongs to user's firm
    const existingClient = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { cases: true },
        },
      },
    });

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    if (existingClient.firmId !== session.user.firmId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Prevent deletion if client has cases
    if (existingClient._count.cases > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete client with existing cases',
          message: `This client has ${existingClient._count.cases} case(s). Please delete or reassign all cases before deleting the client.`
        },
        { status: 400 }
      );
    }

    await prisma.client.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Client deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}
