import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { wordsData } from '@/data/words';
import { RotateCcw, Volume2, Brain, Calendar } from 'lucide-react';
import type { WordProgress, Word } from '@/types';

interface ReviewItem {
  word: Word;
  progress: WordProgress;
  daysSinceLastReview: number;
  options: {
    meaning: string;
    isCorrect: boolean;
  }[];
}

export default function ReviewPage() {
  const navigate = useNavigate();
  const { updateWordProgress, getWordsDueForReview } = useGameStore();
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  
  // 新增状态：管理答题结果和流程控制
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  // Generate distraction options for multiple choice
  const generateDistractors = (correctWord: Word, count: number = 3): string[] => {
    // Get all other words
    const otherWords = wordsData.filter(w => w.id !== correctWord.id);
    // Shuffle and take the first 'count' words
    const shuffled = [...otherWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(w => w.meaning);
  };

  // Shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 只在组件挂载时生成复习列表
  useEffect(() => {
    // Get words that need review based on review schedule
    const dueWords = getWordsDueForReview();
    const items: ReviewItem[] = dueWords
      .map(wp => {
        const word = wordsData.find(w => w.id === wp.wordId);
        if (!word) return null;
        
        const lastReviewed = new Date(wp.lastReviewed);
        const daysSinceLastReview = Math.floor(
          (new Date().getTime() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        // Generate distractors and create options
        const distractors = generateDistractors(word);
        const options = [
          { meaning: word.meaning, isCorrect: true },
          ...distractors.map(meaning => ({ meaning, isCorrect: false }))
        ];
        
        // Shuffle options
        const shuffledOptions = shuffleArray(options);
        
        return {
          word,
          progress: wp,
          daysSinceLastReview,
          options: shuffledOptions
        };
      })
      .filter((item): item is ReviewItem => item !== null)
      .sort((a, b) => {
        // First sort by days since last review (descending)
        if (b.daysSinceLastReview !== a.daysSinceLastReview) {
          return b.daysSinceLastReview - a.daysSinceLastReview;
        }
        // Then sort by familiarity (ascending)
        return a.progress.familiarity - b.progress.familiarity;
      });

    setReviewItems(items);
  }, []); // 空依赖数组，只在挂载时执行

  const currentItem = reviewItems[currentIndex];
  const progress = reviewItems.length > 0 ? ((currentIndex + 1) / reviewItems.length) * 100 : 0;

  // Handle option selection
  const handleOptionSelect = (optionIndex: number, correct: boolean) => {
    if (hasAnswered || !currentItem) return; // 如果已经回答过，不再处理
    
    setHasAnswered(true);
    setIsCorrect(correct);
    setSelectedOptionIndex(optionIndex);
    
    // 更新单词进度（但不立即进入下一个）
    if (correct) {
      const newFamiliarity = Math.min(currentItem.progress.familiarity + 15, 100);
      const newStatus = newFamiliarity >= 90 ? 'mastered' : 'reviewing';
      updateWordProgress(currentItem.word.id, newStatus, newFamiliarity);
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      const newFamiliarity = Math.max(currentItem.progress.familiarity - 10, 0);
      const newStatus = newFamiliarity < 50 ? 'learning' : 'reviewing';
      updateWordProgress(currentItem.word.id, newStatus, newFamiliarity);
      setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const handleRemembered = () => {
    // 重置状态并进入下一个单词
    setHasAnswered(false);
    setIsCorrect(false);
    setSelectedOptionIndex(null);
    nextItem();
  };

  const nextItem = () => {
    if (currentIndex < reviewItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
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
            onClick={() => navigate('/study')}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl text-white font-medium hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span>开始学习新单词</span>
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
            <div className="space-y-6">
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${
                  hasAnswered 
                    ? (isCorrect ? 'text-green-400' : 'text-red-400')
                    : 'text-lexicon-gold-400'
                }`}>
                  {hasAnswered 
                    ? (isCorrect ? '✓ 回答正确' : '✗ 回答错误')
                    : '选择正确的含义'
                  }
                </div>
                {hasAnswered && (
                  <div className="text-gray-400 text-sm">
                    正确答案是：{currentItem.options.find(opt => opt.isCorrect)?.meaning}
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-4">
                {currentItem.options.map((option, index) => {
                  // 计算按钮样式
                  let buttonClass = "w-full py-4 px-6 border rounded-xl text-white transition-all text-left ";
                  let letterClass = "w-8 h-8 rounded-full flex items-center justify-center font-medium ";
                  
                  if (hasAnswered) {
                    if (option.isCorrect) {
                      // 正确选项显示绿色
                      buttonClass += "bg-green-500/20 border-green-500/50 ";
                      letterClass += "bg-green-500 text-white ";
                    } else if (index === selectedOptionIndex && !isCorrect) {
                      // 用户选错的选项显示红色
                      buttonClass += "bg-red-500/20 border-red-500/50 ";
                      letterClass += "bg-red-500 text-white ";
                    } else {
                      // 其他选项变灰
                      buttonClass += "bg-white/5 border-white/10 opacity-50 ";
                      letterClass += "bg-white/10 text-gray-400 ";
                    }
                  } else {
                    // 未回答时的默认样式
                    buttonClass += "bg-white/5 border-white/10 hover:bg-white/10 ";
                    letterClass += "bg-white/10 text-gray-400 ";
                  }
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionSelect(index, option.isCorrect)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      disabled={hasAnswered}
                      className={buttonClass}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={letterClass}>
                          {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                        </div>
                        <div className="text-lg">{option.meaning}</div>
                        {hasAnswered && option.isCorrect && (
                          <span className="ml-auto text-green-400">✓</span>
                        )}
                        {hasAnswered && index === selectedOptionIndex && !isCorrect && (
                          <span className="ml-auto text-red-400">✗</span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* 我记住了按钮 */}
              {hasAnswered && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleRemembered}
                  className={`w-full py-4 px-6 rounded-xl text-white font-semibold transition-all ${
                    isCorrect 
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500'
                      : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500'
                  }`}
                >
                  我记住了
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
