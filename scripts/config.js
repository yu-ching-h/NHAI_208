/**
 * 內湖高中資訊成發報名系統 - 設定檔
 * 
 * 此檔案從環境變數載入敏感資訊
 * 
 * 運作方式：
 * 1. 本地開發：從 .env 檔案載入（不提交到 Git）
 * 2. 生產環境：直接使用此檔案中的設定（需手動更新）
 */

// 生產環境設定（部署到 GitHub Pages 時使用）
const PRODUCTION_CONFIG = {
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyv8caLRiecqr3V7osT9TlWTCIJ7fZ7g6aaMPw3VAZCiPVfgETMOnYXqfLc_m4wDL2R/exec',
    SPREADSHEET_ID: '1jV6HgJJb1UgMy2fBVxEpQSUX5x_YtPFs6wMAfpQBhdE',
    SHEET_NAME: '報名資料',
    
    CONTACT: {
        EMAIL: '1stnhai@gmail.com',
        INSTAGRAM: '@nhai1st_208'
    },
    
    EVENT: {
        NAME: '內湖高中第14屆資訊成發 - Algorithms',
        DATE: '2026年4月22日 (星期三)',
        TIME: '13:00 - 17:00',
        LOCATION: '臺北市內湖高級中學 國際會議廳'
    }
};

// 開發環境設定（從 .env 載入）
const DEV_CONFIG = {
    GOOGLE_SCRIPT_URL: '',
    SPREADSHEET_ID: '',
    SHEET_NAME: '報名資料',
    
    CONTACT: {
        EMAIL: '1stnhai@gmail.com',
        INSTAGRAM: '@nhai1st_208'
    },
    
    EVENT: {
        NAME: '內湖高中第14屆資訊成發 - Algorithms',
        DATE: '2026年4月22日 (星期三)',
        TIME: '13:00 - 17:00',
        LOCATION: '臺北市內湖高級中學 國際會議廳'
    }
};

// 預設使用生產環境設定
let CONFIG = PRODUCTION_CONFIG;

// 嘗試從 .env 載入（僅在本地開發時）
async function initConfig() {
    try {
        const response = await fetch('../.env');
        if (!response.ok) throw new Error('No .env file');
        
        const text = await response.text();
        const env = {};
        const lines = text.split('\n');
        
        for (const line of lines) {
            if (line.trim().startsWith('#') || !line.trim()) continue;
            
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                env[key.trim()] = valueParts.join('=').trim();
            }
        }
        
        // 如果成功載入 .env，使用開發環境設定
        if (env.GOOGLE_SCRIPT_URL) {
            CONFIG = {
                GOOGLE_SCRIPT_URL: env.GOOGLE_SCRIPT_URL || DEV_CONFIG.GOOGLE_SCRIPT_URL,
                SPREADSHEET_ID: env.SPREADSHEET_ID || DEV_CONFIG.SPREADSHEET_ID,
                SHEET_NAME: env.SHEET_NAME || DEV_CONFIG.SHEET_NAME,
                
                CONTACT: {
                    EMAIL: env.CONTACT_EMAIL || DEV_CONFIG.CONTACT.EMAIL,
                    INSTAGRAM: env.CONTACT_INSTAGRAM || DEV_CONFIG.CONTACT.INSTAGRAM
                },
                
                EVENT: {
                    NAME: env.EVENT_NAME || DEV_CONFIG.EVENT.NAME,
                    DATE: env.EVENT_DATE || DEV_CONFIG.EVENT.DATE,
                    TIME: env.EVENT_TIME || DEV_CONFIG.EVENT.TIME,
                    LOCATION: env.EVENT_LOCATION || DEV_CONFIG.EVENT.LOCATION
                }
            };
            console.log('✅ 開發模式：從 .env 載入設定');
        }
    } catch (error) {
        // 無法載入 .env，使用生產環境設定
        CONFIG = PRODUCTION_CONFIG;
        console.log('✅ 生產模式：使用內建設定');
    }
}

// 自動初始化
if (typeof window !== 'undefined') {
    initConfig();
}

// 匯出設定供其他檔案使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}