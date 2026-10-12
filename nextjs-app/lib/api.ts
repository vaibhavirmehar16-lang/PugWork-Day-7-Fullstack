import { Employee, ApiResponse } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'pugwork_super_secret_jwt_vault_key_2026';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

export async function fetchEmployees(search?: string, department?: string): Promise<Employee[]> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (department && department !== 'All') params.append('department', department);

  const res = await fetch(`${API_BASE}/employees?${params.toString()}`, {
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Failed to retrieve employee workforce records');
  const payload: ApiResponse<Employee[]> = await res.json();
  return payload.data;
}

export async function fetchEmployeeById(id: string): Promise<Employee> {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) throw new Error(`Could not locate employee with ID: ${id}`);
  const payload: ApiResponse<Employee> = await res.json();
  return payload.data;
}

export async function createEmployee(data: Partial<Employee>): Promise<Employee> {
  const res = await fetch(`${API_BASE}/employees`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });

  const payload: ApiResponse<Employee> = await res.json();
  if (!res.ok) throw new Error(payload.message || 'Creation failed');
  return payload.data;
}

export async function updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  });

  const payload: ApiResponse<Employee> = await res.json();
  if (!res.ok) throw new Error(payload.message || 'Update failed');
  return payload.data;
}

export async function deleteEmployee(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    method: 'DELETE',
    headers
  });

  if (!res.ok) {
    const payload = await res.json();
    throw new Error(payload.message || 'Purge failed');
  }
}