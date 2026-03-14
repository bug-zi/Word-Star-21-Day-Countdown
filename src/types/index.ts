export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  streakDays: number;
  totalWordsLearned: number;
}

export interface Word {
  id: string;
  word: string;
  meaning: string;
  pronunciation: string;
  example: string;
  level: 'easy' | 'medium' | 'hard';
  day: number;
  isSpecial?: boolean;
  characterName?: string;
}

export interface WordProgress {
  wordId: string;
  status: 'new' | 'learning' | 'reviewing' | 'mastered';
  familiarity: number;
  lastReviewed: string;
  nextReview: string;
  reviewCount: number;
}

export interface DayProgress {
  day: number;
  isCompleted: boolean;
  wordsLearned: number;
  totalWords: number;
  morningDialogueCompleted: boolean;
  eveningDialogueCompleted: boolean;
  studyCompleted: boolean;
}

export interface GameState {
  currentDay: number;
  totalDays: number;
  isPrologueCompleted: boolean;
  daysProgress: DayProgress[];
  wordsProgress: WordProgress[];
  currentScene: 'prologue' | 'morning' | 'study' | 'evening' | 'completed';
}

export interface DialogueLine {
  id: string;
  speaker: 'lexicon' | 'user' | 'narrator' | 'word';
  text: string;
  emotion?: string;
  wordId?: string;
  choices?: DialogueChoice[];
}

export interface DialogueChoice {
  id: string;
  text: string;
  nextDialogueId: string;
  effect?: {
    type: 'affection' | 'knowledge' | 'morale';
    value: number;
  };
}

export interface StoryScene {
  id: string;
  day: number;
  time: 'morning' | 'evening';
  title: string;
  dialogues: DialogueLine[];
  backgroundImage?: string;
  requiredWords?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface ReviewItem {
  wordId: string;
  word: string;
  meaning: string;
  daysSinceLastReview: number;
  familiarity: number;
  isDue: boolean;
}
