import { Router } from 'express';
import { studyController } from '../controllers/study.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// 所有学习相关路由都需要认证
router.use(authMiddleware);

// 单词学习
router.get('/words', studyController.getTodayWords);
router.get('/words/progress', studyController.getWordProgress);
router.post('/words/learn', studyController.learnWord);
router.post('/words/:wordId/know', studyController.markAsKnown);

// 复习计划
router.get('/schedule', studyController.getReviewSchedule);

// 复习
router.get('/review', studyController.getReviewWords);
router.get('/review/check', studyController.hasReviewWords);
router.post('/review/:wordId', studyController.reviewWord);

// 完成学习
router.post('/complete', studyController.completeStudy);

// 统计
router.get('/stats', studyController.getStudyStats);

export default router;
