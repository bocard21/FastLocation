import '../styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'VFX Slate Generator',
  description: 'Minimal MVP for video/image slate and overlay',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
