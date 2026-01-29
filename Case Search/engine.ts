import { PrismaClient } from '@prisma/client';
import { IDataSource, RawCase } from './types';

const prisma = new PrismaClient();

export class TrackingEngine {
  private sources: IDataSource[] = [];

  registerSource(source: IDataSource) {
    this.sources.push(source);
  }

  async runDailyTracking() {
    console.log('Starting daily tracking...');
    for (const source of this.sources) {
      try {
        console.log(`Fetching cases from ${source.name}...`);
        const cases = await source.fetchDailyCases();
        console.log(`Found ${cases.length} cases from ${source.name}.`);
        
        for (const c of cases) {
          await prisma.publicCase.upsert({
            where: {
              // Assuming source + externalId or source + caseNumber is unique enough for this demo
              // In a real app, we might need a more robust unique key
              id: `${c.source}_${c.externalId || c.caseNumber || Math.random().toString(36).substr(2, 9)}`,
            },
            update: {
              title: c.title,
              content: c.content,
              category: c.category,
              court: c.court,
              judge: c.judge,
              hearingDate: c.hearingDate,
              publishedAt: c.publishedAt,
              url: c.url,
              tags: c.tags?.join(','),
            },
            create: {
              id: `${c.source}_${c.externalId || c.caseNumber || Math.random().toString(36).substr(2, 9)}`,
              source: c.source,
              externalId: c.externalId,
              caseNumber: c.caseNumber,
              title: c.title,
              content: c.content,
              category: c.category,
              court: c.court,
              judge: c.judge,
              hearingDate: c.hearingDate,
              publishedAt: c.publishedAt || new Date(),
              url: c.url,
              tags: c.tags?.join(','),
            },
          });
        }
      } catch (error) {
        console.error(`Error tracking source ${source.name}:`, error);
      }
    }
    console.log('Daily tracking completed.');
  }
}
