# 📋 Google Apps Script + Sheets 設置指南

## 🚀 完整設置步驟

### 第一步：創建 Google Sheets
1. 前往 [sheets.google.com](https://sheets.google.com)
2. 創建新的試算表
3. 命名為：`內湖高中資訊成發報名資料`
4. 複製網址中的 Spreadsheet ID（在 `/d/` 和 `/edit` 之間的部分）

### 第二步：設置 Google Apps Script
1. 前往 [script.google.com](https://script.google.com)
2. 點擊 "新專案"
3. 將專案命名為：`內湖高中報名系統`
4. 刪除預設代碼，貼上 `google-apps-script.js` 中的完整代碼
5. 修改 CONFIG 區域：
   ```javascript
   const CONFIG = {
     SPREADSHEET_ID: '你的_SPREADSHEET_ID', // 步驟一取得的 ID
     SHEET_NAME: '報名資料',
     NOTIFICATION_EMAIL: '1stnhai@gmail.com',
     SEND_CONFIRMATION: true,
   };
   ```

### 第三步：授權和部署
1. 點擊 "儲存" (Ctrl+S)
2. 點擊 "執行" 按鈕測試（會要求授權）
3. 授權存取 Google Sheets 和 Gmail
4. 點擊右上角 "部署" → "新增部署作業"
5. 選擇類型：網路應用程式
6. 執行身分：我
7. 存取權：任何人
8. 點擊 "部署"
9. **複製網路應用程式網址**

### 第四步：更新前端代碼
在 `scripts/main.js` 中找到這行：
```javascript
const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
```
將 `YOUR_GOOGLE_APPS_SCRIPT_URL` 替換為步驟三取得的網址

### 第五步：測試系統
1. 在 Google Apps Script 中執行 `testFunction` 函數
2. 檢查 Google Sheets 是否有測試資料
3. 檢查是否收到測試郵件
4. 在網頁上測試報名表單

## ✨ 功能特色

### 📊 自動化 Google Sheets
- 自動創建標題列
- 美化表格格式
- 自動調整欄寬
- 即時資料更新

### 📧 雙重郵件通知
- **管理員通知**：每次報名都會發送詳細資訊到 `1stnhai@gmail.com`
- **報名確認**：自動發送美觀的確認郵件給報名者

### 🛡️ 安全性和驗證
- 必填欄位驗證
- 錯誤處理機制
- CORS 支援
- 防止重複提交

### 📱 用戶體驗
- 保持原有美觀設計
- 即時提交狀態顯示
- 自動跳轉感謝頁面
- 友善錯誤訊息

## 🔧 進階設定

### 自訂郵件模板
在 `sendConfirmationEmail` 函數中修改 HTML 模板

### 添加更多欄位
1. 在前端 HTML 添加新欄位
2. 在 JavaScript 的 data 物件中添加對應欄位
3. 在 Apps Script 的 `writeToSheet` 函數中添加到 headers 和 rowData

### 設定自動回覆規則
可在 Gmail 中設定自動標籤和篩選器來管理報名郵件

## 🚨 故障排除

### 常見問題
1. **403 錯誤**：檢查 Apps Script 部署權限設定
2. **CORS 錯誤**：確認 Apps Script 已正確部署為網路應用程式
3. **郵件未收到**：檢查垃圾郵件資料夾，確認 Gmail API 權限
4. **資料未寫入**：檢查 Spreadsheet ID 是否正確

### 測試步驟
1. 先在 Apps Script 中執行 `testFunction`
2. 檢查 Google Sheets 和郵件
3. 再測試前端表單提交

## 📈 數據分析

Google Sheets 會自動收集：
- 報名時間趨勢
- 身份分布統計
- 專題興趣分析
- 期待內容分類

可使用 Google Sheets 的圖表功能製作視覺化報表！

---

**🎉 設置完成後，你就擁有一個完全免費、無限制、功能完整的報名系統！**