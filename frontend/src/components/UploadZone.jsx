import { useState } from 'react';

export default function UploadZone({ file, setFile }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (f) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(f.type) && !f.name.match(/\.(pdf|docx)$/)) {
      return 'Only PDF or DOCX allowed';
    }
    if (f.size > maxSize) {
      return 'File must be < 5MB';
    }
    return null;
  };

  const handleFile = (f) => {
    const err = validateFile(f);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-3">
      <label className="text-[13px] font-semibold tracking-wide uppercase text-gray-500">Resume</label>
      
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`relative rounded-xl border-2 border-dashed p-6 text-center transition-all
          ${dragActive ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'}
          ${file ? 'border-black' : ''}`}
      >
        <input
          type="file"
          accept=".pdf,.docx"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        
        {file ? (
          <div className="flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center text-xs font-bold">
                {file.name.endsWith('.pdf') ? 'PDF' : 'DOCX'}
              </div>
              <div>
                <p className="text-sm font-medium truncate max-w-[180px]">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <button onClick={(e) => { e.preventDefault(); setFile(null); }} className="text-xs px-3 py-1.5 rounded-full border hover:bg-gray-50">Remove</button>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-3">↑</div>
            <p className="text-sm font-medium">Drop resume here or <span className="underline">browse</span></p>
            <p className="text-xs text-gray-500 mt-1">PDF or DOCX, max 5MB, single column recommended</p>
          </>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
