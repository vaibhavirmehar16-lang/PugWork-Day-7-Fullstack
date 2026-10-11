"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Department, Employee, EmployeeStatus } from "@/lib/api";
import { departments, statuses } from "@/lib/api";

function fullName(employee: Employee) {
  return `${employee.firstName} ${employee.lastName}`;
}
function initials(employee: Employee) {
  return `${employee.firstName[0] || ""}${employee.lastName[0] || ""}`.toUpperCase();
}
function statusClass(status: EmployeeStatus) {
  return status === "Active" ? "pill-active" : status === "On Leave" ? "pill-leave" : "pill-inactive";
}
function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export default function EmployeeDirectory({ initialEmployees }: { initialEmployees: Employee[] }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<Department | "All">("All");
  const [status, setStatus] = useState<EmployeeStatus | "All">("All");
  const [sort, setSort] = useState("name");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return initialEmployees.filter((employee) => {
      const matchesQuery = !needle || [fullName(employee), employee.email, employee.role, employee.department]
        .some((value) => value.toLowerCase().includes(needle));
      return matchesQuery && (department === "All" || employee.department === department)
        && (status === "All" || employee.status === status);
    }).sort((a, b) => {
      if (sort === "salary-high") return b.salary - a.salary;
      if (sort === "salary-low") return a.salary - b.salary;
      if (sort === "newest") return b.joinDate.localeCompare(a.joinDate);
      return fullName(a).localeCompare(fullName(b));
    });
  }, [initialEmployees, query, department, status, sort]);
  const active = initialEmployees.filter((e) => e.status === "Active").length;
  const payroll = initialEmployees.reduce((sum, e) => sum + e.salary, 0);

  return (
    <>
      <div className="eyebrow">People intelligence / directory</div>
      <div className="page-heading">
        <div>
          <h1>Employee directory<span style={{ color: "var(--brand)" }}>.</span></h1>
          <p className="subtitle">Your people, organized. Find the right teammate without the busywork.</p>
        </div>
        <Link className="button-primary" href="/employees/create">＋ Add employee</Link>
      </div>

      <section className="stats" aria-label="Employee summary">
        <article className="stat-card">
          <span className="stat-icon">♙</span><div className="stat-label">Total employees</div>
          <div className="stat-value">{initialEmployees.length}</div><div className="stat-note">Across all departments</div>
        </article>
        <article className="stat-card">
          <span className="stat-icon">↗</span><div className="stat-label">Active teammates</div>
          <div className="stat-value">{active}</div><div className="stat-note">{initialEmployees.length ? Math.round(active / initialEmployees.length * 100) : 0}% of the directory</div>
        </article>
        <article className="stat-card">
          <span className="stat-icon">₹</span><div className="stat-label">Annual salary total</div>
          <div className="stat-value" style={{ fontSize: 25 }}>{money(payroll)}</div><div className="stat-note">Based on listed employee salaries</div>
        </article>
      </section>

      <section className="panel" aria-label="Employee records">
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input className="field" aria-label="Search employees" placeholder="Search name, role, email…" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <select aria-label="Filter by department" value={department} onChange={(event) => setDepartment(event.target.value as Department | "All")}>
            <option value="All">All departments</option>
            {departments.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value as EmployeeStatus | "All")}>
            <option value="All">All statuses</option>
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select aria-label="Sort employees" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="name">Name A–Z</option><option value="salary-high">Salary: high to low</option>
            <option value="salary-low">Salary: low to high</option><option value="newest">Recently joined</option>
          </select>
        </div>
        <div className="toolbar" style={{ paddingTop: 0, borderBottom: 0, justifyContent: "space-between" }}>
          <span className="muted" style={{ fontSize: 12 }}>Showing <strong>{filtered.length}</strong> of {initialEmployees.length} people</span>
          {(query || department !== "All" || status !== "All") && <button className="button-secondary" onClick={() => { setQuery(""); setDepartment("All"); setStatus("All"); }}>Clear filters</button>}
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state"><strong>No employees match those filters.</strong><p>Try another search or clear your filters.</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Employee</th><th>Role</th><th>Department</th><th>Status</th><th>Salary</th><th>Profile</th></tr></thead>
              <tbody>
                {filtered.map((employee) => (
                  <tr key={employee.id}>
                    <td><div className="person"><span className="avatar">{initials(employee)}</span><span><strong>{fullName(employee)}</strong><small>{employee.email}</small></span></div></td>
                    <td>{employee.role}</td><td>{employee.department}</td>
                    <td><span className={`pill ${statusClass(employee.status)}`}>{employee.status}</span></td>
                    <td>{money(employee.salary)}</td><td><Link className="table-link" href={`/employees/${employee.id}`}>View →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
