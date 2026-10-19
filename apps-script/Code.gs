/**
 * Weave Early Access & Waitlist Database (Google Apps Script)
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet (e.g., "Weave Early Access Waitlist").
 * 2. In Google Sheets menu, click: Extensions -> Apps Script.
 * 3. Replace all default code with this file's contents.
 * 4. Click "Deploy" (top right) -> "New deployment".
 * 5. Select type: "Web app" (click gear icon ⚙️ if not selected).
 * 6. Set Description: "Weave Early Access API"
 * 7. Set "Execute as": "Me"
 * 8. Set "Who has access": "Anyone"
 * 9. Click "Deploy", authorize permissions when prompted, and copy the Web App URL.
 * 10. Add the URL to your website's .env file as:
 *     VITE_EARLY_ACCESS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests to clear
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Server busy, please retry in a moment.'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

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

    // Auto-create polished header row if the sheet is brand new / empty
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
      
      // Style headers
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
      var existingIdentities = sheet.getRange(2, 2, lastRow - 1, 2).getValues();
      for (var i = 0; i < existingIdentities.length; i++) {
        var rowIdentity = existingIdentities[i][0];
        var rowPhone = existingIdentities[i][1];
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
