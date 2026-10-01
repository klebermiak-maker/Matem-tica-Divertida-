import { Achievement, LevelInfo, MascotAccessory, PlayerStats, Sticker } from '../types';

export const INITIAL_LEVELS: LevelInfo[] = [
  // MUNDO 1: Vale da Adição
  {
    id: 1,
    worldId: 1,
    worldName: 'Vale da Adição',
    worldTheme: 'emerald',
    title: 'Somas Amigas',
    subtitle: 'Adições diretas até 30',
    operation: 'addition',
    difficulty: 1,
    requiredStars: 0,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },
  {
    id: 2,
    worldId: 1,
    worldName: 'Vale da Adição',
    worldTheme: 'emerald',
    title: 'O Salto das Dezenas',
    subtitle: 'Somas até 100 com reagrupamento',
    operation: 'addition',
    difficulty: 2,
    requiredStars: 2,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },
  {
    id: 3,
    worldId: 1,
    worldName: 'Vale da Adição',
    worldTheme: 'emerald',
    title: 'Reino dos Milhares',
    subtitle: 'Adição até a Unidade de Milhar (1.000 a 9.999)',
    operation: 'addition',
    difficulty: 4,
    requiredStars: 4,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },

  // MUNDO 2: Floresta da Subtração
  {
    id: 4,
    worldId: 2,
    worldName: 'Floresta da Subtração',
    worldTheme: 'amber',
    title: 'Trilha das Diferenças',
    subtitle: 'Subtrações diretas até 30',
    operation: 'subtraction',
    difficulty: 1,
    requiredStars: 6,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },
  {
    id: 5,
    worldId: 2,
    worldName: 'Floresta da Subtração',
    worldTheme: 'amber',
    title: 'Emprestando da Dezena',
    subtitle: 'Subtrações com recursos até 100',
    operation: 'subtraction',
    difficulty: 2,
    requiredStars: 9,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },
  {
    id: 6,
    worldId: 2,
    worldName: 'Floresta da Subtração',
    worldTheme: 'amber',
    title: 'O Enigma dos Milhares',
    subtitle: 'Subtração até a Unidade de Milhar (1.000 a 9.999)',
    operation: 'subtraction',
    difficulty: 4,
    requiredStars: 12,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },

  // MUNDO 3: Montanha da Multiplicação
  {
    id: 7,
    worldId: 3,
    worldName: 'Montanha da Multiplicação',
    worldTheme: 'blue',
    title: 'Passos Duplos e Quintuplos',
    subtitle: 'Tabuadas do 2, 5 e 10',
    operation: 'multiplication',
    difficulty: 1,
    requiredStars: 15,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },
  {
    id: 8,
    worldId: 3,
    worldName: 'Montanha da Multiplicação',
    worldTheme: 'blue',
    title: 'O Triplo e o Quádruplo',
    subtitle: 'Tabuadas do 3 e 4',
    operation: 'multiplication',
    difficulty: 2,
    requiredStars: 18,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },
  {
    id: 9,
    worldId: 3,
    worldName: 'Montanha da Multiplicação',
    worldTheme: 'blue',
    title: 'A Malha Quadriculada',
    subtitle: 'Princípio multiplicativo e disposição retangular',
    operation: 'multiplication',
    difficulty: 2,
    requiredStars: 21,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
    specialMode: 'grid_multiplication',
  },
  {
    id: 10,
    worldId: 3,
    worldName: 'Montanha da Multiplicação',
    worldTheme: 'blue',
    title: 'Escalada dos Mestres',
    subtitle: 'Tabuadas do 6, 7, 8 e 9 com problemas',
    operation: 'multiplication',
    difficulty: 3,
    requiredStars: 24,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },

  // MUNDO 4: Castelo da Divisão
  {
    id: 11,
    worldId: 4,
    worldName: 'Castelo da Divisão',
    worldTheme: 'purple',
    title: 'Partilha Amigável',
    subtitle: 'Divisões por 2, 5 e 10',
    operation: 'division',
    difficulty: 1,
    requiredStars: 27,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },
  {
    id: 12,
    worldId: 4,
    worldName: 'Castelo da Divisão',
    worldTheme: 'purple',
    title: 'Equipes Perfeitas',
    subtitle: 'Divisões por 3 e 4',
    operation: 'division',
    difficulty: 2,
    requiredStars: 30,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },
  {
    id: 13,
    worldId: 4,
    worldName: 'Castelo da Divisão',
    worldTheme: 'purple',
    title: 'Banquete dos Reis',
    subtitle: 'Divisões do 6 ao 9 e problemas de divisão',
    operation: 'division',
    difficulty: 4,
    requiredStars: 33,
    starsEarned: 0,
    completed: false,
    questionsTotal: 10,
  },

  // MUNDO 5: Ilha Lendária (Boss Rush)
  {
    id: 14,
    worldId: 5,
    worldName: 'Ilha dos Campeões',
    worldTheme: 'rose',
    title: 'Torneio das 4 Operações',
    subtitle: 'O grande teste final do 3º Ano!',
    operation: 'mixed',
    difficulty: 3,
    requiredStars: 36,
    starsEarned: 0,
    completed: false,
    questionsTotal: 12,
  },
];

