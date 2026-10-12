import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import React from 'react';

export const metadata: Metadata = {
  title: 'PugWork. — People Ops & Workforce Intelligence',
  description: 'Enterprise People Ops, Workforce Analytics & Directory',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        style={{
          margin: 0,
          padding: 0,
          background: '#090d16',
          color: '#f1f5f9',
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />
        <main
          style={{
            flex: 1,
            maxWidth: 1380,
            width: '100%',
            margin: '0 auto',
            padding: '28px 24px 60px',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}