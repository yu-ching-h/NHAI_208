# 📝 Google Apps Script 設定指南

## ⚠️ 重要說明

`google-apps-script.js` 檔案包含敏感資訊（Spreadsheet ID、Email），**不應該提交到 Git**。

## 🔒 安全設定

### 檔案狀態

| 檔案 | 用途 | 是否提交到 Git |
|------|------|---------------|
| `scripts/google-apps-script.js` | 實際使用的檔案（包含敏感資訊） | ❌ 不提交 |
| `scripts/google-apps-script.template.js` | 範本檔案（不含敏感資訊） | ✅ 可提交 |

### .gitignore 設定

已將以下檔案加入 `.gitignore`：
```
google-apps-script.js
scripts/google-apps-script.js
```

## 🚀 使用方式

### 方法 1：直接在 Google Apps Script 編輯器中使用（推薦）⭐

1. **前往 Google Apps Script**
   - 開啟 [script.google.com](https://script.google.com)
   - 點擊「新專案」

2. **複製程式碼**
   - 開啟 `scripts/google-apps-script.template.js`
   - 複製所有內容
   - 貼到 Google Apps Script 編輯器

3. **修改設定**
   ```javascript
   const CONFIG = {
     SPREADSHEET_ID: '你的實際Sheets ID',
     SHEET_NAME: '報名資料',
     NOTIFICATION_EMAIL: '你的實際Email',
     SEND_CONFIRMATION: true,
   };
   ```

4. **部署**
   - 點擊「部署」→「新增部署作業」
   - 選擇「網路應用程式」
   - 執行身分：「我」
   - 存取權：「任何人」
   - 點擊「部署」

5. **複製網址**
   - 複製「網路應用程式」網址
   - 更新到 `scripts/config.js` 的 `PRODUCTION_CONFIG.GOOGLE_SCRIPT_URL`

### 方法 2：本地保留檔案（不推薦）

如果你想在本地保留 `google-apps-script.js`：

1. **確認已加入 .gitignore**
   ```bash
   # 檢查 .gitignore
   cat .gitignore | grep google-apps-script
   
   # 應該看到：
   # google-apps-script.js
   # scripts/google-apps-script.js
   ```

2. **從 Git 移除（如果已經被追蹤）**
   ```bash
   git rm --cached scripts/google-apps-script.js
   ```

3. **確認狀態**
   ```bash
   git status
   # google-apps-script.js 不應該出現在列表中
   ```

## 🔍 檢查清單

在提交程式碼前，請確認：

- [ ] `google-apps-script.js` 已加入 `.gitignore`
- [ ] `google-apps-script.js` 不在 `git status` 列表中
- [ ] `google-apps-script.template.js` 不包含敏感資訊
- [ ] 已將實際的程式碼部署到 Google Apps Script 平台

## 📊 檔案流程圖

```
開發流程：
1. 使用 google-apps-script.template.js 作為範本
2. 複製到 Google Apps Script 編輯器
3. 填入實際的敏感資訊
4. 部署到 Google 平台
5. 複製部署網址到 scripts/config.js

Git 流程：
1. google-apps-script.js 在 .gitignore 中 ✅
2. 只提交 google-apps-script.template.js ✅
3. 敏感資訊不會洩露 ✅
```

## 🆘 如果不小心提交了敏感資訊

### 步驟 1：從 Git 移除
```bash
# 從暫存區移除
git restore --staged scripts/google-apps-script.js

# 或從歷史記錄中完全移除（如果已經 commit）
git rm --cached scripts/google-apps-script.js
git commit -m "Remove sensitive file"
```

### 步驟 2：更新敏感資訊
如果檔案已經被推送到遠端：
1. 更改 Google Sheets ID（創建新的試算表）
2. 重新部署 Google Apps Script（獲得新的網址）
3. 更新 `scripts/config.js` 中的設定

### 步驟 3：確認 .gitignore
```bash
# 確認 .gitignore 包含
echo "scripts/google-apps-script.js" >> .gitignore
git add .gitignore
git commit -m "Add google-apps-script.js to .gitignore"
```

## 💡 最佳實踐

1. **永遠不要**將包含敏感資訊的檔案提交到 Git
2. **使用範本檔案**（`.template.js`）分享程式碼結構
3. **在 Google 平台上**管理實際的程式碼
4. **定期檢查** `git status` 確保沒有敏感檔案被追蹤

## 📞 需要協助？

如有問題，請參考：
- 📖 `ENV_SETUP.md` - 環境變數設定
- 🔒 `SECURITY_SETUP_COMPLETE.md` - 安全設定
- 📧 Email: 1stnhai@gmail.com
- 📱 Instagram: @nhai1st_208

---

**記住：敏感資訊應該只存在於 Google Apps Script 平台，不要提交到 Git！** 🔒
