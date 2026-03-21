import Redis from 'ioredis';

// 创建 Redis 客户端
export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

// Redis 键前缀
export const REDIS_KEYS = {
  USER_SESSION: 'user:session:',
  USER_PROGRESS: 'user:progress:',
  WORDS_CACHE: 'words:cache',
  RATE_LIMIT: 'rate_limit:',
};

// 缓存时间（秒）
export const CACHE_TTL = {
  USER_SESSION: 60 * 60 * 24 * 7, // 7天
  USER_PROGRESS: 60 * 5, // 5分钟
  WORDS_CACHE: 60 * 60, // 1小时
};

// 连接事件
redis.on('connect', () => {
  console.log('✅ Redis 连接成功');
});

redis.on('error', (error) => {
  console.error('❌ Redis 连接错误:', error);
});

// 缓存工具函数
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function setCache(key: string, value: unknown, ttl?: number): Promise<void> {
  try {
    const data = JSON.stringify(value);
    if (ttl) {
      await redis.setex(key, ttl, data);
    } else {
      await redis.set(key, data);
    }
  } catch (error) {
    console.error('Redis 缓存设置失败:', error);
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Redis 缓存删除失败:', error);
  }
}

export async function clearUserCache(userId: string): Promise<void> {
  try {
    const keys = await redis.keys(`${REDIS_KEYS.USER_PROGRESS}${userId}*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('清除用户缓存失败:', error);
  }
}
