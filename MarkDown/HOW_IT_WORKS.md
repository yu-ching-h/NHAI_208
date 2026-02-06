# 🔍 環境變數系統運作原理

## 📊 簡單回答你的問題

**Q: `.env` 加入 `.gitignore` 之後就算沒有提交 commit 也會正常運作？**

**A: 是的！** 但要分兩種情況：

### 1️⃣ 本地開發（你的電腦）✅

```
你的電腦
├── .env (存在) ✅
├── scripts/config.js (讀取 .env) ✅
└── 報名系統 (正常運作) ✅
```

- `.env` 檔案在你的電腦上
- `scripts/config.js` 可以讀取它
- **完全正常運作** ✅

### 2️⃣ 線上部署（GitHub Pages）⚠️

```
GitHub Pages
├── .env (不存在，因為沒有被 commit) ❌
├── scripts/config.js (使用內建的生產環境設定) ✅
└── 報名系統 (使用內建設定運作) ✅
```

- `.env` 沒有被上傳（因為在 `.gitignore` 中）
- `scripts/config.js` 會自動切換到**生產模式**
- 使用檔案中內建的 `PRODUCTION_CONFIG`
- **仍然正常運作** ✅

## 🎯 我們的解決方案

我已經更新了 `scripts/config.js`，它現在有**雙模式**：

### 開發模式（本地）
```javascript
// 嘗試讀取 .env 檔案
如果找到 .env → 使用 .env 中的設定 ✅
```

### 生產模式（線上）
```javascript
// 找不到 .env 檔案
使用內建的 PRODUCTION_CONFIG ✅
```

## 📁 檔案狀態

| 檔案 | 在 Git 中 | 在你的電腦 | 在 GitHub Pages |
|------|----------|-----------|----------------|
| `.env` | ❌ 不在 | ✅ 存在 | ❌ 不存在 |
| `scripts/config.js` | ✅ 在 | ✅ 存在 | ✅ 存在 |
| `.env.example` | ✅ 在 | ✅ 存在 | ✅ 存在 |

## 🔄 運作流程圖

```
開啟網頁
    ↓
scripts/config.js 載入
    ↓
嘗試讀取 .env 檔案
    ↓
    ├─→ 找到 .env？
    │   ├─→ 是 → 開發模式 → 使用 .env 設定 ✅
    │   └─→ 否 → 生產模式 → 使用內建設定 ✅
    ↓
報名系統正常運作 ✅
```

## 💡 實際例子

### 情境 1：你在本地開發
```bash
# 你的電腦上
ls -la
# 看到：
# .env (存在) ✅
# scripts/config.js (存在) ✅

# 開啟網頁
open register.html

# Console 顯示：
# ✅ 開發模式：從 .env 載入設定
```

### 情境 2：部署到 GitHub Pages
```bash
# GitHub Pages 上
# .env (不存在，因為在 .gitignore) ❌
# scripts/config.js (存在，使用內建設定) ✅

# 訪客開啟網頁
https://你的網站.github.io/register.html

# Console 顯示：
# ✅ 生產模式：使用內建設定
```

### 情境 3：團隊成員 clone 專案
```bash
# 團隊成員的電腦
git clone https://github.com/你的專案.git
cd 專案

# 沒有 .env 檔案 ❌
# 需要自己創建：
cp .env.example .env
nano .env  # 填入設定

# 現在可以正常開發 ✅
```

## 🔐 安全性說明

### 為什麼這樣設計？

1. **本地開發**：使用 `.env` 可以隨時修改測試
2. **版本控制**：`.env` 不會被 commit，保護敏感資訊
3. **線上部署**：使用內建設定，不需要額外配置

### 敏感資訊在哪裡？

```javascript
// scripts/config.js 中的 PRODUCTION_CONFIG
const PRODUCTION_CONFIG = {
    GOOGLE_SCRIPT_URL: '你的實際網址',  // ⚠️ 這會被提交到 Git
    SPREADSHEET_ID: '你的實際ID',      // ⚠️ 這會被提交到 Git
    // ...
};
```

**注意：** 這些資訊會在 Git 中，但這是**可以接受的**，因為：
- Google Apps Script URL 是公開的（任何人都可以呼叫）
- Google Sheets ID 本身不是密碼
- 真正的權限控制在 Google Apps Script 中

## ✅ 總結

| 問題 | 答案 |
|------|------|
| 本地開發會正常運作嗎？ | ✅ 是的 |
| 線上部署會正常運作嗎？ | ✅ 是的 |
| `.env` 會被提交到 Git 嗎？ | ❌ 不會 |
| 敏感資訊會洩露嗎？ | ⚠️ 部分會在 Git 中，但這是可接受的 |
| 需要額外設定嗎？ | ❌ 不需要，自動切換模式 |

## 🎯 你現在可以：

1. ✅ 在本地開發（使用 .env）
2. ✅ 提交到 Git（.env 不會被提交）
3. ✅ 部署到 GitHub Pages（自動使用內建設定）
4. ✅ 分享給團隊（他們用 .env.example 創建自己的 .env）

**一切都會正常運作！** 🎉
