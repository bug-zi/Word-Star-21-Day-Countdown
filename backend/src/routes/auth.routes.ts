import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// 公开路由
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

// 需要认证的路由
router.get('/me', authMiddleware, authController.getCurrentUser);
router.delete('/account', authMiddleware, authController.deleteAccount);

export default router;
