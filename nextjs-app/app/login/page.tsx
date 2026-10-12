'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@workforce.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Save session in browser
    setTimeout(() => {
      localStorage.setItem('pugwork_user', JSON.stringify({ email, name: 'Admin User' }));
      setIsLoading(false);
      router.push('/employees');
    }, 400);
  };

  const fillDemo = () => {
    setEmail('admin@workforce.com');
    setPassword('admin123');
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '20px',
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '20%',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Glass Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 24,
          padding: '36px 32px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '5px 12px', borderRadius: 20, marginBottom: 14 }}>
            <Sparkles size={14} color="#f472b6" />
            <span style={{ fontSize: '0.74rem', color: '#f472b6', fontWeight: 700 }}>Built for modern squads</span>
          </div>

          <div
            style={{
              width: 58,
              height: 58,
              margin: '0 auto 12px',
              borderRadius: 18,
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 28px rgba(168, 85, 247, 0.45)',
            }}
          >
            <span style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900 }}>⚡</span>
          </div>

          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
            Welcome back 👋
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: '6px 0 0' }}>
            Sign in to check your team records & live stats.
          </p>
        </div>

        {/* Demo Auto-fill Helper */}
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 14,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.2rem' }}>🔑</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e2e8f0' }}>Quick Test Login</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>admin@workforce.com</div>
            </div>
          </div>
          <button
            type="button"
            onClick={fillDemo}
            style={{
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              color: '#a5b4fc',
              padding: '5px 10px',
              borderRadius: 8,
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Auto-fill
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
              Work Email
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#1e293b',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 12,
                padding: '11px 14px',
              }}
            >
              <Mail size={16} color="#64748b" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  marginLeft: 10,
                  color: '#fff',
                  width: '100%',
                  fontSize: '0.88rem',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#1e293b',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 12,
                padding: '11px 14px',
              }}
            >
              <Lock size={16} color="#64748b" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  marginLeft: 10,
                  color: '#fff',
                  width: '100%',
                  fontSize: '0.88rem',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: 10,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
              border: 'none',
              borderRadius: 12,
              padding: '14px',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.94rem',
              cursor: isLoading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
            }}
          >
            <span>{isLoading ? 'Checking credentials...' : 'Enter Workspace'}</span>
            <ArrowRight size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}