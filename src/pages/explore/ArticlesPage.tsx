import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft } from 'lucide-react';

export default function ArticlesPage() {
  const navigate = useNavigate();

  // 模拟数据
  const articles = [
    {
      id: 1,
      title: 'The Power of Reading',
      content: 'Reading is a fundamental skill that opens up a world of knowledge and imagination...',
      author: 'English Expert',
      date: '2026-03-15'
    },
    {
      id: 2,
      title: 'How to Improve Vocabulary',
      content: 'Building a strong vocabulary is essential for effective communication...',
      author: 'Language Teacher',
      date: '2026-03-10'
    },
    {
      id: 3,
      title: 'The Benefits of Learning English',
      content: 'Learning English can open up new opportunities in education and career...',
      author: 'Study Abroad Advisor',
      date: '2026-03-05'
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
          文章星
        </motion.h1>
        <p className="text-gray-400">精选英语文章</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {articles.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-5 h-5 text-lexicon-gold-400" />
                <h3 className="text-xl font-bold text-white">{article.title}</h3>
              </div>
              <p className="text-gray-400 mb-4 line-clamp-2">{article.content}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>作者: {article.author}</span>
                <span>{article.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
