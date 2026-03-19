import { Router } from 'express';
import { progressController } from '../controllers/progress.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// 所有进度相关路由都需要认证
router.use(authMiddleware);

// 用户进度
router.get('/', progressController.getUserProgress);
router.put('/', progressController.updateUserProgress);

// 每日进度
router.get('/day/:day', progressController.getDayProgress);
router.put('/day/:day', progressController.updateDayProgress);

// 剧情完成
router.post('/prologue/complete', progressController.completePrologue);
router.post('/morning/complete', progressController.completeMorningDialogue);
router.post('/evening/complete', progressController.completeEveningDialogue);

// 游戏控制
router.post('/next-day', progressController.goToNextDay);
router.post('/reset', progressController.resetGame);

// 统计
router.get('/stats', progressController.getLearningStats);

export default router;
