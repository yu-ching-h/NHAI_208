# 環境變數設定指南

## 🔒 為什麼需要環境變數？

環境變數可以保護敏感資訊（如 API 金鑰、資料庫 ID）不被提交到 Git 版本控制中，避免資訊洩露。

## 📋 設定步驟

### 1. 複製環境變數範本

```bash
cp .env.example .env
```

### 2. 編輯 `.env` 檔案

開啟 `.env` 檔案，填入你的實際值：

```env
# Google Apps Script 部署網址
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec

# Google Sheets ID
SPREADSHEET_ID=YOUR_ACTUAL_SPREADSHEET_ID

# 其他設定...
```

### 3. 確認 `.gitignore` 設定

確保 `.env` 已經加入 `.gitignore`，這樣就不會被提交到 Git：

```gitignore
# 敏感資訊 - 環境變數
.env
```

## 🔍 如何取得這些值？

### Google Apps Script URL

1. 前往 [Google Apps Script](https://script.google.com)
2. 開啟你的專案
3. 點擊「部署」→「管理部署作業」
4. 複製「網路應用程式」網址

### Google Sheets ID

1. 開啟你的 Google Sheets
2. 從網址列複製 ID（在 `/d/` 和 `/edit` 之間的部分）
   ```
   https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_ID]/edit
   ```

## 📁 檔案結構

```
project/
├── .env                    # 實際的環境變數（不提交到 Git）
├── .env.example           # 環境變數範本（提交到 Git）
├── .gitignore             # Git 忽略清單
├── scripts/
│   ├── config.js          # 設定檔（從 .env 載入）
│   └── env-loader.js      # 環境變數載入器
└── ENV_SETUP.md           # 本說明文件
```

## ⚠️ 重要提醒

1. **絕對不要**將 `.env` 檔案提交到 Git
2. **務必**將 `.env` 加入 `.gitignore`
3. **記得**將 `.env.example` 提交到 Git 作為範本
4. **定期**檢查是否有敏感資訊洩露

## 🧪 測試設定

開啟瀏覽器的開發者工具（F12），查看 Console：

- ✅ 看到「環境變數載入成功」表示設定正確
- ⚠️ 看到「無法載入 .env 檔案」表示需要檢查檔案路徑

## 🚀 部署到生產環境

部署到 GitHub Pages 或其他靜態網站託管服務時：

1. 確保 `.env` 不會被上傳
2. 在託管平台的環境變數設定中加入這些值
3. 或者使用建置工具（如 Vite、Webpack）在建置時注入環境變數

## 🔧 故障排除

### 問題：無法載入環境變數

**解決方法：**
1. 檢查 `.env` 檔案是否存在
2. 檢查檔案路徑是否正確
3. 檢查檔案格式是否正確（KEY=VALUE）

### 問題：環境變數為空

**解決方法：**
1. 確認 `.env` 檔案中有填入實際值
2. 確認沒有多餘的空格或引號
3. 重新載入頁面

## 📞 需要協助？

如有問題，請聯絡：
- 📧 Email: 1stnhai@gmail.com
- 📱 Instagram: @nhai1st_208
