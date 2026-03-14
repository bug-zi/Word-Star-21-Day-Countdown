import { create } from 'zustand';
import type { GameState, DayProgress, WordProgress, User } from '@/types';
import { wordsData } from '@/data/words';

interface GameStore extends GameState {
  user: User | null;
  isAuthenticated: boolean;
  knownWords: string[]; // 存储用户已认识的单词ID（从词库中移除）
  
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

    // User actions
    setUser: (user) => set({ user }),
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),

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
    }),

    // Word progress
    updateWordProgress: (wordId, status, familiarity) => set((state) => ({
      wordsProgress: state.wordsProgress.map(wp => 
        wp.wordId === wordId 
          ? { 
              ...wp, 
              status, 
              familiarity,
              lastReviewed: new Date().toISOString(),
              reviewCount: wp.reviewCount + 1,
            }
          : wp
      ),
    })),

    getWordsForReview: () => {
      const state = get();
      return state.wordsProgress.filter(wp => wp.status === 'learning');
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
