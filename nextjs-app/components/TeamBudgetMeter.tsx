'use client';

import { Employee } from '@/types';
import { PieChart } from 'lucide-react';

export default function TeamBudgetMeter({ employees }: { employees: Employee[] }) {
  const totalBudget = employees.reduce((acc, curr) => acc + curr.salary, 0);

  const deptData: Record<string, { count: number; salary: number }> = {};
  employees.forEach((emp) => {
    if (!deptData[emp.department]) {
      deptData[emp.department] = { count: 0, salary: 0 };
    }
    deptData[emp.department].count += 1;
    deptData[emp.department].salary += emp.salary;
  });

  const colors: Record<string, string> = {
    Engineering: '#6366f1',
    Design: '#ec4899',
    Product: '#06b6d4',
    HR: '#10b981',
    Marketing: '#f59e0b',
  };

  const departments = Object.entries(deptData);

  return (
    <div
      style={{
        background: '#0f172a',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <PieChart size={18} color="#a5b4fc" />
          <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
            Team Health & Budget Meter
          </span>
        </div>
        <span
          suppressHydrationWarning
          style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 8,
            background: 'rgba(99, 102, 241, 0.15)',
            color: '#818cf8',
          }}
        >
          Total: ${totalBudget.toLocaleString('en-US')}/yr
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: 10,
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: 6,
          display: 'flex',
          overflow: 'hidden',
          gap: 2,
        }}
      >
        {departments.map(([dept, data]) => {
          const pct = totalBudget > 0 ? (data.salary / totalBudget) * 100 : 0;
          return (
            <div
              key={dept}
              title={`${dept}: ${pct.toFixed(1)}%`}
              style={{
                width: `${pct}%`,
                background: colors[dept] || '#a855f7',
                transition: 'width 0.4s ease',
              }}
            />
          );
        })}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
        {departments.map(([dept, data]) => {
          const pct = totalBudget > 0 ? Math.round((data.salary / totalBudget) * 100) : 0;
          const monthlyAvg = Math.round(data.salary / 12);
          return (
            <div
              key={dept}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '6px 12px',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: colors[dept] || '#a855f7',
                }}
              />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>{dept}</span>
              <span suppressHydrationWarning style={{ fontSize: '0.78rem', color: '#64748b' }}>
                {pct}% (${monthlyAvg.toLocaleString('en-US')}/mo)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}