export const INITIAL_STICKERS: Sticker[] = [
  {
    id: 'stk_1',
    name: 'Tico Astronauta',
    category: 'astronomia',
    description: 'Explorador das galáxias numéricas.',
    unlockCriteria: 'Complete a 1ª fase do jogo.',
    unlocked: false,
    emoji: '🚀',
    bgColor: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'stk_2',
    name: 'Dino Matemático',
    category: 'animais',
    description: 'Um dinossauro que ama somar pegadas!',
    unlockCriteria: 'Acerte 5 questões sem errar.',
    unlocked: false,
    emoji: '🦖',
    bgColor: 'from-emerald-400 to-green-600',
  },
  {
    id: 'stk_3',
    name: 'Mago da Tabuada',
    category: 'fantasia',
    description: 'Com sua varinha, multiplica a diversão!',
    unlockCriteria: 'Complete uma fase de multiplicação.',
    unlocked: false,
    emoji: '🧙‍♂️',
    bgColor: 'from-purple-400 to-indigo-700',
  },
  {
    id: 'stk_4',
    name: 'Coruja Sábia',
    category: 'animais',
    description: 'Conhece todos os segredos do 3º ano.',
    unlockCriteria: 'Conquiste 10 estrelas.',
    unlocked: false,
    emoji: '🦉',
    bgColor: 'from-amber-400 to-orange-600',
  },
  {
    id: 'stk_5',
    name: 'Golfinho Saltador',
    category: 'animais',
    description: 'Mergulha fundo nas subtrações.',
    unlockCriteria: 'Complete uma fase de subtração.',
    unlocked: false,
    emoji: '🐬',
    bgColor: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'stk_6',
    name: 'Dragão dos Números',
    category: 'fantasia',
    description: 'Guardião dos cálculos matemáticos.',
    unlockCriteria: 'Consiga uma sequência de 10 acertos.',
    unlocked: false,
    emoji: '🐉',
    bgColor: 'from-red-400 to-rose-600',
  },
  {
    id: 'stk_7',
    name: 'Robô Engenhoso',
    category: 'astronomia',
    description: 'Calcula mais rápido que um raio!',
    unlockCriteria: 'Conquiste 20 estrelas.',
    unlocked: false,
    emoji: '🤖',
    bgColor: 'from-teal-400 to-emerald-700',
  },
  {
    id: 'stk_8',
    name: 'Unicórnio Estelar',
    category: 'fantasia',
    description: 'Brilha como as quatro operações.',
    unlockCriteria: 'Complete a primeira fase de divisão.',
    unlocked: false,
    emoji: '🦄',
    bgColor: 'from-pink-400 to-purple-600',
  },
  {
    id: 'stk_9',
    name: 'Carro Veloz',
    category: 'astronomia',
    description: 'Acelera na velocidade dos cálculos!',
    unlockCriteria: 'Responda a 30 perguntas no total.',
    unlocked: false,
    emoji: '🏎️',
    bgColor: 'from-yellow-400 to-amber-600',
  },
  {
    id: 'stk_10',
    name: 'Leão Majestoso',
    category: 'animais',
    description: 'O rei dos problemas matemáticos.',
    unlockCriteria: 'Complete todas as fases da Adição e Subtração.',
    unlocked: false,
    emoji: '🦁',
    bgColor: 'from-orange-400 to-red-600',
  },
  {
    id: 'stk_11',
    name: 'Super Estrela',
    category: 'mestres',
    description: 'Brilho reservado aos dedicados.',
    unlockCriteria: 'Junte 30 estrelas douradas.',
    unlocked: false,
    emoji: '⭐',
    bgColor: 'from-amber-300 to-yellow-500',
  },
  {
    id: 'stk_12',
    name: 'Troféu do Campeão',
    category: 'mestres',
    description: 'Grande Mestre da Matemática do 3º Ano!',
    unlockCriteria: 'Vença a grande Ilha dos Campeões!',
    unlocked: false,
    emoji: '🏆',
    bgColor: 'from-yellow-400 via-amber-500 to-yellow-600',
  },
];

