'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsOverview from '@/components/StatsOverview';
import TeamBudgetMeter from '@/components/TeamBudgetMeter';
import DirectoryView from '@/components/DirectoryView';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Employee } from '@/types';

export default function EmployeesPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check if user is logged in
    const user = localStorage.getItem('pugwork_user');
    if (!user) {
      router.replace('/login');
      return;
    }

    // 2. Fetch employee records from Node REST API
    async function loadData() {
      try {
        const res = await fetch('http://localhost:5000/api/v1/employees', { cache: 'no-store' });
        const json = await res.json();
        if (json.success) {
          setEmployees(json.data);
        } else {
          setError(json.message || 'Failed to fetch team records');
        }
      } catch (err: any) {
        setError('Cannot reach node-api on port 5000. Ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: '#94a3b8' }}>
        Verifying session & loading team members...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
            Team Members
          </h1>
        </div>

        <Link
          href="/employees/create"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 12,
            fontSize: '0.86rem',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 6px 16px rgba(99, 102, 241, 0.35)',
          }}
        >
          <Plus size={16} /> + Add Teammate
        </Link>
      </div>

      {error ? (
        <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 14, padding: 24, textAlign: 'center', color: '#f87171' }}>
          <b>Cannot load team members</b>
          <div style={{ fontSize: '0.85rem', marginTop: 4 }}>{error}</div>
        </div>
      ) : (
        <>
          <StatsOverview employees={employees} />
          <TeamBudgetMeter employees={employees} />
          <DirectoryView initialEmployees={employees} />
        </>
      )}
    </div>
  );
}