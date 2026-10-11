const fs = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const config = require("../config/env");

const seed = [
  { firstName: "Aarav", lastName: "Sharma", email: "aarav.sharma@pugwork.local", role: "Frontend Engineer", department: "Engineering", status: "Active", salary: 920000, location: "Jabalpur", joinDate: "2024-07-15" },
  { firstName: "Ananya", lastName: "Mehta", email: "ananya.mehta@pugwork.local", role: "Product Designer", department: "Design", status: "Active", salary: 840000, location: "Pune", joinDate: "2023-11-06" },
  { firstName: "Kabir", lastName: "Verma", email: "kabir.verma@pugwork.local", role: "Product Manager", department: "Product", status: "On Leave", salary: 1180000, location: "Bengaluru", joinDate: "2022-03-21" },
  { firstName: "Ishita", lastName: "Rao", email: "ishita.rao@pugwork.local", role: "People Operations Specialist", department: "HR", status: "Active", salary: 720000, location: "Mumbai", joinDate: "2025-01-08" },
  { firstName: "Dev", lastName: "Patel", email: "dev.patel@pugwork.local", role: "Data Analyst", department: "Finance", status: "Inactive", salary: 780000, location: "Nagpur", joinDate: "2021-09-13" }
];

async function ensureFile() {
  await fs.mkdir(path.dirname(config.dataFile), { recursive: true });
  try {
    await fs.access(config.dataFile);
  } catch {
    const now = new Date().toISOString();
    const rows = seed.map((item) => ({ ...item, id: randomUUID(), createdAt: now, updatedAt: now }));
    await fs.writeFile(config.dataFile, JSON.stringify(rows, null, 2), "utf8");
  }
}
async function readAll() {
  await ensureFile();
  const raw = await fs.readFile(config.dataFile, "utf8");
  return JSON.parse(raw);
}
async function writeAll(rows) {
  await ensureFile();
  const temp = `${config.dataFile}.tmp`;
  await fs.writeFile(temp, JSON.stringify(rows, null, 2), "utf8");
  await fs.rename(temp, config.dataFile);
}
async function findAll() { return readAll(); }
async function findById(id) { return (await readAll()).find((item) => item.id === id) || null; }
async function findByEmail(email) { return (await readAll()).find((item) => item.email.toLowerCase() === email.toLowerCase()) || null; }
async function create(input) {
  const rows = await readAll();
  const now = new Date().toISOString();
  const employee = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  rows.push(employee);
  await writeAll(rows);
  return employee;
}
async function update(id, input) {
  const rows = await readAll();
  const index = rows.findIndex((item) => item.id === id);
  if (index === -1) return null;
  rows[index] = { ...rows[index], ...input, id, createdAt: rows[index].createdAt, updatedAt: new Date().toISOString() };
  await writeAll(rows);
  return rows[index];
}
async function remove(id) {
  const rows = await readAll();
  const remaining = rows.filter((item) => item.id !== id);
  if (remaining.length === rows.length) return false;
  await writeAll(remaining);
  return true;
}
module.exports = { ensureFile, findAll, findById, findByEmail, create, update, remove };
