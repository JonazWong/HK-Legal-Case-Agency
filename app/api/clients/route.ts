import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { clientSchema } from '@/lib/validations';

// GET /api/clients - List all clients with pagination and search
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    const where: any = { firmId: session.user.firmId };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          company: true,
          createdAt: true,
          _count: {
            select: { cases: true },
          },
        },
        orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
        skip,
        take: limit,
      }),
      prisma.client.count({ where }),
    ]);

    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Clients list error:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

// POST /api/clients - Create a new client
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.firmId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = clientSchema.parse(body);

    // Check if email already exists in this firm (if email is provided)
    if (validatedData.email && validatedData.email !== '') {
      const existingClient = await prisma.client.findFirst({
        where: {
          firmId: session.user.firmId,
          email: validatedData.email,
        },
      });

      if (existingClient) {
        return NextResponse.json(
          { error: 'A client with this email already exists' },
          { status: 400 }
        );
      }
    }

    const clientData: any = {
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
      firmId: session.user.firmId,
    };

    if (validatedData.dateOfBirth) {
      clientData.dateOfBirth = new Date(validatedData.dateOfBirth);
    }

    const newClient = await prisma.client.create({
      data: clientData,
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

    return NextResponse.json(newClient, { status: 201 });
  } catch (error: any) {
    console.error('Client creation error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
