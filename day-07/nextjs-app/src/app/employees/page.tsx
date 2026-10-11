import { employeeApi } from "@/lib/api";
import EmployeeDirectory from "@/components/EmployeeDirectory";

export const dynamic = "force-dynamic";

export default async function EmployeesPage() {
  try {
    const employees = await employeeApi.list();
    return <EmployeeDirectory initialEmployees={employees} />;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown API error";
    return (
      <div className="state-card" role="alert">
        <div className="eyebrow">API connection</div>
        <h2>Your employee directory is waiting.</h2>
        <p>{message}</p>
        <p>Start the Express API on port 4000, then refresh this page.</p>
      </div>
    );
  }
}
