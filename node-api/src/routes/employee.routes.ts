import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { EmployeeCreateSchema, EmployeeUpdateSchema } from '../models/employee.model.js';
import { requireApiKey } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);

// Protected mutation endpoints
router.post('/', requireApiKey, validateBody(EmployeeCreateSchema), EmployeeController.create);
router.put('/:id', requireApiKey, validateBody(EmployeeUpdateSchema), EmployeeController.update);
router.delete('/:id', requireApiKey, EmployeeController.delete);

export default router;