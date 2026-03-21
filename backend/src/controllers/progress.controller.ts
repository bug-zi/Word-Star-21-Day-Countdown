import type { Request, Response } from 'express';
import { progressService } from '../services/progress.service';
import { successResponse, errorResponse } from '../utils/response';

export class ProgressController {
  // 获取用户完整进度
  async getUserProgress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      const progress = await progressService.getUserProgress(userId);
      successResponse(res, progress, '获取进度成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '获取进度失败', 500);
    }
  }
  
  // 更新用户进度
  async updateUserProgress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { currentDay, isPrologueCompleted, currentScene, streakDays } = req.body;
      
      const progress = await progressService.updateUserProgress(userId, {
        currentDay,
        isPrologueCompleted,
        currentScene,
        streakDays,
      });
      
      successResponse(res, progress, '更新进度成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '更新进度失败', 500);
    }
  }
  
  // 获取某日进度
  async getDayProgress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const day = parseInt(req.params.day);
      
      if (isNaN(day)) {
        errorResponse(res, '日期参数无效', 400);
        return;
      }
      
      const progress = await progressService.getDayProgress(userId, day);
      
      if (!progress) {
        errorResponse(res, '进度不存在', 404);
        return;
      }
      
      successResponse(res, progress, '获取进度成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '获取进度失败', 500);
    }
  }
  
  // 更新某日进度
  async updateDayProgress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const day = parseInt(req.params.day);
      const { isCompleted, wordsLearned, morningDialogueCompleted, eveningDialogueCompleted, studyCompleted } = req.body;
      
      if (isNaN(day)) {
        errorResponse(res, '日期参数无效', 400);
        return;
      }
      
      const progress = await progressService.updateDayProgress(userId, day, {
        isCompleted,
        wordsLearned,
        morningDialogueCompleted,
        eveningDialogueCompleted,
        studyCompleted,
      });
      
      successResponse(res, progress, '更新进度成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '更新进度失败', 500);
    }
  }
  
  // 完成序幕
  async completePrologue(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      await progressService.completePrologue(userId);
      successResponse(res, null, '序幕完成');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '操作失败', 500);
    }
  }
  
  // 完成早晨剧情
  async completeMorningDialogue(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { day } = req.body;
      
      if (!day) {
        errorResponse(res, '缺少日期参数', 400);
        return;
      }
      
      await progressService.completeMorningDialogue(userId, day);
      successResponse(res, null, '早晨剧情完成');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '操作失败', 500);
    }
  }
  
  // 完成夜晚剧情
  async completeEveningDialogue(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { day } = req.body;
      
      if (!day) {
        errorResponse(res, '缺少日期参数', 400);
        return;
      }
      
      await progressService.completeEveningDialogue(userId, day);
      successResponse(res, null, '夜晚剧情完成');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '操作失败', 500);
    }
  }
  
  // 进入下一天
  async goToNextDay(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      await progressService.goToNextDay(userId);
      successResponse(res, null, '已进入下一天');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '操作失败', 500);
    }
  }
  
  // 重置游戏
  async resetGame(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      await progressService.resetGame(userId);
      successResponse(res, null, '游戏已重置');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '重置失败', 500);
    }
  }
  
  // 获取学习统计
  async getLearningStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      
      const stats = await progressService.getLearningStats(userId);
      successResponse(res, stats, '获取统计成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '获取统计失败', 500);
    }
  }
}

export const progressController = new ProgressController();
