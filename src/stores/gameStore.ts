import { create } from 'zustand';
import type { GameState, DayProgress, WordProgress, User } from '@/types';
import { wordsData } from '@/data/words';

interface ReviewSchedule {
  wordId: string;
  scheduledDate: string; // ISO date string
  reviewInterval: number; // 复习间隔（天）
}

interface GameStore extends GameState {
  user: User | null;
  isAuthenticated: boolean;
  knownWords: string[]; // 存储用户已认识的单词ID（从词库中移除）
  reviewSchedule: ReviewSchedule[]; // 复习计划
  currentDayLearnedWords: number; // 当天学习的单词数
  
  // Actions
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  
  // Game actions
  completePrologue: () => void;
  startDay: (day: number) => void;
  completeMorningDialogue: (day: number) => void;
  completeStudy: (day: number, wordsLearned: number) => void;
  completeEveningDialogue: (day: number) => void;
  goToNextDay: () => void;
  resetGame: () => void;
  
  // Word progress
  updateWordProgress: (wordId: string, status: WordProgress['status'], familiarity: number) => void;
  getWordsForReview: () => WordProgress[];
  addKnownWord: (wordId: string) => void; // 添加已认识的单词
  isWordKnown: (wordId: string) => boolean; // 检查单词是否已认识
  incrementCurrentDayLearnedWords: () => void; // 增加当天学习的单词数
  resetCurrentDayLearnedWords: () => void; // 重置当天学习的单词数
  
  // Review schedule
  scheduleReview: (wordId: string, interval: number) => void;
  getWordsDueForReview: () => WordProgress[];
  hasWordsDueForReview: () => boolean;
  completeReviewSession: () => void;
  
  // Getters
  getCurrentDayProgress: () => DayProgress | undefined;
  getTotalWordsLearned: () => number;
  getCurrentScene: () => GameState['currentScene'];
  getAvailableWordsForDay: (day: number) => WordProgress[]; // 获取当天可用的单词（排除已认识的）
}

const createInitialDayProgress = (day: number): DayProgress => ({
  day,
  isCompleted: false,
  wordsLearned: 0,
  totalWords: 10,
  morningDialogueCompleted: false,
  eveningDialogueCompleted: false,
  studyCompleted: false,
});

const createInitialWordProgress = (wordId: string): WordProgress => ({
  wordId,
  status: 'new',
  familiarity: 0,
  lastReviewed: new Date().toISOString(),
  nextReview: new Date().toISOString(),
  reviewCount: 0,
});

