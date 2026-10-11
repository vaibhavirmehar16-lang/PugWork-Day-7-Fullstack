import Link from "next/link";
import EmployeeForm from "@/components/EmployeeForm";
import { employeeApi } from "@/lib/api";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const employee = await employeeApi.get(id);
    return <EmployeeForm mode="edit" employee={employee} />;
  } catch {
    notFound();
  }
}
