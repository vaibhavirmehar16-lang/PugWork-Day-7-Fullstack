export type Department = 'Engineering' | 'Product' | 'Design' | 'HR' | 'Marketing';
export type EmploymentStatus = 'Active' | 'On Leave' | 'Inactive';

export interface Employee {
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

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  errors?: Record<string, string[]>;
}