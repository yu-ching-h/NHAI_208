# Google Sheets 報名系統設定指南

## 📋 概述
這個指南將幫助你設定 Google Apps Script 和 Google Sheets，讓報名表單能夠自動將資料寫入試算表並發送確認郵件。

## 🚀 快速設定步驟

### 步驟 1：創建 Google Sheets
1. 前往 [Google Sheets](https://sheets.google.com)
2. 創建新的試算表
3. 將試算表命名為「內湖高中資訊成發報名資料」
4. 複製試算表的 ID（網址中 `/d/` 和 `/edit` 之間的部分）
5. 將 ID 更新到 `config.js` 和 `google-apps-script.js` 中

### 步驟 2：設定 Google Apps Script
1. 前往 [Google Apps Script](https://script.google.com)
2. 點擊「新專案」
3. 將專案命名為「內湖高中報名系統」
4. 刪除預設程式碼，貼上 `google-apps-script.js` 的完整內容
5. 更新程式碼中的設定：
   ```javascript
   const CONFIG = {
     SPREADSHEET_ID: '你的試算表ID', // 步驟1複製的ID
     SHEET_NAME: '報名資料',
     NOTIFICATION_EMAIL: '1stnhai@gmail.com',
     SEND_CONFIRMATION: true,
   };
   ```

### 步驟 3：部署 Google Apps Script
1. 點擊「部署」→「新增部署作業」
2. 選擇類型：「網路應用程式」
3. 設定：
   - 說明：「內湖高中報名系統 API」
   - 執行身分：「我」
   - 存取權：「任何人」
4. 點擊「部署」
5. 複製「網路應用程式」網址
6. 將網址更新到 `config.js` 中的 `GOOGLE_SCRIPT_URL`

### 步驟 4：測試系統
1. 在 Google Apps Script 中執行 `testFunction()` 函數
2. 授權必要的權限（Sheets 和 Gmail）
3. 檢查 Google Sheets 是否有測試資料
4. 檢查是否收到測試郵件

### 步驟 5：更新前端設定
1. 編輯 `config.js`：
   ```javascript
   const CONFIG = {
     GOOGLE_SCRIPT_URL: '你的Google Apps Script網址',
     SPREADSHEET_ID: '你的試算表ID',
     // ... 其他設定
   };
   ```

## 📊 試算表結構
系統會自動創建以下欄位：
- 報名時間
- 姓名
- 電子郵件
- 職稱/身份
- 最感興趣的專題
- 對活動的期待
- 狀態

## 📧 郵件功能
系統會自動發送兩種郵件：
1. **管理員通知郵件**：每次有新報名時發送到 `1stnhai@gmail.com`
2. **報名確認郵件**：發送給報名者確認報名成功

## 🔧 進階設定

### 自訂郵件範本
在 `google-apps-script.js` 中修改 `sendConfirmationEmail` 和 `sendNotificationEmail` 函數。

### 修改試算表欄位
在 `writeToSheet` 函數中修改 `headers` 和 `rowData` 陣列。

### 新增資料驗證
在 `doPost` 函數中新增更多驗證邏輯。

## 🛠️ 故障排除

### 常見問題

**問題 1：表單提交後沒有資料寫入試算表**
- 檢查 Google Apps Script 網址是否正確
- 確認試算表 ID 是否正確
- 檢查 Google Apps Script 的執行權限

**問題 2：沒有收到確認郵件**
- 檢查垃圾郵件資料夾
- 確認 Gmail API 權限已授權
- 檢查郵件地址是否正確

**問題 3：CORS 錯誤**
- 確保使用 `mode: 'no-cors'` 
- Google Apps Script 必須部署為「任何人」都可存取

### 除錯方法
1. 開啟瀏覽器開發者工具查看 Console 訊息
2. 在 Google Apps Script 中查看執行記錄
3. 檢查 Google Sheets 的編輯記錄

## 🔒 安全性考量
- Google Apps Script 已設定適當的資料驗證
- 敏感資訊不會暴露在前端程式碼中
- 使用 Google 的安全基礎設施

## 📱 測試清單
- [ ] Google Sheets 創建完成
- [ ] Google Apps Script 部署完成
- [ ] 前端設定更新完成
- [ ] 測試函數執行成功
- [ ] 表單提交測試成功
- [ ] 郵件發送測試成功
- [ ] 資料正確寫入試算表

## 🎯 完成後的功能
✅ 自動將報名資料寫入 Google Sheets  
✅ 發送確認郵件給報名者  
✅ 發送通知郵件給管理員  
✅ 美觀的郵件範本  
✅ 完整的錯誤處理  
✅ 資料驗證和安全性  

---

如有任何問題，請聯絡：
📧 Email: 1stnhai@gmail.com  
📱 Instagram: @nhai1st_208