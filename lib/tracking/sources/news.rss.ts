/**
 * ⚠️ NOTICE: Real RSS Data Source with Filtering
 * 
 * This fetches REAL news from Hong Kong news outlets.
 * However, general news RSS feeds are NOT legal case databases.
 * Only articles containing legal keywords will be captured.
 * 
 * 注意：此為真實新聞來源，但一般新聞 RSS 並非法律案件資料庫。
 * 僅會擷取包含法律關鍵字的文章。不應視為完整或準確的法律案件資料。
 */

import { IDataSource, RawCase } from '../types';
import Parser from 'rss-parser';
import { CRAWLER_CONFIG } from '../rss-config';

export class NewsRSSSource implements IDataSource {
  name: string;
  private rssUrl: string;
  private parser: Parser;

  constructor(url: string) {
    this.rssUrl = url;
    this.name = `NewsRSS: ${this.getSourceName(url)}`;
    // 設定 User-Agent 和基本 headers
    this.parser = new Parser({
      customFields: {
        item: ['description', 'content:encoded']
      },
      headers: {
        'User-Agent': CRAWLER_CONFIG.userAgent,
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        'Accept-Language': 'zh-HK,zh;q=0.9,en;q=0.8',
      },
      timeout: CRAWLER_CONFIG.timeout,
    });
  }

  private getSourceName(url: string): string {
    if (url.includes('rthk.hk')) return 'RTHK';
    if (url.includes('now.com')) return 'Now News';
    if (url.includes('mingpao.com')) return 'Ming Pao';
    if (url.includes('hkej.com')) return 'HKEJ';
    return 'Unknown';
  }

  private isLegalRelated(title: string, content: string): boolean {
    const legalKeywords = [
      // 中文關鍵字
      '法院', '法官', '裁決', '判刑', '審訊', '上訴', '控告', '起訴',
      '被告', '原告', '律師', '大律師', '訴訟', '刑事', '民事',
      '終審', '高等法院', '區域法院', '裁判法院', '法律',
      '判囚', '罰款', '保釋', '案件', '審理',
      '判囚', '罰款', '保釋', '案件', '審理',
      // 英文關鍵字
      'court', 'judge', 'ruling', 'sentence', 'trial', 'appeal',
      'lawsuit', 'prosecution', 'defendant', 'plaintiff', 'lawyer',
      'barrister', 'litigation', 'criminal', 'civil', 'law', 'legal'
    ];

    const text = `${title} ${content}`.toLowerCase();
    return legalKeywords.some(keyword => text.includes(keyword.toLowerCase()));
  }

  private guessCategory(title: string, content: string): string {
    const text = `${title} ${content}`.toLowerCase();
    if (text.includes('刑事') || text.includes('criminal') || text.includes('判刑') || text.includes('sentence')) {
      return 'CRIMINAL';
    }
    if (text.includes('民事') || text.includes('civil') || text.includes('訴訟') || text.includes('lawsuit')) {
      return 'CIVIL';
    }
    return 'OTHER';
  }

  async fetchDailyCases(): Promise<RawCase[]> {
    console.log(`Fetching RSS from: ${this.rssUrl}`);
    
    try {
      const feed = await this.parser.parseURL(this.rssUrl);
      console.log(`  Found ${feed.items.length} items from ${this.name}`);
      
      const legalCases: RawCase[] = [];
      
      for (const item of feed.items) {
        const title = item.title || '';
        const content = item.contentSnippet || item.content || item.description || '';
        
        // 只處理與法律相關的新聞
        if (this.isLegalRelated(title, content)) {
          const externalId = item.guid || item.link || `${this.name}-${Date.now()}-${Math.random()}`;
          
          legalCases.push({
            source: 'NewsRSS',
            externalId,
            title,
            content: content.substring(0, 1000), // 限制長度
            category: this.guessCategory(title, content),
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            url: item.link || '',
            tags: item.categories || []
          });
        }
      }
      
      console.log(`  Found ${legalCases.length} legal-related article(s) from ${this.name}`);
      return legalCases;
      
    } catch (error) {
      console.error(`  Error fetching RSS from ${this.rssUrl}:`, error instanceof Error ? error.message : error);
      return [];
    }
  }
}
