import { prisma } from '../lib/db';

async function checkNullExternalIds() {
  try {
    const nullCount = await prisma.publicCase.count({
      where: { externalId: { equals: null as any } }
    });

    console.log(`\n📊 NULL externalId 統計`);
    console.log('='.repeat(60));
    console.log(`有 NULL externalId 的案件數: ${nullCount}`);

    if (nullCount > 0) {
      const cases = await prisma.publicCase.findMany({
        where: { externalId: { equals: null as any } },
        select: { id: true, source: true, title: true, caseNumber: true, url: true }
      });

      console.log('\n⚠️  需要修正的案件:');
      console.log('-'.repeat(60));
      cases.forEach((c, i) => {
        console.log(`${i + 1}. ID: ${c.id}`);
        console.log(`   Source: ${c.source}`);
        console.log(`   Title: ${c.title}`);
        console.log(`   CaseNumber: ${c.caseNumber || 'N/A'}`);
        console.log(`   URL: ${c.url || 'N/A'}`);
        console.log('-'.repeat(60));
      });
    } else {
      console.log('✅ 所有案件都有 externalId，可以安全遷移');
    }
  } catch (error) {
    console.error('❌ 查詢錯誤:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkNullExternalIds();
