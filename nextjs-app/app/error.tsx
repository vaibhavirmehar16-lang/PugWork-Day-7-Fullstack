'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ maxWidth: 500, margin: '40px auto', background: '#fee2e2', borderRadius: 12, padding: 24, textAlign: 'center' }}>
      <h3 style={{ color: '#991b1b', marginTop: 0 }}>Workforce Service Error</h3>
      <p style={{ color: '#b91c1c', fontSize: '0.88rem' }}>{error.message || 'Unable to load employee information'}</p>
      <button 
        onClick={() => reset()} 
        style={{ background: '#b91c1c', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
      >
        Retry Request
      </button>
    </div>
  );
}