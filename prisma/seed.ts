import { PrismaClient, UserRole, SubscriptionTier, CaseStatus, CaseCategory, InvoiceStatus, DocumentType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a demo firm
  const demoFirm = await prisma.firm.upsert({
    where: { id: 'demo-firm-1' },
    update: {},
    create: {
      id: 'demo-firm-1',
      name: 'Wong & Associates Law Firm',
      registrationNumber: 'HK-LAW-001',
      address: 'Suite 2501, Central Plaza, 18 Harbour Road, Wan Chai, Hong Kong',
      phone: '+852 2123 4567',
      email: 'info@wonglaw.hk',
      website: 'https://wonglaw.hk',
      employeeCount: 15,
      subscriptionTier: SubscriptionTier.PROFESSIONAL,
      subscriptionStatus: 'active',
      billingEmail: 'billing@wonglaw.hk',
      taxId: 'HK123456789',
    },
  });

  console.log('✅ Created demo firm');

  // Create demo users
  const passwordHash = await bcrypt.hash('demo123456', 10);

  const ownerUser = await prisma.user.upsert({
    where: { email: 'owner@wonglaw.hk' },
    update: {},
    create: {
      name: 'David Wong',
      email: 'owner@wonglaw.hk',
      passwordHash,
      role: UserRole.OWNER,
      locale: 'zh',
      emailVerified: new Date(),
      firmId: demoFirm.id,
    },
  });

  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@wonglaw.hk' },
    update: {},
    create: {
      name: 'Lisa Chen',
      email: 'staff@wonglaw.hk',
      passwordHash,
      role: UserRole.STAFF,
      locale: 'en',
      emailVerified: new Date(),
      firmId: demoFirm.id,
    },
  });

  console.log('✅ Created demo users (password: demo123456)');

  // Create demo clients
  const client1 = await prisma.client.upsert({
    where: { id: 'demo-client-1' },
    update: {},
    create: {
      id: 'demo-client-1',
      firstName: 'Michael',
      lastName: 'Chan',
      email: 'michael.chan@example.com',
      phone: '+852 9123 4567',
      address: 'Flat 15B, Tower 3, Harbour View, Kowloon, Hong Kong',
      idNumber: 'A123456(7)',
      occupation: 'Business Owner',
      company: 'Chan Trading Ltd.',
      firmId: demoFirm.id,
    },
  });

  const client2 = await prisma.client.upsert({
    where: { id: 'demo-client-2' },
    update: {},
    create: {
      id: 'demo-client-2',
      firstName: 'Emily',
      lastName: 'Lam',
      email: 'emily.lam@example.com',
      phone: '+852 9234 5678',
      address: '25F, Sunshine Tower, Central, Hong Kong',
      idNumber: 'B987654(3)',
      occupation: 'Property Developer',
      firmId: demoFirm.id,
    },
  });

  const client3 = await prisma.client.upsert({
    where: { id: 'demo-client-3' },
    update: {},
    create: {
      id: 'demo-client-3',
      firstName: 'Robert',
      lastName: 'Lee',
      email: 'robert.lee@example.com',
      phone: '+852 9345 6789',
      address: 'Villa 8, Discovery Bay, Lantau Island, Hong Kong',
      firmId: demoFirm.id,
    },
  });

  console.log('✅ Created demo clients');

  // Create demo cases
  const case1 = await prisma.case.upsert({
    where: { caseNumber: 'HCA-2024-001' },
    update: {},
    create: {
      caseNumber: 'HCA-2024-001',
      title: 'Commercial Lease Dispute - Central Office',
      description: 'Client is facing a commercial lease dispute regarding rent increase and early termination clauses.',
      category: CaseCategory.CORPORATE,
      status: CaseStatus.ACTIVE,
      filingDate: new Date('2024-01-15'),
      courtReference: 'HCA 123/2024',
      estimatedBudget: 250000.00,
      firmId: demoFirm.id,
      clientId: client1.id,
      assignedLawyerId: ownerUser.id,
    },
  });

  const case2 = await prisma.case.upsert({
    where: { caseNumber: 'HCA-2024-002' },
    update: {},
    create: {
      caseNumber: 'HCA-2024-002',
      title: 'Property Sale Agreement Review',
      description: 'Review and negotiation of property sale agreement for luxury residential unit.',
      category: CaseCategory.PROPERTY,
      status: CaseStatus.ACTIVE,
      filingDate: new Date('2024-02-01'),
      estimatedBudget: 150000.00,
      firmId: demoFirm.id,
      clientId: client2.id,
      assignedLawyerId: staffUser.id,
    },
  });

  const case3 = await prisma.case.upsert({
    where: { caseNumber: 'HCA-2024-003' },
    update: {},
    create: {
      caseNumber: 'HCA-2024-003',
      title: 'Family Trust Establishment',
      description: 'Setting up family trust structure for estate planning purposes.',
      category: CaseCategory.FAMILY,
      status: CaseStatus.COMPLETED,
      filingDate: new Date('2023-11-10'),
      closingDate: new Date('2024-01-20'),
      estimatedBudget: 80000.00,
      actualCost: 75000.00,
      firmId: demoFirm.id,
      clientId: client3.id,
      assignedLawyerId: ownerUser.id,
    },
  });

  const case4 = await prisma.case.upsert({
    where: { caseNumber: 'HCA-2024-004' },
    update: {},
    create: {
      caseNumber: 'HCA-2024-004',
      title: 'Employment Contract Negotiation',
      description: 'Reviewing and negotiating employment contracts for senior executive.',
      category: CaseCategory.LABOUR,
      status: CaseStatus.PENDING,
      filingDate: new Date('2024-02-15'),
      estimatedBudget: 45000.00,
      firmId: demoFirm.id,
      clientId: client1.id,
      assignedLawyerId: staffUser.id,
    },
  });

  console.log('✅ Created demo cases');

  // Create demo time entries
  await prisma.timeEntry.createMany({
    data: [
      {
        date: new Date('2024-01-20'),
        hours: 3.5,
        description: 'Initial client consultation and case review',
        hourlyRate: 2500.00,
        totalAmount: 8750.00,
        billable: true,
        caseId: case1.id,
        userId: ownerUser.id,
      },
      {
        date: new Date('2024-01-25'),
        hours: 5.0,
        description: 'Legal research on commercial lease regulations',
        hourlyRate: 2500.00,
        totalAmount: 12500.00,
        billable: true,
        caseId: case1.id,
        userId: ownerUser.id,
      },
      {
        date: new Date('2024-02-05'),
        hours: 2.0,
        description: 'Property contract review and analysis',
        hourlyRate: 1800.00,
        totalAmount: 3600.00,
        billable: true,
        caseId: case2.id,
        userId: staffUser.id,
      },
      {
        date: new Date('2024-02-10'),
        hours: 4.5,
        description: 'Drafting amendments to property agreement',
        hourlyRate: 1800.00,
        totalAmount: 8100.00,
        billable: true,
        caseId: case2.id,
        userId: staffUser.id,
      },
    ],
  });

  console.log('✅ Created demo time entries');

  // Create demo documents
  await prisma.document.createMany({
    data: [
      {
        title: 'Commercial Lease Agreement - Original',
        fileName: 'lease_agreement_2024.pdf',
        fileSize: 524288,
        filePath: '/uploads/lease_agreement_2024.pdf',
        mimeType: 'application/pdf',
        documentType: DocumentType.CONTRACT,
        caseId: case1.id,
        uploadedById: ownerUser.id,
      },
      {
        title: 'Client Correspondence - Email Chain',
        fileName: 'email_correspondence.pdf',
        fileSize: 102400,
        filePath: '/uploads/email_correspondence.pdf',
        mimeType: 'application/pdf',
        documentType: DocumentType.CORRESPONDENCE,
        caseId: case1.id,
        uploadedById: staffUser.id,
      },
      {
        title: 'Property Sale Agreement Draft v1',
        fileName: 'property_sale_v1.pdf',
        fileSize: 245760,
        filePath: '/uploads/property_sale_v1.pdf',
        mimeType: 'application/pdf',
        documentType: DocumentType.CONTRACT,
        caseId: case2.id,
        uploadedById: staffUser.id,
      },
    ],
  });

  console.log('✅ Created demo documents');

  // Create demo invoice (with unique number using timestamp)
  const timestamp = Date.now().toString().slice(-6);
  try {
    const invoice1 = await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-2024-${timestamp}`,
        issueDate: new Date('2024-02-01'),
        dueDate: new Date('2024-03-01'),
        status: InvoiceStatus.SENT,
        subtotal: 21250.00,
        tax: 0, // Hong Kong has no VAT/GST
        total: 21250.00,
        notes: 'Professional fees for January 2024',
        firmId: demoFirm.id,
        caseId: case1.id,
      },
    });
    console.log('✅ Created demo invoices');
  } catch (invoiceError) {
    console.warn('⚠️  Invoice creation skipped (may already exist):', (invoiceError as any).message);
  }

  // Create demo messages
  await prisma.message.createMany({
    data: [
      {
        subject: 'Case Update: Commercial Lease Dispute',
        body: 'Dear Mr. Chan, We have reviewed the lease agreement and identified several key points for negotiation. We will schedule a meeting next week to discuss our strategy.',
        isRead: true,
        sentVia: 'email',
        caseId: case1.id,
        clientId: client1.id,
        senderId: ownerUser.id,
      },
      {
        subject: 'Document Request',
        body: 'Hi Emily, Could you please provide us with the original property deed and the latest valuation report? These documents are essential for proceeding with the sale agreement review.',
        isRead: false,
        sentVia: 'in-app',
        caseId: case2.id,
        clientId: client2.id,
        senderId: staffUser.id,
      },
    ],
  });

  console.log('✅ Created demo messages');
  console.log('');
  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('Demo credentials:');
  console.log('  Owner: owner@wonglaw.hk / demo123456');
  console.log('  Staff: staff@wonglaw.hk / demo123456');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
