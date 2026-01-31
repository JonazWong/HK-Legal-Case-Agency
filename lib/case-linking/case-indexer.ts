/**
 * 智能案件連結索引器
 * 自動從新聞、文件中提取案件編號並建立索引
 */

import { prisma } from '@/lib/db';
import { extractCaseNumbers, generateCaseLinks } from './case-number-parser';

export interface CaseReference {
  publicCaseId: number;
  referencedCaseNumber: string;
  sourceType: 'title' | 'content' | 'tags';
  hkliiLink: string | null;
  judiciaryLink: string | null;
  confidence: 'high' | 'medium' | 'low';
}

/**
 * 從 PublicCase 文本中提取案件編號並建立索引
 */
export async function indexPublicCaseReferences(publicCaseId: number): Promise<CaseReference[]> {
  const publicCase = await prisma.publicCase.findUnique({
    where: { id: publicCaseId },
    select: {
      id: true,
      title: true,
      content: true,
      tags: true,
      caseNumber: true,
    },
  });
  
  if (!publicCase) return [];
  
  const references: CaseReference[] = [];
  
  // 從標題提取
  if (publicCase.title) {
    const titleCases = extractCaseNumbers(publicCase.title);
    for (const caseInfo of titleCases) {
      const links = generateCaseLinks(caseInfo);
      references.push({
        publicCaseId,
        referencedCaseNumber: caseInfo.fullNumber,
        sourceType: 'title',
        hkliiLink: links?.hklii || null,
        judiciaryLink: links?.judiciary || null,
        confidence: 'high', // 標題中出現的可信度高
      });
    }
  }
  
  // 從內容提取
  if (publicCase.content) {
    const contentCases = extractCaseNumbers(publicCase.content);
    for (const caseInfo of contentCases) {
      // 避免重複（標題已經提取過的）
      if (references.some(r => r.referencedCaseNumber === caseInfo.fullNumber)) {
        continue;
      }
      
      const links = generateCaseLinks(caseInfo);
      references.push({
        publicCaseId,
        referencedCaseNumber: caseInfo.fullNumber,
        sourceType: 'content',
        hkliiLink: links?.hklii || null,
        judiciaryLink: links?.judiciary || null,
        confidence: 'medium', // 內容中出現的可信度中等
      });
    }
  }
  
  // 從標籤提取
  if (publicCase.tags) {
    const tagCases = extractCaseNumbers(publicCase.tags);
    for (const caseInfo of tagCases) {
      if (references.some(r => r.referencedCaseNumber === caseInfo.fullNumber)) {
        continue;
      }
      
      const links = generateCaseLinks(caseInfo);
      references.push({
        publicCaseId,
        referencedCaseNumber: caseInfo.fullNumber,
        sourceType: 'tags',
        hkliiLink: links?.hklii || null,
        judiciaryLink: links?.judiciary || null,
        confidence: 'high', // 標籤中的可信度高
      });
    }
  }
  
  return references;
}

/**
 * 批量索引所有 PublicCase
 */
export async function indexAllPublicCases(): Promise<number> {
  const allCases = await prisma.publicCase.findMany({
    select: { id: true },
  });
  
  let totalReferences = 0;
  
  for (const publicCase of allCases) {
    const references = await indexPublicCaseReferences(publicCase.id);
    totalReferences += references.length;
    
    // 這裡可以將 references 儲存到資料庫
    // 目前只是統計數量
  }
  
  return totalReferences;
}

/**
 * 根據案件編號查找相關的 PublicCase
 */
export async function findRelatedPublicCases(caseNumber: string): Promise<number[]> {
  const cases = await prisma.publicCase.findMany({
    where: {
      OR: [
        { title: { contains: caseNumber, mode: 'insensitive' } },
        { content: { contains: caseNumber, mode: 'insensitive' } },
        { tags: { contains: caseNumber, mode: 'insensitive' } },
        { caseNumber: caseNumber },
      ],
    },
    select: { id: true },
  });
  
  return cases.map(c => c.id);
}

/**
 * 增強版：在儲存 PublicCase 時自動提取並更新案件編號欄位
 */
export async function enhancePublicCaseWithCaseNumber(
  title: string,
  content: string | null
): Promise<string | null> {
  // 優先從標題提取
  const titleCases = extractCaseNumbers(title);
  if (titleCases.length > 0) {
    return titleCases[0].fullNumber;
  }
  
  // 其次從內容提取
  if (content) {
    const contentCases = extractCaseNumbers(content);
    if (contentCases.length > 0) {
      return contentCases[0].fullNumber;
    }
  }
  
  return null;
}