export const useGameStore = create<GameStore>()(
  (set, get) => ({
    // Initial state
    user: null,
    isAuthenticated: false,
    currentDay: 1,
    totalDays: 21,
    isPrologueCompleted: false,
    daysProgress: Array.from({ length: 21 }, (_, i) => createInitialDayProgress(i + 1)),
    wordsProgress: wordsData.map(w => createInitialWordProgress(w.id)),
    currentScene: 'prologue',
    knownWords: [],
    reviewSchedule: [],
    currentDayLearnedWords: 0, // 当天学习的单词数

    // User actions
    setUser: (user) => set({ user }),
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),

    // Current day learned words management
    incrementCurrentDayLearnedWords: () => set((state) => ({
      currentDayLearnedWords: state.currentDayLearnedWords + 1
    })),
    resetCurrentDayLearnedWords: () => set({ currentDayLearnedWords: 0 }),

    // Game actions
    completePrologue: () => set({ 
      isPrologueCompleted: true, 
      currentScene: 'morning' 
    }),

    startDay: (day) => set({ 
      currentDay: day,
      currentScene: 'morning' 
    }),

    completeMorningDialogue: (day) => set((state) => ({
      daysProgress: state.daysProgress.map(dp => 
        dp.day === day 
          ? { ...dp, morningDialogueCompleted: true }
          : dp
      ),
      currentScene: 'study',
    })),

    completeStudy: (day, wordsLearned) => set((state) => ({
      daysProgress: state.daysProgress.map(dp => 
        dp.day === day 
          ? { ...dp, studyCompleted: true, wordsLearned }
          : dp
      ),
      currentScene: 'evening',
      currentDayLearnedWords: 0, // 重置当天学习的单词数
    })),

    completeEveningDialogue: (day) => set((state) => ({
      daysProgress: state.daysProgress.map(dp => 
        dp.day === day 
          ? { ...dp, eveningDialogueCompleted: true, isCompleted: true }
          : dp
      ),
      currentScene: 'completed',
    })),

    goToNextDay: () => set((state) => {
      const nextDay = state.currentDay + 1;
      if (nextDay > 21) {
        return { currentScene: 'completed' };
      }
      return {
        currentDay: nextDay,
        currentScene: 'morning',
        currentDayLearnedWords: 0, // 重置当天学习的单词数
      };
    }),

    resetGame: () => set({
      user: null,
      isAuthenticated: false,
      currentDay: 1,
      isPrologueCompleted: false,
      daysProgress: Array.from({ length: 21 }, (_, i) => createInitialDayProgress(i + 1)),
      wordsProgress: wordsData.map(w => createInitialWordProgress(w.id)),
      currentScene: 'prologue',
      knownWords: [],
      reviewSchedule: [],
      currentDayLearnedWords: 0, // 重置当天学习的单词数
    }),

    // Word progress
  updateWordProgress: (wordId, status, familiarity) => set((state) => {
    const updatedWordsProgress = state.wordsProgress.map(wp => 
      wp.wordId === wordId 
        ? { 
            ...wp, 
            status, 
            familiarity,
            lastReviewed: new Date().toISOString(),
            reviewCount: wp.reviewCount + 1,
            dayLearned: wp.dayLearned || state.currentDay, // 记录学习当天的项目天数
          }
        : wp
    );
    
    // 如果单词状态为学习中或复习中，安排下次复习
    if (status === 'learning' || status === 'reviewing') {
      // 根据艾宾浩斯遗忘曲线安排复习间隔
      const wordProgress = updatedWordsProgress.find(wp => wp.wordId === wordId);
      if (wordProgress) {
        const reviewCount = wordProgress.reviewCount;
        let interval;
        
        // 艾宾浩斯遗忘曲线的复习间隔：1, 2, 4, 7天
        // 第1次复习：1天后（第2天）
        // 第2次复习：2天后（第4天）
        // 第3次复习：4天后（第8天）
        // 第4次复习：7天后（第15天）
        switch (reviewCount) {
            case 1: {
              interval = 1;
              break;
            }
            case 2: {
              interval = 2;
              break;
            }
            case 3: {
              interval = 4;
              break;
            }
            case 4: {
              interval = 7;
              break;
            }
            default: {
              // 第4次复习后不再安排复习
              const updatedReviewSchedule = state.reviewSchedule.filter(schedule => schedule.wordId !== wordId);
              return {
                wordsProgress: updatedWordsProgress,
                reviewSchedule: updatedReviewSchedule
              };
            }
          }
        
        // 计算下次复习的项目天数
        const scheduledDay = state.currentDay + interval;
        
        // 更新复习计划
        const updatedReviewSchedule = state.reviewSchedule.filter(schedule => schedule.wordId !== wordId);
        updatedReviewSchedule.push({
          wordId,
          scheduledDay, // 存储复习的项目天数
          reviewInterval: interval
        });
        
        return {
          wordsProgress: updatedWordsProgress,
          reviewSchedule: updatedReviewSchedule
        };
      }
    }
    
    return {
      wordsProgress: updatedWordsProgress
    };
  }),

    getWordsForReview: () => {
      const state = get();
      return state.wordsProgress.filter(wp => wp.status === 'learning' || wp.status === 'reviewing');
    },

    // Review schedule
    scheduleReview: (wordId, interval) => set((state) => {
      // 计算下次复习的项目天数
      const scheduledDay = state.currentDay + interval;
      
      const updatedReviewSchedule = state.reviewSchedule.filter(schedule => schedule.wordId !== wordId);
      updatedReviewSchedule.push({
        wordId,
        scheduledDay, // 存储复习的项目天数
        reviewInterval: interval
      });
      
      return {
        reviewSchedule: updatedReviewSchedule
      };
    }),

    getWordsDueForReview: () => {
      const state = get();
      
      // 获取今天需要复习的单词ID
      const dueWordIds = state.reviewSchedule
        .filter(schedule => schedule.scheduledDay <= state.currentDay)
        .map(schedule => schedule.wordId);
      
      // 获取这些单词的进度信息
      return state.wordsProgress.filter(wp => 
        dueWordIds.includes(wp.wordId) && 
        (wp.status === 'learning' || wp.status === 'reviewing')
      );
    },

    hasWordsDueForReview: () => {
      const state = get();
      
      return state.reviewSchedule.some(schedule => schedule.scheduledDay <= state.currentDay);
    },

    completeReviewSession: () => {
      // 复习会话完成后，不需要特殊处理
      // 因为每个单词的复习已经通过updateWordProgress更新了复习计划
      return;
    },

    // Getters
    getCurrentDayProgress: () => {
      const state = get();
      return state.daysProgress.find(dp => dp.day === state.currentDay);
    },

    getTotalWordsLearned: () => {
      const state = get();
      return state.wordsProgress.filter(wp => wp.status !== 'new').length;
    },

    getCurrentScene: () => get().currentScene,

      // Known words management
      addKnownWord: (wordId: string) => set((state) => ({
        knownWords: [...state.knownWords, wordId],
      })),

      isWordKnown: (wordId: string) => {
        const state = get();
        return state.knownWords.includes(wordId);
      },

      getAvailableWordsForDay: (day: number) => {
        const state = get();
        return state.wordsProgress.filter(wp => {
          const word = wordsData.find(w => w.id === wp.wordId);
          return word && word.day === day && !state.knownWords.includes(wp.wordId);
        });
      },
  })
);
