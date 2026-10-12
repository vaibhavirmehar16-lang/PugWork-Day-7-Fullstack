import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../services/employee.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class EmployeeController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await employeeService.getAll({
        search: req.query.search as string,
        department: req.query.department as string,
        status: req.query.status as string
      });
      return ApiResponse.success(res, employees, 'Employees retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await employeeService.getById(req.params.id);
      if (!employee) {
        return ApiResponse.error(res, `Employee with ID ${req.params.id} not found`, 404);
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
      const updated = await employeeService.update(req.params.id, req.body);
      if (!updated) {
        return ApiResponse.error(res, `Employee with ID ${req.params.id} not found`, 404);
      }
      return ApiResponse.success(res, updated, 'Employee updated successfully');
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await employeeService.delete(req.params.id);
      if (!deleted) {
        return ApiResponse.error(res, `Employee with ID ${req.params.id} not found`, 404);
      }
      return ApiResponse.success(res, { id: req.params.id }, 'Employee record purged');
    } catch (err) {
      next(err);
    }
  }
}