import { PrismaClient } from '@prisma/client';

// 创建 Prisma 客户端实例
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
});

// 连接数据库
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ 数据库连接成功');
  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
    process.exit(1);
  }
}

// 断开数据库连接
export async function disconnectDatabase() {
  await prisma.$disconnect();
  console.log('数据库连接已断开');
}
