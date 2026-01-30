import { TrackingEngine } from '../lib/tracking/engine';
import { JudiciarySource } from '../lib/tracking/sources/judiciary';
import { NewsRSSSource } from '../lib/tracking/sources/news.rss';

async function main() {
  console.log('='.repeat(60));
  console.log('Starting HK Legal Case Tracking');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  const engine = new TrackingEngine();

  try {
    // Register sources
    // These can be easily swapped or added to
    console.log('\n📋 Registering data sources...');
    engine.registerSource(new JudiciarySource());
    engine.registerSource(new NewsRSSSource('https://example-news.com/legal/rss'));
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
