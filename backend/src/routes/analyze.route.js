
import { Router } from 'express';
import { upload } from '../middlewares/upload.js';
import { analyzeResume } from '../controllers/analyze.controller.js';
const router = Router();
router.post('/analyze', upload.single('resume'), analyzeResume);
router.get('/health', (req, res) => res.json({ status: 'ok', groq: !!process.env.GROQ_API_KEY }));
export default router;
