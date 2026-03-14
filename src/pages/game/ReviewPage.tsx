import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { wordsData } from '@/data/words';
import { RotateCcw, Check, X, Volume2, Brain, Calendar } from 'lucide-react';
import type { WordProgress, Word } from '@/types';

interface ReviewItem {
  word: Word;
  progress: WordProgress;
  daysSinceLastReview: number;
}

export default function ReviewPage() {
  const { wordsProgress, updateWordProgress } = useGameStore();
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    // Get words that need review (simplified logic)
    const items: ReviewItem[] = wordsProgress
      .filter(wp => wp.status !== 'new')
      .map(wp => {
        const word = wordsData.find(w => w.id === wp.wordId);
        const lastReviewed = new Date(wp.lastReviewed);
        const daysSinceLastReview = Math.floor(
          (new Date().getTime() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24)
        );
        return {
          word: word!,
          progress: wp,
          daysSinceLastReview,
        };
      })
      .filter(item => item.word)
      .sort((a, b) => b.daysSinceLastReview - a.daysSinceLastReview)
      .slice(0, 20); // Limit to 20 words per review session

    setReviewItems(items);
  }, [wordsProgress]);

  const currentItem = reviewItems[currentIndex];
  const progress = reviewItems.length > 0 ? ((currentIndex + 1) / reviewItems.length) * 100 : 0;

  const handleCorrect = () => {
    if (currentItem) {
      const newFamiliarity = Math.min(currentItem.progress.familiarity + 10, 100);
      const newStatus = newFamiliarity >= 80 ? 'mastered' : 'reviewing';
      updateWordProgress(currentItem.word.id, newStatus, newFamiliarity);
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
    nextItem();
  };

  const handleIncorrect = () => {
    if (currentItem) {
      const newFamiliarity = Math.max(currentItem.progress.familiarity - 5, 0);
      updateWordProgress(currentItem.word.id, 'learning', newFamiliarity);
      setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    nextItem();
  };

  const nextItem = () => {
    if (currentIndex < reviewItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setIsCompleted(true);
    }
  };

  const playPronunciation = () => {
    if (currentItem) {
      console.log('Playing pronunciation for:', currentItem.word.word);
    }
  };

  if (reviewItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">暂时没有需要复习的单词</h2>
          <p className="text-gray-400">你已经掌握了所有学过的单词，继续学习新的单词吧！</p>
        </motion.div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center max-w-md"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">复习完成！</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">{stats.correct}</div>
              <div className="text-sm text-gray-400">正确</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-red-400">{stats.incorrect}</div>
              <div className="text-sm text-gray-400">需加强</div>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            正确率: {Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)}%
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl text-white font-medium hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span>再次复习</span>
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-gray-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <RotateCcw className="w-6 h-6 text-star-purple-400" />
            <h1 className="text-2xl font-bold text-gradient">复习单词</h1>
          </div>
          <div className="text-sm text-gray-400">
            {currentIndex + 1} / {reviewItems.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Review Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.word.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex-1 flex flex-col"
        >
          {/* Word Display */}
          <div className="flex-1 flex items-center justify-center mb-6">
            <div className="text-center">
              <motion.h2
                key={currentItem.word.word}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold text-white mb-4"
              >
                {currentItem.word.word}
              </motion.h2>
              
              <div className="flex items-center justify-center space-x-2 text-gray-400 mb-4">
                <span>{currentItem.word.pronunciation}</span>
                <button
                  onClick={playPronunciation}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{currentItem.daysSinceLastReview} 天前学习</span>
              </div>
            </div>
          </div>

          {/* Answer Section */}
          <div className="glass rounded-2xl p-6 mb-6">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-4 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl text-white font-medium hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all"
              >
                显示答案
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-lexicon-gold-400 mb-2">
                    {currentItem.word.meaning}
                  </div>
                  <div className="text-gray-400 italic">
                    "{currentItem.word.example}"
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={handleIncorrect}
                    className="flex items-center justify-center space-x-2 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span>没记住</span>
                  </button>
                  
                  <button
                    onClick={handleCorrect}
                    className="flex items-center justify-center space-x-2 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-400 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    <span>记住了</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
