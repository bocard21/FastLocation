'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { slateSchema, SlateFields } from '../lib/validators';
import ExportButton from './ExportButton';

interface Props {
  jobId: string;
  overlayEnabled: boolean;
}

export default function SlateForm({ jobId, overlayEnabled }: Props) {
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
    a.download = 'output';
    a.click();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
        <input {...methods.register('show')} placeholder="Show" className="border p-2 w-full" />
        <select {...methods.register('submittingFor')} className="border p-2 w-full">
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
