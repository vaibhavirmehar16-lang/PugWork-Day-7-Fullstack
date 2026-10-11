"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { employeeApi } from "@/lib/api";

export default function EmployeeActions({ employeeId }: { employeeId: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!window.confirm("Delete this employee record? This cannot be undone.")) return;
    const email = window.prompt("Admin email", "admin@pugwork.local");
    if (!email) return;
    const password = window.prompt("Admin password (demo: PugWork@123)");
    if (!password) return;
    setBusy(true);
    setError("");
    try {
      const { token } = await employeeApi.login(email, password);
      await employeeApi.remove(employeeId, token);
      router.push("/employees");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="detail-actions">
        <Link className="button-secondary" href={`/employees/${employeeId}/edit`}>Edit profile</Link>
        <button className="button-danger" onClick={remove} disabled={busy}>{busy ? "Deleting…" : "Delete employee"}</button>
      </div>
      {error && <div className="notice notice-error" style={{ marginTop: 12 }}>{error}</div>}
    </div>
  );
}
