export default function SectionFeedback({ sections }) {
  if (!sections) return null;
  const gradeColor = (g) => {
    if (g === 'A') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (g === 'B') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (g === 'C') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="text-sm font-semibold mb-4">Section Feedback</h3>
      <div className="space-y-3">
        {Object.entries(sections).map(([key, val]) => (
          <div key={key} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex-1">
              <p className="text-sm font-medium capitalize">{key}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{val.feedback}</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${gradeColor(val.grade)}`}>{val.grade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
