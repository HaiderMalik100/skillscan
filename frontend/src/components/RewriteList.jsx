export default function RewriteList({ rewrites }) {
  if (!rewrites?.length) return null;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="text-sm font-semibold mb-4">Suggested Improvements</h3>
      <div className="space-y-4">
        {rewrites.map((r, i) => (
          <div key={i} className="rounded-xl bg-gray-50 border border-gray-100 p-4">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Original</p>
            <p className="text-sm text-gray-600 line-through mb-3">{r.original}</p>
            <p className="text-[11px] uppercase tracking-widest text-black font-semibold mb-2">Improved</p>
            <p className="text-sm font-medium">{r.improved}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
