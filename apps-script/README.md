# Why Entries Aren't Showing & How to Fix (30-second fix)

We inspected the URL response from your script:
```http
HTTP/2 302
location: https://accounts.google.com/ServiceLogin?...
```
Google is currently redirecting requests to the Google Sign-in page because **"Who has access"** is set to **"Only myself"** or requires Google Authentication. Because website visitors are anonymous, Google blocks them before the script runs.

---

### The 30-Second Fix in Google Apps Script:

1. Open your Apps Script editor.
2. In the top toolbar, select the function dropdown (where it says `doPost` or `myFunction`) and choose **`testWrite`**.
3. Click **▷ Run**.
   - If Google asks for **Authorization Required**, click **Review permissions** -> Select your Google Account -> Click **Advanced** -> Click **Go to Untitled project (unsafe)** -> Click **Allow**.
   - Check your Google Sheet: you will immediately see the headers and a test entry created!
4. Now redeploy with public access:
   - Click the blue **Deploy** button (top right) -> **Manage deployments**.
   - Click the pencil icon ✏️ (Edit) on the left of your active deployment.
   - Set **Who has access** to: **`Anyone`** *(NOT "Only myself" and NOT "Anyone with Google account")*.
   - Set **Version** to: **`New version`**.
   - Click **Deploy**.
5. Copy the Web App URL (if it changed, update it in `website/.env` or paste it in chat).

That's it! As soon as "Who has access" is set to "Anyone", public signups will immediately flow into your Google Sheet.
