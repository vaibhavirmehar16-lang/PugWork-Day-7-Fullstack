import { Employee } from '@/types';
import { Users, UserCheck, DollarSign, Coffee } from 'lucide-react';

export default function StatsOverview({ employees }: { employees: Employee[] }) {
  const total = employees.length;
  const totalSalary = employees.reduce((acc, curr) => acc + curr.salary, 0);
  const avgSalary = total > 0 ? Math.round(totalSalary / total) : 0;
  const activeCount = employees.filter((e) => e.status === 'Active').length;
  const awayCount = employees.filter((e) => e.status === 'On Leave').length;

  const cards = [
    {
      title: 'Total People',
      value: total,
      sub: 'All registered teammates',
      badge: 'Team Size',
      badgeBg: 'rgba(99, 102, 241, 0.15)',
      badgeColor: '#a5b4fc',
      icon: Users,
    },
    {
      title: 'Working Today',
      value: activeCount,
      sub: `${Math.round((activeCount / (total || 1)) * 100)}% of the team is online`,
      badge: 'Active Now',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeColor: '#34d399',
      icon: UserCheck,
    },
    {
      title: 'Average Yearly Pay',
      value: `$${avgSalary.toLocaleString('en-US')}`,
      sub: 'Per person every year',
      badge: 'Pay Info',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeColor: '#fbbf24',
      icon: DollarSign,
    },
    {
      title: 'Off or On Leave',
      value: awayCount,
      sub: 'On approved break today',
      badge: 'Away',
      badgeBg: 'rgba(148, 163, 184, 0.15)',
      badgeColor: '#cbd5e1',
      icon: Coffee,
    },
  ];

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            background: '#0f172a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#94a3b8' }}>{c.title}</span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 6,
                background: c.badgeBg,
                color: c.badgeColor,
              }}
            >
              {c.badge}
            </span>
          </div>
          <div
            suppressHydrationWarning
            style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '12px 0 4px', letterSpacing: '-0.02em' }}
          >
            {c.value}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{c.sub}</div>
        </div>
      ))}
    </section>
  );
}