'use client';

import { useState } from 'react';
import { Employee, Department, EmploymentStatus } from '@/types';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Sparkles, User, Mail, Briefcase, DollarSign, Building } from 'lucide-react';
import Link from 'next/link';

interface Props {
  initialData?: Employee;
  onSubmit: (data: Partial<Employee>) => Promise<void>;
  title: string;
}

export default function EmployeeForm({ initialData, onSubmit, title }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [department, setDepartment] = useState<Department>(initialData?.department || 'Engineering');
  const [status, setStatus] = useState<EmploymentStatus>(initialData?.status || 'Active');
  const [salary, setSalary] = useState(initialData?.salary ? String(initialData.salary) : '');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await onSubmit({
        name,
        email,
        role,
        department,
        status,
        salary: Number(salary),
      });
      router.push('/employees');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: '20px auto', position: 'relative' }}>
      {/* Background glow behind form */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: '20%',
          width: 280,
          height: 280,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '32px 30px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '4px 10px', borderRadius: 20, marginBottom: 8 }}>
              <Sparkles size={13} color="#818cf8" />
              <span style={{ fontSize: '0.72rem', color: '#a5b4fc', fontWeight: 700 }}>Team Onboarding</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', margin: 0 }}>{title}</h2>
          </div>
          <Link
            href="/employees"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
              color: '#94a3b8',
              fontSize: '0.84rem',
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <ArrowLeft size={15} /> Back
          </Link>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '10px 14px', borderRadius: 10, fontSize: '0.85rem', marginBottom: 18 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <User size={14} color="#818cf8" /> Full Name
            </label>
            <input
              required
              placeholder="e.g. Maya Patel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', background: '#1e293b', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <Mail size={14} color="#818cf8" /> Work Email
            </label>
            <input
              required
              type="email"
              placeholder="maya.patel@workforce.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', background: '#1e293b', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <Briefcase size={14} color="#818cf8" /> Job Title
            </label>
            <input
              required
              placeholder="e.g. Lead Frontend Architect"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', background: '#1e293b', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Building size={14} color="#818cf8" /> Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', background: '#1e293b', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
              >
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EmploymentStatus)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', background: '#1e293b', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <DollarSign size={14} color="#818cf8" /> Annual Salary (USD)
            </label>
            <input
              required
              type="number"
              placeholder="120000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', background: '#1e293b', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: 10,
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: '#fff',
              border: 'none',
              padding: '13px',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: '0.94rem',
              cursor: submitting ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 8px 20px rgba(79, 70, 229, 0.4)',
            }}
          >
            <Save size={16} /> {submitting ? 'Saving to Database...' : 'Commit Record to Database'}
          </button>
        </form>
      </div>
    </div>
  );
}