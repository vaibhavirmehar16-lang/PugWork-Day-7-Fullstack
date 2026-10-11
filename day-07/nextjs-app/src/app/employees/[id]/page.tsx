import Link from "next/link";
import { notFound } from "next/navigation";
import { employeeApi } from "@/lib/api";
import EmployeeActions from "@/components/EmployeeActions";

export const dynamic = "force-dynamic";

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const employee = await employeeApi.get(id);
    const name = `${employee.firstName} ${employee.lastName}`;
    const initials = `${employee.firstName[0] || ""}${employee.lastName[0] || ""}`.toUpperCase();
    return (
      <>
        <Link className="back-link" href="/employees">← Back to directory</Link>
        <div className="eyebrow">People records / employee profile</div>
        <div className="page-heading"><div><h1>Employee profile<span style={{ color: "var(--brand)" }}>.</span></h1><p className="subtitle">A single view of role, contact details, and employment information.</p></div></div>
        <section className="detail-card">
          <div className="detail-header">
            <div className="detail-person"><span className="avatar avatar-large">{initials}</span><div><h1>{name}</h1><p className="subtitle">{employee.role} · {employee.department}</p><p className="subtitle" style={{ marginTop: 5 }}>{employee.email}</p></div></div>
            <EmployeeActions employeeId={employee.id} />
          </div>
          <div className="detail-grid">
            <Detail label="Employee ID" value={employee.id} />
            <Detail label="Department" value={employee.department} />
            <Detail label="Employment status" value={employee.status} />
            <Detail label="Annual salary" value={money(employee.salary)} />
            <Detail label="Office location" value={employee.location} />
            <Detail label="Joining date" value={new Date(`${employee.joinDate.slice(0, 10)}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} />
            <Detail label="Record created" value={new Date(employee.createdAt).toLocaleDateString("en-IN")} />
            <Detail label="Last updated" value={new Date(employee.updatedAt).toLocaleDateString("en-IN")} />
          </div>
          <h2 className="section-heading">People operations note</h2>
          <p className="subtitle">This profile is backed by the Express API. Updates are validated on the server and persisted in the local JSON data store.</p>
        </section>
      </>
    );
  } catch {
    notFound();
  }
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="detail-item"><span>{label}</span><strong>{value}</strong></div>;
}
