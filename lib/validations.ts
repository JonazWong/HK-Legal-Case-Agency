import { z } from 'zod';

// User schemas
export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  firmName: z.string().min(2, 'Firm name must be at least 2 characters'),
  locale: z.enum(['en', 'zh']).default('zh'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Client schemas
export const clientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  alternatePhone: z.string().optional(),
  address: z.string().optional(),
  idNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  occupation: z.string().optional(),
  company: z.string().optional(),
  notes: z.string().optional(),
});

// Case schemas
export const caseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.enum(['CIVIL', 'CRIMINAL', 'CORPORATE', 'FAMILY', 'PROPERTY', 'IMMIGRATION', 'LABOUR', 'OTHER']),
  status: z.enum(['ACTIVE', 'PENDING', 'COMPLETED', 'ARCHIVED']).default('PENDING'),
  filingDate: z.string().optional(),
  closingDate: z.string().optional(),
  courtReference: z.string().optional(),
  estimatedBudget: z.string().optional(),
  actualCost: z.string().optional(),
  clientId: z.string().min(1, 'Client is required'),
  assignedLawyerId: z.string().optional(),
  notes: z.string().optional(),
});

// Time Entry schemas
export const timeEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  hours: z.string().min(1, 'Hours is required'),
  description: z.string().min(1, 'Description is required'),
  hourlyRate: z.string().min(1, 'Hourly rate is required'),
  billable: z.boolean().default(true),
  caseId: z.string().min(1, 'Case is required'),
});

// Document schemas
export const documentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  documentType: z.enum(['CONTRACT', 'EVIDENCE', 'CORRESPONDENCE', 'COURT_FILING', 'TEMPLATE', 'OTHER']).default('OTHER'),
  description: z.string().optional(),
  caseId: z.string().min(1, 'Case is required'),
});

// Invoice schemas
export const invoiceSchema = z.object({
  dueDate: z.string().min(1, 'Due date is required'),
  notes: z.string().optional(),
  caseId: z.string().optional(),
  timeEntryIds: z.array(z.string()).optional(),
});

// Message schemas
export const messageSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Message body is required'),
  caseId: z.string().optional(),
  clientId: z.string().optional(),
  sentVia: z.enum(['in-app', 'email', 'sms']).default('in-app'),
});

// Firm schemas
export const firmSchema = z.object({
  name: z.string().min(1, 'Firm name is required'),
  registrationNumber: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  employeeCount: z.number().int().positive().optional(),
  billingEmail: z.string().email().optional().or(z.literal('')),
  taxId: z.string().optional(),
});

// Export types
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ClientInput = z.infer<typeof clientSchema>;
export type CaseInput = z.infer<typeof caseSchema>;
export type TimeEntryInput = z.infer<typeof timeEntrySchema>;
export type DocumentInput = z.infer<typeof documentSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type FirmInput = z.infer<typeof firmSchema>;
