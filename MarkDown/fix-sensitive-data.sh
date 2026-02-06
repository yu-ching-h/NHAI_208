#!/bin/bash

# 敏感資訊修復腳本

echo "🔒 敏感資訊修復助手"
echo "===================="
echo ""
echo "⚠️  警告：你的 google-apps-script.js 已經在 Git 歷史中"
echo ""
echo "請選擇修復方案："
echo ""
echo "1. 更換敏感資訊（推薦）⭐"
echo "   - 創建新的 Google Sheets"
echo "   - 重新部署 Google Apps Script"
echo "   - 更新設定檔"
echo ""
echo "2. 從 Git 歷史中移除（進階）⚠️"
echo "   - 使用 git filter-branch"
echo "   - 會改寫 Git 歷史"
echo "   - 影響其他協作者"
echo ""
echo "3. 查看詳細指南"
echo ""
read -p "請選擇 (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "📋 方案 1：更換敏感資訊"
        echo "========================"
        echo ""
        echo "請按照以下步驟操作："
        echo ""
        echo "步驟 1：創建新的 Google Sheets"
        echo "  1. 前往 https://sheets.google.com"
        echo "  2. 創建新試算表"
        echo "  3. 複製新的 Spreadsheet ID"
        echo ""
        read -p "已完成？按 Enter 繼續..."
        echo ""
        read -p "請輸入新的 Spreadsheet ID: " new_sheet_id
        echo ""
        
        echo "步驟 2：重新部署 Google Apps Script"
        echo "  1. 前往 https://script.google.com"
        echo "  2. 更新 SPREADSHEET_ID"
        echo "  3. 創建新的部署"
        echo "  4. 複製新的部署網址"
        echo ""
        read -p "已完成？按 Enter 繼續..."
        echo ""
        read -p "請輸入新的 Google Apps Script URL: " new_script_url
        echo ""
        
        echo "步驟 3：更新設定檔"
        echo ""
        
        # 更新 .env
        if [ -f ".env" ]; then
            echo "更新 .env 檔案..."
            sed -i.backup "s|GOOGLE_SCRIPT_URL=.*|GOOGLE_SCRIPT_URL=$new_script_url|" .env
            sed -i.backup "s|SPREADSHEET_ID=.*|SPREADSHEET_ID=$new_sheet_id|" .env
            echo "✅ .env 已更新"
        fi
        
        echo ""
        echo "⚠️  請手動更新 scripts/config.js 中的 PRODUCTION_CONFIG"
        echo ""
        echo "將以下內容更新到 scripts/config.js："
        echo ""
        echo "const PRODUCTION_CONFIG = {"
        echo "    GOOGLE_SCRIPT_URL: '$new_script_url',"
        echo "    SPREADSHEET_ID: '$new_sheet_id',"
        echo "    // ..."
        echo "};"
        echo ""
        read -p "已完成？按 Enter 繼續..."
        echo ""
        
        echo "步驟 4：測試新設定"
        echo ""
        echo "請開啟 check-env.html 測試設定"
        echo "然後開啟 register.html 測試報名功能"
        echo ""
        read -p "測試完成？按 Enter 繼續..."
        echo ""
        
        echo "步驟 5：提交更新"
        echo ""
        read -p "是否要提交更新？(y/N) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add scripts/config.js
            git commit -m "Update production config with new credentials"
            echo ""
            echo "✅ 已提交更新"
            echo ""
            read -p "是否要推送到遠端？(y/N) " -n 1 -r
            echo ""
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                git push
                echo "✅ 已推送到遠端"
            fi
        fi
        
        echo ""
        echo "🎉 完成！"
        echo ""
        echo "建議："
        echo "  - 刪除舊的 Google Sheets（可選）"
        echo "  - 測試報名功能是否正常"
        echo ""
        ;;
        
    2)
        echo ""
        echo "⚠️  警告：此操作會改寫 Git 歷史"
        echo ""
        echo "這會："
        echo "  - 改變所有 commit 的 hash"
        echo "  - 影響其他協作者"
        echo "  - 可能破壞 Pull Requests"
        echo "  - 無法復原"
        echo ""
        read -p "確定要繼續嗎？(yes/no) " confirm
        
        if [ "$confirm" != "yes" ]; then
            echo "已取消"
            exit 0
        fi
        
        echo ""
        echo "備份倉庫..."
        git clone --mirror . ../backup-$(date +%Y%m%d-%H%M%S)
        echo "✅ 已備份到 ../backup-* 資料夾"
        echo ""
        
        echo "從歷史中移除檔案..."
        git filter-branch --force --index-filter \
          "git rm --cached --ignore-unmatch scripts/google-apps-script.js google-apps-script.js" \
          --prune-empty --tag-name-filter cat -- --all
        
        echo ""
        echo "清理..."
        git reflog expire --expire=now --all
        git gc --prune=now --aggressive
        
        echo ""
        echo "✅ 已從歷史中移除檔案"
        echo ""
        echo "下一步："
        echo "  git push origin --force --all"
        echo "  git push origin --force --tags"
        echo ""
        echo "⚠️  警告：這會改寫遠端歷史"
        echo ""
        read -p "是否要強制推送？(yes/no) " push_confirm
        
        if [ "$push_confirm" = "yes" ]; then
            git push origin --force --all
            git push origin --force --tags
            echo "✅ 已強制推送"
        fi
        ;;
        
    3)
        echo ""
        echo "📖 詳細指南"
        echo "============"
        echo ""
        echo "請查看以下文件："
        echo "  - MarkDown/SECURITY_FIX_GUIDE.md"
        echo "  - MarkDown/GOOGLE_APPS_SCRIPT_GUIDE.md"
        echo ""
        
        if command -v open &> /dev/null; then
            read -p "是否要開啟指南？(y/N) " -n 1 -r
            echo ""
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                open MarkDown/SECURITY_FIX_GUIDE.md
            fi
        fi
        ;;
        
    *)
        echo "無效的選擇"
        exit 1
        ;;
esac

echo ""
echo "需要更多協助？請查看 MarkDown/SECURITY_FIX_GUIDE.md"
echo ""
