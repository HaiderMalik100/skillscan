export default function JobInput({
  jobRole,
  setJobRole,
  jobDesc,
  setJobDesc,
  level,
  setLevel,
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-[13px] font-semibold tracking-wide uppercase text-gray-500">
          Target Role
        </label>
        <input
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="e.g. Frontend Developer, Data Analyst"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[13px] font-semibold tracking-wide uppercase text-gray-500">
          Job Description{" "}
          {/* <span className="normal-case font-normal text-gray-400">
            (optional but better score)
          </span> */}
        </label>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste full JD here for accurate skill gap + ATS keywords..."
          rows={6}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none resize-none focus:border-black focus:ring-1 focus:ring-black"
        />
        <p className="text-[11px] text-gray-400">{jobDesc.length} chars</p>
      </div>

      <div className="space-y-2">
        <label className="text-[13px] font-semibold tracking-wide uppercase text-gray-500">
          Experience Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["Fresher", "Mid", "Senior"].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-full border px-3 py-2.5 text-sm font-medium transition
                ${level === l ? "bg-black text-white border-black" : "bg-white border-gray-200 hover:border-gray-300"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
