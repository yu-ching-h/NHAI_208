# 🔧 報名系統故障排除指南

## 📊 你的測試結果

根據除錯日誌：
- ✅ 前端設定正確
- ✅ 請求成功發送
- ⚠️ 需要檢查後端（Google Apps Script）

## 🎯 問題診斷步驟

### 步驟 1：檢查 Google Sheets 是否有資料

1. **開啟 Google Sheets**
   ```
   https://docs.google.com/spreadsheets/d/1CIFg1CDjl55By3sLNqETeZnd6Rf9TynGESD_AU4Ps0c/edit
   ```

2. **查看「報名資料」工作表**
   - 應該有標題列：報名時間、姓名、電子郵件...
   - 應該有測試資料：測試用戶、test@example.com

3. **結果判斷**
   - ✅ 有資料 → 系統正常運作！
   - ❌ 沒有資料 → 繼續步驟 2

---

### 步驟 2：檢查 Google Apps Script 執行記錄

1. **前往 Google Apps Script**
   - 開啟 [script.google.com](https://script.google.com)
   - 找到你的專案

2. **查看執行記錄**
   - 點擊左側「執行」圖示（⚡）
   - 查看最近的執行記錄
   - 尋找錯誤訊息

3. **常見錯誤**

   #### 錯誤 A：找不到試算表
   ```
   Exception: Spreadsheet not found
   ```
   **解決方法：**
   - 檢查 `SPREADSHEET_ID` 是否正確
   - 確認試算表存在且有權限

   #### 錯誤 B：權限不足
   ```
   Exception: You do not have permission
   ```
   **解決方法：**
   - 在 Google Apps Script 中執行 `testFunction()`
   - 授權必要的權限（Sheets 和 Gmail）

   #### 錯誤 C：郵件發送失敗
   ```
   Exception: Mail service not allowed
   ```
   **解決方法：**
   - 檢查 Gmail API 權限
   - 確認 `NOTIFICATION_EMAIL` 正確

---

### 步驟 3：手動測試 Google Apps Script

1. **在 Google Apps Script 編輯器中**
   - 選擇函數：`testFunction`
   - 點擊「執行」（▶️）

2. **首次執行需要授權**
   - 點擊「審查權限」
   - 選擇你的 Google 帳號
   - 點擊「進階」→「前往專案（不安全）」
   - 點擊「允許」

3. **查看執行結果**
   - 檢查 Google Sheets 是否有新資料
   - 檢查是否收到測試郵件

---

### 步驟 4：檢查部署設定

1. **在 Google Apps Script 中**
   - 點擊「部署」→「管理部署作業」

2. **確認設定**
   - 類型：網路應用程式 ✅
   - 執行身分：我 ✅
   - 存取權：**任何人** ✅（重要！）

3. **如果設定錯誤**
   - 點擊「編輯」
   - 修改「存取權」為「任何人」
   - 點擊「部署」
   - **複製新的網址**並更新到 `.env` 和 `scripts/config.js`

---

## 🔧 快速修復方案

### 方案 1：重新部署 Google Apps Script

如果一切設定都正確但還是不行：

1. **在 Google Apps Script 中**
   - 點擊「部署」→「新增部署作業」
   - 選擇「網路應用程式」
   - 執行身分：我
   - 存取權：任何人
   - 點擊「部署」

2. **複製新的部署網址**

3. **更新設定**
   ```bash
   # 編輯 .env
   nano .env
   # 更新 GOOGLE_SCRIPT_URL
   
   # 編輯 scripts/config.js
   nano scripts/config.js
   # 更新 PRODUCTION_CONFIG.GOOGLE_SCRIPT_URL
   ```

4. **測試**
   ```bash
   open debug-registration.html
   ```

---

### 方案 2：檢查 Google Apps Script 程式碼

確認 `google-apps-script.js` 中的設定：

```javascript
const CONFIG = {
  SPREADSHEET_ID: '1CIFg1CDjl55By3sLNqETeZnd6Rf9TynGESD_AU4Ps0c', // ✅ 正確
  SHEET_NAME: '報名資料', // ✅ 正確
  NOTIFICATION_EMAIL: '1stnhai@gmail.com', // ✅ 正確
  SEND_CONFIRMATION: true,
};
```

---

## 📋 檢查清單

請依序檢查：

- [ ] Google Sheets 是否存在且有權限
- [ ] Google Sheets ID 是否正確
- [ ] Google Apps Script 是否已授權
- [ ] Google Apps Script 部署設定是否正確（存取權：任何人）
- [ ] 執行 `testFunction()` 是否成功
- [ ] Google Sheets 是否有測試資料
- [ ] 是否收到測試郵件

---

## 🆘 還是不行？

### 檢查瀏覽器 Console

1. 按 `F12` 開啟開發者工具
2. 切換到「Console」標籤
3. 重新提交表單
4. 查看是否有紅色錯誤訊息

### 常見 Console 錯誤

#### CORS 錯誤
```
Access to fetch at '...' has been blocked by CORS policy
```
**解決：** 確認 Google Apps Script 部署時選擇「任何人」

#### 網路錯誤
```
Failed to fetch
```
**解決：** 檢查網路連線，確認 URL 正確

---

## 💡 測試建議

### 最簡單的測試方法

1. **直接在瀏覽器開啟 Google Apps Script URL**
   ```
   https://script.google.com/macros/s/AKfycbx8iLPRuZGJGsuYgz2G6kj6NSS2ylpfMaWcS_zqcOoUUTIXQixYjBRDQd34AnsC5NSQ/exec
   ```

2. **應該看到**
   ```
   內湖高中資訊成發報名系統 API 運作正常
   ```

3. **如果看不到**
   - URL 不正確
   - 部署失敗
   - 權限問題

---

## 📞 需要協助？

請提供以下資訊：
1. Google Sheets 是否有資料？
2. Google Apps Script 執行記錄中的錯誤訊息
3. 瀏覽器 Console 的錯誤訊息
4. `testFunction()` 執行結果

---

**記住：前端已經正常運作，問題通常在 Google Apps Script 的設定或權限！** 🔧
