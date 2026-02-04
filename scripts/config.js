const CONFIG = {
    // Google Apps Script 部署網址
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyv8caLRiecqr3V7osT9TlWTCIJ7fZ7g6aaMPw3VAZCiPVfgETMOnYXqfLc_m4wDL2R/exec',
    
    // Google Sheets ID
    SPREADSHEET_ID: '1jV6HgJJb1UgMy2fBVxEpQSUX5x_YtPFs6wMAfpQBhdE',
    
    // 工作表名稱
    SHEET_NAME: '報名資料',
    
    // 聯絡資訊
    CONTACT: {
        EMAIL: '1stnhai@gmail.com',
        INSTAGRAM: '@nhai1st_208'
    },
    
    // 活動資訊
    EVENT: {
        NAME: '內湖高中第14屆資訊成發 - Algorithms',
        DATE: '2026年4月22日 (星期三)',
        TIME: '13:00 - 17:00',
        LOCATION: '臺北市內湖高級中學 國際會議廳'
    }
};

// 匯出設定供其他檔案使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}