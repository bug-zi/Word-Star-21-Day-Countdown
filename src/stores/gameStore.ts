import { create } from 'zustand';
import type { GameState, DayProgress, WordProgress, User } from '@/types';
import { wordsData } from '@/data/words';

interface ReviewSchedule {
  wordId: string;
  scheduledDay: number; // 复习的项目天数
  reviewInterval: number; // 复习间隔（天）
}

interface GameStore extends GameState {
  user: User | null;
  isAuthenticated: boolean;
  isGuestMode: boolean; // 是否为游客模式
  knownWords: string[]; // 存储用户已认识的单词ID（从词库中移除）
  reviewSchedule: ReviewSchedule[]; // 复习计划
  currentDayLearnedWords: number; // 当天学习的单词数
  
  // Actions
  setUser: (user: User | null) => void;
  login: (user: User, isGuest?: boolean) => void;
  logout: () => void;
  initAuth: () => void; // 初始化认证状态
  saveState: () => void; // 保存状态到本地存储
  
  // Game actions
  completePrologue: () => Promise<void>;
  startDay: (day: number) => void;
  completeMorningDialogue: (day: number) => Promise<void>;
  completeStudy: (day: number, wordsLearned: number) => Promise<void>;
  completeEveningDialogue: (day: number) => Promise<void>;
  goToNextDay: () => Promise<void>;
  resetGame: () => void;
  
  // Word progress
  updateWordProgress: (wordId: string, status: WordProgress['status'], familiarity: number) => Promise<void>;
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
  
  // 后端同步
  syncWithBackend: (progressData: { userProgress: any; dayProgress: DayProgress[] }) => void; // 从后端同步进度
  setWordsProgress: (wordsProgress: WordProgress[]) => void; // 设置单词进度
  setReviewSchedule: (reviewSchedule: ReviewSchedule[]) => void; // 设置复习计划
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

// 本地存储键名
const STORAGE_KEY = 'wordstar_game_state';
const GUEST_MODE_KEY = 'wordstar_guest_mode';
const GUEST_USER_KEY = 'wordstar_guest_user';

// 从 localStorage 加载状态
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load from storage:', e);
  }
  return null;
};

// 保存到 localStorage
interface StorageState {
  currentDay: number;
  isPrologueCompleted: boolean;
  daysProgress: DayProgress[];
  wordsProgress: WordProgress[];
  currentScene: GameState['currentScene'];
  knownWords: string[];
  reviewSchedule: ReviewSchedule[];
  currentDayLearnedWords: number;
}

const saveToStorage = (state: StorageState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
};

