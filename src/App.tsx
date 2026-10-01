import React, { useState, useEffect } from 'react';
import {
  Achievement,
  DifficultyLevel,
  LevelInfo,
  MascotAccessory,
  Operation,
  PlayerStats,
  Sticker,
} from './types';
import { loadGameData, saveGameData, resetGameData } from './utils/gameData';
import { sounds } from './utils/audio';
import { Navbar, NavTab } from './components/Navbar';
import { AdventureMap } from './components/AdventureMap';
import { GameScreen } from './components/GameScreen';
import { StickerAlbum } from './components/StickerAlbum';
import { MascotWardrobe } from './components/MascotWardrobe';
import { FreePractice } from './components/FreePractice';
import { AchievementsView } from './components/AchievementsView';
import { CertificateModal } from './components/CertificateModal';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function App() {
  const [gameData, setGameData] = useState(() => loadGameData());
  const [currentTab, setCurrentTab] = useState<NavTab>('adventure');
  const [activeLevel, setActiveLevel] = useState<LevelInfo | null>(null);
  const [customMode, setCustomMode] = useState<{
    operation: Operation;
    difficulty: DifficultyLevel;
    questionsCount?: number;
    title: string;
    specialMode?: 'grid_multiplication';
  } | null>(null);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => !sounds.getIsMuted());
  const [showCertificate, setShowCertificate] = useState(false);

  // Sync state to local storage whenever gameData changes
  useEffect(() => {
    saveGameData(gameData);
  }, [gameData]);

  const handleToggleSound = () => {
    const isMuted = sounds.toggleMute();
    setSoundEnabled(!isMuted);
  };

  const handleFinishLevel = (
    stars: number,
    coins: number,
    correctCount: number,
    totalCount: number
  ) => {
    setGameData((prev) => {
      let updatedLevels = [...prev.levels];
      let newStarsEarned = 0;

      if (activeLevel) {
        updatedLevels = prev.levels.map((lvl) => {
          if (lvl.id === activeLevel.id) {
            const previousStars = lvl.starsEarned;
            const bestStars = Math.max(previousStars, stars);
            newStarsEarned = Math.max(0, bestStars - previousStars);
            return {
              ...lvl,
              starsEarned: bestStars,
              completed: true,
            };
          }
          return lvl;
        });
      }

      const totalStars = prev.stats.stars + newStarsEarned;
      const totalCoins = prev.stats.coins + coins;
      const totalAnswered = prev.stats.totalAnswered + totalCount;
      const totalCorrect = prev.stats.totalCorrect + correctCount;
      const currentStreak = correctCount === totalCount ? prev.stats.currentStreak + correctCount : 0;
      const bestStreak = Math.max(prev.stats.bestStreak, currentStreak);

      const newStats: PlayerStats = {
        ...prev.stats,
        stars: totalStars,
        coins: totalCoins,
        totalAnswered,
        totalCorrect,
        currentStreak,
        bestStreak,
      };

      // Check sticker unlocks
      const updatedStickers = prev.stickers.map((stk) => {
        if (stk.unlocked) return stk;
        let shouldUnlock = false;

        if (stk.id === 'stk_1' && updatedLevels.some((l) => l.completed)) shouldUnlock = true;
        if (stk.id === 'stk_2' && bestStreak >= 5) shouldUnlock = true;
        if (stk.id === 'stk_3' && updatedLevels.some((l) => l.operation === 'multiplication' && l.completed)) shouldUnlock = true;
        if (stk.id === 'stk_4' && totalStars >= 10) shouldUnlock = true;
        if (stk.id === 'stk_5' && updatedLevels.some((l) => l.operation === 'subtraction' && l.completed)) shouldUnlock = true;
        if (stk.id === 'stk_6' && bestStreak >= 10) shouldUnlock = true;
        if (stk.id === 'stk_7' && totalStars >= 20) shouldUnlock = true;
        if (stk.id === 'stk_8' && updatedLevels.some((l) => l.operation === 'division' && l.completed)) shouldUnlock = true;
        if (stk.id === 'stk_9' && totalAnswered >= 30) shouldUnlock = true;
        if (
          stk.id === 'stk_10' &&
          updatedLevels.filter((l) => l.worldId <= 2).every((l) => l.completed)
        )
          shouldUnlock = true;
        if (stk.id === 'stk_11' && totalStars >= 30) shouldUnlock = true;
        if (stk.id === 'stk_12' && updatedLevels.find((l) => l.worldId === 5)?.completed) shouldUnlock = true;

        if (shouldUnlock) {
          sounds.playReward();
        }

        return shouldUnlock ? { ...stk, unlocked: true } : stk;
      });

      // Check achievements
      const updatedAchievements = prev.achievements.map((ach) => {
        let unlocked = ach.unlocked;
        let progress = ach.progress;

        if (ach.id === 'ach_first_win') {
          unlocked = updatedLevels.some((l) => l.completed);
          progress = unlocked ? 1 : 0;
        } else if (ach.id === 'ach_streak_5') {
          progress = Math.min(ach.maxProgress, bestStreak);
          unlocked = bestStreak >= 5;
        } else if (ach.id === 'ach_streak_10') {
          progress = Math.min(ach.maxProgress, bestStreak);
          unlocked = bestStreak >= 10;
        } else if (ach.id === 'ach_addition_master') {
          const completedCount = updatedLevels.filter((l) => l.worldId === 1 && l.completed).length;
          progress = completedCount;
          unlocked = completedCount === 3;
        } else if (ach.id === 'ach_sub_master') {
          const completedCount = updatedLevels.filter((l) => l.worldId === 2 && l.completed).length;
          progress = completedCount;
          unlocked = completedCount === 3;
        } else if (ach.id === 'ach_mult_master') {
          const completedCount = updatedLevels.filter((l) => l.worldId === 3 && l.completed).length;
          progress = completedCount;
          unlocked = completedCount >= 4;
        } else if (ach.id === 'ach_div_master') {
          const completedCount = updatedLevels.filter((l) => l.worldId === 4 && l.completed).length;
          progress = completedCount;
          unlocked = completedCount === 3;
        } else if (ach.id === 'ach_sticker_collector') {
          const unlockedStickersCount = updatedStickers.filter((s) => s.unlocked).length;
          progress = Math.min(ach.maxProgress, unlockedStickersCount);
          unlocked = unlockedStickersCount >= 6;
        } else if (ach.id === 'ach_grand_champion') {
          const bossLvl = updatedLevels.find((l) => l.worldId === 5);
          unlocked = Boolean(bossLvl && bossLvl.completed && bossLvl.starsEarned === 3);
          progress = unlocked ? 1 : 0;
        }

        return { ...ach, unlocked, progress };
      });

      return {
        ...prev,
        levels: updatedLevels,
        stickers: updatedStickers,
        achievements: updatedAchievements,
        stats: newStats,
      };
    });
  };

  const handleEquipAccessory = (accessoryId: string, type: 'hat' | 'glasses' | 'badge') => {
    setGameData((prev) => {
      const updated = prev.accessories.map((acc) => {
        if (acc.type === type) {
          return { ...acc, equipped: acc.id === accessoryId };
        }
        return acc;
      });
      return { ...prev, accessories: updated };
    });
  };

  const handleBuyAccessory = (item: MascotAccessory) => {
    if (gameData.stats.coins < item.costCoins || gameData.stats.stars < item.costStars) return;

    setGameData((prev) => {
      const newCoins = prev.stats.coins - item.costCoins;
      const updated = prev.accessories.map((acc) => {
        if (acc.id === item.id) {
          return { ...acc, unlocked: true, equipped: true };
        }
        if (acc.type === item.type) {
          return { ...acc, equipped: false };
        }
        return acc;
      });

      return {
        ...prev,
        stats: { ...prev.stats, coins: newCoins },
        accessories: updated,
      };
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Deseja mesmo reiniciar seu progresso e começar do zero?')) {
      const fresh = resetGameData();
      setGameData(fresh);
      setActiveLevel(null);
      setCustomMode(null);
      setCurrentTab('adventure');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800 font-sans selection:bg-amber-200">
      {/* 3-Zone Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setActiveLevel(null);
          setCustomMode(null);
          setCurrentTab(tab);
        }}
        stars={gameData.stats.stars}
        coins={gameData.stats.coins}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenCertificate={() => setShowCertificate(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        {activeLevel || customMode ? (
          <GameScreen
            level={activeLevel || undefined}
            customMode={customMode || undefined}
            accessories={gameData.accessories}
            onFinishLevel={handleFinishLevel}
            onExit={() => {
              setActiveLevel(null);
              setCustomMode(null);
            }}
          />
        ) : (
          <>
            {currentTab === 'adventure' && (
              <AdventureMap
                levels={gameData.levels}
                stats={gameData.stats}
                accessories={gameData.accessories}
                onSelectLevel={(lvl) => setActiveLevel(lvl)}
                onOpenPractice={() => setCurrentTab('practice')}
              />
            )}

            {currentTab === 'practice' && (
              <FreePractice
                onStartPractice={(config) => {
                  setCustomMode({
                    operation: config.operation,
                    difficulty: config.difficulty,
                    questionsCount: config.questionsCount,
                    title: config.title,
                    specialMode: config.specialMode,
                  });
                }}
              />
            )}

            {currentTab === 'stickers' && <StickerAlbum stickers={gameData.stickers} />}

            {currentTab === 'wardrobe' && (
              <MascotWardrobe
                accessories={gameData.accessories}
                stats={gameData.stats}
                onEquip={handleEquipAccessory}
                onBuy={handleBuyAccessory}
              />
            )}

            {currentTab === 'trophies' && (
              <AchievementsView
                achievements={gameData.achievements}
                stats={gameData.stats}
                onOpenCertificate={() => setShowCertificate(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200/80 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium">
            Jogo de Matemática alinhado à BNCC · 3º Ano do Ensino Fundamental 1
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleResetProgress}
              className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reiniciar Progresso</span>
            </button>
            <span>·</span>
            <span>Adição, Subtração, Multiplicação e Divisão</span>
          </div>
        </div>
      </footer>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          stats={gameData.stats}
          onUpdateName={(newName) => {
            setGameData((prev) => ({
              ...prev,
              stats: { ...prev.stats, playerName: newName },
            }));
          }}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}
