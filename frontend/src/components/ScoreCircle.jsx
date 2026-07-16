export default function ScoreCircle({ label, score }) {
  const getColor = () => {
    if (score < 50) return { stroke: '#ef4444', bg: '#fef2f2', text: 'text-red-600' };
    if (score < 70) return { stroke: '#f59e0b', bg: '#fffbeb', text: 'text-amber-600' };
    return { stroke: '#10b981', bg: '#ecfdf5', text: 'text-emerald-600' };
  };
  const c = getColor();
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-4">{label}</p>
      <div className="flex items-center gap-5">
        <div className="relative w-[120px] h-[120px]">
          <svg className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r={radius} stroke="#f3f4f6" strokeWidth="8" fill="none" />
            <circle
              cx="60" cy="60" r={radius}
              stroke={c.stroke}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${c.text}`}>{score}</span>
            <span className="text-[11px] text-gray-400">/ 100</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className={`text-sm font-semibold ${c.text}`}>
            {score < 50 ? 'Needs Work' : score < 70 ? 'Good' : 'Excellent'}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[150px]">
            {label === 'ATS Score' ? 'Formatting, keywords & impact' : 'Skills vs JD relevance'}
          </p>
        </div>
      </div>
    </div>
  );
}
