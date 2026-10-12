import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'PugWork — Enterprise Next.js + Node.js Suite',
  description: 'Enterprise People Ops and Workforce Directory'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#0f172a' }}>
        <Navbar />
        <main style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
          {children}
        </main>
      </body>
    </html>
  );
}