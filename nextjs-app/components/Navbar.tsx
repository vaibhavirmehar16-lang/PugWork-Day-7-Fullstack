'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login state
    const checkUser = () => {
      setIsLoggedIn(!!localStorage.getItem('pugwork_user'));
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pugwork_user');
    setIsLoggedIn(false);
    router.replace('/login');
  };

  return (
    <header
      style={{
        background: 'rgba(11, 17, 32, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '0 28px',
      }}
    >
      <div
        style={{
          maxWidth: 1380,
          margin: '0 auto',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <Link href="/employees" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 900,
              fontSize: '1.2rem',
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', lineHeight: 1 }}>
              PugWork<span style={{ color: '#ec4899' }}>.</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600, marginTop: 3 }}>
              People Ops Studio
            </div>
          </div>
        </Link>

        {/* Right side Logout button (only appears if logged in) */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#f87171',
              padding: '7px 14px',
              borderRadius: 10,
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <LogOut size={14} /> Log Out
          </button>
        )}
      </div>
    </header>
  );
}