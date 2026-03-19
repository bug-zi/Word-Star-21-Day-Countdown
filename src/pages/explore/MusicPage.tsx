import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function MusicPage() {
  const navigate = useNavigate();

  // 模拟数据
  const music = [
    {
      id: 1,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      album: '÷ (Divide)',
      year: 2017
    },
    {
      id: 2,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      year: 2020
    },
    {
      id: 3,
      title: 'Dance Monkey',
      artist: 'Tones and I',
      album: 'The Kids Are Coming',
      year: 2019
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
          音乐星
        </motion.h1>
        <p className="text-gray-400">英文歌曲推荐</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {music.map((song) => (
            <motion.div
              key={song.id}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-2">{song.title}</h3>
              <p className="text-gray-400 mb-2">艺术家: {song.artist}</p>
              <p className="text-gray-400 mb-2">专辑: {song.album}</p>
              <p className="text-gray-500 text-sm">{song.year}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
