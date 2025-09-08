'use client';

import { useState } from 'react';
import UploadDropzone from '../components/UploadDropzone';
import SlateForm from '../components/SlateForm';
import OverlaySwitch from '../components/OverlaySwitch';

export default function Page() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [overlayEnabled, setOverlayEnabled] = useState(true);

  return (
    <main className="p-4 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">VFX Slate Generator</h1>
      <UploadDropzone onUploaded={setJobId} />
      {jobId && (
        <div className="space-y-4">
          <OverlaySwitch enabled={overlayEnabled} onChange={setOverlayEnabled} />
          <SlateForm
            jobId={jobId}
            overlayEnabled={overlayEnabled}
            onOverlayAuto={setOverlayEnabled}
          />
        </div>
      )}
    </main>
  );
}
