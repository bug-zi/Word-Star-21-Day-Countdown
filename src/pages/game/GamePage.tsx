import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { getSceneByDayAndTime } from '@/data/story';
import { ChevronRight, BookOpen, Moon } from 'lucide-react';
import Typewriter from '@/components/Typewriter';

export default function GamePage() {
  const navigate = useNavigate();
  const { 
    currentDay, 
    getCurrentDayProgress, 
    completeMorningDialogue, 
    completeEveningDialogue,
    goToNextDay,
    hasWordsDueForReview
  } = useGameStore();
  
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Determine current scene
  const getCurrentScene = () => {
    const dayProgress = getCurrentDayProgress();
    if (!dayProgress) return 'morning';
    if (!dayProgress.morningDialogueCompleted) return 'morning';
    if (!dayProgress.studyCompleted) return 'study';
    if (!dayProgress.eveningDialogueCompleted) return 'evening';
    return 'completed';
  };

  const currentScene = getCurrentScene();
  const scene = getSceneByDayAndTime(currentDay, currentScene === 'morning' ? 'morning' : 'evening');
  const dialogues = scene?.dialogues || [];
  const currentDialogue = dialogues[currentDialogueIndex];
  const isLastDialogue = currentDialogueIndex === dialogues.length - 1;

  const handleNext = () => {
    setIsTypingComplete(false);
    if (isLastDialogue) {
      if (currentScene === 'morning') {
        completeMorningDialogue(currentDay);
        // 检查是否有需要复习的单词
        if (hasWordsDueForReview()) {
          // 有需要复习的单词，先跳转到复习页面
          navigate('/review');
        } else {
          // 没有需要复习的单词，直接进入学习页面
          navigate('/study');
        }
      } else if (currentScene === 'evening') {
        completeEveningDialogue(currentDay);
        // Show completion or go to next day
      }
    } else {
      setCurrentDialogueIndex(prev => prev + 1);
    }
  };

  const handleGoToStudy = () => {
    // 检查是否有需要复习的单词
    if (hasWordsDueForReview()) {
      // 有需要复习的单词，先跳转到复习页面
      navigate('/review');
    } else {
      // 没有需要复习的单词，直接进入学习页面
      navigate('/study');
    }
  };

  const handleNextDay = () => {
    goToNextDay();
    setCurrentDialogueIndex(0);
  };

  const getSpeakerName = (speaker: string) => {
    switch (speaker) {
      case 'lexicon':
        return 'Lexicon';
      case 'user':
        return '你';
      case 'narrator':
        return '旁白';
      default:
        return '未知';
    }
  };

  const getSpeakerColor = (speaker: string) => {
    switch (speaker) {
      case 'lexicon':
        return 'text-lexicon-gold-400';
      case 'user':
        return 'text-star-purple-400';
      case 'narrator':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  // If day is completed
  if (currentScene === 'completed') {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center max-w-md"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">第{currentDay}天完成！</h2>
          <p className="text-gray-400 mb-6">你已经完成了今天的所有任务，准备好迎接新的一天了吗？</p>
          <button
            onClick={handleNextDay}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl text-white font-medium hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all"
          >
            <span>进入第{currentDay + 1}天</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  // If need to study
  if (currentScene === 'study') {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-star-purple-500 to-lexicon-gold-500 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">学习时间到了</h2>
          <p className="text-gray-400 mb-6">今天你需要认识10个新的单词居民，准备好了吗？</p>
          <button
            onClick={handleGoToStudy}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl text-white font-medium hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all"
          >
            <span>开始学习</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
 }

  // Dialogue scene
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/image/星球1.png"
          alt="单词星"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            {currentScene === 'morning' ? (
              <>
                <span className="text-2xl">☀️</span>
                <span className="text-lg text-lexicon-gold-400">清晨</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-star-purple-400" />
                <span className="text-lg text-star-purple-400">夜晚</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gradient">第{currentDay}天</h1>
        </motion.div>

        {/* Dialogue Box */}
        {currentDialogue && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDialogueIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-2xl p-6 max-w-4xl mx-auto w-full"
            >
              {/* Speaker */}
              <div className="flex items-center space-x-3 mb-4">
                {currentDialogue.speaker === 'lexicon' && (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-lexicon-gold-500">
                    <img
                      src="/image/Lexicom.png"
                      alt="Lexicon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {currentDialogue.speaker === 'user' && (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-star-purple-500">
                    <img
                      src="/image/用户1.png"
                      alt="用户"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {currentDialogue.speaker === 'narrator' && (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-400">
                    <img
                      src="/image/旁白.png"
                      alt="旁白"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <div className={`font-semibold ${getSpeakerColor(currentDialogue.speaker)}`}>
                    {getSpeakerName(currentDialogue.speaker)}
                  </div>
                  {currentDialogue.emotion && (
                    <div className="text-2xl">{currentDialogue.emotion}</div>
                  )}
                </div>
              </div>

              {/* Text */}
              <div className="text-lg text-white leading-relaxed mb-6">
                <Typewriter 
                  text={currentDialogue.text} 
                  speed={30}
                  onComplete={() => setIsTypingComplete(true)}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!isTypingComplete}
                  className={`group flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${isTypingComplete ? 'bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 hover:from-star-purple-500 hover:to-lexicon-gold-500 cursor-pointer' : 'bg-gray-600/50 cursor-not-allowed'}`}
                >
                  <span className="text-white font-medium">
                    {isLastDialogue ? (currentScene === 'morning' ? '去学习' : '完成今天') : '继续'}
                  </span>
                  {isTypingComplete ? (
                    <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Progress */}
        <div className="flex justify-center space-x-2 mt-6">
          {dialogues.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentDialogueIndex
                  ? 'bg-lexicon-gold-400 w-6'
                  : index < currentDialogueIndex
                  ? 'bg-star-purple-400'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
