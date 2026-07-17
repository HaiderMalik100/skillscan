
import { extractTextFromFile } from '../services/parse.service.js';
import { analyzeWithGroq } from '../services/groq.service.js';

export async function analyzeResume(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'Resume file required' });
    const { jobRole, jobDescription, level } = req.body;
    if (!jobRole) return res.status(400).json({ error: 'jobRole required' });
    console.log('Starting PDF parse...');
    const resumeText = await extractTextFromFile(req.file);
    console.log('PDF parsed, length:', resumeText?.length);
    console.log('Calling Groq...');
    const result = await analyzeWithGroq({ resumeText, jobRole, jobDescription, level: level || 'Mid' });
    console.log('Groq responded');

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Analysis failed' });
  }
}
