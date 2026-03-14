import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { 
  Mail, 
  Calendar, 
  BookOpen, 
  Flame, 
  Trophy, 
  LogOut,
  Star,
  Target,
  BookMarked,
  ChevronRight,
  X,
  BarChart3
} from 'lucide-react';
import { wordsData } from '@/data/words';
import { Marquee } from '@/components/Marquee';
import { StudyStats } from '@/components/StudyStats';

export default function ProfilePage() {
  const { user, logout, currentDay, getTotalWordsLearned, daysProgress, goToNextDay, resetGame, wordsProgress, knownWords } = useGameStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDebugConfirm, setShowDebugConfirm] = useState(false);
  const [debugAction, setDebugAction] = useState<string | null>(null);
  const [showAllWords, setShowAllWords] = useState(false); // 控制显示所有已学单词的模态框
  
  // 学习成果相关状态
  const [learnedWords, setLearnedWords] = useState<Array<{
    id: string;
    word: string;
    meaning: string;
    pronunciation: string;
    example: string;
    level: 'easy' | 'medium' | 'hard';
    day: number;
    isSpecial?: boolean;
    characterName?: string;
    progress: {
      wordId: string;
      status: 'new' | 'learning' | 'reviewing' | 'mastered';
      familiarity: number;
      lastReviewed: string;
      nextReview: string;
      reviewCount: number;
    } | undefined;
  }>>([]);

  const completedDays = daysProgress.filter(dp => dp.isCompleted).length;
  const streakDays = user?.streakDays || 0;
  const totalWords = getTotalWordsLearned();

  // 获取已学习的单词
  useEffect(() => {
    // 过滤出已学习的单词（status为learning或mastered）
    const learned = wordsData
      .filter(word => {
        const progress = wordsProgress.find(wp => wp.wordId === word.id);
        return progress && progress.status !== 'new' && !knownWords.includes(word.id);
      })
      .map(word => {
        const progress = wordsProgress.find(wp => wp.wordId === word.id);
        return {
          ...word,
          progress
        };
      })
      .sort((a, b) => {
        // 按学习时间排序，最新学习的在前面
        if (!a.progress || !b.progress) return 0;
        return new Date(b.progress.lastReviewed).getTime() - new Date(a.progress.lastReviewed).getTime();
      });
    
    setLearnedWords(learned);
  }, [wordsProgress, knownWords]);

  const stats = [
    { 
      icon: Calendar, 
      label: '当前天数', 
      value: `${currentDay}/21`,
      color: 'text-lexicon-gold-400'
    },
    { 
      icon: BookOpen, 
      label: '已学单词', 
      value: totalWords.toString(),
      color: 'text-star-purple-400'
    },
    { 
      icon: Flame, 
      label: '连续学习', 
      value: `${streakDays}天`,
      color: 'text-orange-400'
    },
    { 
      icon: Target, 
      label: '完成天数', 
      value: `${completedDays}天`,
      color: 'text-green-400'
    },
  ];

  const achievements = [
    { id: '1', title: '初次相遇', description: '完成序幕', unlocked: true, icon: '👋' },
    { id: '2', title: '第一天', description: '完成第1天的学习', unlocked: completedDays >= 1, icon: '☀️' },
    { id: '3', title: '一周坚持', description: '完成第7天的学习', unlocked: completedDays >= 7, icon: '📅' },
    { id: '4', title: '单词收藏家', description: '学习50个单词', unlocked: totalWords >= 50, icon: '📚' },
    { id: '5', title: '半程英雄', description: '完成第10天的学习', unlocked: completedDays >= 10, icon: '🏃' },
    { id: '6', title: '词汇大师', description: '学习100个单词', unlocked: totalWords >= 100, icon: '🎓' },
    { id: '7', title: '坚持不懈', description: '连续学习7天', unlocked: streakDays >= 7, icon: '🔥' },
    { id: '8', title: '最终挑战', description: '完成第21天的学习', unlocked: completedDays >= 21, icon: '👑' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-gray-400">请先登录</div>
      </div>
    );
}

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="glass rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-star-purple-500/10 to-lexicon-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-star-purple-500/20 rounded-full blur-3xl group-hover:bg-star-purple-500/30 transition-all duration-300" />
        <div className="relative flex items-center space-x-4">
          <motion.div 
            className="w-20 h-20 rounded-full overflow-hidden border-4 border-star-purple-500/50 group-hover:border-lexicon-gold-500/50 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <img
              src="/image/用户1.jpg"
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white group-hover:text-lexicon-gold-300 transition-colors">{user.username}</h1>
            <div className="flex items-center space-x-2 text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2 group-hover:text-gray-400 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>加入时间: {new Date(user.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-xl p-4 text-center relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-star-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
                </motion.div>
                <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-star-purple-500/20 rounded-full blur-xl group-hover:bg-star-purple-500/30 transition-all duration-300" />
            </motion.div>
          );
        })}
      </div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        className="glass rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-star-purple-500/5 to-lexicon-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-lexicon-gold-400" />
              </motion.div>
              <span>21天挑战进度</span>
            </h2>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{completedDays}/21 天</span>
          </div>
          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedDays / 21) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-star-purple-500 via-lexicon-gold-500 to-star-purple-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span 
                className="text-xs font-bold text-white drop-shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Math.round((completedDays / 21) * 100)}%
              </motion.span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            已完成 {Math.round((completedDays / 21) * 100)}% 的挑战
          </div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-star-purple-500/20 rounded-full blur-2xl group-hover:bg-star-purple-500/30 transition-all duration-300" />
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-lexicon-gold-500/20 rounded-full blur-2xl group-hover:bg-lexicon-gold-500/30 transition-all duration-300" />
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.01 }}
        className="glass rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-lexicon-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <div className="flex items-center space-x-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="w-5 h-5 text-lexicon-gold-400" />
            </motion.div>
            <h2 className="text-lg font-semibold text-white">成就</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className={`p-3 rounded-xl border transition-all relative overflow-hidden ${
                  achievement.unlocked
                    ? 'bg-lexicon-gold-500/20 border-lexicon-gold-500/30 cursor-pointer'
                    : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                }`}
              >
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-lexicon-gold-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
                <div className="relative">
                  <motion.div 
                    className="text-2xl mb-1"
                    animate={achievement.unlocked ? { y: [0, -5, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className={`text-sm font-medium ${
                    achievement.unlocked ? 'text-lexicon-gold-400' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </div>
                  <div className="text-xs text-gray-500">{achievement.description}</div>
                </div>
                {achievement.unlocked && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-lexicon-gold-500/20 rounded-full blur-lg" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Learning Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.01 }}
        className="glass rounded-2xl p-6 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-star-purple-500/5 to-lexicon-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookMarked className="w-5 h-5 text-star-purple-400" />
              </motion.div>
              <h2 className="text-lg font-semibold text-white">学习成果</h2>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">({learnedWords.length}个单词)</span>
            </div>
            {learnedWords.length > 0 && (
              <button
                onClick={() => setShowAllWords(true)}
                className="text-sm text-star-purple-400 hover:text-star-purple-300 transition-colors flex items-center space-x-1"
              >
                <span>已学单词</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {learnedWords.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>还没有学习任何单词</p>
              <p className="text-sm mt-2">开始你的学习之旅吧！</p>
            </div>
          ) : (
            <div className="py-4">
              <Marquee 
                pauseOnHover={true}
                className="[--duration:60s]"
              >
                {learnedWords.map((word, index) => (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:border-star-purple-400/50 hover:bg-white/10 min-w-[250px]"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-lg font-semibold text-white group-hover:text-star-purple-400 transition-colors">{word.word}</div>
                        <div className="text-sm text-gray-400 mt-1">{word.meaning}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          学习时间: {word.progress ? `第${word.day}天` : '未知'}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        word.progress ? 
                          (word.progress.familiarity >= 80 ? 'bg-green-500/20 text-green-400' :
                          word.progress.familiarity >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-orange-500/20 text-orange-400') :
                          'bg-gray-500/20 text-gray-400'
                      }`}>
                        {word.progress ? word.progress.familiarity : 0}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Marquee>
            </div>
          )}
        </div>
      </motion.div>

      {/* 学习统计图表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            <BarChart3 className="w-6 h-6 mr-2 inline" />
            学习统计
          </h2>
        </div>
        <StudyStats />
      </motion.div>

      {/* Debug Buttons (Testing Only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">调试工具</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              setDebugAction('nextDay');
              setShowDebugConfirm(true);
            }}
            className="py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl text-blue-400 transition-colors"
          >
            提前进入下一天
          </button>
          <button
            onClick={() => {
              setDebugAction('reset');
              setShowDebugConfirm(true);
            }}
            className="py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 transition-colors"
          >
            重置游戏
          </button>
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center justify-center space-x-2 py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </button>
      </motion.div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 max-w-sm mx-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">确认退出？</h3>
            <p className="text-gray-400 mb-6">退出后需要重新登录才能继续你的冒险。</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 transition-colors"
              >
                确认退出
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Debug Confirmation Modal */}
      {showDebugConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 max-w-sm mx-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {debugAction === 'nextDay' ? '提前进入下一天？' : '重置游戏？'}
            </h3>
            <p className="text-gray-400 mb-6">
              {debugAction === 'nextDay' 
                ? '这将直接进入下一天的学习，当前进度会被保存。' 
                : '这将重置所有游戏进度，包括学习记录和成就。'}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDebugConfirm(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (debugAction === 'nextDay') {
                    goToNextDay();
                  } else if (debugAction === 'reset') {
                    resetGame();
                    window.location.href = '/';
                  }
                  setShowDebugConfirm(false);
                }}
                className="flex-1 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl text-blue-400 transition-colors"
              >
                确认
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 所有已学单词模态框 */}
      <AnimatePresence>
        {showAllWords && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAllWords(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">已学单词 ({learnedWords.length}个)</h3>
                <button
                  onClick={() => setShowAllWords(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learnedWords.map((word, index) => (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:border-star-purple-400/50 hover:bg-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-lg font-semibold text-white">{word.word}</div>
                        <div className="text-sm text-gray-400 mt-1">{word.meaning}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          学习时间: {word.progress ? `第${word.day}天` : '未知'}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        word.progress ? 
                          (word.progress.familiarity >= 80 ? 'bg-green-500/20 text-green-400' :
                          word.progress.familiarity >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-orange-500/20 text-orange-400') :
                          'bg-gray-500/20 text-gray-400'
                      }`}>
                        {word.progress ? word.progress.familiarity : 0}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
