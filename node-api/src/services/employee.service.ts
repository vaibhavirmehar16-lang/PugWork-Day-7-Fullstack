import { IEmployee, EmployeeCreateSchema, EmployeeUpdateSchema } from '../models/employee.model.js';
import { z } from 'zod';

class EmployeeService {
  private employees: IEmployee[] = [
    {
      id: 'EMP-1001',
      name: 'Sarah Connor',
      email: 'sarah.connor@workforce.com',
      role: 'Staff Platform Engineer',
      department: 'Engineering',
      status: 'Active',
      salary: 145000,
      joinDate: '2023-01-15',
      createdAt: '2023-01-15T08:00:00.000Z',
      updatedAt: '2023-01-15T08:00:00.000Z'
    },
    {
      id: 'EMP-1002',
      name: 'Alex Mercer',
      email: 'alex.mercer@workforce.com',
      role: 'Principal UX Designer',
      department: 'Design',
      status: 'Active',
      salary: 128000,
      joinDate: '2023-03-20',
      createdAt: '2023-03-20T08:00:00.000Z',
      updatedAt: '2023-03-20T08:00:00.000Z'
    },
    {
      id: 'EMP-1003',
      name: 'Elena Rostova',
      email: 'elena.rostova@workforce.com',
      role: 'Head of People Operations',
      department: 'HR',
      status: 'On Leave',
      salary: 118000,
      joinDate: '2022-11-01',
      createdAt: '2022-11-01T08:00:00.000Z',
      updatedAt: '2022-11-01T08:00:00.000Z'
    }
  ];

  async getAll(query: { search?: string; department?: string; status?: string }) {
    return this.employees.filter(emp => {
      const matchSearch = query.search 
        ? emp.name.toLowerCase().includes(query.search.toLowerCase()) ||
          emp.email.toLowerCase().includes(query.search.toLowerCase()) ||
          emp.role.toLowerCase().includes(query.search.toLowerCase())
        : true;
      const matchDept = query.department && query.department !== 'All' ? emp.department === query.department : true;
      const matchStatus = query.status && query.status !== 'All' ? emp.status === query.status : true;
      return matchSearch && matchDept && matchStatus;
    });
  }

  async getById(id: string): Promise<IEmployee | null> {
    return this.employees.find(e => e.id === id) || null;
  }

  async create(data: z.infer<typeof EmployeeCreateSchema>): Promise<IEmployee> {
    const existing = this.employees.find(e => e.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      const err: any = new Error('An employee with this email already exists');
      err.statusCode = 409;
      throw err;
    }

    const newEmployee: IEmployee = {
      id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department,
      status: data.status || 'Active',
      salary: data.salary,
      joinDate: data.joinDate || new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.employees.unshift(newEmployee);
    return newEmployee;
  }

  async update(id: string, updates: z.infer<typeof EmployeeUpdateSchema>): Promise<IEmployee | null> {
    const index = this.employees.findIndex(e => e.id === id);
    if (index === -1) return null;

    if (updates.email && updates.email !== this.employees[index].email) {
      const duplicate = this.employees.find(e => e.email.toLowerCase() === updates.email?.toLowerCase());
      if (duplicate) {
        const err: any = new Error('Email already assigned to another employee');
        err.statusCode = 409;
        throw err;
      }
    }

    this.employees[index] = {
      ...this.employees[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.employees[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLen = this.employees.length;
    this.employees = this.employees.filter(e => e.id !== id);
    return this.employees.length !== initialLen;
  }
}

export const employeeService = new EmployeeService();