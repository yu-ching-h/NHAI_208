/**
 * 環境變數載入器
 * 從 .env 檔案載入環境變數（僅用於開發環境）
 */

async function loadEnvVariables() {
    try {
        const response = await fetch('../.env');
        const text = await response.text();
        
        const env = {};
        const lines = text.split('\n');
        
        for (const line of lines) {
            // 跳過註解和空行
            if (line.trim().startsWith('#') || !line.trim()) {
                continue;
            }
            
            // 解析 KEY=VALUE 格式
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                env[key.trim()] = valueParts.join('=').trim();
            }
        }
        
        return env;
    } catch (error) {
        console.error('無法載入 .env 檔案:', error);
        console.warn('使用預設設定或環境變數');
        return {};
    }
}

// 匯出函數
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadEnvVariables };
}
