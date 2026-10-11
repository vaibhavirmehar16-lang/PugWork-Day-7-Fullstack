"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { Employee, EmployeeInput } from "@/lib/api";
import { ApiError, departments, employeeApi, statuses } from "@/lib/api";

const emptyForm: EmployeeInput = {
  firstName: "", lastName: "", email: "", role: "", department: "Engineering",
  status: "Active", salary: 0, location: "Jabalpur", joinDate: new Date().toISOString().slice(0, 10),
};

export default function EmployeeForm({ employee, mode }: { employee?: Employee; mode: "create" | "edit" }) {
  const router = useRouter();
  const [form, setForm] = useState<EmployeeInput>(employee ? {
    firstName: employee.firstName, lastName: employee.lastName, email: employee.email, role: employee.role,
    department: employee.department, status: employee.status, salary: employee.salary,
    location: employee.location, joinDate: employee.joinDate.slice(0, 10),
  } : emptyForm);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("admin@pugwork.local");
  const [password, setPassword] = useState("PugWork@123");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function update<K extends keyof EmployeeInput>(key: K, value: EmployeeInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function login() {
    setError("");
    try {
      const result = await employeeApi.login(email, password);
      setToken(result.token);
      return result.token;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      return "";
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (form.firstName.trim().length < 2 || form.lastName.trim().length < 2 || !form.role.trim() || !form.location.trim()) {
      setError("Please complete all required fields. Names must contain at least 2 characters.");
      return;
    }
    if (!Number.isFinite(Number(form.salary)) || Number(form.salary) <= 0) {
      setError("Salary must be a number greater than zero.");
      return;
    }
    setBusy(true);
    try {
      const activeToken = token || await login();
      if (!activeToken) return;
      const payload = { ...form, salary: Number(form.salary) };
      if (mode === "create") await employeeApi.create(payload, activeToken);
      else if (employee) await employeeApi.update(employee.id, payload, activeToken);
      router.push("/employees");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : err instanceof Error ? err.message : "Could not save employee.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="form-layout">
      <Link className="back-link" href={employee ? `/employees/${employee.id}` : "/employees"}>← {employee ? "Back to employee" : "Back to directory"}</Link>
      <div className="form-title"><div className="eyebrow">People records / {mode}</div><h1>{mode === "create" ? "Add a teammate." : "Update employee."}</h1><p className="subtitle">Keep employee information accurate and easy to find.</p></div>
      <form className="form-card" onSubmit={submit}>
        {error && <div className="notice notice-error" role="alert">{error}</div>}
        <div className="form-grid">
          <Field label="First name"><input className="field" required minLength={2} maxLength={60} value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="e.g. Aarav" /></Field>
          <Field label="Last name"><input className="field" required minLength={2} maxLength={60} value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="e.g. Sharma" /></Field>
          <Field label="Work email"><input className="field" required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@company.com" /></Field>
          <Field label="Job title"><input className="field" required maxLength={100} value={form.role} onChange={(e) => update("role", e.target.value)} placeholder="e.g. Frontend Engineer" /></Field>
          <Field label="Department"><select className="field" value={form.department} onChange={(e) => update("department", e.target.value as EmployeeInput["department"])}>{departments.map((d) => <option key={d}>{d}</option>)}</select></Field>
          <Field label="Employment status"><select className="field" value={form.status} onChange={(e) => update("status", e.target.value as EmployeeInput["status"])}>{statuses.map((s) => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Annual salary (INR)"><input className="field" required type="number" min="1" step="1" value={form.salary || ""} onChange={(e) => update("salary", Number(e.target.value))} placeholder="850000" /></Field>
          <Field label="Location"><input className="field" required value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Jabalpur" /></Field>
          <Field label="Joining date"><input className="field" required type="date" value={form.joinDate} onChange={(e) => update("joinDate", e.target.value)} /></Field>
        </div>
        <div style={{ marginTop: 20, padding: 14, background: "#f8f7ff", borderRadius: 12, color: "#6b6598", fontSize: 12, lineHeight: 1.6 }}>
          Demo admin authentication is required to save changes. Use the demo credentials shown below, or update them in the API `.env` file.
          <div className="form-grid" style={{ marginTop: 12 }}>
            <Field label="Admin email"><input className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
            <Field label="Admin password"><input className="field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
          </div>
        </div>
        <div className="form-actions">
          <Link className="button-secondary" href={employee ? `/employees/${employee.id}` : "/employees"}>Cancel</Link>
          <button className="button-primary" type="submit" disabled={busy}>{busy ? "Saving…" : mode === "create" ? "Create employee →" : "Save changes →"}</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="form-field"><label>{label}</label>{children}</div>;
}
