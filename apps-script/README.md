# Weave Waitlist Google Sheets & Apps Script Setup

This guide allows you to use **Google Sheets** as a database to capture and manage early access entries in real time.

---

### Step 1: Create a Google Sheet
1. Open [sheets.new](https://sheets.new) in your browser.
2. Title your sheet (e.g. `Weave Early Access Waitlist`).

---

### Step 2: Open Google Apps Script
1. In the Google Sheets top menu bar, click **Extensions** > **Apps Script**.
2. Delete any boilerplate code in `Code.gs`.
3. Copy and paste the entire code from [`Code.gs`](file:///home/tinchu/weave/apps-script/Code.gs) into the editor.
4. Click the **Save** icon (diskette) or press `Ctrl + S`.

---

### Step 3: Deploy as a Web App
1. In the top right corner, click **Deploy** > **New deployment**.
2. Beside "Select type", click the gear icon ⚙️ and select **Web app**.
3. Fill in the deployment settings:
   - **Description**: `Weave Early Access API`
   - **Execute as**: `Me (your Google email)`
   - **Who has access**: `Anyone` *(Crucial so the website can submit entries without requiring visitors to log into Google)*
4. Click **Deploy**.
5. When prompted with "Authorization required", click **Authorize access**, choose your Google account, click **Advanced** > **Go to Untitled project (unsafe)**, and grant permissions.
6. Copy the **Web App URL** provided (it looks like `https://script.google.com/macros/s/.../exec`).

---

### Step 4: Add URL to Environment Variables
1. In `website/.env` (or in Vercel project environment settings):
   ```bash
   VITE_EARLY_ACCESS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
   ```
2. Re-build or redeploy the site.

---

### What it does:
- Automatically formats headers (`Submitted At`, `Work Email / GitHub Handle`, `WhatsApp Mobile Number`, `Country Code`, etc.) in Row 1.
- Dedupes submissions so duplicate phone numbers or handles aren't repeatedly appended.
- Uses `LockService` to safely handle multiple simultaneous submissions without row collisions.
