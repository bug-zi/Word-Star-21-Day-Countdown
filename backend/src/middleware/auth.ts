import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, extractTokenFromHeader } from '../utils/token';
import { prisma } from '../config/database';
import { commonErrors } from '../utils/response';

// 扩展 Express Request 类型
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

// JWT 认证中间件
export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // 从请求头中提取令牌
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      commonErrors.unauthorized(res, '缺少访问令牌');
      return;
    }
    
    // 验证令牌
    const payload = verifyAccessToken(token);
    
    if (!payload) {
      commonErrors.unauthorized(res, '令牌无效或已过期');
      return;
    }
    
    // 验证用户是否存在
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true },
    });
    
    if (!user) {
      commonErrors.unauthorized(res, '用户不存在');
      return;
    }
    
    // 将用户信息附加到请求对象
    req.user = user;
    
    next();
  } catch (error) {
    console.error('认证中间件错误:', error);
    commonErrors.internalError(res);
  }
}

// 可选认证中间件（不强制要求登录，但如果提供了令牌会解析用户信息）
export async function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (token) {
      const payload = verifyAccessToken(token);
      
      if (payload) {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          select: { id: true, email: true },
        });
        
        if (user) {
          req.user = user;
        }
      }
    }
    
    next();
  } catch (error) {
    console.error('可选认证中间件错误:', error);
    next();
  }
}
