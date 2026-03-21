import type { Response } from 'express';
import type { ApiResponse } from '../types';

// 成功响应
export function successResponse<T>(res: Response, data: T, message = '操作成功', statusCode = 200): void {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  res.status(statusCode).json(response);
}

// 错误响应
export function errorResponse(res: Response, message: string, statusCode = 400, error?: string): void {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  res.status(statusCode).json(response);
}

// 常用错误响应
export const commonErrors = {
  unauthorized: (res: Response, message = '未授权，请先登录') => errorResponse(res, message, 401),
  forbidden: (res: Response, message = '无权访问该资源') => errorResponse(res, message, 403),
  notFound: (res: Response, message = '资源不存在') => errorResponse(res, message, 404),
  badRequest: (res: Response, message = '请求参数错误') => errorResponse(res, message, 400),
  internalError: (res: Response, message = '服务器内部错误') => errorResponse(res, message, 500),
  validationError: (res: Response, message: string) => errorResponse(res, message, 422),
};