export const useGameStore = create<GameStore>()(
  (set, get) => {
    // 加载保存的状态
    const savedState = loadFromStorage();
    
    return {
    // Initial state
    user: null,
    isAuthenticated: false,
    isGuestMode: false,
    currentDay: savedState?.currentDay || 1,
    totalDays: 21,
    isPrologueCompleted: savedState?.isPrologueCompleted || false,
    daysProgress: savedState?.daysProgress || Array.from({ length: 21 }, (_, i) => createInitialDayProgress(i + 1)),
    wordsProgress: savedState?.wordsProgress || wordsData.map(w => createInitialWordProgress(w.id)),
    currentScene: savedState?.currentScene || 'prologue',
    knownWords: savedState?.knownWords || [],
    reviewSchedule: savedState?.reviewSchedule || [],
    currentDayLearnedWords: savedState?.currentDayLearnedWords || 0,

    // User actions
    setUser: (user) => set({ user }),
    
    // 初始化认证状态（页面刷新时调用）
    initAuth: async () => {
      const isGuest = localStorage.getItem(GUEST_MODE_KEY) === 'true';
      const guestUserStr = localStorage.getItem(GUEST_USER_KEY);
      const token = localStorage.getItem('accessToken');
      
      if (isGuest && guestUserStr) {
        try {
          const guestUser = JSON.parse(guestUserStr);
          set({ user: guestUser, isAuthenticated: true, isGuestMode: true });
        } catch (e) {
          console.error('Failed to parse guest user:', e);
        }
      } else if (token) {
        // 正常用户：从后端加载用户信息和进度
        try {
          const { authApi, progressApi, studyApi } = await import('@/services/api');
          const user = await authApi.getCurrentUser();
          set({ user, isAuthenticated: true, isGuestMode: false });
          
          // 加载用户进度
          const progressData = await progressApi.getUserProgress();
          if (progressData.userProgress) {
            get().syncWithBackend(progressData);
          }
          
          // 加载单词进度
          console.log('正在从后端加载单词进度...');
          const wordProgressData = await studyApi.getWordProgress();
          console.log('从后端加载的单词进度:', wordProgressData);
          if (wordProgressData && wordProgressData.length > 0) {
            set((state) => ({
              wordsProgress: state.wordsProgress.map(wp => {
                const backendWp = wordProgressData.find(bwp => bwp.wordId === wp.wordId);
                if (backendWp) {
                  console.log('更新单词进度:', wp.wordId, '->', backendWp.status);
                  return {
                    ...wp,
                    status: backendWp.status,
                    familiarity: backendWp.familiarity,
                    reviewCount: backendWp.reviewCount || 0,
                    lastReviewed: backendWp.lastReviewed || wp.lastReviewed,
                    nextReview: backendWp.nextReview || wp.nextReview,
                  };
                }
                return wp;
              }),
            }));
          }
          
          // 加载复习计划
          console.log('正在从后端加载复习计划...');
          const reviewScheduleData = await studyApi.getReviewSchedule();
          console.log('从后端加载的复习计划:', reviewScheduleData);
          if (reviewScheduleData && reviewScheduleData.length > 0) {
            set({
              reviewSchedule: reviewScheduleData.map(rs => ({
                wordId: rs.wordId,
                scheduledDay: rs.scheduledDay,
                reviewInterval: rs.reviewInterval,
              })),
            });
          }
        } catch (e) {
          console.error('Failed to restore auth state:', e);
          // 令牌无效，清除登录状态
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    },
    
    login: (user, isGuest = false) => {
      set({ user, isAuthenticated: true, isGuestMode: isGuest });
      
      if (isGuest) {
        localStorage.setItem(GUEST_MODE_KEY, 'true');
        localStorage.setItem(GUEST_USER_KEY, JSON.stringify(user));
      }
    },
    
    // 保存状态到本地存储（游客模式使用）
    saveState: () => {
      const state = get();
      saveToStorage({
        currentDay: state.currentDay,
        isPrologueCompleted: state.isPrologueCompleted,
        daysProgress: state.daysProgress,
        wordsProgress: state.wordsProgress,
        currentScene: state.currentScene,
        knownWords: state.knownWords,
        reviewSchedule: state.reviewSchedule,
        currentDayLearnedWords: state.currentDayLearnedWords,
      });
    },
    
    logout: () => {
      // 清除所有存储
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(GUEST_MODE_KEY);
      localStorage.removeItem(GUEST_USER_KEY);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        isGuestMode: false,
        currentDay: 1,
        isPrologueCompleted: false,
        daysProgress: Array.from({ length: 21 }, (_, i) => createInitialDayProgress(i + 1)),
        wordsProgress: wordsData.map(w => createInitialWordProgress(w.id)),
        currentScene: 'prologue',
        knownWords: [],
        reviewSchedule: [],
        currentDayLearnedWords: 0,
      });
    },

    // Current day learned words management
    incrementCurrentDayLearnedWords: () => set((state) => ({
      currentDayLearnedWords: state.currentDayLearnedWords + 1
    })),
    resetCurrentDayLearnedWords: () => set({ currentDayLearnedWords: 0 }),

    // Game actions
    completePrologue: async () => {
      set({ 
        isPrologueCompleted: true, 
        currentScene: 'morning' 
      });
      
      // 同步到后端
      try {
        const { progressApi } = await import('@/services/api');
        await progressApi.completePrologue();
      } catch (error) {
        console.error('保存序幕完成状态到后端失败:', error);
      }
    },

    startDay: (day) => set({ 
      currentDay: day,
      currentScene: 'morning' 
    }),

    completeMorningDialogue: async (day) => {
      set((state) => ({
        daysProgress: state.daysProgress.map(dp => 
          dp.day === day 
            ? { ...dp, morningDialogueCompleted: true }
            : dp
        ),
        currentScene: 'study',
      }));
      
      // 同步到后端
      try {
        const { progressApi } = await import('@/services/api');
        await progressApi.updateDayProgress(day, {
          morningDialogueCompleted: true,
        });
      } catch (error) {
        console.error('保存早晨剧情完成状态到后端失败:', error);
      }
    },

    completeStudy: async (day, wordsLearned) => {
      // 先更新前端状态
      set((state) => ({
        daysProgress: state.daysProgress.map(dp => 
          dp.day === day 
            ? { ...dp, studyCompleted: true, wordsLearned }
            : dp
        ),
        currentScene: 'evening',
        currentDayLearnedWords: 0, // 重置当天学习的单词数
      }));
      
      // 同步到后端
      try {
        const { progressApi } = await import('@/services/api');
        await progressApi.updateDayProgress(day, {
          studyCompleted: true,
          wordsLearned,
        });
      } catch (error) {
        console.error('保存学习进度到后端失败:', error);
      }
    },

    completeEveningDialogue: async (day) => {
      set((state) => ({
        daysProgress: state.daysProgress.map(dp => 
          dp.day === day 
            ? { ...dp, eveningDialogueCompleted: true, isCompleted: true }
            : dp
        ),
        currentScene: 'completed',
      }));
      
      // 同步到后端
      try {
        const { progressApi } = await import('@/services/api');
        await progressApi.updateDayProgress(day, {
          eveningDialogueCompleted: true,
          isCompleted: true,
        });
      } catch (error) {
        console.error('保存晚上剧情完成状态到后端失败:', error);
      }
    },

    goToNextDay: async () => {
      const state = get();
      const nextDay = state.currentDay + 1;
      
      if (nextDay > 21) {
        set({ currentScene: 'completed' });
        return;
      }
      
      set({
        currentDay: nextDay,
        currentScene: 'morning',
        currentDayLearnedWords: 0, // 重置当天学习的单词数
      });
      
      // 同步到后端
      try {
        const { progressApi } = await import('@/services/api');
        await progressApi.updateUserProgress({
          currentDay: nextDay,
        });
      } catch (error) {
        console.error('保存进入下一天到后端失败:', error);
      }
    },

    resetGame: () => {
      // 清除 localStorage 中的游戏状态
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(GUEST_MODE_KEY);
        localStorage.removeItem(GUEST_USER_KEY);
      } catch (e) {
        console.error('清除本地存储失败:', e);
      }
      
      set({
        user: null,
        isAuthenticated: false,
        isGuestMode: false,
        currentDay: 1,
        isPrologueCompleted: false,
        daysProgress: Array.from({ length: 21 }, (_, i) => createInitialDayProgress(i + 1)),
        wordsProgress: wordsData.map(w => createInitialWordProgress(w.id)),
        currentScene: 'prologue',
        knownWords: [],
        reviewSchedule: [],
        currentDayLearnedWords: 0, // 重置当天学习的单词数
      });
    },

    // Word progress
    updateWordProgress: async (wordId, status, familiarity) => {
      // 先更新前端状态
      set((state) => {
        const updatedWordsProgress = state.wordsProgress.map(wp => 
          wp.wordId === wordId 
            ? { 
                ...wp, 
                status, 
                familiarity,
                lastReviewed: new Date().toISOString(),
                reviewCount: wp.reviewCount + 1,
                dayLearned: wp.dayLearned || state.currentDay,
              }
            : wp
        );
        
        // 如果单词状态为学习中或复习中，安排下次复习
        if (status === 'learning' || status === 'reviewing') {
          const wordProgress = updatedWordsProgress.find(wp => wp.wordId === wordId);
          if (wordProgress) {
            const reviewCount = wordProgress.reviewCount;
            let interval;
            
            switch (reviewCount) {
              case 1: interval = 1; break;
              case 2: interval = 2; break;
              case 3: interval = 4; break;
              case 4: interval = 7; break;
              default: {
                const updatedReviewSchedule = state.reviewSchedule.filter(schedule => schedule.wordId !== wordId);
                return {
                  wordsProgress: updatedWordsProgress,
                  reviewSchedule: updatedReviewSchedule
                };
              }
            }
            
            const scheduledDay = state.currentDay + interval;
            const updatedReviewSchedule = state.reviewSchedule.filter(schedule => schedule.wordId !== wordId);
            updatedReviewSchedule.push({
              wordId,
              scheduledDay,
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
      });
      
      // 同步到后端
      try {
        console.log('正在保存单词进度到后端:', { wordId, status, familiarity });
        const { studyApi } = await import('@/services/api');
        await studyApi.learnWord(wordId, status, familiarity);
        console.log('单词进度保存成功:', wordId);
      } catch (error) {
        console.error('保存单词进度到后端失败:', error);
      }
    },

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

      // 从后端同步进度数据
      syncWithBackend: (progressData) => {
        const { userProgress, dayProgress } = progressData;
        if (!userProgress) return;

        set({
          currentDay: userProgress.currentDay || 1,
          isPrologueCompleted: userProgress.isPrologueCompleted || false,
          currentScene: userProgress.currentScene || 'prologue',
          daysProgress: dayProgress && dayProgress.length > 0 
            ? dayProgress.map(dp => ({
                day: dp.day,
                isCompleted: dp.isCompleted || false,
                wordsLearned: dp.wordsLearned || 0,
                totalWords: dp.totalWords || 10,
                morningDialogueCompleted: dp.morningDialogueCompleted || false,
                eveningDialogueCompleted: dp.eveningDialogueCompleted || false,
                studyCompleted: dp.studyCompleted || false,
              }))
            : Array.from({ length: 21 }, (_, i) => createInitialDayProgress(i + 1)),
        });

        // 同步到本地存储
        const state = get();
        saveToStorage({
          currentDay: state.currentDay,
          isPrologueCompleted: state.isPrologueCompleted,
          daysProgress: state.daysProgress,
          wordsProgress: state.wordsProgress,
          currentScene: state.currentScene,
          knownWords: state.knownWords,
          reviewSchedule: state.reviewSchedule,
          currentDayLearnedWords: state.currentDayLearnedWords,
        });
      },

      // 设置单词进度（从后端加载）
      setWordsProgress: (wordProgressData) => {
        set((state) => ({
          wordsProgress: state.wordsProgress.map(wp => {
            const backendWp = wordProgressData.find(bwp => bwp.wordId === wp.wordId);
            if (backendWp) {
              return {
                ...wp,
                status: backendWp.status,
                familiarity: backendWp.familiarity,
                reviewCount: backendWp.reviewCount || 0,
                lastReviewed: backendWp.lastReviewed || wp.lastReviewed,
                nextReview: backendWp.nextReview || wp.nextReview,
              };
            }
            return wp;
          }),
        }));
      },

      // 设置复习计划（从后端加载）
      setReviewSchedule: (reviewScheduleData) => {
        set({
          reviewSchedule: reviewScheduleData,
        });
      },
    };
  })
