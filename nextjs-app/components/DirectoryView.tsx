'use client';

import { useState, useMemo } from 'react';
import { Employee, EmploymentStatus } from '@/types';
import { updateEmployee } from '@/lib/api';
import Link from 'next/link';
import { Search, Download, Eye, Edit2, Loader2 } from 'lucide-react';

interface Props {
  initialEmployees: Employee[];
}

export default function DirectoryView({ initialEmployees }: Props) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const departments = ['All', 'Engineering', 'Design', 'Product', 'HR', 'Marketing'];

  // Live client-side search & filtering
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.role.toLowerCase().includes(search.toLowerCase());
      const matchDept = selectedDept === 'All' || emp.department === selectedDept;
      return matchSearch && matchDept;
    });
  }, [employees, search, selectedDept]);

  // 1-Click Status Switcher (Working <-> Off Today <-> Inactive)
  const handleToggleStatus = async (emp: Employee) => {
    const nextStatusMap: Record<EmploymentStatus, EmploymentStatus> = {
      Active: 'On Leave',
      'On Leave': 'Inactive',
      Inactive: 'Active',
    };

    const nextStatus = nextStatusMap[emp.status];
    setUpdatingId(emp.id);

    try {
      setEmployees((prev) =>
        prev.map((e) => (e.id === emp.id ? { ...e, status: nextStatus } : e))
      );
      await updateEmployee(emp.id, { status: nextStatus });
    } catch {
      setEmployees((prev) =>
        prev.map((e) => (e.id === emp.id ? { ...e, status: emp.status } : e))
      );
      alert('Could not update status. Please make sure node-api is running on port 5000.');
    } finally {
      setUpdatingId(null);
    }
  };

  // 1-Click Payroll & Tax Export (.CSV)
  const handleDownloadPaySheet = () => {
    const headers =
      'Employee ID,Full Name,Email,Department,Designation,Status,Annual Salary,Monthly Gross Pay,Est Tax (20%),Estimated Net Monthly\n';

    const rows = employees
      .map((e) => {
        const monthlyGross = Math.round(e.salary / 12);
        const estTax = Math.round(monthlyGross * 0.2);
        const netPay = monthlyGross - estTax;
        return `"${e.id}","${e.name}","${e.email}","${e.department}","${e.role}","${e.status}",$${e.salary},$${monthlyGross},$${estTax},$${netPay}`;
      })
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PugWork-Payroll-Sheet-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search and Action Bar */}
      <div
        style={{
          background: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          {/* Instant Search Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#1e293b',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 12,
              padding: '9px 14px',
              minWidth: 280,
              flex: 1,
              maxWidth: 420,
            }}
          >
            <Search size={16} color="#64748b" />
            <input
              placeholder="Instant search by name, role, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                marginLeft: 10,
                color: '#fff',
                fontSize: '0.88rem',
                width: '100%',
              }}
            />
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownloadPaySheet}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: 12,
              fontSize: '0.86rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)',
            }}
          >
            <Download size={15} />
            <span>Download Pay Sheet (.CSV)</span>
          </button>
        </div>

        {/* Live Pill Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', paddingTop: 6 }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginRight: 4 }}>
            Filter by Squad:
          </span>
          {departments.map((dept) => {
            const count =
              dept === 'All'
                ? employees.length
                : employees.filter((e) => e.department === dept).length;
            const isSelected = selectedDept === dept;

            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                style={{
                  background: isSelected ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isSelected ? '#fff' : '#94a3b8',
                  padding: '5px 12px',
                  borderRadius: 20,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{dept}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    background: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    padding: '1px 6px',
                    borderRadius: 10,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Table */}
      <div
        style={{
          background: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        <table style={{ width: '100%', minWidth: 750, borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr
              style={{
                background: 'rgba(30, 41, 59, 0.7)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#64748b',
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              <th style={{ padding: '16px 20px' }}>Teammate</th>
              <th style={{ padding: '16px 20px' }}>Squad</th>
              <th style={{ padding: '16px 20px' }}>Designation</th>
              <th style={{ padding: '16px 20px' }}>Status (Tap to Change)</th>
              <th style={{ padding: '16px 20px' }}>Yearly Pay</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 48, textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                  No teammates match your filter.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  {/* Teammate Name & Avatar */}
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                          color: '#fff',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                        }}
                      >
                        {emp.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.9rem' }}>{emp.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{emp.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Squad */}
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: '#cbd5e1',
                        padding: '4px 10px',
                        borderRadius: 8,
                        fontSize: '0.76rem',
                        fontWeight: 600,
                      }}
                    >
                      {emp.department}
                    </span>
                  </td>

                  {/* Role */}
                  <td style={{ padding: '14px 20px', color: '#94a3b8', fontSize: '0.86rem', fontWeight: 500 }}>
                    {emp.role}
                  </td>

                  {/* Clickable Status Switcher */}
                  <td style={{ padding: '14px 20px' }}>
                    <button
                      onClick={() => handleToggleStatus(emp)}
                      disabled={updatingId === emp.id}
                      title="Click to toggle status"
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none',
                        padding: '5px 12px',
                        borderRadius: 20,
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background:
                          emp.status === 'Active'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : emp.status === 'On Leave'
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(148, 163, 184, 0.15)',
                        color:
                          emp.status === 'Active'
                            ? '#34d399'
                            : emp.status === 'On Leave'
                            ? '#fbbf24'
                            : '#94a3b8',
                      }}
                    >
                      {updatingId === emp.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background:
                              emp.status === 'Active'
                                ? '#10b981'
                                : emp.status === 'On Leave'
                                ? '#f59e0b'
                                : '#94a3b8',
                          }}
                        />
                      )}
                      <span>
                        {emp.status === 'Active'
                          ? 'Working'
                          : emp.status === 'On Leave'
                          ? 'Off Today'
                          : 'Inactive'}
                      </span>
                    </button>
                  </td>

                  {/* Yearly Pay */}
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#f8fafc', fontSize: '0.9rem' }}>
                    ${emp.salary.toLocaleString('en-US')}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <Link
                        href={`/employees/${emp.id}`}
                        title="View Profile"
                        style={{
                          padding: '6px 10px',
                          borderRadius: 8,
                          background: 'rgba(99, 102, 241, 0.15)',
                          color: '#a5b4fc',
                          textDecoration: 'none',
                        }}
                      >
                        <Eye size={15} />
                      </Link>
                      <Link
                        href={`/employees/${emp.id}/edit`}
                        title="Edit Info"
                        style={{
                          padding: '6px 10px',
                          borderRadius: 8,
                          background: 'rgba(14, 165, 233, 0.15)',
                          color: '#38bdf8',
                          textDecoration: 'none',
                        }}
                      >
                        <Edit2 size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}