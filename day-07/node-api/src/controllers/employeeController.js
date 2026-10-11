const employeeService = require("../services/employeeService");
const { success } = require("../utils/responses");

async function list(req, res) { return success(res, await employeeService.list(req.validatedQuery || req.query)); }
async function get(req, res) { return success(res, await employeeService.get(req.params.id)); }
async function create(req, res) { return success(res, await employeeService.create(req.body), 201); }
async function update(req, res) { return success(res, await employeeService.update(req.params.id, req.body)); }
async function remove(req, res) { return success(res, await employeeService.remove(req.params.id)); }

module.exports = { list, get, create, update, remove };
