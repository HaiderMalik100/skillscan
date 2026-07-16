import Groq from 'groq-sdk';
import crypto from 'crypto';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ALIAS MAP -> fixes react vs react.js
const ALIAS = {
  "react.js": "react", "reactjs": "react", "react js": "react",
  "next.js": "next.js", "nextjs": "next.js",
  "node.js": "node", "nodejs": "node",
  "ts": "typescript", "js": "javascript",
  "k8s": "kubernetes", "postgres": "postgresql"
};

const SKILL_DB = ["react","next.js","node","typescript","javascript","python","java","aws","docker","kubernetes","mongodb","postgresql","redis","graphql","rest api","ci/cd","html","css","tailwind","express","git"];

function normalize(s) {
  s = s.toLowerCase().trim();
  return ALIAS[s] || s;
}

function hasSkill(text, skill) {
  // FIX java vs javascript: use word boundary
  const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`, 'i');
  return regex.test(text);
}

function extractKeywords(text) {
  const lower = text.toLowerCase();
  let found = SKILL_DB.filter(s => hasSkill(lower, s)).map(normalize);
  return [...new Set(found)];
}

function analyzeGaps(resume, jdKeywords) {
  const resumeLower = resume.toLowerCase();
  const present = [];
  const missing = [];

  jdKeywords.forEach(skill => {
    if (hasSkill(resumeLower, skill)) present.push(skill);
    else missing.push(skill);
  });

  // FIX weak: only weak if NO metric within 100 chars of skill
  const weak = present.filter(skill => {
    const regex = new RegExp(skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
    let match;
    let hasProof = false;
    while ((match = regex.exec(resumeLower))!== null) {
      const ctx = resumeLower.slice(Math.max(0, match.index - 120), match.index + 120);
      if (/\d+%|\d+\+|built|developed|shipped|implemented|increased|reduced/.test(ctx)) {
        hasProof = true;
        break;
      }
    }
    return!hasProof;
  });

  return { present: [...new Set(present)], missing: [...new Set(missing)], weak };
}

function calculateATS(resume, gaps, level) {
  const verbs = (resume.match(/\b(built|developed|shipped|implemented)\b/gi) || []).length;
  const metrics = (resume.match(/\d+%|\d+\+/g) || []).length;
  const total = gaps.present.length + gaps.missing.length;
  const keywordScore = total? (gaps.present.length / total) * 40 : 20;
  const impact = Math.min(verbs * 3 + metrics * 5, 30);
  const format = resume.length > 300? 25 : 15;
  let ats = Math.round(keywordScore + impact + format);
  return Math.max(20, Math.min(92, ats));
}

function calculateMatch(gaps) {
  const total = gaps.present.length + gaps.missing.length;
  if (!total) return 45;
  return Math.max(15, Math.min(92, Math.round((gaps.present.length / total) * 100 - gaps.weak.length * 3)));
}

export async function analyzeWithGroq({ resumeText, jobRole, jobDescription, level }) {
  const jdKeywords = extractKeywords(jobDescription || jobRole);
  const gaps = analyzeGaps(resumeText, jdKeywords);
  const ats = calculateATS(resumeText, gaps, level);
  const match = calculateMatch(gaps);
  const seed = parseInt(crypto.createHash('md5').update(resumeText.slice(0,300)+jobRole).digest('hex').slice(0,6), 16);

  const SYSTEM = `You are FAANG recruiter validator. We pre-calculated scores via code.
  ATS=${ats}, MATCH=${match}, Matched=${JSON.stringify(gaps.present)}, Missing=${JSON.stringify(gaps.missing)}, Weak=${JSON.stringify(gaps.weak)}, Level=${level}

  YOUR JOB: Validate and adjust scores +-5 only if truly wrong based on resume+JD. If resume has React but JD says React.js treat as matched. Don't penalize Java if only JavaScript present.

  Return ONLY JSON: {"ats_score":${ats},"match_percent":${match},"skills":{"matched":[],"missing":[],"weak":[]},"keywords":{"present":[],"missing":[]},"sections":{"summary":{"grade":"A|B|C|D","feedback":""},"experience":{"grade":"","feedback":""},"education":{"grade":"","feedback":""}},"rewrites":[{"original":"","improved":""}],"parsed":{"name":"","total_years":0,"top_skills":[]}}
  Rules: Use our matched/missing as base, you can merge aliases like react/react.js. Weak only if truly no proof near skill.`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    seed,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: `Resume: ${resumeText.slice(0,5000)}\nJD: ${(jobDescription||'').slice(0,2000)}\nRole:${jobRole}` }
    ]
  });

  const parsed = JSON.parse(completion.choices[0].message.content);

  // Final lock: 80% code + 20% LLM validation
  parsed.ats_score = Math.round(ats * 0.8 + parsed.ats_score * 0.2);
  parsed.match_percent = Math.round(match * 0.8 + parsed.match_percent * 0.2);

  return parsed;
}