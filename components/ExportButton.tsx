'use client';

import { useFormContext } from 'react-hook-form';

export default function ExportButton() {
  const { formState } = useFormContext();
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded"
      disabled={formState.isSubmitting}
    >
      {formState.isSubmitting ? 'Processando...' : 'Gerar/Exportar'}
    </button>
  );
}
