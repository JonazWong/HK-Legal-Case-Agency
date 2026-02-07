import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { GET, POST } from '@/app/api/cases/route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

// Mock dependencies
vi.mock('next-auth');
vi.mock('@/lib/db', () => ({
  prisma: {
    case: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
      findFirst: vi.fn(),
    },
  },
}));

describe('Cases API', () => {
  const mockSession = {
    user: {
      id: 'user-123',
      email: 'lawyer@wonglaw.hk',
      name: 'Test Lawyer',
      role: 'LAWYER',
      firmId: 'firm-123',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console methods to prevent undefined errors in test environment
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('GET /api/cases', () => {
    it('應該返回未授權錯誤當沒有 session', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);

      const request = new NextRequest('http://localhost:3000/api/cases');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('應該返回案件列表與分頁資訊', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);

      const mockCases = [
        {
          id: 'case-1',
          caseNumber: 'HCA-2024-001',
          title: 'Test Case 1',
          status: 'ACTIVE',
          firmId: 'firm-123',
          clientId: 'client-1',
          assignedLawyerId: 'user-123',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          client: {
            id: 'client-1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          },
          assignedLawyer: {
            id: 'user-123',
            name: 'Test Lawyer',
            email: 'lawyer@wonglaw.hk',
          },
        },
      ];

      vi.mocked(prisma.case.findMany).mockResolvedValueOnce(mockCases as any);
      vi.mocked(prisma.case.count).mockResolvedValueOnce(1);

      const request = new NextRequest('http://localhost:3000/api/cases?page=1&limit=10');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.cases).toHaveLength(1);
      expect(data.cases[0].caseNumber).toBe('HCA-2024-001');
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      });
    });

    it('應該支援搜尋功能', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);
      vi.mocked(prisma.case.findMany).mockResolvedValueOnce([]);
      vi.mocked(prisma.case.count).mockResolvedValueOnce(0);

      const request = new NextRequest('http://localhost:3000/api/cases?search=test');
      await GET(request);

      expect(prisma.case.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            firmId: 'firm-123',
            OR: expect.arrayContaining([
              expect.objectContaining({ caseNumber: { contains: 'test', mode: 'insensitive' } }),
              expect.objectContaining({ title: { contains: 'test', mode: 'insensitive' } }),
            ]),
          }),
        })
      );
    });

    it('應該支援狀態篩選', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);
      vi.mocked(prisma.case.findMany).mockResolvedValueOnce([]);
      vi.mocked(prisma.case.count).mockResolvedValueOnce(0);

      const request = new NextRequest('http://localhost:3000/api/cases?status=ACTIVE');
      await GET(request);

      expect(prisma.case.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            firmId: 'firm-123',
            status: 'ACTIVE',
          }),
        })
      );
    });
  });

  describe('POST /api/cases', () => {
    it('應該返回未授權錯誤當沒有 session', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);

      const request = new NextRequest('http://localhost:3000/api/cases', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Case',
          clientId: 'client-1',
          status: 'ACTIVE',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('應該創建新案件並生成檔案編號', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);

      const currentYear = new Date().getFullYear();
      const mockLastCase = {
        caseNumber: `HCA-${currentYear}-005`,
      };

      vi.mocked(prisma.case.findFirst).mockResolvedValueOnce(mockLastCase as any);

      const mockNewCase = {
        id: 'case-new',
        caseNumber: `HCA-${currentYear}-006`,
        title: 'New Case',
        status: 'ACTIVE',
        firmId: 'firm-123',
        clientId: 'client-1',
        assignedLawyerId: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.case.create).mockResolvedValueOnce(mockNewCase as any);

      const request = new NextRequest('http://localhost:3000/api/cases', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Case',
          category: 'CIVIL',
          clientId: 'client-1',
          status: 'ACTIVE',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.caseNumber).toBe(`HCA-${currentYear}-006`);
      expect(prisma.case.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            caseNumber: `HCA-${currentYear}-006`,
            title: 'New Case',
            category: 'CIVIL',
            firmId: 'firm-123',
          }),
        })
      );
    });

    it('應該處理第一個案件的情況（檔案編號為 001）', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);

      // 沒有現存案件
      vi.mocked(prisma.case.findFirst).mockResolvedValueOnce(null);

      const currentYear = new Date().getFullYear();
      const mockNewCase = {
        id: 'case-first',
        caseNumber: `HCA-${currentYear}-001`,
        title: 'First Case',
        status: 'ACTIVE',
        firmId: 'firm-123',
        clientId: 'client-1',
        assignedLawyerId: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.case.create).mockResolvedValueOnce(mockNewCase as any);

      const request = new NextRequest('http://localhost:3000/api/cases', {
        method: 'POST',
        body: JSON.stringify({
          title: 'First Case',
          category: 'CIVIL',
          clientId: 'client-1',
          status: 'ACTIVE',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.caseNumber).toBe(`HCA-${currentYear}-001`);
    });

    it('應該返回驗證錯誤當資料無效', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);

      const request = new NextRequest('http://localhost:3000/api/cases', {
        method: 'POST',
        body: JSON.stringify({
          // 缺少必要欄位
          status: 'INVALID_STATUS',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
    });
  });
});
