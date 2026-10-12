import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled Exception at ${req.method} ${req.originalUrl}:`, err.message);
  return ApiResponse.error(
    res,
    err.message || 'An unexpected server error occurred',
    err.statusCode || 500
  );
};