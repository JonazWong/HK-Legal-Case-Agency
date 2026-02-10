# 資料庫初始化腳本 - 在 DigitalOcean Console 執行
# Database Initialization Script for DigitalOcean

Write-Host "🔧 開始資料庫初始化..." -ForegroundColor Cyan
Write-Host "Starting database initialization..." -ForegroundColor Gray
Write-Host ""

# 1. 推送資料庫結構
Write-Host "📊 Step 1: 推送資料庫 schema..." -ForegroundColor Yellow
npx prisma db push --accept-data-loss
Write-Host "✅ Schema 推送完成！" -ForegroundColor Green
Write-Host ""

# 2. 執行種子資料
Write-Host "🌱 Step 2: 建立測試資料..." -ForegroundColor Yellow
npx prisma db seed
Write-Host "✅ 種子資料建立完成！" -ForegroundColor Green
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "🎉 資料庫初始化成功！" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "📝 測試帳號：" -ForegroundColor Cyan
Write-Host "   Email: owner@wonglaw.hk" -ForegroundColor White
Write-Host "   Password: demo123456" -ForegroundColor White
Write-Host ""
Write-Host "🌐 現在可以登入您的應用程式了！" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
