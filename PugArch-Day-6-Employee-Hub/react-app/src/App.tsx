import React, { useState, useMemo, useEffect } from 'react';
import { Employee, Department, TrainingProgram, AttendanceRecord, InquiryTicket } from './types';
import { INITIAL_EMPLOYEES } from './mockData';
import { 
  Users, 
  BarChart3, 
  GraduationCap, 
  Search, 
  Plus, 
  Download, 
  Trash2, 
  Calendar, 
  CreditCard, 
  Inbox, 
  TrendingUp, 
  Clock, 
  LogOut, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

const INITIAL_TRAININGS: TrainingProgram[] = [
  { id: 'TR-101', title: 'Cloud Infrastructure & Kubernetes', trainer: 'Alex Brown', department: 'Engineering', enrolled: 24, status: 'In Progress', completionRate: 68 },
  { id: 'TR-102', title: 'Figma Design System Architecture', trainer: 'Sarah Lee', department: 'Design', enrolled: 18, status: 'In Progress', completionRate: 85 },
  { id: 'TR-103', title: 'Enterprise Financial Auditing', trainer: 'Priya Singh', department: 'Product', enrolled: 12, status: 'Completed', completionRate: 100 },
  { id: 'TR-104', title: 'Modern HR Compliance & Scaling', trainer: 'Jacob Martinez', department: 'HR', enrolled: 15, status: 'Upcoming', completionRate: 0 },
];

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'ATT-01', employeeName: 'Sarah Lee', date: '2026-10-10', checkIn: '09:02 AM', checkOut: '06:05 PM', status: 'Present' },
  { id: 'ATT-02', employeeName: 'Alex Brown', date: '2026-10-10', checkIn: '09:14 AM', checkOut: '06:30 PM', status: 'Remote' },
  { id: 'ATT-03', employeeName: 'Priya Singh', date: '2026-10-10', checkIn: '09:48 AM', checkOut: '--', status: 'Late' },
  { id: 'ATT-04', employeeName: 'Jacob Martinez', date: '2026-10-10', checkIn: '08:58 AM', checkOut: '05:45 PM', status: 'Present' },
];

