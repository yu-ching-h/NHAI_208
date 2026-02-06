# 🚀 GitHub Pages 部署指南

## 📋 部署前檢查清單

### ✅ 必須完成的設定
- [ ] Google Apps Script 已部署並取得網址
- [ ] Google Sheets 已創建並設定權限
- [ ] 報名系統在本地測試成功
- [ ] 已更新 Google Apps Script 的 CORS 設定

## 🔧 部署步驟

### 1. 創建 GitHub Repository

1. 前往 [github.com](https://github.com)
2. 點擊右上角的 "+" → "New repository"
3. 填寫 Repository 資訊：
   - **Repository name**: `nhai-algorithms-showcase` (或你喜歡的名稱)
   - **Description**: `內湖高中第14屆資訊成發 - Algorithms`
   - 選擇 **Public** (GitHub Pages 免費版需要公開)
   - ✅ 勾選 "Add a README file"
4. 點擊 "Create repository"

### 2. 上傳網站檔案

#### 方法 A：使用 GitHub 網頁介面 (簡單)

1. 在新創建的 repository 頁面，點擊 "uploading an existing file"
2. 將以下檔案拖拽到上傳區域：
   ```
   ├── index.html
   ├── register.html
   ├── thanks.html
   ├── about.html
   ├── schedule.html
   ├── projects.html
   ├── team.html
   ├── styles/
   │   └── main.css
   ├── scripts/
   │   └── main.js
   ├── 小肥啾.PNG
   ├── README.md
   └── SETUP_GUIDE.md
   ```
3. 在 "Commit changes" 區域：
   - **Commit message**: `🎉 Initial deployment - 內湖高中資訊成發網站`
   - 點擊 "Commit changes"

#### 方法 B：使用 Git 命令列 (進階)

```bash
# 1. Clone repository
git clone https://github.com/你的用戶名/nhai-algorithms-showcase.git
cd nhai-algorithms-showcase

# 2. 複製所有網站檔案到這個資料夾

# 3. 提交並推送
git add .
git commit -m "🎉 Initial deployment - 內湖高中資訊成發網站"
git push origin main
```

### 3. 啟用 GitHub Pages

1. 在 repository 頁面，點擊 "Settings" 標籤
2. 在左側選單找到 "Pages"
3. 在 "Source" 區域：
   - 選擇 "Deploy from a branch"
   - Branch: 選擇 "main"
   - Folder: 選擇 "/ (root)"
4. 點擊 "Save"
5. 等待 1-2 分鐘，頁面會顯示網站網址：
   ```
   Your site is published at https://你的用戶名.github.io/nhai-algorithms-showcase/
   ```

### 4. 測試部署結果

1. 點擊 GitHub Pages 提供的網址
2. 測試所有頁面是否正常載入
3. **重要**：測試報名功能是否能正確同步到 Google Sheets
4. 檢查是否收到確認郵件

## 🔧 部署後設定

### 更新 Google Apps Script CORS 設定

如果報名功能在 GitHub Pages 上仍有問題，請確認：

1. 前往 [script.google.com](https://script.google.com)
2. 打開你的報名系統專案
3. 確認 `doPost` 和 `doOptions` 函數包含正確的 CORS 標頭
4. 重新部署 Google Apps Script

### 自訂網域 (選擇性)

如果你有自己的網域：

1. 在 repository 根目錄創建 `CNAME` 檔案
2. 檔案內容填入你的網域，例如：`algorithms.nhai.edu.tw`
3. 在你的 DNS 設定中添加 CNAME 記錄指向 `你的用戶名.github.io`

## 📱 分享你的網站

部署完成後，你可以分享以下網址：

- **主頁**: `https://你的用戶名.github.io/nhai-algorithms-showcase/`
- **報名頁面**: `https://你的用戶名.github.io/nhai-algorithms-showcase/register.html`

## 🔄 更新網站

當你需要更新網站內容時：

1. 修改本地檔案
2. 重新上傳到 GitHub (覆蓋舊檔案)
3. 或使用 Git 推送更新
4. GitHub Pages 會自動重新部署 (通常 1-5 分鐘)

## 🎯 SEO 優化建議

為了讓搜尋引擎更容易找到你的網站，可以：

1. 在每個 HTML 檔案的 `<head>` 中添加：
   ```html
   <meta name="description" content="內湖高中第14屆資訊成發 - Algorithms，展示學生在演算法學習與實作中的成果">
   <meta name="keywords" content="內湖高中,資訊成發,演算法,程式設計,AI,機器人">
   ```

2. 創建 `sitemap.xml` 檔案

3. 提交到 Google Search Console

## 🚨 常見問題

### Q: 網站顯示 404 錯誤
A: 確認檔案名稱正確，GitHub Pages 區分大小寫

### Q: 報名功能不工作
A: 檢查瀏覽器控制台錯誤，確認 Google Apps Script 網址正確

### Q: 圖片無法顯示
A: 確認圖片檔案已上傳，檔案路徑正確

### Q: CSS 樣式沒有套用
A: 檢查 CSS 檔案路徑，確認 `styles/main.css` 存在

---

🎉 **恭喜！你的內湖高中資訊成發網站即將上線！**