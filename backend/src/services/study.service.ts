import { prisma } from '../config/database';
import { clearUserCache } from '../config/redis';
import type { Word, WordProgress, ReviewItem, DayProgress } from '../types';

const TARGET_WORDS_PER_DAY = 10;
const REVIEW_INTERVALS = [1, 2, 4, 7, 15]; // 艾宾浩斯遗忘曲线复习间隔

export class StudyService {
  // 获取今日学习单词
  async getTodayWords(userId: string, day: number): Promise<Word[]> {
    // 获取用户已学习的单词ID
    const learnedWordIds = await prisma.wordProgress.findMany({
      where: {
        userId,
        status: { in: ['learning', 'mastered'] },
      },
      select: { wordId: true },
    });
    
    const learnedIds = learnedWordIds.map(wp => wp.wordId);
    
    // 获取今日单词（排除已学习的）
    const words = await prisma.word.findMany({
      where: {
        day,
        id: { notIn: learnedIds.length > 0 ? learnedIds : undefined },
      },
      take: TARGET_WORDS_PER_DAY,
    });
    
    // 转换类型以匹配 Word 接口
    return words.map(w => ({
      ...w,
      pronunciation: w.pronunciation || undefined,
      example: w.example || undefined,
      characterName: w.characterName || undefined,
    })) as Word[];
  }
  
  // 获取待复习单词
  async getReviewWords(userId: string): Promise<ReviewItem[]> {
    const currentDay = await this.getUserCurrentDay(userId);
    
    // 获取今天需要复习的单词
    const reviewSchedules = await prisma.reviewSchedule.findMany({
      where: {
        userId,
        scheduledDay: { lte: currentDay },
        isCompleted: false,
      },
      include: {
        word: true,
      },
    });
    
    const reviewItems: ReviewItem[] = [];
    
    for (const schedule of reviewSchedules) {
      const progress = await prisma.wordProgress.findUnique({
        where: {
          userId_wordId: {
            userId,
            wordId: schedule.wordId,
          },
        },
      });
      
      if (progress && progress.status === 'learning') {
        const lastReviewed = progress.lastReviewed || new Date();
        const daysSinceLastReview = Math.floor(
          (new Date().getTime() - new Date(lastReviewed).getTime()) / (1000 * 60 * 60 * 24)
        );
        
        reviewItems.push({
          word: schedule.word as Word,
          progress: {
            ...progress,
            word: undefined,
          } as WordProgress,
          daysSinceLastReview,
        });
      }
    }
    
    return reviewItems;
  }
  
  // 检查是否有待复习单词
  async hasReviewWords(userId: string): Promise<boolean> {
    const currentDay = await this.getUserCurrentDay(userId);
    
    const count = await prisma.reviewSchedule.count({
      where: {
        userId,
        scheduledDay: { lte: currentDay },
        isCompleted: false,
      },
    });
    
    return count > 0;
  }
  
  // 学习单词
  async learnWord(
    userId: string,
    wordId: string,
    status: 'learning' | 'mastered',
    familiarity: number
  ): Promise<void> {
    const currentDay = await this.getUserCurrentDay(userId);
    
    // 使用 upsert：如果不存在则创建，存在则更新
    await prisma.wordProgress.upsert({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
      update: {
        status,
        familiarity,
        lastReviewed: new Date(),
        reviewCount: { increment: 1 },
        dayLearned: currentDay,
      },
      create: {
        userId,
        wordId,
        status,
        familiarity,
        lastReviewed: new Date(),
        reviewCount: 1,
        dayLearned: currentDay,
      },
    });
    
    // 如果是学习状态，安排复习
    if (status === 'learning') {
      await this.scheduleReview(userId, wordId, 1); // 1天后复习
    }
    
    // 更新用户总学习单词数
    if (familiarity >= 50) {
      await prisma.userProgress.update({
        where: { userId },
        data: {
          totalWordsLearned: { increment: 1 },
        },
      });
    }
    
    // 清除缓存
    await clearUserCache(userId);
  }
  
  // 标记为认识（从词库中移除）
  async markAsKnown(userId: string, wordId: string): Promise<void> {
    const currentDay = await this.getUserCurrentDay(userId);
    
    await prisma.wordProgress.upsert({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
      update: {
        status: 'mastered',
        familiarity: 100,
        lastReviewed: new Date(),
        reviewCount: { increment: 1 },
      },
      create: {
        userId,
        wordId,
        status: 'mastered',
        familiarity: 100,
        lastReviewed: new Date(),
        reviewCount: 1,
        dayLearned: currentDay,
      },
    });
    
    await clearUserCache(userId);
  }
  