const INITIAL_TICKETS: InquiryTicket[] = [
  { id: 'TCK-201', from: 'Sarah Lee', subject: 'MacBook Pro M3 upgrade approval request', category: 'Hardware', status: 'Open', timestamp: '2 hours ago' },
  { id: 'TCK-202', from: 'David Kim', subject: 'Q3 sales commission statement discrepancy', category: 'Payroll', status: 'Open', timestamp: 'Yesterday' },
  { id: 'TCK-203', from: 'Alex Brown', subject: 'Paternity leave policy clarification', category: 'Leave', status: 'Resolved', timestamp: '3 days ago' },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('admin@workforce.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'directory' | 'analytics' | 'training' | 'attendance' | 'payroll' | 'inquiries'>('directory');

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('employee_hub_data');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });
  const [trainings] = useState<TrainingProgram[]>(INITIAL_TRAININGS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [tickets, setTickets] = useState<InquiryTicket[]>(INITIAL_TICKETS);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'salary'>('name');
  const [showModal, setShowModal] = useState<boolean>(false);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formDept, setFormDept] = useState<Department>('Engineering');
  const [formSalary, setFormSalary] = useState('');

  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem('employee_hub_data', JSON.stringify(employees));
  }, [employees]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem('isLoggedIn', 'true');
      }
      setIsLoggingIn(false);
    }, 450);
  };

  const fillDemo = () => {
    setLoginEmail('admin@workforce.com');
    setLoginPassword('admin123');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
  };

  const metrics = useMemo(() => {
    const total = employees.length;
    const totalSalary = employees.reduce((acc, curr) => acc + curr.salary, 0);
    const avgSalary = total > 0 ? Math.round(totalSalary / total) : 0;
    const active = employees.filter((e) => e.status === 'Active').length;
    const onLeave = employees.filter((e) => e.status === 'On Leave').length;
    return { total, avgSalary, active, onLeave, totalSalary };
  }, [employees]);

  const deptBreakdown = useMemo(() => {
    const counts: Record<string, { count: number; totalSalary: number }> = {};
    employees.forEach(emp => {
      if (!counts[emp.department]) {
        counts[emp.department] = { count: 0, totalSalary: 0 };
      }
      counts[emp.department].count += 1;
      counts[emp.department].totalSalary += emp.salary;
    });
    return Object.entries(counts);
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        const matchesSearch = 
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
        const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;
        return matchesSearch && matchesDept && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'salary') return b.salary - a.salary;
        return a.name.localeCompare(b.name);
      });
  }, [employees, searchTerm, selectedDept, selectedStatus, sortBy]);

  const toggleAttendance = () => {
    if (!hasCheckedIn) {
      const newRec: AttendanceRecord = {
        id: `ATT-0${attendance.length + 1}`,
        employeeName: 'Sarah Admin (You)',
        date: new Date().toISOString().slice(0, 10),
        checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        checkOut: '--',
        status: 'Present'
      };
      setAttendance([newRec, ...attendance]);
      setHasCheckedIn(true);
    } else {
      setAttendance(prev => prev.map((item, idx) => idx === 0 ? {
        ...item,
        checkOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      } : item));
      setHasCheckedIn(false);
    }
  };

  const toggleTicketStatus = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? {
      ...t,
      status: t.status === 'Open' ? 'Resolved' : 'Open'
    } : t));
  };

  const exportCSV = () => {
    const headers = 'ID,Name,Email,Department,Role,Status,Salary,JoinDate\n';
    const rows = employees.map(e => 
      `${e.id},"${e.name}","${e.email}","${e.department}","${e.role}","${e.status}",${e.salary},"${e.joinDate}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pugwork-records-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formSalary) return;

    const newEmp: Employee = {
      id: `EMP-${1000 + employees.length + 1}`,
      name: formName,
      email: formEmail,
      role: formRole || 'Specialist',
      department: formDept,
      status: 'Active',
      salary: Number(formSalary),
      joinDate: new Date().toISOString().slice(0, 10)
    };

    setEmployees((prev) => [newEmp, ...prev]);
    setFormName('');
    setFormEmail('');
    setFormRole('');
    setFormSalary('');
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.82) 0%, rgba(30, 27, 75, 0.88) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px 36px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.4) inset',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px'
        }}>
          {/* PugWork. Branding */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.5rem',
              boxShadow: '0 10px 25px rgba(79, 70, 229, 0.35)'
            }}>
              P
            </div>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                PugWork<span style={{ color: '#4f46e5' }}>.</span>
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>
                People Ops, simplified.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Work Email</label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                padding: '10px 14px'
              }}>
                <Mail size={17} color="#64748b" />
                <input 
                  type="email"
                  value={loginEmail} 
                  onChange={e => setLoginEmail(e.target.value)} 
                  required 
                  placeholder="admin@workforce.com"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    marginLeft: '10px',
                    width: '100%',
                    fontSize: '0.9rem',
                    color: '#0f172a'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Password</label>
                <span style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 600, cursor: 'pointer' }}>Forgot?</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                padding: '10px 14px'
              }}>
                <Lock size={17} color="#64748b" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword} 
                  onChange={e => setLoginPassword(e.target.value)} 
                  required 
                  placeholder="••••••••"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    marginLeft: '10px',
                    width: '100%',
                    fontSize: '0.9rem',
                    color: '#0f172a'
                  }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#475569', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#4f46e5', width: '15px', height: '15px', cursor: 'pointer' }}
                />
                Remember for 30 days
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoggingIn}
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 18px',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: isLoggingIn ? 'wait' : 'pointer',
                boxShadow: '0 8px 20px rgba(79, 70, 229, 0.35)',
                marginTop: '4px'
              }}
            >
              <span>{isLoggingIn ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight size={17} />
            </button>
          </form>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} />
              </div>
              <div style={{ lineHeight: 1.25 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Quick Demo Access</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>admin@workforce.com</div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={fillDemo}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '5px 12px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#4f46e5',
                cursor: 'pointer'
              }}
            >
              Fill Credentials
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.74rem', color: '#94a3b8' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Enterprise TLS Encrypted Session</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 1. DARK HYBRID ENTERPRISE SIDEBAR */}
      <aside style={{ 
        width: 250, 
        background: '#0b1120', 
        color: '#94a3b8', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        padding: '22px 14px',
        position: 'relative',
        zIndex: 50,
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px' }}>
            <div style={{ width: 34, height: 34, background: '#4f46e5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>P</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
                PugWork<span style={{ color: '#818cf8' }}>.</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>People Operations</div>
            </div>
          </div>

          {/* MAIN MENU */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569', fontWeight: 700, padding: '6px 10px' }}>
              Main Menu
            </div>

            <button 
              onClick={() => setActiveTab('directory')}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeTab === 'directory' ? '#1e293b' : 'transparent', color: activeTab === 'directory' ? '#38bdf8' : '#94a3b8', fontWeight: activeTab === 'directory' ? 600 : 500, fontSize: '0.86rem' }}
            >
              <Users size={16} />
              <span>Employee Directory</span>
            </button>

            <button 
              onClick={() => setActiveTab('analytics')}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeTab === 'analytics' ? '#1e293b' : 'transparent', color: activeTab === 'analytics' ? '#38bdf8' : '#94a3b8', fontWeight: activeTab === 'analytics' ? 600 : 500, fontSize: '0.86rem' }}
            >
              <BarChart3 size={16} />
              <span>Workforce Analytics</span>
            </button>

            <button 
              onClick={() => setActiveTab('training')}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeTab === 'training' ? '#1e293b' : 'transparent', color: activeTab === 'training' ? '#38bdf8' : '#94a3b8', fontWeight: activeTab === 'training' ? 600 : 500, fontSize: '0.86rem' }}
            >
              <GraduationCap size={16} />
              <span>Training Programs</span>
            </button>
          </div>

          {/* WORKPLACE SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569', fontWeight: 700, padding: '6px 10px' }}>
              Workplace
            </div>

            <button 
              onClick={() => setActiveTab('attendance')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeTab === 'attendance' ? '#1e293b' : 'transparent', color: activeTab === 'attendance' ? '#38bdf8' : '#94a3b8', fontWeight: activeTab === 'attendance' ? 600 : 500, fontSize: '0.86rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Calendar size={16} />
                <span>Attendance</span>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: 10, background: '#10b981', color: '#fff', fontWeight: 700 }}>Live</span>
            </button>

            <button 
              onClick={() => setActiveTab('payroll')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeTab === 'payroll' ? '#1e293b' : 'transparent', color: activeTab === 'payroll' ? '#38bdf8' : '#94a3b8', fontWeight: activeTab === 'payroll' ? 600 : 500, fontSize: '0.86rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CreditCard size={16} />
                <span>Payroll & Finance</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('inquiries')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeTab === 'inquiries' ? '#1e293b' : 'transparent', color: activeTab === 'inquiries' ? '#38bdf8' : '#94a3b8', fontWeight: activeTab === 'inquiries' ? 600 : 500, fontSize: '0.86rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Inbox size={16} />
                <span>Team Inquiries</span>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: 10, background: '#ef4444', color: '#fff', fontWeight: 700 }}>
                {tickets.filter(t => t.status === 'Open').length}
              </span>
            </button>
          </div>
        </div>

        {/* User Profile Footer */}
        <div style={{ background: '#131d31', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4f46e5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700 }}>HR</div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#f8fafc', fontWeight: 600 }}>Sarah Admin</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Operations</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Sign out">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <header style={{ height: 64, background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', width: '100%', maxWidth: 360 }}>
            <Search size={15} color="#94a3b8" />
            <input 
              style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: 8, width: '100%', fontSize: '0.86rem' }} 
              placeholder="Search employee, payroll, tickets..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e2e8f0', padding: '7px 14px', borderRadius: 8, fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer', color: '#334155' }}>
              <Download size={14} /> Export CSV
            </button>
            <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#4f46e5', border: 'none', padding: '7px 16px', borderRadius: 8, fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer', color: '#fff' }}>
              <Plus size={15} /> Add Employee
            </button>
          </div>
        </header>

        <main style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>Total Workforce</span>
                <span style={{ background: '#ecfdf5', color: '#047857', padding: '2px 6px', borderRadius: 4, fontSize: '0.72rem' }}>+12%</span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '8px 0 4px', color: '#0f172a' }}>{metrics.total}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Live synchronized records</div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>Active Duty</span>
                <span style={{ background: '#eef2ff', color: '#4f46e5', padding: '2px 6px', borderRadius: 4, fontSize: '0.72rem' }}>Online</span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '8px 0 4px', color: '#0f172a' }}>{metrics.active}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{Math.round((metrics.active / (metrics.total || 1)) * 100)}% active duty ratio</div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>Avg Compensation</span>
                <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: 4, fontSize: '0.72rem' }}>Annual</span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '8px 0 4px', color: '#0f172a' }}>${metrics.avgSalary.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Verified base salary</div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>On Leave Staff</span>
                <span style={{ background: '#fffbeb', color: '#b45309', padding: '2px 6px', borderRadius: 4, fontSize: '0.72rem' }}>Pending</span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '8px 0 4px', color: '#0f172a' }}>{metrics.onLeave}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Scheduled absence</div>
            </div>
          </section>

          {/* TAB 1: EMPLOYEE DIRECTORY */}
          {activeTab === 'directory' && (
            <>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '0.84rem' }}>
                    <option value="All">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                  </select>

                  <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '0.84rem' }}>
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <select value={sortBy} onChange={e => setSortBy(e.target.value as 'name' | 'salary')} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '0.84rem' }}>
                    <option value="name">Sort: Name (A-Z)</option>
                    <option value="salary">Sort: Salary (Highest)</option>
                  </select>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Showing <b>{filteredEmployees.length}</b> records
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: 650, borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 18px' }}>Employee</th>
                      <th style={{ padding: '12px 18px' }}>Department</th>
                      <th style={{ padding: '12px 18px' }}>Job Title</th>
                      <th style={{ padding: '12px 18px' }}>Status</th>
                      <th style={{ padding: '12px 18px' }}>Salary</th>
                      <th style={{ padding: '12px 18px' }}>Join Date</th>
                      <th style={{ padding: '12px 18px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map(emp => (
                      <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem' }}>
                              {emp.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{emp.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{emp.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{ background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: 6, fontSize: '0.78rem', fontWeight: 600 }}>{emp.department}</span>
                        </td>
                        <td style={{ padding: '12px 18px', fontWeight: 500 }}>{emp.role}</td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{ 
                            padding: '3px 9px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 600,
                            background: emp.status === 'Active' ? '#ecfdf5' : emp.status === 'On Leave' ? '#fffbeb' : '#f1f5f9',
                            color: emp.status === 'Active' ? '#047857' : emp.status === 'On Leave' ? '#b45309' : '#475569'
                          }}>
                            {emp.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 18px', fontWeight: 600 }}>${emp.salary.toLocaleString()}</td>
                        <td style={{ padding: '12px 18px', color: '#64748b', fontSize: '0.8rem' }}>{emp.joinDate}</td>
                        <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                          <button onClick={() => handleDelete(emp.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TAB 2: WORKFORCE ANALYTICS */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Attendance & Productivity Trends</h3>
                    <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Monthly active capacity overview</p>
                  </div>
                  <span style={{ background: '#eef2ff', color: '#4f46e5', padding: '4px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600 }}>2026 Live Data</span>
                </div>

                <div style={{ height: 180, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  {[
                    { month: 'Jan', val: 75 },
                    { month: 'Feb', val: 62 },
                    { month: 'Mar', val: 88 },
                    { month: 'Apr', val: 94 },
                    { month: 'May', val: 82 },
                    { month: 'Jun', val: 91 },
                    { month: 'Jul', val: 85 },
                  ].map((bar, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
                      <div style={{ width: '42%', height: `${bar.val * 1.5}px`, background: i === 3 ? '#4f46e5' : '#c7d2fe', borderRadius: '4px 4px 0 0' }}></div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Staff by Department</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {deptBreakdown.map(([dept, data], idx) => {
                    const pct = Math.round((data.count / (metrics.total || 1)) * 100);
                    const colors = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
                    return (
                      <div key={dept} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                          <span>{dept}</span>
                          <span style={{ color: '#64748b' }}>{data.count} ({pct}%)</span>
                        </div>
                        <div style={{ width: '100%', height: 6, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: colors[idx % colors.length] }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRAINING PROGRAMS */}
          {activeTab === 'training' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
                  <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>Active Modules</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 700, margin: '6px 0', color: '#4f46e5' }}>4 Programs</div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981' }}>69 Total enrolled staff</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
                  <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>Avg Completion Rate</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 700, margin: '6px 0', color: '#0f172a' }}>88.4%</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Target completion Q3</div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 18px' }}>Curriculum</th>
                      <th style={{ padding: '12px 18px' }}>Instructor</th>
                      <th style={{ padding: '12px 18px' }}>Department</th>
                      <th style={{ padding: '12px 18px' }}>Progress</th>
                      <th style={{ padding: '12px 18px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainings.map(tr => (
                      <tr key={tr.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 18px', fontWeight: 600 }}>{tr.title}</td>
                        <td style={{ padding: '12px 18px', color: '#475569' }}>{tr.trainer}</td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600 }}>{tr.department}</span>
                        </td>
                        <td style={{ padding: '12px 18px', width: 200 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                              <div style={{ width: `${tr.completionRate}%`, height: '100%', background: '#4f46e5' }}></div>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{tr.completionRate}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{ padding: '3px 8px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 600, background: tr.status === 'Completed' ? '#ecfdf5' : '#eef2ff', color: tr.status === 'Completed' ? '#047857' : '#4f46e5' }}>
                            {tr.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ATTENDANCE MODULE */}
          {activeTab === 'attendance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Daily Time Tracking & Shift Log</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Manage today's shift log and self check-in status.</p>
                </div>
                <button 
                  onClick={toggleAttendance}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: hasCheckedIn ? '#ef4444' : '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}
                >
                  <Clock size={16} />
                  <span>{hasCheckedIn ? 'Clock Out of Duty' : 'Clock In for Today'}</span>
                </button>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 18px' }}>Employee</th>
                      <th style={{ padding: '12px 18px' }}>Date</th>
                      <th style={{ padding: '12px 18px' }}>Check In</th>
                      <th style={{ padding: '12px 18px' }}>Check Out</th>
                      <th style={{ padding: '12px 18px' }}>Work Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map(a => (
                      <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 18px', fontWeight: 600 }}>{a.employeeName}</td>
                        <td style={{ padding: '12px 18px', color: '#64748b' }}>{a.date}</td>
                        <td style={{ padding: '12px 18px', fontWeight: 600, color: '#047857' }}>{a.checkIn}</td>
                        <td style={{ padding: '12px 18px', color: '#64748b' }}>{a.checkOut}</td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{ 
                            padding: '3px 9px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 600,
                            background: a.status === 'Present' ? '#ecfdf5' : a.status === 'Remote' ? '#eef2ff' : '#fffbeb',
                            color: a.status === 'Present' ? '#047857' : a.status === 'Remote' ? '#4f46e5' : '#b45309'
                          }}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PAYROLL & FINANCE MODULE */}
          {activeTab === 'payroll' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
                  <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>Total Annual Payroll</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '6px 0', color: '#4f46e5' }}>${metrics.totalSalary.toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Budget allocation fully funded</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
                  <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>Monthly Disbursement</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '6px 0', color: '#0f172a' }}>${Math.round(metrics.totalSalary / 12).toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Next auto-pay: 30th Oct</div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>Department Compensation Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {deptBreakdown.map(([dept, data]) => (
                    <div key={dept} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: 8 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{dept} Department</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{data.count} employees active</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>${data.totalSalary.toLocaleString()}</div>
                        <div style={{ fontSize: '0.75rem', color: '#047857' }}>${Math.round(data.totalSalary / data.count).toLocaleString()} avg/person</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TEAM INQUIRIES & TICKETS MODULE */}
          {activeTab === 'inquiries' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Employee Helpdesk & Tickets</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Click on any ticket status to toggle between Open and Resolved.</p>
                </div>
                <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                  {tickets.length} total support tickets
                </span>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 18px' }}>Ticket ID</th>
                      <th style={{ padding: '12px 18px' }}>Requester</th>
                      <th style={{ padding: '12px 18px' }}>Subject</th>
                      <th style={{ padding: '12px 18px' }}>Category</th>
                      <th style={{ padding: '12px 18px' }}>Age</th>
                      <th style={{ padding: '12px 18px', textAlign: 'center' }}>Status (Click to toggle)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map(t => (
                      <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 18px', fontWeight: 600, color: '#64748b' }}>{t.id}</td>
                        <td style={{ padding: '12px 18px', fontWeight: 600 }}>{t.from}</td>
                        <td style={{ padding: '12px 18px', color: '#0f172a' }}>{t.subject}</td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600 }}>{t.category}</span>
                        </td>
                        <td style={{ padding: '12px 18px', fontSize: '0.8rem', color: '#64748b' }}>{t.timestamp}</td>
                        <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                          <button 
                            onClick={() => toggleTicketStatus(t.id)}
                            style={{ 
                              border: 'none', 
                              cursor: 'pointer', 
                              padding: '4px 12px', 
                              borderRadius: 12, 
                              fontSize: '0.75rem', 
                              fontWeight: 700,
                              background: t.status === 'Resolved' ? '#ecfdf5' : '#fee2e2',
                              color: t.status === 'Resolved' ? '#047857' : '#ef4444'
                            }}
                          >
                            {t.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 26, width: '100%', maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Add Employee to Workforce</h3>
            <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input placeholder="Full Name" value={formName} onChange={e => setFormName(e.target.value)} required style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
              <input placeholder="Work Email" type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} required style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
              <input placeholder="Role / Title" value={formRole} onChange={e => setFormRole(e.target.value)} required style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
              <select value={formDept} onChange={e => setFormDept(e.target.value as Department)} style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }}>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
              </select>
              <input placeholder="Salary ($)" type="number" value={formSalary} onChange={e => setFormSalary(e.target.value)} required style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}