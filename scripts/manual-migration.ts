import { prisma } from '../lib/db';

async function manualMigration() {
  try {
    console.log('\n🔧 開始手動遷移...\n');

    // Step 1: Drop PublicTrackingConfig
    console.log('1. 刪除廢棄的 PublicTrackingConfig 表...');
    await prisma.$executeRawUnsafe('DROP TABLE IF EXISTS "PublicTrackingConfig"');
    console.log('   ✅ 完成\n');

    // Step 2: Verify no NULL externalId
    console.log('2. 檢查 NULL externalId...');
    const nullCount: any = await prisma.$queryRawUnsafe(
      'SELECT COUNT(*) as count FROM "PublicCase" WHERE "externalId" IS NULL'
    );
    console.log(`   發現 ${nullCount[0].count} 筆 NULL externalId`);
    
    if (parseInt(nullCount[0].count) > 0) {
      console.log('   ❌ 錯誤：有 NULL 的 externalId，無法繼續');
      process.exit(1);
    }
    console.log('   ✅ 完成\n');

    // Step 3: Make externalId NOT NULL
    console.log('3. 將 externalId 設為必填...');
    await prisma.$executeRawUnsafe(
      'ALTER TABLE "PublicCase" ALTER COLUMN "externalId" SET NOT NULL'
    );
    console.log('   ✅ 完成\n');

    // Step 4: Verify
    console.log('4. 驗證變更...');
    const result: any = await prisma.$queryRawUnsafe(`
      SELECT column_name, is_nullable, data_type
      FROM information_schema.columns 
      WHERE table_name = 'PublicCase' AND column_name = 'externalId'
    `);
    
    console.log(`   欄位: ${result[0].column_name}`);
    console.log(`   允許 NULL: ${result[0].is_nullable}`);
    console.log(`   資料型別: ${result[0].data_type}`);
    console.log('   ✅ 完成\n');

    console.log('🎉 遷移成功完成！');
  } catch (error) {
    console.error('❌ 遷移失敗:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

manualMigration();
