import { Router } from 'express';
import authRoutes from './auth.routes';
import studyRoutes from './study.routes';
import progressRoutes from './progress.routes';

const router = Router();

const API_PREFIX = process.env.API_PREFIX || '/api';

// 认证路由
router.use(`${API_PREFIX}/auth`, authRoutes);

// 学习路由
router.use(`${API_PREFIX}/study`, studyRoutes);

// 进度路由
router.use(`${API_PREFIX}/progress`, progressRoutes);

// 健康检查
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
