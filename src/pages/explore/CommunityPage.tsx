import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Heart, MessageCircle, Send, Plus,
  Flame, TrendingUp, Clock, User
} from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  contentCn: string;
  time: string;
  likes: number;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  contentCn: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  isHot?: boolean;
}

type TabType = 'hot' | 'new' | 'my';

export default function CommunityPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('hot');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'EnglishExplorer',
      avatar: '🧑‍🚀',
      time: '2小时前',
      content: 'Just finished watching "Friends" Season 1! I learned so many useful expressions. My favorite: "How you doin\'?" 😄 Does anyone have recommendations for what to watch next?',
      contentCn: '刚看完《老友记》第一季！学到了很多实用的表达。我最喜欢的是："How you doin\'?" 😄 有什么推荐的下一部剧吗？',
      likes: 24,
      comments: [
        {
          id: 1, author: 'WordMaster', avatar: '📚',
          content: 'Try "The Office" next! The humor is a bit different but the vocabulary is great for workplace English.',
          contentCn: '试试《办公室》！幽默风格不太一样，但词汇对职场英语很有帮助。',
          time: '1小时前', likes: 8
        },
        {
          id: 2, author: 'StudyBuddy', avatar: '✨',
          content: 'I recommend keeping a notebook of new phrases while watching. It really helps with retention!',
          contentCn: '我建议看的时候记一本新短语笔记。对记忆真的很有帮助！',
          time: '45分钟前', likes: 5
        }
      ],
      tags: ['英语学习', '影视推荐', '日常英语'],
      isHot: true,
    },
    {
      id: 2,
      author: 'MusicLover',
      avatar: '🎵',
      time: '5小时前',
      content: 'I\'ve been listening to "Shape of You" on repeat while studying. Music really helps me remember vocabulary! The word "conversation" stuck with me after hearing it in context. What songs help you learn?',
      contentCn: '我学习时一直在循环听"Shape of You"。音乐真的帮我记住了词汇！"conversation"这个词在语境中听到后就记住了。什么歌帮助了你学习？',
      likes: 18,
      comments: [
        {
          id: 3, author: 'GrammarKing', avatar: '👑',
          content: 'Ed Sheeran\'s songs are great for learning! Clear pronunciation and everyday vocabulary.',
          contentCn: 'Ed Sheeran的歌很适合学习！发音清晰，词汇日常。',
          time: '3小时前', likes: 6
        }
      ],
      tags: ['音乐学习', '词汇记忆'],
    },
    {
      id: 3,
      author: 'DailyReader',
      avatar: '📖',
      time: '1天前',
      content: 'Day 15 of my 21-day challenge! Today I read an article about spaced repetition and it changed my whole approach to learning. Instead of cramming 50 words, I review 10 words at increasing intervals. Much more effective!',
      contentCn: '21天挑战的第15天！今天我读了一篇关于间隔重复的文章，改变了我的整个学习方法。我不再一次塞50个单词，而是以递增间隔复习10个单词。效果好多了！',
      likes: 42,
      comments: [
        {
          id: 4, author: 'NewbieLearner', avatar: '🌱',
          content: 'Can you explain more about spaced repetition? I\'m new to this method.',
          contentCn: '你能多解释一下间隔重复吗？我对这个方法还很陌生。',
          time: '20小时前', likes: 3
        },
        {
          id: 5, author: 'EnglishExplorer', avatar: '🧑‍🚀',
          content: 'Keep going! You\'re almost there! The last week is the hardest but most rewarding.',
          contentCn: '继续加油！你快到了！最后一周最难但也最有收获。',
          time: '18小时前', likes: 11
        },
        {
          id: 6, author: 'WordMaster', avatar: '📚',
          content: 'Spaced repetition is scientifically proven! I use it every day and my retention rate went from 30% to 80%.',
          contentCn: '间隔重复有科学依据！我每天用它，记忆率从30%提高到了80%。',
          time: '12小时前', likes: 15
        }
      ],
      tags: ['21天挑战', '学习方法', '间隔重复'],
      isHot: true,
    },
    {
      id: 4,
      author: 'VocabNinja',
      avatar: '🥷',
      time: '2天前',
      content: 'Today\'s word: "serendipity" — the occurrence of events by chance in a happy way. Example: "Finding this app was pure serendipity!" What\'s your favorite English word?',
      contentCn: '今天的单词："serendipity"——意外发现美好事物的运气。例句："找到这个app纯粹是serendipity！"你最喜欢的英语单词是什么？',
      likes: 31,
      comments: [
        {
          id: 7, author: 'PoetryFan', avatar: '🌸',
          content: 'Mine is "ephemeral" — lasting for a very short time. It sounds so beautiful.',
          contentCn: '我的是"ephemeral"——转瞬即逝的。听起来很美。',
          time: '1天前', likes: 9
        }
      ],
      tags: ['每日一词', '词汇分享'],
    }
  ]);

  const toggleLikePost = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, likes: p.likes + (likedPosts.has(id) ? -1 : 1) } : p
    ));
  };

  const toggleLikeComment = (id: number) => {
    setLikedComments(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        comments: [...p.comments, {
          id: Date.now(),
          author: '我',
          avatar: '😊',
          content: newComment,
          contentCn: newComment,
          time: '刚刚',
          likes: 0,
        }]
      };
    }));
    setNewComment('');
  };

  const handleNewPost = () => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: '我',
      avatar: '😊',
      time: '刚刚',
      content: newPostContent,
      contentCn: newPostContent,
      likes: 0,
      comments: [],
      tags: ['英语学习'],
    };
    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setShowNewPost(false);
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'hot', label: '热门', icon: <Flame className="w-4 h-4" /> },
    { id: 'new', label: '最新', icon: <Clock className="w-4 h-4" /> },
    { id: 'my', label: '我的', icon: <User className="w-4 h-4" /> },
  ];

  const sortedPosts = activeTab === 'hot'
    ? [...posts].sort((a, b) => b.likes - a.likes)
    : activeTab === 'new'
    ? [...posts].sort((a, b) => b.id - a.id)
    : posts.filter(p => p.author === '我');

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
      <div className="text-center mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gradient mb-2"
        >
          社交星
        </motion.h1>
        <p className="text-gray-400">与英语学习者交流分享</p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Tab Bar + New Post Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-300 border border-orange-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => setShowNewPost(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            发帖
          </motion.button>
        </div>

        {/* New Post Modal */}
        <AnimatePresence>
          {showNewPost && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="glass rounded-2xl p-4">
                <textarea
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  placeholder="分享你的英语学习心得..."
                  className="w-full bg-transparent text-white placeholder-gray-500 resize-none outline-none min-h-[100px] text-sm leading-relaxed"
                />
                <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-white/5">
                  <motion.button
                    onClick={() => setShowNewPost(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl bg-white/5 text-gray-400 text-sm border border-white/10"
                  >
                    取消
                  </motion.button>
                  <motion.button
                    onClick={handleNewPost}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium"
                  >
                    <Send className="w-4 h-4" />
                    发布
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts */}
        <div className="space-y-4">
          {sortedPosts.map((post) => {
            const isLiked = likedPosts.has(post.id);
            const isExpanded = expandedPost === post.id;
            const isTranslated = showTranslation[post.id] ?? false;

            return (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="p-5">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{post.avatar}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">{post.author}</span>
                        {post.isHot && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-red-500/10 text-red-400 border border-red-500/20">
                            <TrendingUp className="w-3 h-3" />
                            热门
                          </span>
                        )}
                      </div>
                      <span className="text-gray-500 text-xs">{post.time}</span>
                    </div>
                    <motion.button
                      onClick={() => setShowTranslation(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-xl bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition-all"
                      title="切换翻译"
                    >
                      🌐
                    </motion.button>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-200 text-sm leading-relaxed mb-3">
                    {isTranslated ? post.contentCn : post.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                    <motion.button
                      onClick={() => toggleLikePost(post.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${
                        isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-400' : ''}`} />
                      {post.likes}
                    </motion.button>

                    <motion.button
                      onClick={() => setExpandedPost(prev => prev === post.id ? null : post.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {post.comments.length}
                    </motion.button>
                  </div>
                </div>

                {/* Comments Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 border-t border-white/5 pt-3">
                        {/* Comments List */}
                        <div className="space-y-3 mb-4">
                          {post.comments.map(comment => {
                            const isCommentLiked = likedComments.has(comment.id);
                            return (
                              <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-3 bg-white/[0.02] rounded-xl p-3"
                              >
                                <span className="text-lg">{comment.avatar}</span>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white text-xs font-medium">{comment.author}</span>
                                    <span className="text-gray-500 text-xs">{comment.time}</span>
                                  </div>
                                  <p className="text-gray-300 text-sm leading-relaxed">
                                    {isTranslated ? comment.contentCn : comment.content}
                                  </p>
                                </div>
                                <motion.button
                                  onClick={() => toggleLikeComment(comment.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className={`flex items-center gap-1 text-xs transition-colors ${
                                    isCommentLiked ? 'text-red-400' : 'text-gray-500 hover:text-red-400'
                                  }`}
                                >
                                  <Heart className={`w-3 h-3 ${isCommentLiked ? 'fill-red-400' : ''}`} />
                                  {comment.likes + (isCommentLiked ? 1 : 0)}
                                </motion.button>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Comment Input */}
                        <div className="flex gap-2">
                          <input
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddComment(post.id)}
                            placeholder="写下你的评论..."
                            className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 outline-none border border-white/10 focus:border-orange-500/30 transition-colors"
                          />
                          <motion.button
                            onClick={() => handleAddComment(post.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                          >
                            <Send className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {sortedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">还没有帖子，快来发第一条吧！</p>
          </div>
        )}
      </div>
    </div>
  );
}
