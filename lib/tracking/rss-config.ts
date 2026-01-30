/**
 * RSS 新聞源配置
 * 根據《港聞新聞源到法律資訊搜尋方法及注意事項指南》
 * 作者：天賜
 * 日期：2026-01-30
 */

export interface RSSSourceConfig {
  name: string;
  url: string;
  category: 'instant' | 'daily';
  updateFrequency: string;
  priority: number; // 1-5，數字越小優先級越高
  enabled: boolean;
}

/**
 * 主要港聞新聞源列表
 * 
 * 獲取頻率建議：
 * - 即時新聞源：每 10-15 分鐘
 * - 每日新聞源：每 1-2 小時
 * - 非繁忙時段：每 30 分鐘
 */
export const RSS_SOURCES: RSSSourceConfig[] = [
  // 優先級 1：主要即時新聞
  {
    name: '香港01',
    url: 'https://www.hk01.com/rss/zone/2',
    category: 'instant',
    updateFrequency: '即時',
    priority: 1,
    enabled: true,
  },
  {
    name: 'RTHK 香港電台',
    url: 'https://news.rthk.hk/rthk/ch/rss/local.htm',
    category: 'instant',
    updateFrequency: '即時',
    priority: 1,
    enabled: true,
  },
  {
    name: '明報即時新聞',
    url: 'https://news.mingpao.com/rss/ins/s00001.xml',
    category: 'instant',
    updateFrequency: '即時',
    priority: 1,
    enabled: true,
  },

  // 優先級 2：其他即時新聞
  {
    name: 'Now 新聞',
    url: 'https://news.now.com/rss/home/local',
    category: 'instant',
    updateFrequency: '即時',
    priority: 2,
    enabled: true,
  },
  {
    name: 'TVB 新聞',
    url: 'https://news.tvb.com/rss/tc/local',
    category: 'instant',
    updateFrequency: '即時',
    priority: 2,
    enabled: true,
  },
  {
    name: '星島即時',
    url: 'https://std.stheadline.com/rss/news/realtime/hk.xml',
    category: 'instant',
    updateFrequency: '即時',
    priority: 2,
    enabled: true,
  },

  // 優先級 3：每日新聞
  {
    name: '明報港聞',
    url: 'https://news.mingpao.com/rss/pns/s00002.xml',
    category: 'daily',
    updateFrequency: '每日',
    priority: 3,
    enabled: true,
  },
  {
    name: '星島日報',
    url: 'https://std.stheadline.com/rss/news/daily/hk.xml',
    category: 'daily',
    updateFrequency: '每日',
    priority: 3,
    enabled: true,
  },
  {
    name: '東方日報',
    url: 'https://orientaldaily.on.cc/rss/news.xml',
    category: 'daily',
    updateFrequency: '每日',
    priority: 3,
    enabled: false, // 預設禁用，需要時啟用
  },

  // 優先級 4：財經/專業新聞
  {
    name: '經濟日報',
    url: 'https://www.hket.com/rss/hongkong',
    category: 'instant',
    updateFrequency: '即時',
    priority: 4,
    enabled: true,
  },
  {
    name: '信報',
    url: 'https://www2.hkej.com/rss/instantnews',
    category: 'instant',
    updateFrequency: '即時',
    priority: 4,
    enabled: true,
  },
  {
    name: 'SCMP 南華早報',
    url: 'https://www.scmp.com/rss/91/feed',
    category: 'instant',
    updateFrequency: '即時',
    priority: 4,
    enabled: false, // 英文來源，按需啟用
  },

  // 優先級 5：其他來源（預設禁用）
  {
    name: '東網即時',
    url: 'http://hk.on.cc/rss/news_ch.xml',
    category: 'instant',
    updateFrequency: '即時',
    priority: 5,
    enabled: false,
  },
];

/**
 * 爬蟲禮儀配置
 * 遵守《港聞新聞源到法律資訊搜尋指南》第 5.3 節
 */
export const CRAWLER_CONFIG = {
  // User-Agent 識別
  userAgent: 'HK-Legal-Research-Bot/1.0 (Legal Research Purpose; Contact: info@hklegal.com)',
  
  // 請求延遲（毫秒）
  delays: {
    busyHours: 3000,    // 09:00-18:00，3 秒
    normalHours: 2000,  // 18:00-00:00 和 06:00-09:00，2 秒
    nightHours: 1000,   // 00:00-06:00，1 秒
  },
  
  // 並發限制
  concurrency: {
    busyHours: 1,       // 繁忙時段只允許 1 個並發
    normalHours: 2,     // 正常時段允許 2 個並發
    nightHours: 3,      // 深夜時段允許 3 個並發
  },
  
  // 重試機制
  retry: {
    maxAttempts: 3,     // 最多重試 3 次
    backoffMultiplier: 2, // 退避倍數
    initialDelay: 1000, // 初始延遲 1 秒
  },
  
  // 逾時設定（毫秒）
  timeout: 30000,  // 30 秒總逾時
};

/**
 * 根據當前時間取得適當的請求延遲
 */
export function getCurrentDelay(): number {
  const hour = new Date().getHours();
  
  if (hour >= 9 && hour < 18) {
    return CRAWLER_CONFIG.delays.busyHours;
  } else if (hour >= 0 && hour < 6) {
    return CRAWLER_CONFIG.delays.nightHours;
  } else {
    return CRAWLER_CONFIG.delays.normalHours;
  }
}

/**
 * 根據當前時間取得適當的並發數
 */
export function getCurrentConcurrency(): number {
  const hour = new Date().getHours();
  
  if (hour >= 9 && hour < 18) {
    return CRAWLER_CONFIG.concurrency.busyHours;
  } else if (hour >= 0 && hour < 6) {
    return CRAWLER_CONFIG.concurrency.nightHours;
  } else {
    return CRAWLER_CONFIG.concurrency.normalHours;
  }
}

/**
 * 取得已啟用的 RSS 來源（依優先級排序）
 */
export function getEnabledSources(): RSSSourceConfig[] {
  return RSS_SOURCES
    .filter(source => source.enabled)
    .sort((a, b) => a.priority - b.priority);
}

/**
 * 取得即時新聞源
 */
export function getInstantSources(): RSSSourceConfig[] {
  return RSS_SOURCES
    .filter(source => source.enabled && source.category === 'instant')
    .sort((a, b) => a.priority - b.priority);
}

/**
 * 取得每日新聞源
 */
export function getDailySources(): RSSSourceConfig[] {
  return RSS_SOURCES
    .filter(source => source.enabled && source.category === 'daily')
    .sort((a, b) => a.priority - b.priority);
}
