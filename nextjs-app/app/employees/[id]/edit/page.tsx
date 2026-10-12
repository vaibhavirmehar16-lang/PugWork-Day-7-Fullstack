import { fetchEmployeeById, updateEmployee } from '@/lib/api';
import EmployeeForm from '@/components/EmployeeForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditEmployeePage({ params }: Props) {
  const { id } = await params;
  const employee = await fetchEmployeeById(id);

  async function handleUpdate(data: any) {
    'use server';
    await updateEmployee(id, data);
  }

  return (
    <EmployeeForm 
      title={`Edit Record — ${employee.name}`} 
      initialData={employee} 
      onSubmit={handleUpdate} 
    />
  );
}