// routes/sheetsRead.js
const express = require("express");
const { google } = require("googleapis");
const router = express.Router();
const creds = require("../google-credentials.json"); // make sure this exists

router.get("/", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "1RThftHqw1IGMHvb5qGLuToBOz_wwzf-K0379KYQVHbU"; // ✅ your sheet ID
    const range = "Form Responses!A1:P"; // ✅ match the sheet name + range

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const headers = rows[0];
    const data = rows.slice(1).map(row =>
      Object.fromEntries(headers.map((key, i) => [key, row[i] || ""]))
    );

    res.json(data);
  } catch (error) {
    console.error("Sheet read error:", error.message);
    res.status(500).json({ error: "Failed to read sheet data" });
  }
});

module.exports = router;
