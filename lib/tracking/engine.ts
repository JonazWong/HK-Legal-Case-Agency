import { prisma } from '@/lib/db';
import { IDataSource } from './types';

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
          const externalId =
            c.externalId ?? c.caseNumber ?? `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

          await prisma.publicCase.upsert({
            where: {
              source_externalId: {
                source: c.source,
                externalId,
              },
            },
            update: {
              externalId,
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
              source: c.source,
              externalId,
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
