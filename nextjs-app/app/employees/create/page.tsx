'use client';

import EmployeeForm from '@/components/EmployeeForm';
import { createEmployee } from '@/lib/api';

export default function CreateEmployeePage() {
  return (
    <EmployeeForm 
      title="Create New Personnel Record" 
      onSubmit={async (data) => {
        await createEmployee(data);
      }} 
    />
  );
}