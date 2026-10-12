import { z } from 'zod';

export type Department = 'Engineering' | 'Product' | 'Design' | 'HR' | 'Marketing';
export type EmploymentStatus = 'Active' | 'On Leave' | 'Inactive';

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: Department;
  status: EmploymentStatus;
  salary: number;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
}

export const EmployeeCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid business email address'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  department: z.enum(['Engineering', 'Product', 'Design', 'HR', 'Marketing']),
  status: z.enum(['Active', 'On Leave', 'Inactive']).default('Active'),
  salary: z.number().positive('Salary must be greater than 0'),
  joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Join date must be YYYY-MM-DD').optional()
});

export const EmployeeUpdateSchema = EmployeeCreateSchema.partial();