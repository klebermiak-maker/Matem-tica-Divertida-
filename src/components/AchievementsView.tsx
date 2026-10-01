import React from 'react';
import { Achievement, PlayerStats } from '../types';
import { Trophy, Award, Star, Flame, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface AchievementsViewProps {
  achievements: Achievement[];
  stats: PlayerStats;
  onOpenCertificate: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  stats,
  onOpenCertificate,
}) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 rounded-3xl border-2 border-amber-200/90 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <h2 className="font-fun text-2xl font-bold text-slate-900">
              Galeria de Troféus & Medalhas
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Cada marco superado premia sua dedicação aos estudos!
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onOpenCertificate();
          }}
          className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-fun font-bold text-sm rounded-2xl shadow-md transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
        >
          <Award className="w-5 h-5" />
          <span>Ver Meu Diploma do 3º Ano</span>
        </button>
      </div>

      {/* Stats Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
          <span className="text-xs text-slate-500 font-semibold">Total de Estrelas</span>
          <p className="font-fun text-2xl font-extrabold text-amber-600 mt-1 flex items-center justify-center gap-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            <span>{stats.stars}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
          <span className="text-xs text-slate-500 font-semibold">Maior Sequência</span>
          <p className="font-fun text-2xl font-extrabold text-orange-600 mt-1 flex items-center justify-center gap-1">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
            <span>{stats.bestStreak}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
          <span className="text-xs text-slate-500 font-semibold">Contas Acertadas</span>
          <p className="font-fun text-2xl font-extrabold text-emerald-600 mt-1">
            {stats.totalCorrect}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
          <span className="text-xs text-slate-500 font-semibold">Troféus Liberados</span>
          <p className="font-fun text-2xl font-extrabold text-indigo-600 mt-1">
            {unlockedCount} / {achievements.length}
          </p>
        </div>
      </div>

      {/* Achievements List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`rounded-2xl border-2 p-4 flex items-start gap-3 transition-all ${
              ach.unlocked
                ? 'bg-white border-amber-300 shadow-sm'
                : 'bg-slate-50 border-slate-200 opacity-70'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-xs shrink-0 ${
                ach.unlocked ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-400'
              }`}
            >
              {ach.icon}
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-fun font-bold text-sm text-slate-900">{ach.title}</h4>
                {ach.unlocked && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500 leading-snug">{ach.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
