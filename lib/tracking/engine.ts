import { prisma } from '@/lib/db';
import { IDataSource } from './types';
import { enhancePublicCaseWithCaseNumber } from '@/lib/case-linking/case-indexer';
import { generateCaseLinks } from '@/lib/case-linking/case-number-parser';

export class TrackingEngine {
  private sources: IDataSource[] = [];
  private requestDelay: number = 2000; // 2 秒延遲，遵守爬蟲禮儀

  registerSource(source: IDataSource) {
    this.sources.push(source);
    console.log(`  ✓ Registered: ${source.name}`);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async runDailyTracking() {
    if (this.sources.length === 0) {
      console.warn('⚠️  No data sources registered!');
      return;
    }

    console.log(`Processing ${this.sources.length} data source(s)...\n`);
    
    let totalCasesProcessed = 0;
    let totalErrors = 0;
    
    for (let i = 0; i < this.sources.length; i++) {
      const source = this.sources[i];
      try {
        console.log(`${'─'.repeat(60)}`);
        console.log(`📥 Fetching from: ${source.name}`);
        console.log(`${'─'.repeat(60)}`);
        
        const cases = await source.fetchDailyCases();
        console.log(`  Found ${cases.length} case(s)`);
        
        if (cases.length === 0) {
          console.log(`  ℹ️  No cases to process from ${source.name}`);
          
          // 在來源之間加入延遲（除了最後一個）
          if (i < this.sources.length - 1) {
            console.log(`  ⏳ Waiting ${this.requestDelay / 1000}s before next source...`);
            await this.delay(this.requestDelay);
          }
          continue;
        }
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const c of cases) {
          try {
            const externalId =
              c.externalId ?? c.caseNumber ?? `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

            // 🔍 智能提取案件編號（如果沒有提供）
            let caseNumber = c.caseNumber;
            if (!caseNumber) {
              caseNumber = (await enhancePublicCaseWithCaseNumber(c.title, c.content || null)) ?? undefined;
            }
            
            // 🔗 如果有案件編號，生成 HKLII 連結
            let enhancedUrl = c.url;
            if (caseNumber && !c.url) {
              const links = generateCaseLinks(caseNumber);
              if (links?.hklii) {
                enhancedUrl = links.hklii;
              }
            }

            await prisma.publicCase.upsert({
              where: {
                source_externalId: {
                  source: c.source,
                  externalId,
                },
              },
              update: {
                externalId,
                caseNumber, // ✅ 更新自動提取的案件編號
                title: c.title,
                content: c.content,
                category: c.category,
                court: c.court,
                judge: c.judge,
                hearingDate: c.hearingDate,
                publishedAt: c.publishedAt,
                url: enhancedUrl, // ✅ 使用增強的 URL
                tags: c.tags?.join(','),
              },
              create: {
                source: c.source,
                externalId,
                caseNumber, // ✅ 儲存自動提取的案件編號
                title: c.title,
                content: c.content,
                category: c.category,
                court: c.court,
                judge: c.judge,
                hearingDate: c.hearingDate,
                publishedAt: c.publishedAt || new Date(),
                url: enhancedUrl, // ✅ 使用增強的 URL
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
        
        // 在來源之間加入延遲（除了最後一個）
        if (i < this.sources.length - 1) {
          console.log(`  ⏳ Waiting ${this.requestDelay / 1000}s before next source...`);
          await this.delay(this.requestDelay);
        }
      } catch (error) {
        totalErrors++;
        console.error(`\n✗ Error fetching from ${source.name}:`, error instanceof Error ? error.message : error);
        if (error instanceof Error && error.stack) {
          console.error('Stack trace:', error.stack);
        }
        
        // 即使出錯也要延遲
        if (i < this.sources.length - 1) {
          await this.delay(this.requestDelay);
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
