'use client';

export function useToast() {
  function toast({ title, description }: { title: string; description?: string }) {
    alert(title + (description ? '\n' + description : ''));
  }
  return { toast };
}
