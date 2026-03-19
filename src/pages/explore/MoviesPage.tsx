import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function MoviesPage() {
  const navigate = useNavigate();

  // 模拟数据
  const movies = [
    {
      id: 1,
      title: 'Friends',
      type: 'TV Series',
      seasons: 10,
      year: 1994
    },
    {
      id: 2,
      title: 'The Office',
      type: 'TV Series',
      seasons: 9,
      year: 2005
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      type: 'Movie',
      year: 2005
    }
  ];

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
          影视星
        </motion.h1>
        <p className="text-gray-400">美剧英剧推荐</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
              <p className="text-gray-400 mb-2">类型: {movie.type}</p>
              {movie.seasons && <p className="text-gray-400 mb-2">季数: {movie.seasons}</p>}
              <p className="text-gray-500 text-sm">{movie.year}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
