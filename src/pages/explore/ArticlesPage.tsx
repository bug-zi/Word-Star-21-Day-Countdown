import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Languages, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  titleCn: string;
  content: string;
  contentCn: string;
  author: string;
  date: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  wordCount: number;
  keywords: { word: string; meaning: string }[];
}

export default function ArticlesPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});

  const articles: Article[] = [
    {
      id: 1,
      title: 'The Power of Reading',
      titleCn: '阅读的力量',
      content: `Reading is one of the most powerful tools we have for learning and personal growth. When we read, we enter a world of imagination and knowledge that stretches far beyond our daily experiences.

Through reading, we can travel to distant lands, meet fascinating characters, and explore ideas that challenge our thinking. Studies have shown that regular reading improves vocabulary, enhances critical thinking skills, and even increases empathy.

For English learners, reading is especially valuable. It exposes you to natural language patterns, idiomatic expressions, and cultural references that textbooks often miss. Whether you prefer novels, news articles, or poetry, every page you turn brings you closer to fluency.

The key is to find material that interests you. Don't force yourself through boring texts — choose topics that excite you. When you're engaged with the content, learning happens naturally and effortlessly.`,
      contentCn: `阅读是我们拥有的最强大的学习和个人成长工具之一。当我们阅读时，我们进入了一个想象力和知识的世界，远远超出了我们的日常经验。

通过阅读，我们可以前往遥远的国度，结识迷人的角色，探索挑战我们思维的观点。研究表明，定期阅读可以提高词汇量、增强批判性思维能力，甚至增加同理心。

对于英语学习者来说，阅读尤其有价值。它让你接触到教科书经常忽略的自然语言模式、惯用表达和文化参考。无论你喜欢小说、新闻文章还是诗歌，你翻过的每一页都会让你离流利更近一步。

关键是要找到让你感兴趣的材料。不要强迫自己阅读无聊的文本——选择让你兴奋的话题。当你沉浸在内容中时，学习就会自然而不费力地发生。`,
      author: 'English Expert',
      date: '2026-03-15',
      difficulty: 'Easy',
      wordCount: 156,
      keywords: [
        { word: 'empathy', meaning: '同理心' },
        { word: 'fluency', meaning: '流利' },
        { word: 'idiomatic', meaning: '惯用的' },
        { word: 'fascinating', meaning: '迷人的' },
      ]
    },
    {
      id: 2,
      title: 'How to Improve Vocabulary',
      titleCn: '如何提高词汇量',
      content: `Building a strong vocabulary is essential for effective communication in any language. Here are some proven strategies to expand your English vocabulary:

First, read widely and often. The more you read, the more words you encounter in context, which helps you understand their meanings and usage naturally. Keep a vocabulary journal where you write down new words along with example sentences.

Second, use spaced repetition systems (SRS) to review words at optimal intervals. This technique is based on scientific research showing that we remember information better when we review it just before we're about to forget it.

Third, practice using new words in your own sentences. Passive recognition is not enough — you need to actively produce the words to truly learn them. Try writing a daily journal or having conversations with language partners.

Finally, learn word roots, prefixes, and suffixes. Understanding these building blocks allows you to guess the meanings of unfamiliar words and remember them more easily.`,
      contentCn: `在任何语言中，建立强大的词汇量对于有效沟通都是至关重要的。以下是一些经过验证的扩大英语词汇量的策略：

首先，广泛而频繁地阅读。你读得越多，在语境中遇到的单词就越多，这有助于你自然地理解它们的含义和用法。保持一本词汇日记，写下新单词和例句。

其次，使用间隔重复系统（SRS）在最佳间隔复习单词。这项技术基于科学研究，表明我们在即将忘记信息之前复习时，记忆效果更好。

第三，练习在自己的句子中使用新单词。被动识别是不够的——你需要主动使用这些单词才能真正学会它们。尝试写每日日记或与语言伙伴对话。

最后，学习词根、前缀和后缀。理解这些构成要素可以让你猜测陌生单词的含义，并更容易记住它们。`,
      author: 'Language Teacher',
      date: '2026-03-10',
      difficulty: 'Medium',
      wordCount: 168,
      keywords: [
        { word: 'spaced repetition', meaning: '间隔重复' },
        { word: 'passive recognition', meaning: '被动识别' },
        { word: 'prefix', meaning: '前缀' },
        { word: 'suffix', meaning: '后缀' },
      ]
    },
    {
      id: 3,
      title: 'The Benefits of Learning English',
      titleCn: '学习英语的益处',
      content: `Learning English opens up a world of opportunities in education, career, and personal development. As the most widely spoken second language globally, English serves as a bridge connecting people from different cultures and backgrounds.

In the academic world, English is the primary language of scientific research and international publications. By mastering English, you gain access to a vast repository of knowledge and can participate in global academic discourse.

Professionally, English proficiency is often a key requirement for career advancement. Many multinational companies use English as their working language, and being fluent can significantly boost your employability and earning potential.

Beyond practical benefits, learning English enriches your life culturally. You can enjoy movies, music, and literature in their original language, appreciating nuances that translations often miss. It also enables you to form friendships with people from around the world, broadening your perspective and understanding of global issues.`,
      contentCn: `学习英语在教育、职业和个人发展方面开辟了一个充满机会的世界。作为全球使用最广泛的第二语言，英语是连接不同文化和背景人群的桥梁。

在学术领域，英语是科学研究和国际出版物的首要语言。掌握英语，你就能获取庞大的知识库，并参与全球学术讨论。

在职业方面，英语能力通常是职业发展的关键要求。许多跨国公司将英语作为工作语言，流利的英语可以显著提高你的就业能力和收入潜力。

除了实际好处，学习英语在文化上也丰富了你的生活。你可以欣赏原版的电影、音乐和文学，体会翻译中经常遗漏的微妙之处。它还使你能够与来自世界各地的人建立友谊，拓宽你对全球问题的视野和理解。`,
      author: 'Study Abroad Advisor',
      date: '2026-03-05',
      difficulty: 'Medium',
      wordCount: 164,
      keywords: [
        { word: 'proficiency', meaning: '熟练度' },
        { word: 'repository', meaning: '知识库' },
        { word: 'employability', meaning: '就业能力' },
        { word: 'nuances', meaning: '微妙之处' },
      ]
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
    setShowTranslation(prev => ({ ...prev, [id]: false }));
  };

  const toggleTranslation = (id: number) => {
    setShowTranslation(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const difficultyColor = (d: string) => {
    switch (d) {
      case 'Easy': return 'text-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'Hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
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
          文章星
        </motion.h1>
        <p className="text-gray-400">精选英语文章 · 点击阅读全文</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {articles.map((article) => {
            const isExpanded = expandedId === article.id;
            const isTranslated = showTranslation[article.id] ?? false;

            return (
              <motion.div
                key={article.id}
                layout
                className="glass rounded-2xl overflow-hidden"
              >
                {/* Card Header - always visible */}
                <motion.div
                  onClick={() => toggleExpand(article.id)}
                  className="p-6 cursor-pointer"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-lexicon-gold-400 flex-shrink-0" />
                        <h3 className="text-xl font-bold text-white">{isTranslated ? article.titleCn : article.title}</h3>
                      </div>
                      {!isExpanded && (
                        <p className="text-gray-400 line-clamp-2">
                          {isTranslated ? article.contentCn.slice(0, 80) + '...' : article.content.slice(0, 80) + '...'}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${difficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {!isExpanded && (
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {article.wordCount} 词
                      </span>
                      <span>作者: {article.author}</span>
                      <span>{article.date}</span>
                    </div>
                  )}
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
                      <div className="px-6 pb-6 border-t border-white/5 pt-4">
                        {/* Toggle Translation Button */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {article.wordCount} 词
                            </span>
                            <span>作者: {article.author}</span>
                            <span>{article.date}</span>
                          </div>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTranslation(article.id);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                              isTranslated
                                ? 'bg-lexicon-gold-400/20 text-lexicon-gold-400 border border-lexicon-gold-400/30'
                                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <Languages className="w-4 h-4" />
                            {isTranslated ? 'English' : '中文翻译'}
                          </motion.button>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-invert max-w-none">
                          {(isTranslated ? article.contentCn : article.content).split('\n\n').map((paragraph, i) => (
                            <motion.p
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-gray-300 leading-relaxed mb-4 text-base"
                            >
                              {paragraph}
                            </motion.p>
                          ))}
                        </div>

                        {/* Keywords */}
                        <div className="mt-6 pt-4 border-t border-white/5">
                          <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-lexicon-gold-400" />
                            核心词汇
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {article.keywords.map((kw) => (
                              <div
                                key={kw.word}
                                className="group relative"
                              >
                                <span className="px-3 py-1.5 rounded-lg bg-lexicon-gold-400/10 text-lexicon-gold-400 text-sm border border-lexicon-gold-400/20 cursor-default">
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
