'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { slateSchema, SlateFields } from '../lib/validators';
import ExportButton from './ExportButton';

interface Props {
  jobId: string;
  overlayEnabled: boolean;
  onOverlayAuto: (v: boolean) => void;
}

export default function SlateForm({ jobId, overlayEnabled, onOverlayAuto }: Props) {
  const methods = useForm<SlateFields>({
    resolver: zodResolver(slateSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
      submittingFor: 'WIP',
    },
  });

  async function onSubmit(values: SlateFields) {
    const res = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, fields: values, options: { overlayEnabled } }),
    });
    if (!res.ok) {
      alert('Export failed');
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    let filename = 'output';
    const dispo = res.headers.get('Content-Disposition');
    const match = dispo?.match(/filename="(.+)"/);
    if (match) filename = match[1];
    a.download = filename;
    a.click();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
        <input {...methods.register('show')} placeholder="Show" className="border p-2 w-full" />
        <select
          {...methods.register('submittingFor', {
            onChange: (e) => onOverlayAuto(e.target.value !== 'FINAL'),
          })}
          className="border p-2 w-full"
        >
          <option value="WIP">WIP</option>
          <option value="FINAL">FINAL</option>
        </select>
        <input
          {...methods.register('versionName')}
          placeholder="Version Name"
          className="border p-2 w-full"
        />
        <input type="date" {...methods.register('date')} className="border p-2 w-full" />
        <input {...methods.register('vendor')} placeholder="Vendor" className="border p-2 w-full" />
        <input
          {...methods.register('shotAssetName')}
          placeholder="Shot/Asset Name"
          className="border p-2 w-full"
        />
        <input {...methods.register('frames')} placeholder="Frames" className="border p-2 w-full" />
        <ExportButton />
      </form>
    </FormProvider>
  );
}
