const { z } = require("zod");

const department = z.enum(["Engineering", "Product", "Design", "HR", "Marketing", "Finance", "Operations"]);
const status = z.enum(["Active", "On Leave", "Inactive"]);
const employeeBody = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(254),
  role: z.string().trim().min(2).max(100),
  department,
  status,
  salary: z.coerce.number().positive().max(100000000),
  location: z.string().trim().min(2).max(100),
  joinDate: z.string().date(),
}).strict();

const listQuery = z.object({
  q: z.string().trim().max(100).optional(),
  department: department.optional(),
  status: status.optional(),
  sort: z.enum(["name", "salary-high", "salary-low", "newest"]).optional(),
});

const loginBody = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
}).strict();

module.exports = { employeeBody, listQuery, loginBody };
