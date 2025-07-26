## 📁 Resume Analyzer - Backend

### 📝 Overview

This is the Node.js and Express backend for the Resume Analyzer. It accepts resume files, uses Google Gemini AI for parsing, stores the results in SQLite, and provides APIs to interact with the data.

### 📂 Directory Structure

```
backend/
├── controllers/
│   └── resumeController.js
├── routes/
│   └── resumeRoutes.js
├── services/
│   └── analysisService.js
├── db/
│   └── index.js
├── uploads/
├── .env
├── server.js
├── package.json
└── README.md
```

### 🚀 Getting Started

#### 1. Install dependencies

```bash
cd backend
npm install
```

#### 2. Create `.env` file

```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

#### 3. Run the backend server

```bash
npm start
```

Server will run at: `http://localhost:5000`

### 🔌 API Endpoints

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | `/api/resumes/upload` | Upload resume for analysis |
| GET    | `/api/resumes`        | Get past resumes           |

### 🧠 Gemini AI

* Uses Gemini 1.5 Pro via Google Generative AI SDK
* Requires valid API key from [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
* If you see a 429 error, you may have exceeded your free tier quota

### 💾 SQLite Notes

* SQLite database file is stored locally or in `/data` (Render deployment)
* Recommended for small-scale apps and prototyping

### 🧪 Deployment Notes

* For **Render**: Works with SQLite, place `.db` file in `/data`
* For **Vercel** frontend: Use Vercel to host frontend only, and connect it to backend deployed on Render

---

### 📌 Example `.env` (Backend)

```
PORT=5000
GEMINI_API_KEY=your_real_api_key
```