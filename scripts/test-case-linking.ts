/**
 * 測試案件編號解析與連結生成功能
 */

import {
  extractCaseNumbers,
  parseCaseNumber,
  generateCaseLinks,
  extractAndLinkCaseNumbers,
} from '../lib/case-linking/case-number-parser';

console.log('='.repeat(60));
console.log('測試案件編號解析器');
console.log('='.repeat(60));

// 測試文本
const testTexts = [
  '高等法院今日就 HCAL 123/2024 一案作出裁決',
  '終審法院審理 FACV 1/2023 上訴案，判決上訴得直',
  '本案涉及 DCCC 456/2024 及 HCMP 789/2023 兩宗案件',
  'The court ruled on HCAL 999/2022 and FACC 10/2021',
  '區域法院刑事案件 DCCJ 100/2024 今日開審',
];

testTexts.forEach((text, index) => {
  console.log(`\n測試 ${index + 1}: ${text}`);
  console.log('─'.repeat(60));
  
  const results = extractAndLinkCaseNumbers(text);
  
  if (results.length === 0) {
    console.log('  ❌ 沒有找到案件編號');
    return;
  }
  
  results.forEach((result) => {
    console.log(`\n  ✅ 找到案件: ${result.caseInfo.fullNumber}`);
    console.log(`     法院: ${result.caseInfo.courtName}`);
    console.log(`     類型: ${result.caseInfo.caseType}`);
    console.log(`     級別: ${result.caseInfo.courtLevel}`);
    console.log(`     年份: ${result.caseInfo.year}`);
    
    if (result.links.hklii) {
      console.log(`     🔗 HKLII: ${result.links.hklii}`);
    }
    if (result.links.judiciary) {
      console.log(`     ⚖️  司法: ${result.links.judiciary}`);
    }
  });
});

// 測試單一解析
console.log('\n' + '='.repeat(60));
console.log('測試單一案件編號解析');
console.log('='.repeat(60));

const singleCase = 'HCAL 123/2024';
const parsed = parseCaseNumber(singleCase);

if (parsed) {
  console.log(`\n案件編號: ${parsed.fullNumber}`);
  console.log(`法院代碼: ${parsed.courtCode}`);
  console.log(`序號: ${parsed.caseSequence}`);
  console.log(`年份: ${parsed.year}`);
  console.log(`法院名稱: ${parsed.courtName}`);
  console.log(`案件類型: ${parsed.caseType}`);
  
  const links = generateCaseLinks(parsed);
  if (links) {
    console.log('\n生成的連結:');
    if (links.hklii) console.log(`  HKLII: ${links.hklii}`);
    if (links.judiciary) console.log(`  司法機構: ${links.judiciary}`);
    if (links.legalRef) console.log(`  法律參考: ${links.legalRef}`);
  }
}

// 測試支援的法院代碼
console.log('\n' + '='.repeat(60));
console.log('支援的法院代碼範例');
console.log('='.repeat(60));

const exampleCodes = [
  'FACV 1/2024 - 終審法院民事上訴',
  'FACC 2/2024 - 終審法院刑事上訴',
  'HCAL 123/2024 - 高等法院民事上訴',
  'HCMP 456/2024 - 高等法院雜項案件',
  'DCCC 789/2024 - 區域法院刑事案件',
  'KCCC 100/2024 - 九龍城裁判法院',
  'ESCC 200/2024 - 東區裁判法院',
];

console.log('\n');
exampleCodes.forEach(example => {
  const [caseNum] = example.split(' - ');
  const result = parseCaseNumber(caseNum);
  if (result) {
    console.log(`✅ ${example}`);
  } else {
    console.log(`❌ ${example}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('測試完成');
console.log('='.repeat(60));
