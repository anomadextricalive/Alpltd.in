# 🚚 ALPL CRM Chatbot System

This repository contains a CRM chatbot system for ALPL with:
- A customer-facing chatbot interface (Client)
- A Node.js backend (Server)
- An Admin panel to view form submissions from Google Sheets

---

## 🗂️ Folder Structure


 admin
   =>admin-client # Admin login and form viewer (reads from Google Sheets)
   =>admin-server # (Optional) Backend for admin-only APIs (if required)
   
 client # Frontend chatbot (React)
 server # Backend for chatbot + PDF RAG system (Node.js)



---

## 🧠 Features

- AI chatbot using [Sarvam AI API](https://sarvam.ai/)
- PDF-based RAG: Answers fetched dynamically from uploaded PDF using LangChain
- Form-based lead capture
- Inactivity and message-count-based Google Form prompt
- Google Sheets Integration: Every chat is logged automatically
- Admin panel to view form responses from Google Sheet

---

## 📦 How to Setup & Run

### 🔧 Prerequisites

- Node.js ≥ 16
- Google Service Account with access to Google Sheets
- Sarvam AI API Key

---

## 📁 Step 1: Clone and Install

```bash
git clone https://github.com/anomadextricalive/Alpltd.in.git
cd Alpltd.in
```

---

## Run the Admin Panel

🔹 Admin Frontend:-
cd admin/admin-client
npm install
npm start

Then open: http://localhost:3000

➡️ Login with admin / admin123 to see the form data.

AdminFormTable component fetches data from Google Sheet via backend API.


🔹 Admin Backend:-
cd admin/admin-server
npm install
node index.js
http://localhost:5050
---

## Run the Chatbot (Client + Server)

🔹 Client Frontend (Chatbot UI):-
cd client
npm install
npm start
➡️ Available at http://localhost:3000

🔹 Server (Chatbot + PDF RAG)
cd server
npm install
node index.js
http://localhost:5000

---

## 📄 How to Create google-credentials.json

1. Go to: https://console.cloud.google.com/

2. Create a new project.

3. Enable Google Sheets API.

4. Go to Credentials > Create Credentials > Service Account

5. Create a service account → Go to the Keys tab → Add Key → JSON

6. Download the file and rename it as:
google-credentials.json

Share your target Google Sheet with the service account client_email (e.g., my-bot@project.iam.gserviceaccount.com) with Editor access.

📌 Place this file in the root of your backend project (or where your script expects it).

---

## Environment Variables
For backend/server/.env (or use directly in code if preferred):
SARVAM_API_KEY=your_sarvam_api_key
