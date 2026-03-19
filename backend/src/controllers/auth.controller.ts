import type { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/response';
import type { LoginRequest, RegisterRequest } from '../types';

export class AuthController {
  // 用户注册
  async register(req: Request, res: Response): Promise<void> {
    try {
      const data: RegisterRequest = req.body;
      
      // 验证必填字段
      if (!data.email || !data.username || !data.password) {
        errorResponse(res, '请填写所有必填字段', 400);
        return;
      }
      
      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errorResponse(res, '邮箱格式不正确', 400);
        return;
      }
      
      const result = await authService.register(data);
      successResponse(res, result, '注册成功', 201);
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '注册失败', 400);
    }
  }
  
  // 用户登录
  async login(req: Request, res: Response): Promise<void> {
    try {
      const data: LoginRequest = req.body;
      
      // 验证必填字段
      if (!data.email || !data.password) {
        errorResponse(res, '请填写邮箱和密码', 400);
        return;
      }
      
      const result = await authService.login(data);
      successResponse(res, result, '登录成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '登录失败', 401);
    }
  }
  
  // 刷新令牌
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        errorResponse(res, '缺少刷新令牌', 400);
        return;
      }
      
      const result = await authService.refreshToken(refreshToken);
      successResponse(res, result, '令牌刷新成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '令牌刷新失败', 401);
    }
  }
  
  // 获取当前用户信息
  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const user = await authService.getCurrentUser(userId);
      
      if (!user) {
        errorResponse(res, '用户不存在', 404);
        return;
      }
      
      successResponse(res, user, '获取用户信息成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '获取用户信息失败', 500);
    }
  }

  // 删除用户账号
  async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      await authService.deleteAccount(userId);
      successResponse(res, null, '账号注销成功');
    } catch (error) {
      errorResponse(res, error instanceof Error ? error.message : '账号注销失败', 500);
    }
  }
}

export const authController = new AuthController();
