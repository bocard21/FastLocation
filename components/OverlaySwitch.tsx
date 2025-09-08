'use client';

interface Props {
  enabled: boolean;
  onChange: (v: boolean) => void;
}

export default function OverlaySwitch({ enabled, onChange }: Props) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={enabled} onChange={(e) => onChange(e.target.checked)} />
      <span>Overlay</span>
    </label>
  );
}
