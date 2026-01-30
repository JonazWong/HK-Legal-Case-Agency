import { TrackingEngine } from '../lib/tracking/engine';
import { JudiciarySource } from '../lib/tracking/sources/judiciary';
import { NewsRSSSource } from '../lib/tracking/sources/news.rss';
import { getEnabledSources, getCurrentDelay, getCurrentConcurrency } from '../lib/tracking/rss-config';

async function main() {
  console.log('='.repeat(60));
  console.log('Starting HK Legal Case Tracking');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Current Hour: ${new Date().getHours()}:00`);
  console.log(`Request Delay: ${getCurrentDelay()}ms`);
  console.log(`Concurrency: ${getCurrentConcurrency()}`);
  console.log('='.repeat(60));

  const engine = new TrackingEngine();

  try {
    // Register sources - 使用配置系統
    console.log('\n📋 Registering data sources...');
    
    // 司法機構（模擬資料）
    engine.registerSource(new JudiciarySource());
    
    // 從配置檔載入已啟用的 RSS 來源
    const enabledSources = getEnabledSources();
    console.log(`  Found ${enabledSources.length} enabled RSS sources`);
    
    for (const config of enabledSources) {
      engine.registerSource(new NewsRSSSource(config.url));
    }
    
    console.log('✓ Data sources registered successfully\n');

    // Run tracking
    console.log('🔍 Starting daily case tracking...\n');
    await engine.runDailyTracking();
    
    console.log('\n' + '='.repeat(60));
    console.log('✓ Daily tracking completed successfully');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('✗ Error during tracking process:');
    console.error('='.repeat(60));
    console.error(error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('\n❌ Fatal error:', e.message);
    process.exit(1);
  })
  .finally(() => {
    console.log('\nProcess finished.');
  });
