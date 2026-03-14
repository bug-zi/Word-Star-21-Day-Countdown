import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { prologueDialogues } from '@/data/story';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function ProloguePage() {
  const navigate = useNavigate();
  const { completePrologue } = useGameStore();
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const currentDialogue = prologueDialogues[currentDialogueIndex];
  const isLastDialogue = currentDialogueIndex === prologueDialogues.length - 1;

  const handleNext = () => {
    if (isLastDialogue) {
      completePrologue();
      navigate('/');
    } else {
      setCurrentDialogueIndex(prev => prev + 1);
    }
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
          <h1 className="text-3xl font-bold text-gradient mb-2">序幕：星际航行日志</h1>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span>第 {currentDialogueIndex + 1}</span>
            <span>/</span>
            <span>{prologueDialogues.length}</span>
          </div>
        </motion.div>

        {/* Dialogue Box */}
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
                    src="/image/Lexicom1.png"
                    alt="Lexicon"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {currentDialogue.speaker === 'user' && (
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-star-purple-500">
                  <img
                    src="/image/用户1.jpg"
                    alt="用户"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {currentDialogue.speaker === 'narrator' && (
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-gray-400" />
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
              {currentDialogue.text}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-star-purple-600 to-lexicon-gold-600 rounded-xl hover:from-star-purple-500 hover:to-lexicon-gold-500 transition-all duration-300"
              >
                <span className="text-white font-medium">
                  {isLastDialogue ? '开始冒险' : '继续'}
                </span>
                <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {prologueDialogues.map((_, index) => (
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
