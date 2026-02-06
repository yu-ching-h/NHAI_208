/**
 * 內湖高中資訊成發報名系統 - Google Apps Script
 * 
 * ⚠️ 這是範本檔案，請勿直接使用
 * 
 * 設置步驟：
 * 1. 前往 script.google.com
 * 2. 創建新專案
 * 3. 複製此代碼到 Google Apps Script 編輯器
 * 4. 修改下方的 CONFIG 設定（填入你的實際值）
 * 5. 部署為網路應用程式
 * 6. 複製部署網址到 scripts/config.js
 * 
 * 注意：此檔案應該只存在於 Google Apps Script 平台，不要提交到 Git
 */

// 設定區域 - ⚠️ 請修改以下設定為你的實際值
const CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE', // ⚠️ 替換為你的 Google Sheets ID
  SHEET_NAME: '報名資料', // 工作表名稱
  NOTIFICATION_EMAIL: 'your-email@example.com', // ⚠️ 替換為你的通知信箱
  SEND_CONFIRMATION: true, // 是否發送確認信給報名者
};

/**
 * 處理 POST 請求 - 接收報名資料
 */
function doPost(e) {
  try {
    console.log('收到 POST 請求');
    console.log('請求內容:', e.postData.contents);
    
    // 解析 JSON 資料
    const data = JSON.parse(e.postData.contents);
    console.log('解析後的資料:', data);
    
    // 驗證必填欄位
    if (!data.name || !data.email) {
      console.error('缺少必填欄位');
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: '姓名和電子郵件為必填欄位'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 寫入 Google Sheets
    console.log('開始寫入 Google Sheets');
    const result = writeToSheet(data);
    console.log('寫入結果:', result);
    
    if (result.success) {
      // 發送通知郵件
      console.log('發送通知郵件');
      sendNotificationEmail(data);
      
      // 發送確認郵件給報名者
      if (CONFIG.SEND_CONFIRMATION) {
        console.log('發送確認郵件');
        sendConfirmationEmail(data);
      }
      
      console.log('處理完成，回傳成功訊息');
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: '報名成功！',
          rowNumber: result.rowNumber
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error(result.message);
    }
    
  } catch (error) {
    console.error('處理報名資料時發生錯誤:', error);
    console.error('錯誤堆疊:', error.stack);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: '系統錯誤，請稍後再試: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 處理 GET 請求 - 用於測試
 */
function doGet(e) {
  return ContentService
    .createTextOutput('內湖高中資訊成發報名系統 API 運作正常')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * 寫入資料到 Google Sheets
 */
function writeToSheet(data) {
  try {
    // 開啟試算表
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    // 如果工作表不存在，創建新的
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
      
      // 設定標題列
      const headers = [
        '報名時間', '姓名', '電子郵件', '職稱/身份', 
        '最感興趣的專題', '對活動的期待', '狀態'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // 美化標題列
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // 準備資料列
    const rowData = [
      data.timestamp || new Date().toLocaleString('zh-TW'),
      data.name || '',
      data.email || '',
      data.title || '',
      data.interest || '',
      data.expectations || '',
      '已報名'
    ];
    
    // 寫入新列
    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    // 自動調整欄寬
    sheet.autoResizeColumns(1, rowData.length);
    
    return {
      success: true,
      rowNumber: newRow,
      message: '資料已成功寫入'
    };
    
  } catch (error) {
    console.error('寫入 Sheets 時發生錯誤:', error);
    return {
      success: false,
      message: '無法寫入資料：' + error.toString()
    };
  }
}

/**
 * 發送通知郵件給管理員
 */
function sendNotificationEmail(data) {
  try {
    const subject = '🎉 新的成發報名 - ' + data.name;
    
    const htmlBody = `
      <div style="font-family: 'Noto Sans TC', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #4285f4; color: white; padding: 20px; text-align: center;">
          <h2>🎉 新的報名通知</h2>
          <p>內湖高中第14屆資訊成發</p>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <h3>報名資訊</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">報名時間：</td>
              <td style="padding: 10px;">${data.timestamp}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">姓名：</td>
              <td style="padding: 10px;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">電子郵件：</td>
              <td style="padding: 10px;">${data.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">身份：</td>
              <td style="padding: 10px;">${data.title || '未填寫'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">感興趣的專題：</td>
              <td style="padding: 10px;">${data.interest || '未填寫'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; vertical-align: top;">期待：</td>
              <td style="padding: 10px;">${data.expectations || '未填寫'}</td>
            </tr>
          </table>
        </div>
        
        <div style="padding: 20px; text-align: center; color: #666;">
          <p>此郵件由報名系統自動發送</p>
        </div>
      </div>
    `;
    
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    console.error('發送通知郵件時發生錯誤:', error);
  }
}

/**
 * 發送確認郵件給報名者
 */
function sendConfirmationEmail(data) {
  try {
    const subject = '✅ 報名確認 - 內湖高中第14屆資訊成發';
    
    const htmlBody = `
      <div style="font-family: 'Noto Sans TC', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #F2E8DC 0%, #D9CAB8 100%); padding: 30px; text-align: center;">
          <h1 style="color: #8C6E54; margin: 0;">🎉 報名成功！</h1>
          <p style="color: #593825; font-size: 18px; margin: 10px 0 0 0;">感謝您報名參加內湖高中第14屆資訊成發</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #8C6E54;">親愛的 ${data.name}，</h2>
          <p style="line-height: 1.6; color: #593825;">
            感謝您報名參加我們的資訊成果發表會！我們已收到您的報名資訊，期待在活動中與您見面。
          </p>
          
          <div style="background: #FDE2E4; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #8C6E54; margin-top: 0;">📅 活動資訊</h3>
            <p style="margin: 5px 0; color: #593825;"><strong>日期：</strong>2026年4月22日 (星期三)</p>
            <p style="margin: 5px 0; color: #593825;"><strong>時間：</strong>13:00 - 17:00</p>
            <p style="margin: 5px 0; color: #593825;"><strong>地點：</strong>臺北市內湖高級中學 國際會議廳</p>
            <p style="margin: 5px 0; color: #593825;"><strong>費用：</strong>完全免費</p>
          </div>
          
          <h3 style="color: #8C6E54;">📋 您的報名資訊</h3>
          <ul style="color: #593825; line-height: 1.6;">
            <li><strong>姓名：</strong>${data.name}</li>
            <li><strong>身份：</strong>${data.title || '未填寫'}</li>
            <li><strong>感興趣的專題：</strong>${data.interest || '未填寫'}</li>
          </ul>
          
          <div style="background: #E2E8F0; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #8C6E54; margin-top: 0;">📱 聯絡我們</h3>
            <p style="margin: 5px 0; color: #593825;">如有任何問題，歡迎聯絡我們：</p>
            <p style="margin: 5px 0; color: #593825;">📧 Email: ${CONFIG.NOTIFICATION_EMAIL}</p>
            <p style="margin: 5px 0; color: #593825;">📱 Instagram: nhai1st_208</p>
          </div>
          
          <p style="color: #593825; line-height: 1.6;">
            我們期待在成發當天與您分享我們的學習成果！
          </p>
          
          <p style="color: #8C6E54; font-weight: bold;">
            內湖高中 208 班 敬上
          </p>
        </div>
        
        <div style="padding: 20px; text-align: center; background: #f8f9fa; color: #666;">
          <p style="margin: 0; font-size: 14px;">此郵件由報名系統自動發送，請勿直接回覆</p>
        </div>
      </div>
    `;
    
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    console.error('發送確認郵件時發生錯誤:', error);
  }
}

/**
 * 測試函數 - 用於開發時測試
 */
function testFunction() {
  const testData = {
    name: '測試用戶',
    email: 'test@example.com',
    title: '內湖高中學生',
    interest: '超進化公車',
    expectations: '期待看到精彩的專題展示',
    timestamp: new Date().toLocaleString('zh-TW')
  };
  
  console.log('開始測試...');
  const result = writeToSheet(testData);
  console.log('測試結果:', result);
  
  if (result.success) {
    sendNotificationEmail(testData);
    sendConfirmationEmail(testData);
    console.log('測試完成！');
  }
}
