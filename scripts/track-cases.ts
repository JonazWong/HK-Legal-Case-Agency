import { TrackingEngine } from '../lib/tracking/engine';
import { JudiciarySource } from '../lib/tracking/sources/judiciary';
import { NewsRSSSource } from '../lib/tracking/sources/news.rss';

async function main() {
  const engine = new TrackingEngine();

  // Register sources
  // These can be easily swapped or added to
  engine.registerSource(new JudiciarySource());
  engine.registerSource(new NewsRSSSource('https://example-news.com/legal/rss'));

  // Run tracking
  await engine.runDailyTracking();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
