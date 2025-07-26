// backend/controllers/resumeController.js
const db = require('../db');
const { analysisService } = require('../services/analysisService');

exports.uploadResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const data = await analysisService(file.buffer);

    const query = `
      INSERT INTO resumes (
        file_name, name, email, phone, linkedin_url, portfolio_url, summary,
        work_experience, education, technical_skills, soft_skills,
        projects, certifications, resume_rating, improvement_areas, upskill_suggestions
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      file.originalname,
      data.name, data.email, data.phone,
      data.linkedin_url, data.portfolio_url,
      data.summary, JSON.stringify(data.work_experience),
      JSON.stringify(data.education), JSON.stringify(data.technical_skills),
      JSON.stringify(data.soft_skills), JSON.stringify(data.projects),
      JSON.stringify(data.certifications), data.resume_rating,
      data.improvement_areas, JSON.stringify(data.upskill_suggestions)
    ];

    db.run(query, values, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'DB insert error' });
      }

      // Fetch inserted row
      db.get('SELECT * FROM resumes WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: 'DB fetch error' });
        res.json(row);
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllResumes = (req, res) => {
  db.all(
    'SELECT id, file_name, uploaded_at, name, email, phone FROM resumes ORDER BY uploaded_at DESC',
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json(rows);
    }
  );
};

exports.getResumeById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM resumes WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
};
