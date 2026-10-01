import React from 'react';
import { LevelInfo, MascotAccessory, PlayerStats } from '../types';
import { Lock, Star, Play, CheckCircle2, Trophy, Compass, Sparkles } from 'lucide-react';
import { MascotTico } from './MascotTico';
import { sounds } from '../utils/audio';

interface AdventureMapProps {
  levels: LevelInfo[];
  stats: PlayerStats;
  accessories: MascotAccessory[];
  onSelectLevel: (level: LevelInfo) => void;
  onOpenPractice: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  levels,
  stats,
  accessories,
  onSelectLevel,
  onOpenPractice,
}) => {
  const totalStars = stats.stars;
  const completedCount = levels.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / levels.length) * 100);

  // Group levels by world
  const worlds = [
    {
      id: 1,
      name: '1. Vale da Adição',
      badge: '➕ Adição',
      theme: 'from-emerald-500/10 to-teal-500/5 border-emerald-200',
      accentColor: 'text-emerald-700 bg-emerald-100',
      cardBg: 'border-emerald-300',
      description: 'Aprenda a somar, juntar quantidades e avançar pelas dezenas!',
      levels: levels.filter((l) => l.worldId === 1),
    },
    {
      id: 2,
      name: '2. Floresta da Subtração',
      badge: '➖ Subtração',
      theme: 'from-amber-500/10 to-orange-500/5 border-amber-200',
      accentColor: 'text-amber-800 bg-amber-100',
      cardBg: 'border-amber-300',
      description: 'Descubra a diferença, tire parcelas e faça trocos sem medo!',
      levels: levels.filter((l) => l.worldId === 2),
    },
    {
      id: 3,
      name: '3. Montanha da Multiplicação',
      badge: '✖️ Multiplicação',
      theme: 'from-blue-500/10 to-indigo-500/5 border-blue-200',
      accentColor: 'text-blue-700 bg-blue-100',
      cardBg: 'border-blue-300',
      description: 'Conquiste as tabuadas do 2 ao 9 e some em velocidade relâmpago!',
      levels: levels.filter((l) => l.worldId === 3),
    },
    {
      id: 4,
      name: '4. Castelo da Divisão',
      badge: '➗ Divisão',
      theme: 'from-purple-500/10 to-violet-500/5 border-purple-200',
      accentColor: 'text-purple-700 bg-purple-100',
      cardBg: 'border-purple-300',
      description: 'Reparta doces e tesouros igualmente entre seus amigos!',
      levels: levels.filter((l) => l.worldId === 4),
    },
    {
      id: 5,
      name: '5. Ilha Lendária dos Campeões',
      badge: '👑 Desafio Misto Final',
      theme: 'from-rose-500/15 to-yellow-500/10 border-rose-300',
      accentColor: 'text-rose-700 bg-rose-100',
      cardBg: 'border-rose-400',
      description: 'O grande torneio que combina as 4 operações básicas do 3º Ano!',
      levels: levels.filter((l) => l.worldId === 5),
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Progression Banner */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 rounded-3xl border-2 border-amber-200/90 p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <MascotTico
              mood={completedCount >= 10 ? 'celebrating' : 'happy'}
              accessories={accessories}
              size="md"
              message={
                completedCount === 0
                  ? 'Olá, amigo! Escolha a 1ª fase no Vale da Adição para começar nossa aventura!'
                  : completedCount === levels.length
                  ? 'Incrível! Você concluiu todas as fases e é o Mestre da Matemática do 3º Ano!'
                  : `Você já completou ${completedCount} fases! Continue avançando para ganhar mais figurinhas!`
              }
            />
          </div>

          {/* Progress summary stats */}
          <div className="w-full md:w-auto min-w-[280px] bg-white/90 rounded-2xl border border-amber-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                Progresso na Trilha
              </span>
              <span className="font-fun text-sm font-bold text-amber-600">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span>{completedCount} de {levels.length} Fases Vencidas</span>
              <span className="flex items-center gap-1 font-bold text-amber-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                {totalStars} Estrelas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Worlds Map List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-fun text-xl sm:text-2xl font-bold text-slate-900">
              Reinos das Quatro Operações
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Conquiste estrelas para desbloquear novos mundos e figurinhas raras!
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenPractice();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Treino Personalizado</span>
          </button>
        </div>

        {/* Worlds Grid */}
        <div className="space-y-6">
          {worlds.map((world) => {
            const worldCompleted = world.levels.every((l) => l.completed);

            return (
              <div
                key={world.id}
                className={`bg-white rounded-3xl border-2 p-5 sm:p-6 transition-all ${
                  worldCompleted ? 'border-emerald-300 shadow-sm' : 'border-slate-200'
                }`}
              >
                {/* World Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-900">
                        {world.name}
                      </h3>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${world.accentColor}`}>
                        {world.badge}
                      </span>
                      {worldCompleted && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Mundo Concluído
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{world.description}</p>
                  </div>
                </div>

                {/* Level Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {world.levels.map((level) => {
                    const isUnlocked = totalStars >= level.requiredStars;
                    const starsNeeded = level.requiredStars - totalStars;

                    return (
                      <div
                        key={level.id}
                        className={`relative rounded-2xl border-2 p-4 transition-all duration-200 flex flex-col justify-between min-h-[170px] ${
                          isUnlocked
                            ? 'bg-gradient-to-b from-white to-slate-50/70 border-amber-200/90 hover:border-amber-400 hover:shadow-md'
                            : 'bg-slate-50/80 border-slate-200 opacity-75'
                        }`}
                      >
                        {/* Card Top */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-fun text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                              Fase {level.id}
                            </span>

                            {/* Stars status */}
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3].map((starNum) => (
                                <Star
                                  key={starNum}
                                  className={`w-4 h-4 ${
                                    starNum <= level.starsEarned
                                      ? 'fill-amber-400 text-amber-500'
                                      : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <h4 className="font-fun font-bold text-base text-slate-900 leading-snug">
                            {level.title}
                          </h4>
                          {level.specialMode === 'grid_multiplication' && (
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 text-[10px] font-bold">
                              <span>📐</span>
                              <span>Princípio Multiplicativo</span>
                            </span>
                          )}
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {level.subtitle}
                          </p>
                        </div>

                        {/* Card Bottom / Action */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-400">
                            {level.questionsTotal} Questões
                          </span>

                          {isUnlocked ? (
                            <button
                              onClick={() => {
                                sounds.playClick();
                                onSelectLevel(level);
                              }}
                              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-fun font-bold text-xs shadow-xs transition-transform active:scale-95 cursor-pointer ${
                                level.completed
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                  : 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                              }`}
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{level.completed ? 'Repetir' : 'Jogar!'}</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                              <Lock className="w-3.5 h-3.5" />
                              <span>Faltam {starsNeeded} ★</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
