import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';



export default function useAnalyze() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async ({ file, jobRole, jobDesc, level }) => {
    if (!file) { setError('Please upload resume'); return; }
    if (!jobRole) { setError('Enter target role'); return; }
    if (!jobDesc) { setError('Enter job description'); return; }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobRole', jobRole);
      formData.append('jobDescription', jobDesc);
      formData.append('level', level);

      const res = await axios.post(`${API_URL}/api/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      });

      setResult(res.data);
    } catch (err) {
  const msg = err.response?.data?.error || err.message;
  setError(msg);
  console.error(err);
} finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze, setResult };
}
