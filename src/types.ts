export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed';

export type DifficultyLevel = 1 | 2 | 3 | 4;

export interface MathQuestion {
  id: string;
  operation: Operation;
  num1: number;
  num2: number;
  answer: number;
  symbol: string;
  options: number[];
  promptText: string;
  isWordProblem?: boolean;
  hint: string;
  explanation: string;
  visualGroup?: {
    itemsCount: number;
    groupsCount?: number;
    icon: string;
  };
  gridData?: {
    rows: number;
    cols: number;
    interactive?: boolean;
    rowLabel?: string;
    colLabel?: string;
    mode?: 'count_total' | 'find_operation' | 'combinations';
  };
}

export interface LevelInfo {
  id: number;
  worldId: 1 | 2 | 3 | 4 | 5;
  worldName: string;
  worldTheme: string;
  title: string;
  subtitle: string;
  operation: Operation;
  difficulty: DifficultyLevel;
  requiredStars: number;
  starsEarned: number; // 0 to 3
  completed: boolean;
  questionsTotal: number;
  specialMode?: 'grid_multiplication';
}

export interface Sticker {
  id: string;
  name: string;
  category: 'astronomia' | 'animais' | 'fantasia' | 'mestres';
  description: string;
  unlockCriteria: string;
  unlocked: boolean;
  emoji: string;
  bgColor: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface MascotAccessory {
  id: string;
  type: 'hat' | 'glasses' | 'badge';
  name: string;
  emoji: string;
  costStars: number;
  costCoins: number;
  unlocked: boolean;
  equipped: boolean;
}

export interface GameSettings {
  soundEnabled: boolean;
  timerMode: boolean; // false = zen mode (no pressure), true = with gentle timer
  inputMode: 'choices' | 'keypad';
}

export interface PlayerStats {
  playerName: string;
  stars: number;
  coins: number;
  currentStreak: number;
  bestStreak: number;
  totalAnswered: number;
  totalCorrect: number;
}
