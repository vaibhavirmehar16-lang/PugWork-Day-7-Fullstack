const employeeModel = require("../models/employeeModel");
const AppError = require("../utils/AppError");

async function list(filters = {}) {
  let employees = await employeeModel.findAll();
  if (filters.q) {
    const q = filters.q.toLowerCase();
    employees = employees.filter((e) => [e.firstName, e.lastName, e.email, e.role, e.department].some((value) => value.toLowerCase().includes(q)));
  }
  if (filters.department) employees = employees.filter((e) => e.department === filters.department);
  if (filters.status) employees = employees.filter((e) => e.status === filters.status);
  if (filters.sort === "salary-high") employees.sort((a, b) => b.salary - a.salary);
  else if (filters.sort === "salary-low") employees.sort((a, b) => a.salary - b.salary);
  else if (filters.sort === "newest") employees.sort((a, b) => b.joinDate.localeCompare(a.joinDate));
  else employees.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
  return employees;
}
async function get(id) {
  const employee = await employeeModel.findById(id);
  if (!employee) throw new AppError(404, "EMPLOYEE_NOT_FOUND", "Employee not found");
  return employee;
}
async function create(input) {
  if (await employeeModel.findByEmail(input.email)) {
    throw new AppError(409, "EMAIL_ALREADY_EXISTS", "An employee with this email already exists");
  }
  return employeeModel.create({ ...input, email: input.email.toLowerCase() });
}
async function update(id, input) {
  const existing = await get(id);
  const duplicate = await employeeModel.findByEmail(input.email);
  if (duplicate && duplicate.id !== id) {
    throw new AppError(409, "EMAIL_ALREADY_EXISTS", "Another employee already uses this email");
  }
  return employeeModel.update(existing.id, { ...input, email: input.email.toLowerCase() });
}
async function remove(id) {
  await get(id);
  await employeeModel.remove(id);
  return { id };
}
module.exports = { list, get, create, update, remove };
