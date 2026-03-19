import { prisma } from '../config/database';
import { clearUserCache } from '../config/redis';
import type { UserProgress, DayProgress } from '../types';

export class ProgressService {
  // 获取用户完整进度
  async getUserProgress(userId: string): Promise<{
    userProgress: UserProgress | null;
    dayProgress: DayProgress[];
  }> {
    const [userProgress, dayProgress] = await Promise.all([
      prisma.userProgress.findUnique({
        where: { userId },
      }),
      prisma.dayProgress.findMany({
        where: { userId },
        orderBy: { day: 'asc' },
      }),
    ]);
    
    return {
      userProgress: userProgress as UserProgress | null,
      dayProgress: dayProgress as DayProgress[],
    };
  }
  
  // 更新用户进度
  async updateUserProgress(
    userId: string,
    data: {
      currentDay?: number;
      isPrologueCompleted?: boolean;
      currentScene?: string;
      streakDays?: number;
    }
  ): Promise<UserProgress> {
    const progress = await prisma.userProgress.update({
      where: { userId },
      data,
    });
    
    await clearUserCache(userId);
    
    return progress as UserProgress;
  }
  
  // 获取某日进度
  async getDayProgress(userId: string, day: number): Promise<DayProgress | null> {
    const progress = await prisma.dayProgress.findUnique({
      where: {
        userId_day: {
          userId,
          day,
        },
      },
    });
    
    return progress as DayProgress | null;
  }
  
  // 更新某日进度
  async updateDayProgress(
    userId: string,
    day: number,
    data: {
      isCompleted?: boolean;
      wordsLearned?: number;
      morningDialogueCompleted?: boolean;
      eveningDialogueCompleted?: boolean;
      studyCompleted?: boolean;
    }
  ): Promise<DayProgress> {
    const progress = await prisma.dayProgress.update({
      where: {
        userId_day: {
          userId,
          day,
        },
      },
      data,
    });
    
    await clearUserCache(userId);
    
    return progress as DayProgress;
  }
  
  // 完成序幕
  async completePrologue(userId: string): Promise<void> {
    await prisma.userProgress.update({
      where: { userId },
      data: {
        isPrologueCompleted: true,
        currentScene: 'morning',
      },
    });
    
    await clearUserCache(userId);
  }
  
  // 完成早晨剧情
  async completeMorningDialogue(userId: string, day: number): Promise<void> {
    await prisma.dayProgress.update({
      where: {
        userId_day: {
          userId,
          day,
        },
      },
      data: {
        morningDialogueCompleted: true,
      },
    });
    
    await prisma.userProgress.update({
      where: { userId },
      data: {
        currentScene: 'study',
      },
    });
    
    await clearUserCache(userId);
  }
  
  // 完成夜晚剧情
  async completeEveningDialogue(userId: string, day: number): Promise<void> {
    await prisma.dayProgress.update({
      where: {
        userId_day: {
          userId,
          day,
        },
      },
      data: {
        eveningDialogueCompleted: true,
        isCompleted: true,
      },
    });
    
    await clearUserCache(userId);
  }
  
  // 进入下一天
  async goToNextDay(userId: string): Promise<void> {
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId },
      select: { currentDay: true, streakDays: true },
    });
    
    if (!userProgress) {
      throw new Error('用户进度不存在');
    }
    
    const nextDay = userProgress.currentDay + 1;
    
    // 更新用户进度
    await prisma.userProgress.update({
      where: { userId },
      data: {
        currentDay: nextDay,
        currentScene: 'morning',
        streakDays: userProgress.streakDays + 1,
      },
    });
    
    await clearUserCache(userId);
  }
  
  // 重置游戏
  async resetGame(userId: string): Promise<void> {
    // 删除所有进度数据
    await Promise.all([
      prisma.wordProgress.deleteMany({
        where: { userId },
      }),
      prisma.reviewSchedule.deleteMany({
        where: { userId },
      }),
      prisma.dayProgress.deleteMany({
        where: { userId },
      }),
    ]);
    
    // 重置用户进度
    await prisma.userProgress.update({
      where: { userId },
      data: {
        currentDay: 1,
        isPrologueCompleted: false,
        currentScene: 'prologue',
        streakDays: 0,
        totalWordsLearned: 0,
      },
    });
    
    // 重新初始化
    const words = await prisma.word.findMany({
      select: { id: true },
    });
    
    const wordProgressData = words.map(word => ({
      userId,
      wordId: word.id,
      status: 'new' as const,
      familiarity: 0,
      reviewCount: 0,
    }));
    
    // 分批创建
    const batchSize = 100;
    for (let i = 0; i < wordProgressData.length; i += batchSize) {
      const batch = wordProgressData.slice(i, i + batchSize);
      await prisma.wordProgress.createMany({
        data: batch,
      });
    }
    
    // 重新创建每日进度
    const dayProgressData = Array.from({ length: 21 }, (_, i) => ({
      userId,
      day: i + 1,
      isCompleted: false,
      wordsLearned: 0,
      morningDialogueCompleted: false,
      eveningDialogueCompleted: false,
      studyCompleted: false,
    }));
    
    await prisma.dayProgress.createMany({
      data: dayProgressData,
    });
    
    await clearUserCache(userId);
  }
  
  // 获取学习统计
  async getLearningStats(userId: string): Promise<{
    completedDays: number;
    totalWordsLearned: number;
    currentStreak: number;
    longestStreak: number;
    masteryRate: number;
  }> {
    const [
      userProgress,
      completedDaysCount,
      totalWords,
      masteredWords,
    ] = await Promise.all([
      prisma.userProgress.findUnique({
        where: { userId },
        select: { streakDays: true, totalWordsLearned: true },
      }),
      prisma.dayProgress.count({
        where: {
          userId,
          isCompleted: true,
        },
      }),
      prisma.wordProgress.count({
        where: {
          userId,
          status: { in: ['learning', 'reviewing', 'mastered'] },
        },
      }),
      prisma.wordProgress.count({
        where: {
          userId,
          status: 'mastered',
        },
      }),
    ]);
    
    const masteryRate = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;
    
    return {
      completedDays: completedDaysCount,
      totalWordsLearned: userProgress?.totalWordsLearned || 0,
      currentStreak: userProgress?.streakDays || 0,
      longestStreak: userProgress?.streakDays || 0,
      masteryRate,
    };
  }
}

export const progressService = new ProgressService();
