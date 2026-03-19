import { prisma } from '../config/database';
import { hashPassword, comparePassword, validatePasswordStrength } from '../utils/password';
import { generateTokenPair } from '../utils/token';
import { setCache, REDIS_KEYS, CACHE_TTL } from '../config/redis';
import type { RegisterRequest, LoginRequest, AuthResponse, User } from '../types';

export class AuthService {
  // 用户注册
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const { email, username, password } = data;
    
    // 验证密码强度
    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.isValid) {
      throw new Error(passwordCheck.message);
    }
    
    // 检查邮箱是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      throw new Error('该邮箱已被注册');
    }
    
    // 哈希密码
    const hashedPassword = await hashPassword(password);
    
    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        createdAt: true,
      },
    });
    
    // 初始化用户进度
    await this.initializeUserProgress(user.id);
    
    // 生成令牌
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
    });
    
    // 缓存用户会话
    await setCache(
      `${REDIS_KEYS.USER_SESSION}${user.id}`,
      { userId: user.id, email: user.email },
      CACHE_TTL.USER_SESSION
    );
    
    return {
      user: user as User,
      ...tokens,
    };
  }
  
  // 用户登录
  async login(data: LoginRequest): Promise<AuthResponse> {
    const { email, password } = data;
    
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      throw new Error('邮箱或密码错误');
    }
    
    // 验证密码
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('邮箱或密码错误');
    }
    
    // 生成令牌
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
    });
    
    // 缓存用户会话
    await setCache(
      `${REDIS_KEYS.USER_SESSION}${user.id}`,
      { userId: user.id, email: user.email },
      CACHE_TTL.USER_SESSION
    );
    
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar || undefined,
        createdAt: user.createdAt,
      },
      ...tokens,
    };
  }
  
  // 刷新令牌
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const { verifyRefreshToken, generateTokenPair } = await import('../utils/token');
    
    const payload = verifyRefreshToken(refreshToken);
    
    if (!payload) {
      throw new Error('刷新令牌无效或已过期');
    }
    
    // 验证用户是否存在
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true },
    });
    
    if (!user) {
      throw new Error('用户不存在');
    }
    
    // 生成新令牌
    return generateTokenPair({
      userId: user.id,
      email: user.email,
    });
  }
  
  // 初始化用户进度
  private async initializeUserProgress(userId: string): Promise<void> {
    // 创建用户进度
    await prisma.userProgress.create({
      data: {
        userId,
        currentDay: 1,
        isPrologueCompleted: false,
        currentScene: 'prologue',
        streakDays: 0,
        totalWordsLearned: 0,
      },
    });
    
    // 创建21天的进度记录
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
    
    // 获取所有单词并创建进度记录
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
    
    // 分批创建，避免一次创建太多
    const batchSize = 100;
    for (let i = 0; i < wordProgressData.length; i += batchSize) {
      const batch = wordProgressData.slice(i, i + batchSize);
      await prisma.wordProgress.createMany({
        data: batch,
      });
    }
  }
  
  // 获取当前用户信息
  async getCurrentUser(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        createdAt: true,
      },
    });
    
    return user as User | null;
  }

  // 删除用户账号
  async deleteAccount(userId: string): Promise<void> {
    // 由于外键约束，删除用户会自动删除关联的所有数据
    await prisma.user.delete({
      where: { id: userId },
    });
  }
}

export const authService = new AuthService();
