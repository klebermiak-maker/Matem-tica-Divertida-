import React, { useState } from 'react';
import { MascotAccessory, PlayerStats } from '../types';
import { MascotTico } from './MascotTico';
import { Lock, Check, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface WardrobeProps {
  accessories: MascotAccessory[];
  stats: PlayerStats;
  onEquip: (accessoryId: string, type: 'hat' | 'glasses' | 'badge') => void;
  onBuy: (accessory: MascotAccessory) => void;
}

export const MascotWardrobe: React.FC<WardrobeProps> = ({
  accessories,
  stats,
  onEquip,
  onBuy,
}) => {
  const [activeCategory, setActiveCategory] = useState<'hat' | 'glasses' | 'badge'>('hat');

  const filtered = accessories.filter((a) => a.type === activeCategory);

  return (
    <div className="space-y-6 pb-20">
      {/* Banner & Mascot Dressing Room */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 rounded-3xl border-2 border-amber-200/90 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <MascotTico
            mood="happy"
            accessories={accessories}
            size="lg"
            message="Olha como estou estiloso! Escolha um acessório novo para mim com suas moedas!"
          />
        </div>

        {/* Currency balance display */}
        <div className="bg-white rounded-2xl border border-amber-200 p-4 min-w-[200px] text-center shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-semibold">Seu Saldo Atual</span>
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-1 font-fun text-xl font-extrabold text-amber-600">
              <span className="text-lg">⭐</span>
              <span>{stats.stars}</span>
            </span>
            <span className="text-slate-200">|</span>
            <span className="flex items-center gap-1 font-fun text-xl font-extrabold text-yellow-600">
              <span className="text-lg">🪙</span>
              <span>{stats.coins}</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Ganhe mais moedas acertando contas nas fases!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'hat', label: '🎩 Chapéus e Bonés' },
          { id: 'glasses', label: '👓 Óculos e Viseiras' },
          { id: 'badge', label: '🌟 Medalhas e Broches' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playClick();
              setActiveCategory(tab.id as 'hat' | 'glasses' | 'badge');
            }}
            className={`px-4 py-2 rounded-xl font-fun text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((item) => {
          const canAfford = stats.coins >= item.costCoins && stats.stars >= item.costStars;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border-2 p-4 flex flex-col items-center text-center justify-between min-h-[180px] transition-all ${
                item.equipped
                  ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-300'
                  : item.unlocked
                  ? 'bg-white border-slate-200 hover:border-amber-300'
                  : 'bg-slate-50 border-dashed border-slate-300 opacity-80'
              }`}
            >
              {/* Item Emoji Display */}
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner mb-2">
                {item.emoji}
              </div>

              <div>
                <h4 className="font-fun font-bold text-sm text-slate-900">{item.name}</h4>
                {!item.unlocked && (
                  <div className="text-[11px] font-semibold text-amber-700 mt-1 flex items-center justify-center gap-2">
                    {item.costStars > 0 && <span>{item.costStars} ★</span>}
                    <span>{item.costCoins} 🪙</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 w-full">
                {item.equipped ? (
                  <button
                    disabled
                    className="w-full py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1 cursor-default"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Equipado</span>
                  </button>
                ) : item.unlocked ? (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onEquip(item.id, item.type);
                    }}
                    className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Equipar
                  </button>
                ) : (
                  <button
                    disabled={!canAfford}
                    onClick={() => {
                      if (canAfford) {
                        sounds.playReward();
                        onBuy(item);
                      }
                    }}
                    className={`w-full py-1.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors ${
                      canAfford
                        ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer shadow-xs'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>{canAfford ? 'Comprar' : 'Bloqueado'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
