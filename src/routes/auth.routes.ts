import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { validateBody } from '../middlewares/zodHandler';
import { registerSchema } from '../schemas/user.schema';

const authRoutes = Router();

authRoutes.post('/login', validateBody(registerSchema), AuthController.login);
authRoutes.post(
  '/register',
  validateBody(registerSchema),
  AuthController.register,
);

export default authRoutes;
