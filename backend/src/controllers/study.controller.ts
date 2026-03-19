import type { Request, Response } from 'express';
import { studyService } from '../services/study.service';
import { successResponse, errorResponse } from '../utils/response';

export class StudyController {
  // 获取今日学习单词
  async getTodayWords(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const day = parseInt(req.query.day as string) || 1;
      
      const words = await studyService.getTodayWords(userId, day);
      successResponse(res, words, '获取今日单词成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '获取单词失败', 500);
    }
  }
  
  // 获取待复习单词
  async getReviewWords(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      const reviewItems = await studyService.getReviewWords(userId);
      successResponse(res, reviewItems, '获取复习单词成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '获取复习单词失败', 500);
    }
  }
  
  // 检查是否有待复习单词
  async hasReviewWords(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      const hasReview = await studyService.hasReviewWords(userId);
      successResponse(res, { hasReview }, '检查复习状态成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '检查复习状态失败', 500);
    }
  }
  
  // 学习单词
  async learnWord(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { wordId, status, familiarity } = req.body;
      
      if (!wordId || !status || familiarity === undefined) {
        errorResponse(res, '缺少必要参数', 400);
        return;
      }
      
      if (!['learning', 'mastered'].includes(status)) {
        errorResponse(res, '状态参数无效', 400);
        return;
      }
      
      await studyService.learnWord(userId, wordId, status, familiarity);
      successResponse(res, null, '单词学习记录成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '学习记录失败', 500);
    }
  }
  
  // 标记为认识
  async markAsKnown(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { wordId } = req.params;
      
      if (!wordId) {
        errorResponse(res, '缺少单词ID', 400);
        return;
      }
      
      await studyService.markAsKnown(userId, wordId);
      successResponse(res, null, '已标记为认识');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '操作失败', 500);
    }
  }
  
  // 复习单词
  async reviewWord(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { wordId } = req.params;
      const { isCorrect } = req.body;
      
      if (!wordId || isCorrect === undefined) {
        errorResponse(res, '缺少必要参数', 400);
        return;
      }
      
      await studyService.reviewWord(userId, wordId, isCorrect);
      successResponse(res, null, '复习记录成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '复习记录失败', 500);
    }
  }
  
  // 完成今日学习
  async completeStudy(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { day, wordsLearned } = req.body;
      
      if (!day || wordsLearned === undefined) {
        errorResponse(res, '缺少必要参数', 400);
        return;
      }
      
      await studyService.completeStudy(userId, day, wordsLearned);
      successResponse(res, null, '今日学习完成');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '完成学习失败', 500);
    }
  }
  
  // 获取单词进度
  async getWordProgress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      const progress = await studyService.getWordProgress(userId);
      successResponse(res, progress, '获取单词进度成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '获取进度失败', 500);
    }
  }

  // 获取复习计划
  async getReviewSchedule(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      const schedules = await studyService.getReviewSchedule(userId);
      successResponse(res, schedules, '获取复习计划成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '获取复习计划失败', 500);
    }
  }
  
  // 获取学习统计
  async getStudyStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      const stats = await studyService.getStudyStats(userId);
      successResponse(res, stats, '获取学习统计成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '获取统计失败', 500);
    }
  }
}

export const studyController = new StudyController();
