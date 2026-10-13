import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../services/employee.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class EmployeeController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await employeeService.getAll({
        search: typeof req.query.search === 'string' ? req.query.search : undefined,
        department: typeof req.query.department === 'string' ? req.query.department : undefined,
        status: typeof req.query.status === 'string' ? req.query.status : undefined,
      });
      return ApiResponse.success(res, employees, 'Employees retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const employee = await employeeService.getById(id);
      if (!employee) {
        return ApiResponse.error(res, `Employee with ID ${id} not found`, 404);
      }
      return ApiResponse.success(res, employee, 'Employee record found');
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await employeeService.create(req.body);
      return ApiResponse.success(res, created, 'Employee created successfully', 201);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await employeeService.update(id, req.body);
      if (!updated) {
        return ApiResponse.error(res, `Employee with ID ${id} not found`, 404);
      }
      return ApiResponse.success(res, updated, 'Employee updated successfully');
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await employeeService.delete(id);
      if (!deleted) {
        return ApiResponse.error(res, `Employee with ID ${id} not found`, 404);
      }
      return ApiResponse.success(res, { id }, 'Employee record purged');
    } catch (err) {
      next(err);
    }
  }
}