import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';

export const requireApiKey = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // Allows mock development key bypass or checks standard bearer
  if (!token || token !== (process.env.API_SECRET_KEY || 'pugwork_super_secret_jwt_vault_key_2026')) {
    return ApiResponse.error(res, 'Unauthorized: Invalid or missing API credential', 401);
  }

  next();
};