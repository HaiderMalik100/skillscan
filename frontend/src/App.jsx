import { useState } from 'react';
import UploadZone from './components/UploadZone';
import JobInput from './components/JobInput';
import ScoreCircle from './components/ScoreCircle';
import SkillGaps from './components/SkillGaps';
import RewriteList from './components/RewriteList';
import SectionFeedback from './components/SectionFeedback';
import useAnalyze from './hooks/useAnalyze';

export default function App() {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [level, setLevel] = useState('Mid');

  const { result, loading, error, analyze } = useAnalyze();

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm">S</div>
            <div>
              <h1 className="font-semibold text-[15px] leading-none">SkillScan</h1>
              {/* <p className="text-[11px] text-gray-500">AI Resume Analyzer • Groq</p> */}
            </div>
          </div>
          {/* <div className="flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Groq Llama 3.1 70B
          </div> */}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
        {/* LEFT - Inputs */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white border border-gray-200 p-6 space-y-6 shadow-sm">
            <UploadZone file={file} setFile={setFile} />
            <div className="h-px bg-gray-100" />
            <JobInput
              jobRole={jobRole} setJobRole={setJobRole}
              jobDesc={jobDesc} setJobDesc={setJobDesc}
              level={level} setLevel={setLevel}
            />
            {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
            <button
              onClick={() => analyze({ file, jobRole, jobDesc, level })}
              disabled={loading}
              className="w-full rounded-xl bg-black text-white py-3.5 text-sm font-semibold hover:bg-zinc-800 disabled:opacity-50 transition"
            >
              {loading ? 'Analyzing...' : 'Analyze Resume →'}
            </button>
            <p className="text-[11px] text-center text-gray-400">Free • No data stored • PDF/DOCX only</p>
          </div>

         
        </div>

        {/* RIGHT - Results */}
        <div className="min-h-[600px]">
          {!result && !loading && (
            <div className="h-full rounded-2xl border border-dashed border-gray-300 bg-white flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 border flex items-center justify-center text-2xl mb-4">📄</div>
              <h3 className="font-semibold">No analysis yet</h3>
              <p className="text-sm text-gray-500 max-w-[320px] mt-2">Upload your resume and enter your dream job role. We’ll show ATS score, skill gaps, rewrites and more.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-[170px] rounded-2xl bg-white border border-gray-200 animate-pulse" />
                <div className="h-[170px] rounded-2xl bg-white border border-gray-200 animate-pulse" />
              </div>
              <div className="h-[200px] rounded-2xl bg-white border border-gray-200 animate-pulse" />
              <div className="h-[300px] rounded-2xl bg-white border border-gray-200 animate-pulse" />
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ScoreCircle label="ATS Score" score={result.ats_score} />
                <ScoreCircle label="Job Match" score={result.match_percent} />
              </div>

              <SkillGaps skills={result.skills} keywords={result.keywords} />
              <SectionFeedback sections={result.sections} />
              <RewriteList rewrites={result.rewrites} />

              <div className="flex gap-3">
                <button onClick={() => window.print()} className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50">Export Report</button>
                <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(result, null, 2)); alert('Copied JSON'); }} className="rounded-xl bg-black text-white px-5 py-3 text-sm font-medium">Copy JSON</button>
              </div>
            </div>
          )}
        </div>
      </main>
    <footer className="border-t border-gray-200 bg-white py-4 text-center">
  <p className="text- text-gray-500">
    © {new Date().getFullYear()} Built by Haider Ali
  </p>
</footer>
    </div>
  );
}
