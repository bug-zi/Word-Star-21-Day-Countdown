// 用户相关类型
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

// 认证相关类型
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// JWT Payload
export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// 单词相关类型
export interface Word {
  id: string;
  word: string;
  meaning: string;
  pronunciation?: string | null;
  example?: string | null;
  level: 'easy' | 'medium' | 'hard';
  day: number;
  isSpecial?: boolean;
  characterName?: string | null;
}

export interface WordProgress {
  id: string;
  userId: string;
  wordId: string;
  word?: Word;
  status: 'new' | 'learning' | 'reviewing' | 'mastered';
  familiarity: number;
  lastReviewed?: Date;
  nextReview?: Date;
  reviewCount: number;
  dayLearned?: number;
}

// 学习进度类型
export interface UserProgress {
  id: string;
  userId: string;
  currentDay: number;
  isPrologueCompleted: boolean;
  currentScene: string;
  streakDays: number;
  totalWordsLearned: number;
}

export interface DayProgress {
  id: string;
  userId: string;
  day: number;
  isCompleted: boolean;
  wordsLearned: number;
  morningDialogueCompleted: boolean;
  eveningDialogueCompleted: boolean;
  studyCompleted: boolean;
}

// 复习相关类型
export interface ReviewSchedule {
  id: string;
  userId: string;
  wordId: string;
  scheduledDay: number;
  reviewInterval: number;
  isCompleted: boolean;
}

export interface ReviewItem {
  word: Word;
  progress: WordProgress;
  daysSinceLastReview: number;
}

// 成就类型
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  conditionType: string;
  conditionValue: number;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievement: Achievement;
  unlockedAt: Date;
}

// API 响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 学习操作类型
export interface LearnWordRequest {
  wordId: string;
  status: 'learning' | 'mastered';
  familiarity: number;
}

export interface ReviewWordRequest {
  wordId: string;
  isCorrect: boolean;
}

// 进度更新类型
export interface UpdateProgressRequest {
  currentDay?: number;
  isPrologueCompleted?: boolean;
  currentScene?: string;
}

export interface UpdateDayProgressRequest {
  day: number;
  isCompleted?: boolean;
  wordsLearned?: number;
  morningDialogueCompleted?: boolean;
  eveningDialogueCompleted?: boolean;
  studyCompleted?: boolean;
}
