# 🔒 敏感資訊洩露修復指南

## 🚨 問題說明

你的 `google-apps-script.js` 檔案已經被提交到 Git 歷史記錄中，並且已經推送到 GitHub。這意味著：

- ⚠️ Spreadsheet ID 已公開
- ⚠️ Notification Email 已公開
- ⚠️ 任何人都可以在 Git 歷史中看到這些資訊

## 🎯 解決方案

### 方案 1：更換敏感資訊（推薦）⭐

這是**最安全且最簡單**的方法：

#### 步驟 1：創建新的 Google Sheets

1. 前往 [Google Sheets](https://sheets.google.com)
2. 創建一個**新的**試算表
3. 命名為「內湖高中資訊成發報名資料 v2」
4. 複製新的 Spreadsheet ID

#### 步驟 2：重新部署 Google Apps Script

1. 前往 [Google Apps Script](https://script.google.com)
2. 開啟你的專案
3. 更新 `SPREADSHEET_ID` 為新的 ID
4. 點擊「部署」→「管理部署作業」
5. 點擊「新增部署作業」（創建新的部署）
6. 複製新的部署網址

#### 步驟 3：更新本地設定

更新 `.env` 檔案：
\`\`\`env
GOOGLE_SCRIPT_URL=新的部署網址
SPREADSHEET_ID=新的Sheets ID
\`\`\`

更新 `scripts/config.js` 中的 `PRODUCTION_CONFIG`：
\`\`\`javascript
const PRODUCTION_CONFIG = {
    GOOGLE_SCRIPT_URL: '新的部署網址',
    SPREADSHEET_ID: '新的Sheets ID',
    // ...
};
\`\`\`

#### 步驟 4：測試新設定

\`\`\`bash
# 開啟測試頁面
open check-env.html

# 測試報名功能
open register.html
\`\`\`

#### 步驟 5：提交更新

\`\`\`bash
git add scripts/config.js
git commit -m "Update production config"
git push
\`\`\`

#### ✅ 完成！

- ✅ 舊的 Spreadsheet ID 已失效（可以刪除舊試算表）
- ✅ 新的設定已生效
- ✅ 即使有人看到舊的 ID，也無法使用

---

### 方案 2：從 Git 歷史中移除（進階）⚠️

**警告：這會改寫 Git 歷史，可能影響其他協作者**

#### 使用 git filter-branch

\`\`\`bash
# 備份你的倉庫
git clone --mirror https://github.com/你的用戶名/你的倉庫.git backup

# 從歷史中移除檔案
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch scripts/google-apps-script.js" \
  --prune-empty --tag-name-filter cat -- --all

# 強制推送（會改寫遠端歷史）
git push origin --force --all
git push origin --force --tags
\`\`\`

#### 使用 BFG Repo-Cleaner（更快）

\`\`\`bash
# 安裝 BFG
brew install bfg  # macOS
# 或從 https://rtyley.github.io/bfg-repo-cleaner/ 下載

# 移除檔案
bfg --delete-files google-apps-script.js

# 清理
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 強制推送
git push origin --force --all
\`\`\`

#### ⚠️ 注意事項

1. **會改寫所有 commit 的 hash**
2. **其他協作者需要重新 clone**
3. **可能破壞 Pull Requests**
4. **無法復原**

---

### 方案 3：使用 GitHub 的 Secret Scanning（自動）

GitHub 會自動掃描敏感資訊，如果檢測到：
- 會發送警告通知
- 建議你更換密鑰

但這**不會自動移除**歷史記錄。

---

## 🎯 推薦做法

### 立即執行（方案 1）

1. ✅ 創建新的 Google Sheets
2. ✅ 重新部署 Google Apps Script
3. ✅ 更新所有設定檔
4. ✅ 刪除舊的試算表（可選）

### 長期安全

1. ✅ 定期更換 API 金鑰
2. ✅ 使用環境變數
3. ✅ 檢查 `.gitignore` 設定
4. ✅ 提交前執行 `git status`

---

## 📋 檢查清單

- [ ] 創建新的 Google Sheets
- [ ] 複製新的 Spreadsheet ID
- [ ] 重新部署 Google Apps Script
- [ ] 複製新的部署網址
- [ ] 更新 `.env` 檔案
- [ ] 更新 `scripts/config.js`
- [ ] 測試報名功能
- [ ] 提交並推送更新
- [ ] 刪除舊的試算表（可選）

---

## 🔍 驗證

### 檢查舊的 ID 是否還在使用

\`\`\`bash
# 搜尋舊的 Spreadsheet ID
grep -r "1jV6HgJJb1UgMy2fBVxEpQSUX5x_YtPFs6wMAfpQBhdE" .

# 應該只在 Git 歷史中找到，不在當前檔案中
\`\`\`

### 測試新設定

1. 開啟 `register.html`
2. 填寫測試報名
3. 檢查新的 Google Sheets 是否有資料
4. 檢查是否收到確認郵件

---

## 💡 為什麼方案 1 最好？

| 方案 | 優點 | 缺點 | 難度 |
|------|------|------|------|
| 方案 1：更換資訊 | ✅ 簡單<br>✅ 安全<br>✅ 不影響協作 | ⚠️ 需要手動更新 | ⭐ 簡單 |
| 方案 2：清理歷史 | ✅ 完全移除 | ❌ 改寫歷史<br>❌ 影響協作<br>❌ 複雜 | ⭐⭐⭐ 困難 |
| 方案 3：依賴 GitHub | ✅ 自動 | ❌ 不移除歷史<br>❌ 僅警告 | ⭐ 簡單 |

---

## 📞 需要協助？

如有問題，請參考：
- 📖 `GOOGLE_APPS_SCRIPT_GUIDE.md` - Google Apps Script 設定
- 📖 `ENV_SETUP.md` - 環境變數設定
- 📧 Email: 1stnhai@gmail.com
- 📱 Instagram: @nhai1st_208

---

**記住：更換敏感資訊比清理 Git 歷史更簡單、更安全！** 🔒
