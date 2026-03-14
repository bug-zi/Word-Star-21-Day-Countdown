import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { Home, BookOpen, RotateCcw, User, Sparkles } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { currentDay, getTotalWordsLearned } = useGameStore();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/plot', label: '剧情', icon: Sparkles },
    { path: '/study', label: '学习', icon: BookOpen },
    { path: '/review', label: '复习', icon: RotateCcw },
    { path: '/profile', label: '我的', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="w-8 h-8 rounded-full bg-gradient-to-br from-star-purple-500 to-lexicon-gold-500 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold text-gradient group-hover:scale-105 transition-transform">单词星</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 relative overflow-hidden group ${
                      isActive
                        ? 'bg-star-purple-500/20 text-star-purple-300'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-star-purple-500/20 rounded-lg"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-4 h-4 relative z-10" />
                    </motion.div>
                    <span className="hidden sm:inline text-sm relative z-10">{item.label}</span>
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        initial={false}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-lexicon-gold-400">
              <span>第</span>
              <span className="font-bold">{currentDay}</span>
              <span>天</span>
            </div>
            <div className="flex items-center space-x-1 text-star-purple-400">
              <span>已学</span>
              <span className="font-bold">{getTotalWordsLearned()}</span>
              <span>词</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
