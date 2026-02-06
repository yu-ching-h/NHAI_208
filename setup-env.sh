#!/bin/bash

# 環境變數快速設定腳本

echo "🚀 內湖高中資訊成發 - 環境變數設定"
echo "=================================="
echo ""

# 檢查 .env 是否已存在
if [ -f ".env" ]; then
    echo "⚠️  .env 檔案已存在"
    read -p "是否要覆蓋現有的 .env 檔案？(y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 取消設定"
        exit 1
    fi
fi

# 複製範本
echo "📋 複製 .env.example 到 .env..."
cp .env.example .env

echo ""
echo "✅ .env 檔案已創建！"
echo ""
echo "📝 接下來請編輯 .env 檔案，填入你的實際值："
echo ""
echo "   1. Google Apps Script URL"
echo "   2. Google Sheets ID"
echo ""
echo "💡 提示：使用以下指令編輯："
echo "   nano .env"
echo "   或"
echo "   code .env"
echo ""
echo "📖 詳細說明請參考 ENV_SETUP.md"
echo ""
