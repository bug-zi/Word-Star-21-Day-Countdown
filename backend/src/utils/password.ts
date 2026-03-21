import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

// 哈希密码
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// 验证密码
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// 密码强度验证
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  message: string;
} {
  if (password.length < 6) {
    return { isValid: false, message: '密码长度至少6位' };
  }
  
  if (password.length > 20) {
    return { isValid: false, message: '密码长度不能超过20位' };
  }
  
  // 可选：添加更复杂的密码规则
  // const hasLetter = /[a-zA-Z]/.test(password);
  // const hasNumber = /\d/.test(password);
  // if (!hasLetter || !hasNumber) {
  //   return { isValid: false, message: '密码必须包含字母和数字' };
  // }
  
  return { isValid: true, message: '密码强度符合要求' };
}
