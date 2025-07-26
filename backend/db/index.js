
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the resumes.db SQLite database file
const dbPath = path.resolve(__dirname, 'resumes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at', dbPath);
  }
});

// Create the resumes table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    email TEXT,
    phone TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    summary TEXT,
    work_experience TEXT,
    education TEXT,
    technical_skills TEXT,
    soft_skills TEXT,
    projects TEXT,
    certifications TEXT,
    resume_rating INTEGER,
    improvement_areas TEXT,
    upskill_suggestions TEXT
  )
`, (err) => {
  if (err) {
    console.error('❌ Failed to create resumes table:', err.message);
  } else {
    console.log('✅ resumes table is ready');
  }
});

module.exports = db;