import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function CommunityPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Back Button */}
      <div className="mb-6">
        <motion.button
          onClick={() => navigate('/explore')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>返回探索</span>
        </motion.button>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gradient mb-2"
        >
          社交星
        </motion.h1>
        <p className="text-gray-400">与其他英语学习者交流分享</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
            <img
              src="/image/社交星.png"
              alt="社交星"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">社交星</h3>
          <p className="text-gray-400">与其他英语学习者交流分享</p>
        </motion.div>
      </div>
    </div>
  );
}
