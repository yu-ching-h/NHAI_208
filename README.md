# Code with Heart - 程式成發網站

一個充滿創意和互動性的程式成果發表會網站，以「小肥啾」作為吉祥物，展現從程式小白到開發者的精彩旅程。

## 🎨 設計特色

### 主題色彩
- **主色調**: #262014 (深棕) | #F2E8DC (米白) | #8C6E54 (棕色) | #D9CAB8 (米色) | #593825 (深棕)
- **點綴色**: #FDE2E4 (粉色) | #8E97A4 (藍灰) | #E2E8F0 (淺灰)

### 核心理念
- **雙模式切換**: 清新治癒 (淺色) ↔ 極客深夜 (深色)
- **吉祥物引導**: 小肥啾 🐦 貫穿整個用戶體驗
- **技術感融合**: 雷達圖、Git 統計、Tech Tags 等開發者元素

## 🚀 功能亮點

### 全站通用功能
- ✨ **Loading 動畫**: 小肥啾建造網站的可愛動畫
- 🌙 **深色模式**: 一鍵切換主題，支持本地儲存
- 📱 **響應式設計**: 完美適配各種設備
- 🎭 **流暢動畫**: GSAP 驅動的高質感動效

### 頁面功能
1. **首頁 (Hero)**
   - 倒數計時器 (距離成發開始)
   - 互動式吉祥物對話泡泡
   - 視差滾動效果

2. **關於我們**
   - 橫向滾動技術展示
   - 懸停切換團隊照片 (正式照 ↔ 搞怪照)

3. **節目表**
   - 垂直時間軸設計
   - 小肥啾標示當前進度

4. **專題介紹**
   - 技術標籤篩選功能
   - Git 提交統計展示
   - 懸停顯示專案詳情

5. **成員介紹**
   - 3D 翻轉卡片效果
   - Chart.js 技能雷達圖
   - 開發語錄彩蛋

6. **活動報名**
   - 表單驗證與動畫
   - 報名成功特效 (小肥啾撒花)
   - 電子門票生成

### 隱藏彩蛋
- **Konami Code**: ↑↑↓↓←→←→BA 觸發小肥啾大軍
- **按鈕特效**: 點擊漣漪效果 + 星星特效
- **浮動粒子**: 背景程式符號動畫

## 🛠️ 技術架構

### 前端技術
- **HTML5**: 語義化標籤，SEO 友好
- **CSS3**: 
  - CSS Variables 主題系統
  - Grid & Flexbox 佈局
  - 3D Transform 卡片翻轉
  - 複雜動畫與過渡效果
- **JavaScript (ES6+)**:
  - 模組化程式架構
  - 事件驅動互動
  - LocalStorage 主題記憶
  - IntersectionObserver 滾動動畫

### 第三方庫
- **GSAP**: 高性能動畫引擎
- **Chart.js**: 技能雷達圖渲染
- **Google Fonts**: Noto Sans TC 字體

### 設計模式
- **響應式設計**: Mobile-First 方法
- **漸進增強**: 核心功能優先，動畫為輔
- **無障礙設計**: 鍵盤導航、語義化標籤

## 📁 專案結構

```
code-with-heart/
├── index.html              # 主頁面
├── styles/
│   └── main.css            # 主樣式表
├── scripts/
│   └── main.js             # 主 JavaScript
└── README.md               # 專案說明
```

## 🎯 使用方式

1. **直接開啟**: 用瀏覽器打開 `index.html`
2. **本地伺服器**: 
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (需安裝 http-server)
   npx http-server
   ```

## 🎨 自訂指南

### 修改主題色彩
在 `styles/main.css` 的 `:root` 區塊修改 CSS 變數：

```css
:root {
  --primary-dark: #262014;    /* 主深色 */
  --primary-light: #F2E8DC;   /* 主淺色 */
  --accent-brown: #8C6E54;    /* 強調色 */
  /* ... 其他顏色 */
}
```

### 更新倒數計時
在 `scripts/main.js` 的 `initCountdownTimer()` 函數中修改目標日期：

```javascript
const targetDate = new Date('2026-03-01T14:00:00');
```

### 新增專題卡片
在 `index.html` 的 `.projects-grid` 區塊複製並修改專案卡片結構。

## 🌟 特色動畫

- **Loading**: 小肥啾建造動畫
- **Hero**: 視差滾動 + 浮動效果
- **Cards**: 3D 翻轉 + 懸停縮放
- **Timeline**: 滾動觸發淡入
- **Buttons**: 漣漪 + 星星特效
- **Theme**: 平滑色彩過渡

## 📱 瀏覽器支援

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 文件

## 🙏 致謝

- 設計靈感來自現代 Web 設計趨勢
- 小肥啾吉祥物概念
- 開源社群的技術支持

---

**Made with ❤️ and lots of ☕ by Code with Heart Team**

🐦 *小肥啾說：記得給我們一個 Star 哦！*