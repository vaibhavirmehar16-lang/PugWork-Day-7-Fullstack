// 1. Primitive types & Type Aliases
type EmployeeID = string | number;
type Department = 'Engineering' | 'Design' | 'HR' | 'Finance' | 'Marketing';

// 2. Enums
enum EmploymentStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On Leave',
  INACTIVE = 'Inactive'
}

// 3. Interfaces & Optional Properties
interface Address {
  city: string;
  country: string;
}

interface BaseEmployee {
  readonly id: EmployeeID;
  name: string;
  email: string;
  department: Department;
  role: string;
  salary: number;
  status: EmploymentStatus;
  avatar?: string; // Optional property
  address?: Address;
}

// 4. Classes with TypeScript
class EmployeeAccount implements BaseEmployee {
  constructor(
    public readonly id: EmployeeID,
    public name: string,
    public email: string,
    public department: Department,
    public role: string,
    public salary: number,
    public status: EmploymentStatus = EmploymentStatus.ACTIVE
  ) {}

  getSummary(): string {
    return `${this.name} (${this.role}) - Dept: ${this.department}`;
  }
}

// 5. Generics
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  timestamp: number;
}

function wrapResponse<T>(payload: T): ApiResponse<T> {
  return {
    data: payload,
    status: 'success',
    timestamp: Date.now()
  };
}

// 6. Type Guards & Type Narrowing
function isHighEarner(emp: BaseEmployee): boolean {
  return emp.salary > 80000;
}

function formatSalary(value: string | number): string {
  // Narrowing using typeof
  if (typeof value === 'number') {
    return `$${value.toLocaleString()}`;
  }
  return `$${parseFloat(value).toLocaleString()}`;
}

export type { BaseEmployee, Department, EmploymentStatus, ApiResponse };
export { EmployeeAccount, formatSalary, isHighEarner, wrapResponse };