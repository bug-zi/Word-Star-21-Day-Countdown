import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Play, Pause, SkipForward, SkipBack, Music, Languages, Disc3 } from 'lucide-react';

interface LyricLine {
  en: string;
  cn: string;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  coverUrl: string;
  duration: string;
  lyrics: LyricLine[];
  keywords: { word: string; meaning: string }[];
}

export default function MusicPage() {
  const navigate = useNavigate();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [showLyricsId, setShowLyricsId] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});
  const [progress, setProgress] = useState<Record<number, number>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const songs: Song[] = [
    {
      id: 1,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      album: '÷ (Divide)',
      year: 2017,
      coverUrl: '',
      duration: '3:53',
      lyrics: [
        { en: "The club isn't the best place to find a lover", cn: "俱乐部不是找恋人的最好地方" },
        { en: "So the bar is where I go", cn: "所以酒吧是我去的地方" },
        { en: "Me and my friends at the table doing shots", cn: "我和朋友们在桌边一杯杯喝" },
        { en: "Drinking fast and then we talk slow", cn: "喝得很快然后我们慢慢聊" },
        { en: "Come over and start up a conversation with just me", cn: "走过来开始只和我一个人聊天" },
        { en: "And trust me I'll give it a chance now", cn: "相信我，我现在就给个机会" },
        { en: "Take my hand, stop, put Van the Man on the jukebox", cn: "牵我的手，停下，在点唱机上放Van Morrison的歌" },
        { en: "And then we start to dance", cn: "然后我们开始跳舞" },
        { en: "And now I'm singing like", cn: "现在我唱着" },
        { en: "Girl, you know I want your love", cn: "女孩，你知道我想要你的爱" },
        { en: "Your love was handmade for somebody like me", cn: "你的爱是为像我这样的人量身定做的" },
        { en: "I'm in love with the shape of you", cn: "我爱上了你的模样" },
      ],
      keywords: [
        { word: 'lover', meaning: '恋人' },
        { word: 'jukebox', meaning: '点唱机' },
        { word: 'handmade', meaning: '手工制作的' },
        { word: 'conversation', meaning: '对话' },
      ]
    },
    {
      id: 2,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      year: 2020,
      coverUrl: '',
      duration: '3:20',
      lyrics: [
        { en: "I've been tryna call", cn: "我一直在试着打电话" },
        { en: "I've been on my own for long enough", cn: "我已经独自一个人够久了" },
        { en: "Maybe you can show me how to love, maybe", cn: "也许你可以教我如何去爱，也许" },
        { en: "I'm going through withdrawals", cn: "我正在经历戒断反应" },
        { en: "You don't even have to do too much", cn: "你甚至不需要做太多" },
        { en: "You can turn me on with just a touch, baby", cn: "你只需一个触碰就能让我心动，宝贝" },
        { en: "I look around and Sin City's cold and empty", cn: "我环顾四周，罪恶之城冰冷空虚" },
        { en: "No one's around to judge me", cn: "周围没有人评判我" },
        { en: "I can't see clearly when you're gone", cn: "你离开后我什么都看不清" },
        { en: "I said, ooh, I'm blinded by the lights", cn: "我说，哦，我被灯光闪耀了双眼" },
        { en: "No, I can't sleep until I feel your touch", cn: "不，直到感受到你的触碰我才能入睡" },
      ],
      keywords: [
        { word: 'withdrawals', meaning: '戒断反应' },
        { word: 'blinded', meaning: '被晃花眼' },
        { word: 'judge', meaning: '评判' },
        { word: 'clearly', meaning: '清楚地' },
      ]
    },
    {
      id: 3,
      title: 'Dance Monkey',
      artist: 'Tones and I',
      album: 'The Kids Are Coming',
      year: 2019,
      coverUrl: '',
      duration: '3:29',
      lyrics: [
        { en: "They say oh my god I see the way you shine", cn: "他们说天哪，我看到你闪耀的样子" },
        { en: "Take your hand, my dear, and place them both in mine", cn: "亲爱的，把你的双手放在我手中" },
        { en: "You know you stopped me dead while I was passing by", cn: "你知道我路过时你让我惊艳得停下了脚步" },
        { en: "And now I beg to see you dance just one more time", cn: "现在我恳求看你再跳一次舞" },
        { en: "Ooh I see you, see you, see you every time", cn: "哦，我每次都能看到你，看到你" },
        { en: "And oh my, I, I like your style", cn: "天哪，我，我喜欢你的风格" },
        { en: "You, you make me, make me, make me wanna cry", cn: "你，你让我，让我想要哭" },
        { en: "And now I beg to see you dance just one more time", cn: "现在我恳求看你再跳一次舞" },
        { en: "So they say, dance for me, dance for me, dance for me, oh", cn: "所以他们说，为我跳舞吧，为我跳舞" },
        { en: "I've never seen anybody do the things you do before", cn: "我从未见过任何人做你做的事" },
      ],
      keywords: [
        { word: 'shine', meaning: '闪耀' },
        { word: 'beg', meaning: '恳求' },
        { word: 'style', meaning: '风格' },
        { word: 'passing by', meaning: '路过' },
      ]
    }
  ];

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying && playingId !== null) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          const current = prev[playingId] ?? 0;
          if (current >= 100) {
            setIsPlaying(false);
            setPlayingId(null);
            return prev;
          }
          return { ...prev, [playingId]: current + 0.5 };
        });
      }, 500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playingId]);

  const handlePlay = (id: number) => {
    if (playingId === id && isPlaying) {
      setIsPlaying(false);
    } else {
      setPlayingId(id);
      setIsPlaying(true);
      setShowLyricsId(id);
    }
  };

  const handlePrev = () => {
    if (playingId === null) return;
    const idx = songs.findIndex(s => s.id === playingId);
    const prevIdx = idx > 0 ? idx - 1 : songs.length - 1;
    setPlayingId(songs[prevIdx].id);
    setShowLyricsId(songs[prevIdx].id);
    setIsPlaying(true);
    setProgress(prev => ({ ...prev, [songs[prevIdx].id]: 0 }));
  };

  const handleNext = () => {
    if (playingId === null) return;
    const idx = songs.findIndex(s => s.id === playingId);
    const nextIdx = idx < songs.length - 1 ? idx + 1 : 0;
    setPlayingId(songs[nextIdx].id);
    setShowLyricsId(songs[nextIdx].id);
    setIsPlaying(true);
    setProgress(prev => ({ ...prev, [songs[nextIdx].id]: 0 }));
  };

  const currentSong = songs.find(s => s.id === playingId);
  const currentProgress = playingId !== null ? (progress[playingId] ?? 0) : 0;
  const currentLyricIndex = currentSong
    ? Math.min(Math.floor(currentProgress / 100 * currentSong.lyrics.length), currentSong.lyrics.length - 1)
    : 0;

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
        <p className="text-gray-400">英文歌曲推荐 · 点击播放</p>
      </div>

      {/* Now Playing Bar */}
      <AnimatePresence>
        {currentSong && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-4xl mx-auto px-4 mb-6"
          >
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Disc3 className={`w-8 h-8 text-white ${isPlaying ? 'animate-spin' : ''}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold truncate">{currentSong.title}</h4>
                  <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
                  {/* Progress Bar */}
                  <div className="mt-2 relative h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${currentProgress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handlePrev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => handlePlay(currentSong.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Song List */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {songs.map((song) => {
            const isCurrentPlaying = playingId === song.id;
            const showLyrics = showLyricsId === song.id;

            return (
              <motion.div
                key={song.id}
                layout
                className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                  isCurrentPlaying ? 'ring-1 ring-purple-500/30' : ''
                }`}
              >
                {/* Song Card */}
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Album Art / Play Button */}
                    <motion.button
                      onClick={() => handlePlay(song.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isCurrentPlaying
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {isCurrentPlaying && isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      )}
                    </motion.button>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-bold truncate ${isCurrentPlaying ? 'text-purple-300' : 'text-white'}`}>
                        {song.title}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">{song.artist} · {song.album}</p>
                    </div>

                    {/* Duration & Year */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-400 text-sm">{song.duration}</p>
                      <p className="text-gray-500 text-xs">{song.year}</p>
                    </div>

                    {/* Lyrics Toggle */}
                    <motion.button
                      onClick={() => setShowLyricsId(prev => prev === song.id ? null : song.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 rounded-xl text-sm transition-all duration-300 flex-shrink-0 ${
                        showLyrics
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Music className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Lyrics Panel */}
                <AnimatePresence>
                  {showLyrics && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-white/5 pt-4">
                        {/* Translation Toggle */}
                        <div className="flex justify-end mb-4">
                          <motion.button
                            onClick={() => setShowTranslation(prev => ({ ...prev, [song.id]: !prev[song.id] }))}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                              showTranslation[song.id]
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <Languages className="w-4 h-4" />
                            {showTranslation[song.id] ? 'English' : '中文翻译'}
                          </motion.button>
                        </div>

                        {/* Lyrics */}
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                          {song.lyrics.map((line, i) => {
                            const isActive = isCurrentPlaying && i === currentLyricIndex;
                            return (
                              <motion.p
                                key={i}
                                className={`text-sm leading-relaxed transition-all duration-300 ${
                                  isActive
                                    ? 'text-purple-300 font-bold text-base'
                                    : isCurrentPlaying && i < currentLyricIndex
                                    ? 'text-gray-500'
                                    : 'text-gray-300'
                                }`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }}
                              >
                                {showTranslation[song.id] ? line.cn : line.en}
                              </motion.p>
                            );
                          })}
                        </div>

                        {/* Keywords */}
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                            <Music className="w-4 h-4 text-purple-400" />
                            歌词核心词汇
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {song.keywords.map((kw) => (
                              <div key={kw.word} className="group relative">
                                <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 text-sm border border-purple-500/20 cursor-default">
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
