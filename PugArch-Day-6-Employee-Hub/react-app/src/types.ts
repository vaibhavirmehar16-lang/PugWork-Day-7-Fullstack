export type Department = 'Engineering' | 'Product' | 'Design' | 'HR' | 'Marketing';
export type EmploymentStatus = 'Active' | 'On Leave' | 'Inactive';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: Department;
  status: EmploymentStatus;
  salary: number;
  email: string;
  joinDate: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  trainer: string;
  department: Department;
  enrolled: number;
  status: 'In Progress' | 'Upcoming' | 'Completed';
  completionRate: number;
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Late' | 'Remote';
}

export interface InquiryTicket {
  id: string;
  from: string;
  subject: string;
  category: 'Payroll' | 'Leave' | 'Hardware' | 'General';
  status: 'Open' | 'Resolved';
  timestamp: string;
}