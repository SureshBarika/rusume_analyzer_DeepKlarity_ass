// backend/services/analysisService.js
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const analysisService = async (fileBuffer) => {
  const text = (await pdfParse(fileBuffer)).text;

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'models/gemini-1.5-pro-latest', // ✅ correct model path
  });

  const prompt = `You are an expert recruiter. Extract the following fields from the resume text and return them in JSON format: 
  name, email, phone, linkedin_url, portfolio_url, summary, 
  work_experience (array), education (array), technical_skills (array), 
  soft_skills (array), projects (array), certifications (array), 
  resume_rating (number from 1-10), improvement_areas, upskill_suggestions (array). 

  Resume Text: """${text}"""`;

  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });
  
    const responseText = result.response.candidates[0].content.parts[0].text;
    return JSON.parse(responseText);
  } catch (err) {
    console.error('Gemini API Error:', err.message);
    throw new Error('Gemini quota exceeded or temporary issue. Please try again later.');
  }
};

module.exports = { analysisService };
