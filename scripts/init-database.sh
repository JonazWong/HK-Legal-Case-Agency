#!/bin/bash
# 資料庫初始化腳本 - 在 DigitalOcean Console 執行
# Database Initialization Script for DigitalOcean

set -e

echo "🔧 開始資料庫初始化..."
echo "Starting database initialization..."
echo ""

# 1. 推送資料庫結構
echo "📊 Step 1: 推送資料庫 schema..."
npx prisma db push --accept-data-loss
echo "✅ Schema 推送完成！"
echo ""

# 2. 執行種子資料
echo "🌱 Step 2: 建立測試資料..."
npx prisma db seed
echo "✅ 種子資料建立完成！"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 資料庫初始化成功！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 測試帳號："
echo "   Email: owner@wonglaw.hk"
echo "   Password: demo123456"
echo ""
echo "🌐 現在可以登入您的應用程式了！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
