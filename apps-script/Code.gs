/**
 * Weave Early Access & Waitlist Database (Google Apps Script)
 * 
 * IMPORTANT:
 * If this script was opened from Google Sheets (Extensions -> Apps Script), leave SPREADSHEET_ID blank.
 * If this script was created as a standalone project on script.google.com, paste your Google Sheet ID or URL below.
 */
var SPREADSHEET_ID = ""; // e.g. "1yA8X..." or leave empty if bound to sheet

function getTargetSheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim().length > 0) {
    var id = SPREADSHEET_ID.trim();
    if (id.includes('/d/')) {
      id = id.split('/d/')[1].split('/')[0];
    }
    return SpreadsheetApp.openById(id).getActiveSheet();
  }
  
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    return active.getActiveSheet();
  }
  
  throw new Error("No active spreadsheet found. If your Apps Script is standalone, paste your Sheet ID into SPREADSHEET_ID at line 8.");
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Server busy, please retry in a moment.'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var sheet = getTargetSheet();

    // Parse incoming payload
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Auto-create polished header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Submitted At (UTC)",
        "Work Email / GitHub Handle",
        "WhatsApp Mobile Number",
        "Country Code",
        "Country Name",
        "Source URL",
        "User Agent"
      ];
      sheet.appendRow(headers);
      
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#18181b");
      headerRange.setFontColor("#ffffff");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    var timestamp = data.timestamp || new Date().toISOString();
    var identity = (data.identity || data.email || data.handle || '').toString().trim();
    var phoneNumber = (data.phoneNumber || data.phone || '').toString().trim();
    var countryCode = (data.countryCode || '').toString().trim();
    var countryName = (data.countryName || '').toString().trim();
    var sourceUrl = (data.sourceUrl || '').toString().trim();
    var userAgent = (data.userAgent || '').toString().trim();

    // Prevent duplicate entries for the same identity and phone
    var lastRow = sheet.getLastRow();
    var isDuplicate = false;
    if (lastRow > 1) {
      var existingData = sheet.getRange(2, 2, lastRow - 1, 2).getValues();
      for (var i = 0; i < existingData.length; i++) {
        var rowIdentity = existingData[i][0];
        var rowPhone = existingData[i][1];
        if (
          (identity && rowIdentity && rowIdentity.toString().toLowerCase() === identity.toLowerCase()) ||
          (phoneNumber && rowPhone && rowPhone.toString() === phoneNumber)
        ) {
          isDuplicate = true;
          break;
        }
      }
    }

    if (!isDuplicate) {
      sheet.appendRow([
        timestamp,
        identity,
        phoneNumber,
        countryCode,
        countryName,
        sourceUrl,
        userAgent
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      isDuplicate: isDuplicate,
      message: isDuplicate ? 'Already registered on waitlist' : 'Waitlist entry successfully recorded'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    service: 'Weave Early Access API',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this function in the Apps Script editor to test your spreadsheet connection & grant permissions!
 */
function testWrite() {
  Logger.log("Testing spreadsheet connection...");
  var sheet = getTargetSheet();
  Logger.log("Connected to spreadsheet tab: " + sheet.getName());
  
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        identity: "test_verification@example.com",
        phoneNumber: "+91 9999999999",
        countryCode: "IN",
        countryName: "India",
        sourceUrl: "https://tryweave.vercel.app",
        userAgent: "Apps Script Test Runner"
      })
    }
  };
  
  var res = doPost(mockEvent);
  Logger.log("doPost response: " + res.getContent());
}
