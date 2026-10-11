export type EmployeeStatus = "Active" | "On Leave" | "Inactive";
export type Department =
  | "Engineering"
  | "Product"
  | "Design"
  | "HR"
  | "Marketing"
  | "Finance"
  | "Operations";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: Department;
  status: EmployeeStatus;
  salary: number;
  location: string;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
}

export type EmployeeInput = Omit<Employee, "id" | "createdAt" | "updatedAt">;

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: { code: string; message: string; details?: unknown };
};

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code = "API_ERROR") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Cannot connect to the API. Make sure the Node API is running.", 0, "NETWORK_ERROR");
  }

  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
  if (!response.ok || !payload.success) {
    throw new ApiError(
      payload.error?.message || `Request failed (${response.status})`,
      response.status,
      payload.error?.code,
    );
  }
  return payload.data as T;
}

export const employeeApi = {
  list: (query = "") => request<Employee[]>(`/employees${query ? `?${query}` : ""}`),
  get: (id: string) => request<Employee>(`/employees/${encodeURIComponent(id)}`),
  create: (input: EmployeeInput, token: string) =>
    request<Employee>("/employees", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(input),
    }),
  update: (id: string, input: EmployeeInput, token: string) =>
    request<Employee>(`/employees/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(input),
    }),
  remove: (id: string, token: string) =>
    request<{ id: string }>(`/employees/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
  login: (email: string, password: string) =>
    request<{ token: string; tokenType: string; expiresIn: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};

export const departments: Department[] = [
  "Engineering", "Product", "Design", "HR", "Marketing", "Finance", "Operations",
];
export const statuses: EmployeeStatus[] = ["Active", "On Leave", "Inactive"];
