export default function SkillGaps({ skills, keywords }) {
  if (!skills) return null;
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold mb-4">Skill Gap Analysis</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-emerald-600 font-semibold mb-2">Matched • {skills.matched?.length || 0}</p>
            <div className="flex flex-wrap gap-2">
              {skills.matched?.map(s => (
                <span key={s} className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-red-600 font-semibold mb-2">Missing • {skills.missing?.length || 0}</p>
            <div className="flex flex-wrap gap-2">
              {skills.missing?.map(s => (
                <span key={s} className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-medium text-red-700">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-amber-600 font-semibold mb-2">Weak • {skills.weak?.length || 0}</p>
            <div className="flex flex-wrap gap-2">
              {skills.weak?.map(s => (
                <span key={s} className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {keywords && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold mb-4">ATS Keywords</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-2">Present</p>
              <div className="flex flex-wrap gap-1.5">
                {keywords.present?.map(k => <span key={k} className="text-[11px] px-2 py-1 bg-gray-100 rounded-full">{k}</span>)}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Add These</p>
              <div className="flex flex-wrap gap-1.5">
                {keywords.missing?.map(k => <span key={k} className="text-[11px] px-2 py-1 bg-black text-white rounded-full">{k}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
