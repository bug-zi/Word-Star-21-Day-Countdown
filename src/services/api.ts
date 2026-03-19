import type { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  User,
  Word,
  WordProgress,
  ReviewItem,
  DayProgress,
  UserProgress,
  ApiResponse 
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';

// 获取存储的令牌
function getToken(): string | null {
  return localStorage.getItem('accessToken');
}

// 设置令牌
function setToken(token: string): void {
  localStorage.setItem('accessToken', token);
}

// 清除令牌
function clearToken(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

// 通用请求函数
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  
  // 添加认证头
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  const data: ApiResponse<T> = await response.json();
  
  if (!response.ok || !data.success) {
    // 处理 401 错误（令牌过期）
    if (response.status === 401) {
      clearToken();
      window.location.href = '/login';
    }
    throw new Error(data.message || '请求失败');
  }
  
  return data.data as T;
}

// 认证相关 API
export const authApi = {
  // 注册
  register: (data: RegisterRequest): Promise<AuthResponse> =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // 登录
  login: (data: LoginRequest): Promise<AuthResponse> =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // 获取当前用户
  getCurrentUser: (): Promise<User> =>
    request<User>('/auth/me'),
  
  // 刷新令牌
  refreshToken: (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> =>
    request<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),
  
  // 保存令牌到本地
  saveTokens: (accessToken: string, refreshToken: string): void => {
    setToken(accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  
  // 清除令牌
  clearTokens: (): void => {
    clearToken();
  },
  
  // 检查是否已登录
  isAuthenticated: (): boolean => {
    return !!getToken();
  },

  // 注销账号
  deleteAccount: (): Promise<void> =>
    request<void>('/auth/account', {
      method: 'DELETE',
    }),
};

// 学习相关 API
export const studyApi = {
  // 获取今日单词
  getTodayWords: (day: number): Promise<Word[]> =>
    request<Word[]>(`/study/words?day=${day}`),
  
  // 获取复习单词
  getReviewWords: (): Promise<ReviewItem[]> =>
    request<ReviewItem[]>('/study/review'),
  
  // 检查是否有复习单词
  hasReviewWords: (): Promise<{ hasReview: boolean }> =>
    request<{ hasReview: boolean }>('/study/review/check'),
  
  // 学习单词
  learnWord: (wordId: string, status: 'learning' | 'mastered', familiarity: number): Promise<void> =>
    request<void>('/study/words/learn', {
      method: 'POST',
      body: JSON.stringify({ wordId, status, familiarity }),
    }),
  
  // 标记为认识
  markAsKnown: (wordId: string): Promise<void> =>
    request<void>(`/study/words/${wordId}/know`, {
      method: 'POST',
    }),
  
  // 复习单词
  reviewWord: (wordId: string, isCorrect: boolean): Promise<void> =>
    request<void>(`/study/review/${wordId}`, {
      method: 'POST',
      body: JSON.stringify({ isCorrect }),
    }),
  
  // 完成学习
  completeStudy: (day: number, wordsLearned: number): Promise<void> =>
    request<void>('/study/complete', {
      method: 'POST',
      body: JSON.stringify({ day, wordsLearned }),
    }),
  
  // 获取单词进度
  getWordProgress: (): Promise<WordProgress[]> =>
    request<WordProgress[]>('/study/words/progress'),

  // 获取复习计划
  getReviewSchedule: (): Promise<ReviewSchedule[]> =>
    request<ReviewSchedule[]>('/study/schedule'),
  
  // 获取学习统计
  getStudyStats: (): Promise<{
    totalWords: number;
    masteredWords: number;
    learningWords: number;
    currentStreak: number;
    longestStreak: number;
  }> => request('/study/stats'),
};

// 进度相关 API
export const progressApi = {
  // 获取用户进度
  getUserProgress: (): Promise<{
    userProgress: UserProgress | null;
    dayProgress: DayProgress[];
  }> => request('/progress'),
  
  // 更新用户进度
  updateUserProgress: (data: Partial<UserProgress>): Promise<UserProgress> =>
    request<UserProgress>('/progress', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  // 获取某日进度
  getDayProgress: (day: number): Promise<DayProgress> =>
    request<DayProgress>(`/progress/day/${day}`),
  
  // 更新某日进度
  updateDayProgress: (day: number, data: Partial<DayProgress>): Promise<DayProgress> =>
    request<DayProgress>(`/progress/day/${day}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  // 完成序幕
  completePrologue: (): Promise<void> =>
    request<void>('/progress/prologue/complete', {
      method: 'POST',
    }),
  
  // 完成早晨剧情
  completeMorningDialogue: (day: number): Promise<void> =>
    request<void>('/progress/morning/complete', {
      method: 'POST',
      body: JSON.stringify({ day }),
    }),
  
  // 完成夜晚剧情
  completeEveningDialogue: (day: number): Promise<void> =>
    request<void>('/progress/evening/complete', {
      method: 'POST',
      body: JSON.stringify({ day }),
    }),
  
  // 进入下一天
  goToNextDay: (): Promise<void> =>
    request<void>('/progress/next-day', {
      method: 'POST',
    }),
  
  // 重置游戏
  resetGame: (): Promise<void> =>
    request<void>('/progress/reset', {
      method: 'POST',
    }),
  
  // 获取学习统计
  getLearningStats: (): Promise<{
    completedDays: number;
    totalWordsLearned: number;
    currentStreak: number;
    longestStreak: number;
    masteryRate: number;
  }> => request('/progress/stats'),
};

export default {
  auth: authApi,
  study: studyApi,
  progress: progressApi,
};
