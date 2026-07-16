# SkillScan — AI Resume Analyzer

> Stop getting rejected by ATS. Know your score before you apply.

SkillScan analyzes your resume against any job description using Groq (Llama 3.3) + deterministic code scoring. 


### Why SkillScan?

- **Real ATS Score:** 40% keywords + 30% impact + 30% format — calculated by code, validated by LLM
- **True Job Match:** Handles `react.js = react`, `java != javascript` 
- **Smart Skill Gap:** Matched / Missing / Weak (weak = skill with no proof)
- **XYZ Rewrites:** Turns `Worked on API` → `Built REST APIs serving 10k req/day, reducing latency by 25%`
- **Deterministic:** Same resume + JD = same report

### Tech Stack
Frontend: React, Tailwind, Axios
Backend: Node.js, Express, pdfjs-dist, Groq SDK
Model: llama-3.3-70b-versatile

### Quick Start
```bash
# Clone
git clone https://github.com/yourname/skillscan.git
cd skillscan

# Backend
cd backend
npm install
echo "GROQ_API_KEY=your_key" > .env
npm run dev

# Frontend (new terminal)
cd ../frontend
npm install
npm run dev