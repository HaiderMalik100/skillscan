
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import analyzeRoutes from './routes/analyze.route.js';
import { limiter } from './middlewares/rateLimiter.js';
if (!global.DOMMatrix) global.DOMMatrix = class {};
if (!global.Path2D) global.Path2D = class {};

const app = express();
const PORT = process.env.PORT || 5000;
app.set('trust proxy', 1);
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(limiter);

app.use('/api', analyzeRoutes);
app.get('/', (req, res) => res.json({ message: 'SkillScan Backend - Groq AI', docs: '/api/health' }));

app.use((err, req, res, next) => {
  if (err.message.includes('Only PDF')) return res.status(400).json({ error: err.message });
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File too large, max 5MB' });
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => console.log('Backend running on http://localhost:' + PORT));
