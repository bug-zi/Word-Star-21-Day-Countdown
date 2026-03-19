import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { authApi, progressApi } from '@/services/api';
import { Sparkles, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useGameStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 调用后端登录 API
      const response = await authApi.login({ email, password });
      
      // 保存令牌
      authApi.saveTokens(response.accessToken, response.refreshToken);
      
      // 登录用户
      login(response.user);
      
      // 从后端加载用户进度
      try {
        const progressData = await progressApi.getUserProgress();
        if (progressData.userProgress) {
          useGameStore.getState().syncWithBackend(progressData);
        }
        
        // 加载单词进度
        const { studyApi } = await import('@/services/api');
        const wordProgressData = await studyApi.getWordProgress();
        if (wordProgressData && wordProgressData.length > 0) {
          const store = useGameStore.getState();
          store.setWordsProgress(wordProgressData);
        }
        
        // 加载复习计划
        const reviewScheduleData = await studyApi.getReviewSchedule();
        if (reviewScheduleData && reviewScheduleData.length > 0) {
          const store = useGameStore.getState();
          store.setReviewSchedule(reviewScheduleData.map(rs => ({
            wordId: rs.wordId,
            scheduledDay: rs.scheduledDay,
            reviewInterval: rs.reviewInterval,
          })));
        }
      } catch (progressErr) {
        console.error('加载用户进度失败:', progressErr);
      }
      
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('登录失败，请检查邮箱和密码');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 游客模式登录
  const handleGuestLogin = async () => {
    setError('');
    setIsGuestLoading(true);

    try {
      // 生成随机游客账号
      const guestId = Math.random().toString(36).substring(2, 10);
      const guestUser = {
        id: `guest-${guestId}`,
        username: `游客${guestId.substring(0, 4)}`,
        email: `guest-${guestId}@wordstar.local`,
        createdAt: new Date().toISOString(),
        streakDays: 0,
        totalWordsLearned: 0,
      };

      // 游客模式使用本地存储
      localStorage.setItem('wordstar_guest_mode', 'true');
      localStorage.setItem('wordstar_guest_user', JSON.stringify(guestUser));
      
      login(guestUser);
      navigate('/');
    } catch (err) {
      setError('游客登录失败，请重试');
    } finally {
      setIsGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-star-purple-500 to-lexicon-gold-500 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">单词星</h1>
          <p className="text-gray-400 mt-2">21天倒计时</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">欢迎回来</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-star-purple-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-star-purple-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl text-white font-medium hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </form>

          {/* 分隔线 */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-4 text-gray-500 text-sm">或</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* 游客模式按钮 */}
          <button
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
            className="w-full py-3 bg-white/5 border border-white/20 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <User className="w-5 h-5" />
            {isGuestLoading ? '进入中...' : '游客模式（数据存本地）'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              还没有账号？{' '}
              <Link to="/register" className="text-star-purple-400 hover:text-star-purple-300 transition-colors">
                立即注册
              </Link>
            </p>
          </div>
        </motion.div>

        {/* 说明文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          登录账号：数据云端同步，换设备不丢失
          <br />
          游客模式：数据仅保存在当前设备
        </motion.p>
      </div>
    </div>
  );
}
