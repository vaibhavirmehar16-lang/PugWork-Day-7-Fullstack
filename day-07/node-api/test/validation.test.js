const test = require("node:test");
const assert = require("node:assert/strict");
const { employeeBody } = require("../src/validators/employeeSchemas");

test("employee schema accepts a valid employee", () => {
  const result = employeeBody.safeParse({
    firstName: "Aarav", lastName: "Sharma", email: "aarav@example.com",
    role: "Engineer", department: "Engineering", status: "Active",
    salary: 900000, location: "Jabalpur", joinDate: "2026-01-15"
  });
  assert.equal(result.success, true);
});

test("employee schema rejects an invalid email and non-positive salary", () => {
  const result = employeeBody.safeParse({
    firstName: "Aarav", lastName: "Sharma", email: "not-an-email",
    role: "Engineer", department: "Engineering", status: "Active",
    salary: 0, location: "Jabalpur", joinDate: "2026-01-15"
  });
  assert.equal(result.success, false);
});
