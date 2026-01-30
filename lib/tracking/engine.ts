import { prisma } from '@/lib/db';
import { IDataSource } from './types';

export class TrackingEngine {
  private sources: IDataSource[] = [];

  registerSource(source: IDataSource) {
    this.sources.push(source);
    console.log(`  ✓ Registered: ${source.name}`);
  }

  async runDailyTracking() {
    if (this.sources.length === 0) {
      console.warn('⚠️  No data sources registered!');
      return;
    }

    console.log(`Processing ${this.sources.length} data source(s)...\n`);
    
    let totalCasesProcessed = 0;
    let totalErrors = 0;
    
    for (const source of this.sources) {
      try {
        console.log(`${'─'.repeat(60)}`);
        console.log(`📥 Fetching from: ${source.name}`);
        console.log(`${'─'.repeat(60)}`);
        
        const cases = await source.fetchDailyCases();
        console.log(`  Found ${cases.length} case(s)`);
        
        if (cases.length === 0) {
          console.log(`  ℹ️  No cases to process from ${source.name}`);
          continue;
        }
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const c of cases) {
          try {
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
            successCount++;
          } catch (caseError) {
            errorCount++;
            console.error(`  ✗ Error processing case "${c.title}":`, caseError instanceof Error ? caseError.message : caseError);
          }
        }
        
        console.log(`  ✓ Successfully processed: ${successCount}/${cases.length}`);
        if (errorCount > 0) {
          console.log(`  ⚠️  Failed: ${errorCount}/${cases.length}`);
        }
        
        totalCasesProcessed += successCount;
        totalErrors += errorCount;
      } catch (error) {
        totalErrors++;
        console.error(`\n✗ Error fetching from ${source.name}:`, error instanceof Error ? error.message : error);
        if (error instanceof Error && error.stack) {
          console.error('Stack trace:', error.stack);
        }
      }
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log('Summary:');
    console.log(`  Total cases processed: ${totalCasesProcessed}`);
    if (totalErrors > 0) {
      console.log(`  Total errors: ${totalErrors}`);
    }
    console.log(`${'='.repeat(60)}`);
  }
}
