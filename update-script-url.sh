#!/bin/bash

echo "🔄 更新 Google Apps Script URL"
echo "================================"
echo ""
echo "請貼上新的 Google Apps Script 部署網址："
read NEW_URL

if [ -z "$NEW_URL" ]; then
    echo "❌ 錯誤：未輸入網址"
    exit 1
fi

echo ""
echo "正在更新..."
echo ""

# 更新 .env
if [ -f ".env" ]; then
    sed -i.backup "s|GOOGLE_SCRIPT_URL=.*|GOOGLE_SCRIPT_URL=$NEW_URL|" .env
    echo "✅ 已更新 .env"
fi

# 更新 scripts/config.js
if [ -f "scripts/config.js" ]; then
    # 使用 perl 來處理多行替換
    perl -i.backup -pe "s|GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/[^']*'|GOOGLE_SCRIPT_URL: '$NEW_URL'|g" scripts/config.js
    echo "✅ 已更新 scripts/config.js"
fi

echo ""
echo "🎉 更新完成！"
echo ""
echo "新的網址："
echo "$NEW_URL"
echo ""
echo "請測試報名功能："
echo "  open test-register.html"
echo ""
