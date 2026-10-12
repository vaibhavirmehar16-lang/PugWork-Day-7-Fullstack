import { Router } from 'express';
import employeeRoutes from './employee.routes.js';
import { ApiResponse } from '../utils/apiResponse.js';

const router = Router();

router.get('/health', (req, res) => {
  return ApiResponse.success(res, { status: 'healthy', uptime: process.uptime() }, 'API is active');
});

router.use('/employees', employeeRoutes);

export default router;