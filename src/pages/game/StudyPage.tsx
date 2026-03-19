import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { wordsData } from '@/data/words';
import { Check, X, Volume2, ChevronRight, Sparkles } from 'lucide-react';

const TARGET_WORDS_PER_DAY = 10; // 每天需要学习的新单词数量

export default function StudyPage() {
  const navigate = useNavigate();
  const { currentDay, completeStudy, updateWordProgress, addKnownWord, knownWords, wordsProgress, scheduleReview, currentDayLearnedWords, incrementCurrentDayLearnedWords } = useGameStore();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [viewedWords, setViewedWords] = useState<string[]>([]); // 记录当天已查看的单词ID
  const [isReviewMode, setIsReviewMode] = useState(false); // 是否处于复习模式

  // 待学习的单词：状态为'new'的单词，排除已认识的和当天已查看的
  const availableWords = useMemo(() => {
    return wordsData.filter(word => {
      // 排除已认识的单词
      if (knownWords.includes(word.id)) return false;
      
      // 排除当天已查看的单词
      if (viewedWords.includes(word.id)) return false;
      
      // 只获取状态为'new'的单词（待学习）
      const wordProgress = wordsProgress.find(wp => wp.wordId === word.id);
      if (wordProgress && wordProgress.status !== 'new') return false;
      
      return true;
    });
  }, [knownWords, viewedWords, wordsProgress]);

  // 待复习的单词：状态为'learning'且到了复习时间的单词
  const reviewWords = useMemo(() => {
    const currentDay = useGameStore.getState().currentDay;
    
    return wordsData.filter(word => {
      const wordProgress = wordsProgress.find(wp => wp.wordId === word.id);
      if (!wordProgress || wordProgress.status !== 'learning') return false;
      
      // 检查是否到了复习时间
      const reviewSchedule = useGameStore.getState().reviewSchedule.find(schedule => schedule.wordId === word.id);
      if (!reviewSchedule) return false;
      
      return reviewSchedule.scheduledDay <= currentDay;
    });
  }, [wordsProgress]);

  // 当前显示的单词（学习模式或复习模式）
  const currentWord = isReviewMode ? reviewWords[currentWordIndex] : availableWords[currentWordIndex];
  const currentWordList = isReviewMode ? reviewWords : availableWords;
  
  const progress = (currentDayLearnedWords / TARGET_WORDS_PER_DAY) * 100;
  
  // 检查是否已经完成学习（达到目标单词数）
  const isLearningGoalReached = currentDayLearnedWords >= TARGET_WORDS_PER_DAY;

  // 当学习目标达成时，自动设置完成状态
  useEffect(() => {
    if (isLearningGoalReached && !isCompleted) {
      setIsCompleted(true);
      completeStudy(currentDay, currentDayLearnedWords);
    }
  }, [isLearningGoalReached, isCompleted, currentDay, currentDayLearnedWords, completeStudy]);

  // 检查是否有待复习的单词，如果有则跳转到复习页面
  useEffect(() => {
    if (reviewWords.length > 0 && !isReviewMode) {
      navigate('/review');
    }
  }, [reviewWords.length, isReviewMode, navigate]);

  const handleKnowWord = () => {
    // 用户认识这个单词，永久删除该单词，学习数不变
    if (currentWord) {
      addKnownWord(currentWord.id);
      setViewedWords(prev => [...prev, currentWord.id]);
    }
    nextWord();
  };

  const handleDontKnowWord = () => {
    // 用户不认识这个单词，显示详细信息
    setShowMeaning(true);
  };

  const handleRememberWord = () => {
    // 用户记住了这个单词，移到待复习，学习数+1
    if (currentWord) {
      updateWordProgress(currentWord.id, 'learning', 70);
      // 安排1天后复习
      scheduleReview(currentWord.id, 1); // 1天间隔，符合艾宾浩斯遗忘曲线
      // 只有当学习数还没达到目标时才增加计数
      if (currentDayLearnedWords < TARGET_WORDS_PER_DAY) {
        incrementCurrentDayLearnedWords();
      }
      setViewedWords(prev => [...prev, currentWord.id]);
      setShowMeaning(false);
      nextWord();
    }
  };

  const handleReviewCorrect = () => {
    // 复习时回答正确，标记为已掌握
    if (currentWord) {
      updateWordProgress(currentWord.id, 'mastered', 90);
    }
    nextReviewWord();
  };

  const handleReviewIncorrect = () => {
    // 复习时回答错误，降低熟悉度，继续复习
    if (currentWord) {
      updateWordProgress(currentWord.id, 'learning', 50);
    }
    nextReviewWord();
  };

  const nextWord = () => {
    // 检查是否完成学习条件：学习数达到10 且 复习完待复习单词
    const isLearningComplete = currentDayLearnedWords >= TARGET_WORDS_PER_DAY;
    const isReviewComplete = reviewWords.length === 0 || currentWordIndex >= reviewWords.length - 1;
    
    if (isLearningComplete && isReviewComplete) {
      setIsCompleted(true);
      completeStudy(currentDay, currentDayLearnedWords);
      return;
    }

    // 如果学习数达到10，切换到复习模式
    if (currentDayLearnedWords >= TARGET_WORDS_PER_DAY && !isReviewMode) {
      setIsReviewMode(true);
      setCurrentWordIndex(0);
      setShowMeaning(false);
      return;
    }

    // 如果还有可用的单词，继续下一个
    if (currentWordIndex < currentWordList.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowMeaning(false);
    } else {
      // 如果当前批次的单词都用完了，重置索引，继续获取新单词
      setCurrentWordIndex(0);
      setShowMeaning(false);
    }
  };

  const nextReviewWord = () => {
    // 检查是否完成复习
    if (currentWordIndex >= reviewWords.length - 1) {
      // 复习完成，检查是否完成学习
      if (currentDayLearnedWords >= TARGET_WORDS_PER_DAY) {
        setIsCompleted(true);
        completeStudy(currentDay, currentDayLearnedWords);
        return;
      }
      // 复习完成但学习未完成，切换回学习模式
      setIsReviewMode(false);
      setCurrentWordIndex(0);
      setShowMeaning(false);
      return;
    }

    // 继续下一个复习单词
    setCurrentWordIndex(prev => prev + 1);
    setShowMeaning(false);
  };

  const handleComplete = () => {
    // 学习完成后，直接返回游戏主页面进入夜晚剧情
    navigate('/plot');
  };

  const playPronunciation = () => {
    // TODO: Implement pronunciation playback
    console.log('Playing pronunciation for:', currentWord?.word);
  };

  if (isCompleted) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center max-w-md"
        >
          <div className="text-6xl mb-4">🎊</div>
          <h2 className="text-2xl font-bold text-white mb-4">学习完成！</h2>
          <p className="text-gray-400 mb-2">
            今天你已经学习了10个新单词
          </p>
          {reviewWords.length > 0 && (
            <p className="text-gray-400 mb-2">
              复习了 {reviewWords.length} 个单词
            </p>
          )}
          <p className="text-lexicon-gold-400 mb-6">单词星的能量正在恢复...</p>
          <button
            onClick={handleComplete}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl text-white font-medium hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all"
          >
            <span>继续剧情</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentWord) {
    // 如果没有单词可显示
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center max-w-md"
        >
          <div className="text-6xl mb-4">🎊</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {currentDayLearnedWords >= TARGET_WORDS_PER_DAY ? "学习完成！" : "太棒了！"}
          </h2>
          <p className="text-gray-400 mb-2">
            {currentDayLearnedWords >= TARGET_WORDS_PER_DAY 
              ? `今天你已经学习了 ${currentDayLearnedWords} 个新单词`
              : "词库中的单词你都已经学习过了！"}
          </p>
          <p className="text-lexicon-gold-400 mb-6">单词星的能量正在恢复...</p>
          <button
            onClick={handleComplete}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl text-white font-medium hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all"
          >
            <span>继续剧情</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gradient">
            {isReviewMode ? '复习单词' : '认识新的单词居民'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              新单词: {currentDayLearnedWords} / {TARGET_WORDS_PER_DAY}
            </div>
            {isReviewMode && (
              <div className="text-sm text-star-purple-400">
                复习: {currentWordIndex + 1} / {reviewWords.length}
              </div>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-star-purple-500 to-lexicon-gold-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          还需要学习 {Math.max(0, TARGET_WORDS_PER_DAY - currentDayLearnedWords)} 个新单词
          {isReviewMode && `，还需复习 ${reviewWords.length - currentWordIndex - 1} 个单词`}
        </div>
      </div>

      {/* Word Card or Completion Message */}
      <AnimatePresence mode="wait">
        {!isCompleted && (
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col"
          >
            {/* Character Image */}
            <div className="flex-1 flex items-center justify-center mb-6">
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-48 rounded-full overflow-hidden border-4 border-star-purple-500/50 glow-purple"
                >
                  <img
                    src="/image/单词居民1.png"
                    alt="单词居民"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Word Display on Character */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="glass px-4 py-2 rounded-full">
                    <span className="text-lg font-bold text-star-purple-400">{currentWord.word}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Word Details */}
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">{currentWord.word}</h2>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span>{currentWord.pronunciation}</span>
                    <button
                      onClick={playPronunciation}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {currentWord.isSpecial && (
                  <div className="flex items-center space-x-1 text-lexicon-gold-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm">特殊单词</span>
                  </div>
                )}
              </div>

              {/* Meaning */}
              <AnimatePresence>
                {showMeaning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-lg text-lexicon-gold-400 font-medium mb-2">
                        {currentWord.meaning}
                      </div>
                      <div className="text-gray-400 italic">
                        "{currentWord.example}"
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Show Meaning Button */}
              {!showMeaning && (
                <button
                  onClick={() => setShowMeaning(true)}
                  className="w-full py-3 mt-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 transition-colors"
                >
                  查看含义
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {isReviewMode ? (
                <>
                  <button
                    onClick={handleReviewIncorrect}
                    className="flex items-center justify-center space-x-2 py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span>错误</span>
                  </button>
                  <button
                    onClick={handleReviewCorrect}
                    className="flex items-center justify-center space-x-2 py-4 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-400 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    <span>正确</span>
                  </button>
                </>
              ) : showMeaning ? (
                <button
                  onClick={handleRememberWord}
                  className="col-span-2 flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl text-white font-medium hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all"
                >
                  <Check className="w-5 h-5" />
                  <span>我记住了</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleDontKnowWord}
                    className="flex items-center justify-center space-x-2 py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span>不认识</span>
                  </button>
                  <button
                    onClick={handleKnowWord}
                    className="flex items-center justify-center space-x-2 py-4 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-400 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    <span>认识</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
