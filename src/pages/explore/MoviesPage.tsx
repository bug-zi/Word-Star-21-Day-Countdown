import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Film, Star, Quote, Languages, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

interface QuoteLine {
  en: string;
  cn: string;
  speaker?: string;
}

interface MovieItem {
  id: number;
  title: string;
  titleCn: string;
  type: 'TV Series' | 'Movie';
  seasons?: number;
  year: number;
  rating: number;
  genre: string[];
  description: string;
  descriptionCn: string;
  whyWatch: string;
  whyWatchCn: string;
  classicQuotes: QuoteLine[];
  keywords: { word: string; meaning: string }[];
}

export default function MoviesPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});
  const [quotesTranslation, setQuotesTranslation] = useState<Record<number, boolean>>({});

  const movies: MovieItem[] = [
    {
      id: 1,
      title: 'Friends',
      titleCn: '老友记',
      type: 'TV Series',
      seasons: 10,
      year: 1994,
      rating: 9.0,
      genre: ['Comedy', 'Romance'],
      description: 'Follows the personal and professional lives of six twenty to thirty year-old friends living in the Manhattan area. A quintessential American sitcom that shaped a generation of comedy.',
      descriptionCn: '讲述了住在曼哈顿的六个二十到三十岁朋友的个人和职业生活。一部塑造了一代人喜剧观的经典美国情景喜剧。',
      whyWatch: 'Perfect for English learners! The dialogue is natural, everyday English. The humor relies on wordplay and cultural references that help you understand American culture deeply.',
      whyWatchCn: '非常适合英语学习者！对话是自然的日常英语。幽默依赖于双关语和文化典故，帮助你深入理解美国文化。',
      classicQuotes: [
        { en: "We were on a break!", cn: "我们当时在分手期！", speaker: "Ross" },
        { en: "How you doin'?", cn: "你好吗？", speaker: "Joey" },
        { en: "Oh. My. God!", cn: "哦。我的。天！", speaker: "Janice" },
        { en: "Pivot! Pivot! PIVOT!", cn: "转！转！转！", speaker: "Ross" },
        { en: "Could I BE wearing any more clothes?", cn: "我还能穿更多衣服吗？", speaker: "Chandler" },
        { en: "Welcome to the real world. It sucks. You're gonna love it!", cn: "欢迎来到真实世界。它很糟糕。你会喜欢的！", speaker: "Monica" },
      ],
      keywords: [
        { word: 'quintessential', meaning: '典型的' },
        { word: 'wordplay', meaning: '双关语' },
        { word: 'pivot', meaning: '旋转/转' },
        { word: 'suck', meaning: '糟糕' },
      ]
    },
    {
      id: 2,
      title: 'The Office',
      titleCn: '办公室',
      type: 'TV Series',
      seasons: 9,
      year: 2005,
      rating: 8.9,
      genre: ['Comedy', 'Mockumentary'],
      description: 'A mockumentary on a group of typical office workers, where the weights of the manager\'s ego and the office\'s problems are on the same scale. Hilarious workplace comedy at its finest.',
      descriptionCn: '一部关于一群典型办公室职员的伪纪录片，经理的自负和办公室的问题同样重要。最精彩的职场喜剧。',
      whyWatch: 'Excellent for learning workplace English, corporate vocabulary, and American humor. The mockumentary style uses lots of "talking head" interviews perfect for studying expressions.',
      whyWatchCn: '非常适合学习职场英语、企业词汇和美式幽默。伪纪录片风格使用大量"采访"镜头，非常适合学习表达方式。',
      classicQuotes: [
        { en: "That\'s what she said.", cn: "她就是这么说的。", speaker: "Michael" },
        { en: "I\'m not superstitious, but I am a little stitious.", cn: "我不迷信，但我有一点迷信。", speaker: "Michael" },
        { en: "Sometimes I\'ll start a sentence and I don\'t even know where it\'s going.", cn: "有时我开始一句话，甚至不知道它要说到哪里。", speaker: "Michael" },
        { en: "I knew exactly what to do. But in a much more real sense, I had no idea what to do.", cn: "我完全知道该怎么做。但从更现实的角度来说，我完全不知道该怎么做。", speaker: "Michael" },
        { en: "Bears. Beets. Battlestar Galactica.", cn: "熊。甜菜。太空堡垒卡拉狄加。", speaker: "Jim (as Dwight)" },
      ],
      keywords: [
        { word: 'mockumentary', meaning: '伪纪录片' },
        { word: 'superstitious', meaning: '迷信的' },
        { word: 'corporate', meaning: '企业的' },
        { word: 'ego', meaning: '自负' },
      ]
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      titleCn: '傲慢与偏见',
      type: 'Movie',
      year: 2005,
      rating: 8.6,
      genre: ['Drama', 'Romance'],
      description: 'Elizabeth Bennet, a spirited and intelligent young woman, navigates the social pressures of early 19th century England while dealing with her growing feelings for the seemingly aloof Mr. Darcy.',
      descriptionCn: '伊丽莎白·班纳特，一个聪明活泼的年轻女子，在应对对看似冷漠的达西先生日益增长的感情的同时，在19世纪初英国的社交压力中周旋。',
      whyWatch: 'Beautiful British English with elegant expressions. Great for learning formal English, literary vocabulary, and the art of witty conversation.',
      whyWatchCn: '优美的英式英语，优雅的表达。非常适合学习正式英语、文学词汇和机智对话的艺术。',
      classicQuotes: [
        { en: "A lady\'s imagination is very rapid; it jumps from admiration to love, from love to matrimony in a moment.", cn: "女士的想象力非常迅速；它从欣赏跳到爱情，从爱情跳到婚姻，只需要一瞬间。", speaker: "Mr. Darcy" },
        { en: "I could easily forgive his pride, if he had not mortified mine.", cn: "如果他没有挫伤我的自尊，我可以很容易地原谅他的骄傲。", speaker: "Elizabeth" },
        { en: "Vanity and pride are different things, though the words are often used synonymously.", cn: "虚荣和骄傲是不同的东西，虽然这两个词经常被混用。", speaker: "Mary" },
        { en: "My good opinion once lost, is lost forever.", cn: "我的好感一旦失去，就永远失去了。", speaker: "Mr. Darcy" },
      ],
      keywords: [
        { word: 'spirited', meaning: '活泼的' },
        { word: 'matrimony', meaning: '婚姻' },
        { word: 'mortified', meaning: '受挫的' },
        { word: 'synonymously', meaning: '同义地' },
      ]
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
  };

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
        <p className="text-gray-400">美剧英剧推荐 · 经典台词学习</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {movies.map((movie) => {
            const isExpanded = expandedId === movie.id;
            const isTranslated = showTranslation[movie.id] ?? false;
            const isQuotesTranslated = quotesTranslation[movie.id] ?? false;

            return (
              <motion.div
                key={movie.id}
                layout
                className="glass rounded-2xl overflow-hidden"
              >
                {/* Card Header */}
                <motion.div
                  onClick={() => toggleExpand(movie.id)}
                  className="p-6 cursor-pointer"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Film className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <h3 className="text-xl font-bold text-white">
                          {isTranslated ? movie.titleCn : movie.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-lg text-xs font-medium bg-blue-400/10 text-blue-400">
                          {movie.type}
                        </span>
                        {movie.seasons && (
                          <span className="text-sm text-gray-500">{movie.seasons} 季</span>
                        )}
                      </div>

                      {!isExpanded && (
                        <>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {isTranslated ? movie.descriptionCn : movie.description}
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-yellow-400 text-sm font-medium">{movie.rating}</span>
                            </div>
                            <div className="flex gap-1.5">
                              {movie.genre.map(g => (
                                <span key={g} className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-gray-400 border border-white/10">
                                  {g}
                                </span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Quick Translation Toggle */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTranslation(prev => ({ ...prev, [movie.id]: !prev[movie.id] }));
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          isTranslated
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <Languages className="w-4 h-4" />
                      </motion.button>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/5 pt-4 space-y-6">
                        {/* Description */}
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-yellow-400 text-sm font-medium">{movie.rating}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{movie.year}</span>
                            <div className="flex gap-1.5">
                              {movie.genre.map(g => (
                                <span key={g} className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-gray-400 border border-white/10">
                                  {g}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            {isTranslated ? movie.descriptionCn : movie.description}
                          </p>
                        </div>

                        {/* Why Watch */}
                        <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">
                          <h4 className="text-blue-300 font-medium text-sm mb-2 flex items-center gap-2">
                            <Film className="w-4 h-4" />
                            {isTranslated ? '为什么推荐看' : 'Why You Should Watch'}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {isTranslated ? movie.whyWatchCn : movie.whyWatch}
                          </p>
                        </div>

                        {/* Classic Quotes */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-medium flex items-center gap-2">
                              <Quote className="w-4 h-4 text-lexicon-gold-400" />
                              {isTranslated ? '经典台词' : 'Classic Quotes'}
                            </h4>
                            <motion.button
                              onClick={() => setQuotesTranslation(prev => ({ ...prev, [movie.id]: !prev[movie.id] }))}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                                isQuotesTranslated
                                  ? 'bg-lexicon-gold-400/20 text-lexicon-gold-400 border border-lexicon-gold-400/30'
                                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                              }`}
                            >
                              <Languages className="w-3 h-3" />
                              {isQuotesTranslated ? 'English' : '中文'}
                            </motion.button>
                          </div>
                          <div className="space-y-3">
                            {movie.classicQuotes.map((quote, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex gap-3 items-start bg-white/[0.02] rounded-xl p-3 border border-white/5"
                              >
                                <MessageCircle className="w-4 h-4 text-lexicon-gold-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className={`text-sm leading-relaxed ${isQuotesTranslated ? 'text-gray-300' : 'text-white font-medium'}`}>
                                    "{isQuotesTranslated ? quote.cn : quote.en}"
                                  </p>
                                  {quote.speaker && (
                                    <p className="text-xs text-gray-500 mt-1">— {quote.speaker}</p>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Keywords */}
                        <div className="pt-4 border-t border-white/5">
                          <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                            <Film className="w-4 h-4 text-blue-400" />
                            核心词汇
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {movie.keywords.map((kw) => (
                              <div key={kw.word} className="group relative">
                                <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 text-sm border border-blue-500/20 cursor-default">
                                  {kw.word}
                                </span>
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-800 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                                  {kw.meaning}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
