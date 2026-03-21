import type { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

// 全局错误处理中间件
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error('错误:', err);
  
  // Prisma 错误处理
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as unknown as { code: string; meta?: { target?: string[] } };
    
    // 唯一约束冲突
    if (prismaError.code === 'P2002') {
      const field = prismaError.meta?.target?.[0] || '字段';
      errorResponse(res, `${field} 已存在`, 409);
      return;
    }
    
    // 外键约束失败
    if (prismaError.code === 'P2003') {
      errorResponse(res, '关联资源不存在', 400);
      return;
    }
    
    // 记录不存在
    if (prismaError.code === 'P2025') {
      errorResponse(res, '资源不存在', 404);
      return;
    }
  }
  
  // JWT 错误
  if (err.name === 'JsonWebTokenError') {
    errorResponse(res, '无效的令牌', 401);
    return;
  }
  
  if (err.name === 'TokenExpiredError') {
    errorResponse(res, '令牌已过期', 401);
    return;
  }
  
  // 默认错误响应
  errorResponse(res, '服务器内部错误', 500, process.env.NODE_ENV === 'development' ? err.message : undefined);
}

// 404 处理中间件
export function notFoundHandler(req: Request, res: Response): void {
  errorResponse(res, `路由不存在: ${req.method} ${req.path}`, 404);
}
