import * as React from 'react';

export function Card(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      className={`border rounded p-4 bg-white dark:bg-gray-800 ${className || ''}`}
      {...props}
    />
  );
}
