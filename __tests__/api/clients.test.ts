import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/clients/route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

// Mock dependencies
vi.mock('next-auth');
vi.mock('@/lib/db', () => ({
  prisma: {
    client: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
      findFirst: vi.fn(),
    },
  },
}));

describe('Clients API', () => {
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

  describe('GET /api/clients', () => {
    it('應該返回未授權錯誤當沒有 session', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);

      const request = new NextRequest('http://localhost:3000/api/clients');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('應該返回客戶列表與分頁資訊', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);

      const mockClients = [
        {
          id: 'client-1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '51234567',
          firmId: 'firm-123',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          _count: {
            cases: 2,
          },
        },
      ];

      vi.mocked(prisma.client.findMany).mockResolvedValueOnce(mockClients as any);
      vi.mocked(prisma.client.count).mockResolvedValueOnce(1);

      const request = new NextRequest('http://localhost:3000/api/clients?page=1&limit=10');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.clients).toHaveLength(1);
      expect(data.clients[0].firstName).toBe('John');
      expect(data.clients[0].lastName).toBe('Doe');
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      });
    });

    it('應該支援搜尋功能', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);
      vi.mocked(prisma.client.findMany).mockResolvedValueOnce([]);
      vi.mocked(prisma.client.count).mockResolvedValueOnce(0);

      const request = new NextRequest('http://localhost:3000/api/clients?search=john');
      await GET(request);

      expect(prisma.client.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            firmId: 'firm-123',
            OR: expect.arrayContaining([
              expect.objectContaining({ firstName: { contains: 'john', mode: 'insensitive' } }),
              expect.objectContaining({ lastName: { contains: 'john', mode: 'insensitive' } }),
              expect.objectContaining({ email: { contains: 'john', mode: 'insensitive' } }),
            ]),
          }),
        })
      );
    });
  });

  describe('POST /api/clients', () => {
    it('應該返回未授權錯誤當沒有 session', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);

      const request = new NextRequest('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('應該創建新客戶', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);

      // Email 不存在
      vi.mocked(prisma.client.findFirst).mockResolvedValueOnce(null);

      const mockNewClient = {
        id: 'client-new',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '91234567',
        firmId: 'firm-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.client.create).mockResolvedValueOnce(mockNewClient as any);

      const request = new NextRequest('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          phone: '91234567',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.firstName).toBe('Jane');
      expect(data.email).toBe('jane@example.com');
      expect(prisma.client.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            firmId: 'firm-123',
          }),
        })
      );
    });

    it('應該返回錯誤當 email 已存在', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);

      // Email 已存在
      vi.mocked(prisma.client.findFirst).mockResolvedValueOnce({
        id: 'existing-client',
        email: 'jane@example.com',
        firmId: 'firm-123',
      } as any);

      const request = new NextRequest('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('already exists');
    });

    it('應該允許創建沒有 email 的客戶', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);

      const mockNewClient = {
        id: 'client-no-email',
        firstName: 'John',
        lastName: 'NoEmail',
        email: null,
        phone: '98765432',
        firmId: 'firm-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.client.create).mockResolvedValueOnce(mockNewClient as any);

      const request = new NextRequest('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'NoEmail',
          phone: '98765432',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.firstName).toBe('John');
      expect(data.email).toBeNull();
    });

    it('應該返回驗證錯誤當資料無效', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(mockSession as any);

      const request = new NextRequest('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          // 缺少必要欄位 firstName, lastName
          email: 'invalid',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
    });
  });
});