export const INITIAL_ACCESSORIES: MascotAccessory[] = [
  // Chapéus
  { id: 'acc_none_hat', type: 'hat', name: 'Sem Chapéu', emoji: '✖️', costStars: 0, costCoins: 0, unlocked: true, equipped: true },
  { id: 'acc_hat_cap', type: 'hat', name: 'Boné Descolado', emoji: '🧢', costStars: 0, costCoins: 10, unlocked: true, equipped: false },
  { id: 'acc_hat_party', type: 'hat', name: 'Chapéu Festivo', emoji: '🥳', costStars: 3, costCoins: 20, unlocked: false, equipped: false },
  { id: 'acc_hat_wizard', type: 'hat', name: 'Chapéu de Mago', emoji: '🧙', costStars: 8, costCoins: 35, unlocked: false, equipped: false },
  { id: 'acc_hat_crown', type: 'hat', name: 'Coroa Imperial', emoji: '👑', costStars: 15, costCoins: 50, unlocked: false, equipped: false },
  { id: 'acc_hat_helmet', type: 'hat', name: 'Capacete Espacial', emoji: '🪖', costStars: 22, costCoins: 60, unlocked: false, equipped: false },

  // Óculos
  { id: 'acc_none_glass', type: 'glasses', name: 'Sem Óculos', emoji: '✖️', costStars: 0, costCoins: 0, unlocked: true, equipped: true },
  { id: 'acc_glass_sun', type: 'glasses', name: 'Óculos de Sol', emoji: '🕶️', costStars: 2, costCoins: 15, unlocked: false, equipped: false },
  { id: 'acc_glass_nerd', type: 'glasses', name: 'Óculos de Cientista', emoji: '👓', costStars: 5, costCoins: 25, unlocked: false, equipped: false },
  { id: 'acc_glass_star', type: 'glasses', name: 'Óculos Estilosos', emoji: '🥽', costStars: 12, costCoins: 40, unlocked: false, equipped: false },

  // Distintivos
  { id: 'acc_none_badge', type: 'badge', name: 'Sem Medalha', emoji: '✖️', costStars: 0, costCoins: 0, unlocked: true, equipped: true },
  { id: 'acc_badge_star', type: 'badge', name: 'Estrela de Honra', emoji: '🌟', costStars: 4, costCoins: 15, unlocked: false, equipped: false },
  { id: 'acc_badge_heart', type: 'badge', name: 'Coração Campeão', emoji: '💖', costStars: 9, costCoins: 25, unlocked: false, equipped: false },
  { id: 'acc_badge_fire', type: 'badge', name: 'Em Chamas', emoji: '🔥', costStars: 16, costCoins: 45, unlocked: false, equipped: false },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_first_win', title: 'Primeiro Passo', description: 'Vença sua primeira fase na aventura', icon: '🌱', unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'ach_streak_5', title: 'Foco Total', description: 'Acerte 5 perguntas seguidas sem errar', icon: '⚡', unlocked: false, progress: 0, maxProgress: 5 },
  { id: 'ach_streak_10', title: 'Mente Brilhante', description: 'Acerte 10 perguntas seguidas sem errar', icon: '🧠', unlocked: false, progress: 0, maxProgress: 10 },
  { id: 'ach_addition_master', title: 'Mestre da Soma', description: 'Conclua as 3 fases do Vale da Adição', icon: '➕', unlocked: false, progress: 0, maxProgress: 3 },
  { id: 'ach_sub_master', title: 'Mestre da Diferença', description: 'Conclua as 3 fases da Subtração', icon: '➖', unlocked: false, progress: 0, maxProgress: 3 },
  { id: 'ach_mult_master', title: 'Rei da Tabuada', description: 'Conclua as 3 fases da Multiplicação', icon: '✖️', unlocked: false, progress: 0, maxProgress: 3 },
  { id: 'ach_div_master', title: 'Especialista em Partilha', description: 'Conclua as 3 fases da Divisão', icon: '➗', unlocked: false, progress: 0, maxProgress: 3 },
  { id: 'ach_sticker_collector', title: 'Colecionador Mirim', description: 'Colete pelo menos 6 figurinhas no álbum', icon: '📖', unlocked: false, progress: 0, maxProgress: 6 },
  { id: 'ach_grand_champion', title: 'Grande Campeão do 3º Ano', description: 'Vença a Ilha dos Campeões com 3 estrelas', icon: '🏆', unlocked: false, progress: 0, maxProgress: 1 },
];

