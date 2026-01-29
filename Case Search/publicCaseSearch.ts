import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SearchFilters {
  query?: string;
  source?: string;
  category?: string;
  court?: string;
  startDate?: Date;
  endDate?: Date;
}

export class PublicCaseSearchService {
  async search(filters: SearchFilters) {
    const { query, source, category, court, startDate, endDate } = filters;

    return await prisma.publicCase.findMany({
      where: {
        AND: [
          query ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
              { caseNumber: { contains: query, mode: 'insensitive' } },
            ]
          } : {},
          source ? { source } : {},
          category ? { category } : {},
          court ? { court } : {},
          startDate ? { hearingDate: { gte: startDate } } : {},
          endDate ? { hearingDate: { lte: endDate } } : {},
        ]
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });
  }

  async getRecentCases(limit = 10) {
    return await prisma.publicCase.findMany({
      take: limit,
      orderBy: {
        publishedAt: 'desc'
      }
    });
  }
}