  // 处理复习结果
  async reviewWord(userId: string, wordId: string, isCorrect: boolean): Promise<void> {
    const progress = await prisma.wordProgress.findUnique({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
    });
    
    const currentDay = await this.getUserCurrentDay(userId);
    
    // 计算新的熟悉度和状态
    let newFamiliarity = progress?.familiarity || 0;
    let newReviewCount = progress?.reviewCount || 0;
    
    if (isCorrect) {
      newFamiliarity = Math.min(100, newFamiliarity + 10);
    } else {
      newFamiliarity = Math.max(0, newFamiliarity - 15);
    }
    newReviewCount += 1;
    
    // 确定新状态
    let newStatus: 'learning' | 'reviewing' | 'mastered';
    if (newFamiliarity >= 90 && newReviewCount >= 3) {
      newStatus = 'mastered';
    } else if (newFamiliarity >= 50) {
      newStatus = 'reviewing';
    } else {
      newStatus = 'learning';
    }
    
    // 使用 upsert 更新或创建单词进度
    await prisma.wordProgress.upsert({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
      update: {
        status: newStatus,
        familiarity: newFamiliarity,
        lastReviewed: new Date(),
        reviewCount: { increment: 1 },
      },
      create: {
        userId,
        wordId,
        status: newStatus,
        familiarity: newFamiliarity,
        lastReviewed: new Date(),
        reviewCount: 1,
        dayLearned: currentDay,
      },
    });
    
    // 标记复习计划为完成
    await prisma.reviewSchedule.updateMany({
      where: {
        userId,
        wordId,
        scheduledDay: { lte: currentDay },
        isCompleted: false,
      },
      data: {
        isCompleted: true,
        completedAt: new Date(),
      },
    });
    
    // 如果还没掌握，安排下次复习
    if (newStatus !== 'mastered') {
      const nextInterval = REVIEW_INTERVALS[Math.min(progress.reviewCount, REVIEW_INTERVALS.length - 1)];
      await this.scheduleReview(userId, wordId, nextInterval);
    }
    
    await clearUserCache(userId);
  }
  
  // 安排复习
  private async scheduleReview(userId: string, wordId: string, interval: number): Promise<void> {
    const currentDay = await this.getUserCurrentDay(userId);
    
    await prisma.reviewSchedule.create({
      data: {
        userId,
        wordId,
        scheduledDay: currentDay + interval,
        reviewInterval: interval,
        isCompleted: false,
      },
    });
  }
  
  // 完成今日学习
  async completeStudy(userId: string, day: number, wordsLearned: number): Promise<void> {
    // 更新今日进度
    await prisma.dayProgress.update({
      where: {
        userId_day: {
          userId,
          day,
        },
      },
      data: {
        isCompleted: true,
        wordsLearned,
        studyCompleted: true,
      },
    });
    
    // 更新用户进度
    await prisma.userProgress.update({
      where: { userId },
      data: {
        currentScene: 'evening',
      },
    });
    
    await clearUserCache(userId);
  }
  
  // 获取用户当前天数
  private async getUserCurrentDay(userId: string): Promise<number> {
    const progress = await prisma.userProgress.findUnique({
      where: { userId },
      select: { currentDay: true },
    });
    
    return progress?.currentDay || 1;
  }
  
  // 获取单词进度
  async getWordProgress(userId: string): Promise<WordProgress[]> {
    const progress = await prisma.wordProgress.findMany({
      where: { userId },
      include: {
        word: true,
      },
      orderBy: {
        lastReviewed: 'desc',
      },
    });
    
    return progress.map(p => ({
      ...p,
      word: undefined,
    })) as WordProgress[];
  }

  // 获取复习计划
  async getReviewSchedule(userId: string): Promise<ReviewSchedule[]> {
    const currentDay = await this.getUserCurrentDay(userId);
    
    const schedules = await prisma.reviewSchedule.findMany({
      where: {
        userId,
        isCompleted: false,
        scheduledDay: { gte: currentDay },
      },
      orderBy: {
        scheduledDay: 'asc',
      },
    });
    
    return schedules as ReviewSchedule[];
  }
  
  // 获取学习统计
  async getStudyStats(userId: string): Promise<{
    totalWords: number;
    masteredWords: number;
    learningWords: number;
    currentStreak: number;
    longestStreak: number;
  }> {
    const [totalStats, masteredCount, learningCount] = await Promise.all([
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
      prisma.wordProgress.count({
        where: {
          userId,
          status: 'learning',
        },
      }),
    ]);
    
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId },
      select: { streakDays: true },
    });
    
    return {
      totalWords: totalStats,
      masteredWords: masteredCount,
      learningWords: learningCount,
      currentStreak: userProgress?.streakDays || 0,
      longestStreak: userProgress?.streakDays || 0,
    };
  }
}

export const studyService = new StudyService();
