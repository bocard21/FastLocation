'use client';

import { useState } from 'react';

interface Props {
  onUploaded: (jobId: string) => void;
}

export default function UploadDropzone({ onUploaded }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.jobId) onUploaded(data.jobId);
  }

  return (
    <div className="border p-4 rounded">
      <input type="file" onChange={handleChange} />
      {fileName && <p className="mt-2 text-sm">{fileName}</p>}
    </div>
  );
}
