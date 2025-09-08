'use client';
import * as React from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs }: { tabs: TabItem[] }) {
  const [active, setActive] = React.useState(tabs[0]?.id);
  return (
    <div>
      <div className="flex border-b">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`px-3 py-2 ${active === t.id ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-2">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
