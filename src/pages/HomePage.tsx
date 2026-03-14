import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { Sparkles, BookOpen, RotateCcw, ChevronRight, Star } from 'lucide-react';

export default function HomePage() {
  const { currentDay, getCurrentDayProgress, getTotalWordsLearned, currentDayLearnedWords } = useGameStore();
  const dayProgress = getCurrentDayProgress();
  const totalWords = getTotalWordsLearned();

  const getNextAction = () => {
    if (!dayProgress) return { text: '开始游戏', path: '/plot', icon: Sparkles };
    
    if (!dayProgress.morningDialogueCompleted) {
      return { text: '继续剧情', path: '/plot', icon: Sparkles };
    }
    if (!dayProgress.studyCompleted) {
      // 如果已经学习了至少1个单词，显示"继续学习"，否则显示"开始学习"
      if (currentDayLearnedWords >= 1) {
        return { text: '继续学习', path: '/study', icon: BookOpen };
      } else {
        return { text: '开始学习', path: '/study', icon: BookOpen };
      }
    }
    if (!dayProgress.eveningDialogueCompleted) {
      return { text: '继续剧情', path: '/plot', icon: Sparkles };
    }
    return { text: '开始新的一天', path: '/plot', icon: Sparkles };
  };

  const nextAction = getNextAction();
  const ActionIcon = nextAction.icon;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gradient">
          单词星：21天倒计时
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          在21天内拯救单词星文明，每个单词都是一个等待被唤醒的生命
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="glass rounded-2xl p-6 text-center relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-lexicon-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="text-3xl font-bold text-lexicon-gold-400 mb-2 group-hover:scale-110 transition-transform">
              {currentDay}/21
            </div>
            <div className="text-sm text-gray-400">当前天数</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-lexicon-gold-500/20 rounded-full blur-xl group-hover:bg-lexicon-gold-500/30 transition-all duration-300" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="glass rounded-2xl p-6 text-center relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-star-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="text-3xl font-bold text-star-purple-400 mb-2 group-hover:scale-110 transition-transform">
              {totalWords}
            </div>
            <div className="text-sm text-gray-400">已学单词</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-star-purple-500/20 rounded-full blur-xl group-hover:bg-star-purple-500/30 transition-all duration-300" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="glass rounded-2xl p-6 text-center relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="text-3xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform">
              {Math.round((totalWords / 210) * 100)}%
            </div>
            <div className="text-sm text-gray-400">完成进度</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/30 transition-all duration-300" />
        </motion.div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to={nextAction.path}
            className="group block glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-star-purple-500/20 to-lexicon-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-star-purple-500/30 rounded-full blur-3xl group-hover:bg-star-purple-500/50 transition-all duration-300" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-star-purple-500 to-lexicon-gold-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-star-purple-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ActionIcon className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-lexicon-gold-300 transition-colors">{nextAction.text}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">继续你的冒险之旅</p>
                </div>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1, rotate: 45 }}
              >
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </motion.div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/review"
            className="group block glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/30 rounded-full blur-3xl group-hover:bg-green-500/50 transition-all duration-300" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-green-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <RotateCcw className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-green-300 transition-colors">复习单词</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">巩固记忆，对抗遗忘</p>
                </div>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1, rotate: 45 }}
              >
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </motion.div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        className="glass rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-star-purple-500/5 to-lexicon-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-lexicon-gold-400" />
              </motion.div>
              <span>21天挑战进度</span>
            </h3>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{currentDay}/21 天</span>
          </div>
          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentDay / 21) * 100}%` }}
              transition={{ duration: 1, delay: 0.7 }}
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
                {Math.round((currentDay / 21) * 100)}%
              </motion.span>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-star-purple-500/20 rounded-full blur-2xl group-hover:bg-star-purple-500/30 transition-all duration-300" />
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-lexicon-gold-500/20 rounded-full blur-2xl group-hover:bg-lexicon-gold-500/30 transition-all duration-300" />
        </div>
      </motion.div>
    </div>
  );
}