export const INITIAL_STATS: PlayerStats = {
  playerName: 'Super Estudante',
  stars: 0,
  coins: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalAnswered: 0,
  totalCorrect: 0,
};

const STORAGE_KEY_LEVELS = 'mat_divertida_levels';
const STORAGE_KEY_STICKERS = 'mat_divertida_stickers';
const STORAGE_KEY_ACCESSORIES = 'mat_divertida_accessories';
const STORAGE_KEY_ACHIEVEMENTS = 'mat_divertida_achievements';
const STORAGE_KEY_STATS = 'mat_divertida_stats';

export function loadGameData() {
  try {
    const rawLevels = localStorage.getItem(STORAGE_KEY_LEVELS);
    const rawStickers = localStorage.getItem(STORAGE_KEY_STICKERS);
    const rawAccessories = localStorage.getItem(STORAGE_KEY_ACCESSORIES);
    const rawAchievements = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    const rawStats = localStorage.getItem(STORAGE_KEY_STATS);

    const savedLevels: LevelInfo[] = rawLevels ? JSON.parse(rawLevels) : [];
    const levels: LevelInfo[] = INITIAL_LEVELS.map((initLvl) => {
      const saved = savedLevels.find((l) => l.id === initLvl.id);
      if (saved) {
        return {
          ...initLvl,
          starsEarned: saved.starsEarned,
          completed: saved.completed,
        };
      }
      return initLvl;
    });

    const stickers: Sticker[] = rawStickers ? JSON.parse(rawStickers) : INITIAL_STICKERS;
    const accessories: MascotAccessory[] = rawAccessories ? JSON.parse(rawAccessories) : INITIAL_ACCESSORIES;
    const achievements: Achievement[] = rawAchievements ? JSON.parse(rawAchievements) : INITIAL_ACHIEVEMENTS;
    const stats: PlayerStats = rawStats ? JSON.parse(rawStats) : INITIAL_STATS;

    return { levels, stickers, accessories, achievements, stats };
  } catch (err) {
    console.error('Failed to load saved game data, using defaults', err);
    return {
      levels: INITIAL_LEVELS,
      stickers: INITIAL_STICKERS,
      accessories: INITIAL_ACCESSORIES,
      achievements: INITIAL_ACHIEVEMENTS,
      stats: INITIAL_STATS,
    };
  }
}

export function saveGameData(data: {
  levels: LevelInfo[];
  stickers: Sticker[];
  accessories: MascotAccessory[];
  achievements: Achievement[];
  stats: PlayerStats;
}) {
  try {
    localStorage.setItem(STORAGE_KEY_LEVELS, JSON.stringify(data.levels));
    localStorage.setItem(STORAGE_KEY_STICKERS, JSON.stringify(data.stickers));
    localStorage.setItem(STORAGE_KEY_ACCESSORIES, JSON.stringify(data.accessories));
    localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(data.achievements));
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(data.stats));
  } catch (err) {
    console.error('Failed to save game data', err);
  }
}

export function resetGameData() {
  localStorage.removeItem(STORAGE_KEY_LEVELS);
  localStorage.removeItem(STORAGE_KEY_STICKERS);
  localStorage.removeItem(STORAGE_KEY_ACCESSORIES);
  localStorage.removeItem(STORAGE_KEY_ACHIEVEMENTS);
  localStorage.removeItem(STORAGE_KEY_STATS);
  return {
    levels: INITIAL_LEVELS,
    stickers: INITIAL_STICKERS,
    accessories: INITIAL_ACCESSORIES,
    achievements: INITIAL_ACHIEVEMENTS,
    stats: INITIAL_STATS,
  };
}
