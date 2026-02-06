# 🚀 快速參考指南

## 📋 環境變數設定（已完成）

你的敏感資訊現在安全地儲存在 `.env` 檔案中！

### ✅ 已設定的檔案

```
✅ .env                    # 實際的敏感資訊（已保護）
✅ .env.example           # 範本（可分享）
✅ .gitignore             # 已加入 .env
✅ scripts/config.js      # 從 .env 載入設定
```

## 🔍 快速檢查

### 檢查環境變數是否正確
```bash
# 開啟檢查工具
open check-env.html
```

### 檢查 Git 狀態
```bash
git status
# 確認 .env 不在列表中 ✅
```

## 📝 常用指令

### 編輯環境變數
```bash
nano .env
# 或
code .env
```

### 重新設定環境變數
```bash
./setup-env.sh
```

### 查看環境變數（不顯示敏感資訊）
```bash
cat .env.example
```

## 🎯 提交程式碼前檢查

```bash
# 1. 檢查 Git 狀態
git status

# 2. 確認 .env 不在列表中
# 如果看到 .env，執行：
git rm --cached .env

# 3. 安全提交
git add .
git commit -m "你的提交訊息"
git push
```

## 🔐 安全檢查清單

- [x] `.env` 已加入 `.gitignore`
- [x] `.env` 不會被 Git 追蹤
- [x] 敏感資訊不在程式碼中
- [x] `.env.example` 可安全分享

## 📁 重要檔案說明

| 檔案 | 用途 | 可否提交到 Git |
|------|------|---------------|
| `.env` | 實際的敏感資訊 | ❌ 不可以 |
| `.env.example` | 環境變數範本 | ✅ 可以 |
| `scripts/config.js` | 設定檔 | ✅ 可以 |
| `.gitignore` | Git 忽略清單 | ✅ 可以 |

## 🆘 常見問題

### Q: 如何更新 Google Apps Script URL？
**A:** 編輯 `.env` 檔案，修改 `GOOGLE_SCRIPT_URL` 的值

### Q: 團隊成員如何設定？
**A:** 
1. 複製 `.env.example` 為 `.env`
2. 填入實際的值
3. 使用 `check-env.html` 檢查

### Q: 不小心提交了 .env 怎麼辦？
**A:**
```bash
# 從 Git 移除（但保留本地檔案）
git rm --cached .env
git commit -m "Remove .env from Git"
git push

# 如果已經推送，需要清理歷史記錄
# 請參考 Git 文件或尋求協助
```

### Q: 如何確認設定正確？
**A:** 開啟 `check-env.html` 查看檢查結果

## 📞 需要協助？

- 📖 詳細說明：`ENV_SETUP.md`
- 🔒 安全設定：`SECURITY_SETUP_COMPLETE.md`
- 📧 Email: 1stnhai@gmail.com
- 📱 Instagram: @nhai1st_208

---

**提示：** 將此檔案加入書籤，方便隨時查閱！
