import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ExplorePage() {
  const navigate = useNavigate();

  const tabs = [
    { id: 'articles', name: '文章星', image: '/image/文章星.png', path: '/explore/articles' },
    { id: 'music', name: '音乐星', image: '/image/音乐星.png', path: '/explore/music' },
    { id: 'movies', name: '影视星', image: '/image/影视星.png', path: '/explore/movies' },
    { id: 'community', name: '社交星', image: '/image/社交星.png', path: '/explore/community' },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-4 w-full">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gradient mb-2"
        >
          探索单词星
        </motion.h1>
        <p className="text-gray-400">发现更多英语学习资源</p>
      </div>

      {/* Planet Buttons - 2x2 Grid */}
      <div className="w-full flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-5xl">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              whileHover={{}}
              whileTap={{ scale: 0.99 }}
              className="rounded-2xl overflow-hidden border-2 transition-all duration-300 border-white/10"
            >
              <div className="relative aspect-video">
                <img
                  src={tab.image}
                  alt={tab.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">{tab.name}</h3>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
